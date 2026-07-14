import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

const ReviewSection = ({ productId, reviews: initialReviews = [] }) => {
    const { backendUrl, token, userData } = useContext(ShopContext);
    const [reviews, setReviews] = useState(initialReviews);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const compressedFiles = [];
        
        toast.info("Compressing review images...");
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
            useWebWorker: true
        };

        try {
            for (const file of files) {
                const compressedFile = await imageCompression(file, options);
                compressedFiles.push(compressedFile);
            }
            setImages(compressedFiles);
            toast.success("Images ready");
        } catch (error) {
            toast.error("Image compression failed");
        }
    };

    const submitReview = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error("Please login to write a review");
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('productId', productId);
            formData.append('rating', rating);
            formData.append('comment', comment);
            formData.append('user', userData?.name || 'Anonymous');
            
            images.forEach(img => {
                formData.append('images', img);
            });

            const response = await axios.post(backendUrl + '/api/product/review', formData, {
                headers: { token }
            });

            if (response.data.success) {
                toast.success("Review submitted!");
                setReviews(response.data.reviews);
                setComment('');
                setImages([]);
                setRating(5);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold uppercase tracking-widest">Customer Reviews</h2>
                <div className="h-[2px] flex-1 bg-black"></div>
            </div>

            {/* REVIEW FORM */}
            <div className="bg-gray-50 p-6 mb-12 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-bold mb-4 uppercase text-sm">Write a review</h3>
                <form onSubmit={submitReview} className="space-y-4">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(num => (
                            <img 
                                key={num}
                                src={num <= rating ? assets.star_icon : assets.star_dull_icon} 
                                onClick={() => setRating(num)}
                                className="w-5 cursor-pointer"
                                alt="" 
                            />
                        ))}
                    </div>
                    <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience..."
                        className="w-full p-4 border-2 border-black outline-none focus:bg-white bg-transparent transition-all"
                        rows="4"
                        required
                    />
                    <div>
                        <p className="text-xs font-bold uppercase mb-2">Add Photos (Max 4)</p>
                        <input 
                            type="file" 
                            multiple 
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-xs"
                        />
                        <div className="flex gap-2 mt-2">
                            {images.map((img, i) => (
                                <img key={i} src={URL.createObjectURL(img)} className="w-16 h-16 object-cover border border-black" alt="" />
                            ))}
                        </div>
                    </div>
                    <button 
                        disabled={isUploading}
                        className="bg-black text-white px-10 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-400 transition-all"
                    >
                        {isUploading ? 'Submitting...' : 'Post Review'}
                    </button>
                </form>
            </div>

            {/* REVIEWS LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.length > 0 ? reviews.map((rev, index) => (
                    <div key={index} className="border-2 border-gray-200 p-6 hover:border-black transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="font-bold uppercase text-xs tracking-wider">{rev.user}</p>
                                <div className="flex gap-1 mt-1">
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <img 
                                            key={num}
                                            src={num <= rev.rating ? assets.star_icon : assets.star_dull_icon} 
                                            className="w-3"
                                            alt="" 
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 uppercase">{new Date(rev.date).toLocaleDateString()}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{rev.comment}</p>
                        {rev.images && rev.images.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {rev.images.map((img, i) => (
                                    <img key={i} src={img} className="w-20 h-20 object-cover border border-gray-100 group-hover:border-black transition-all" alt="" />
                                ))}
                            </div>
                        )}
                    </div>
                )) : (
                    <p className="text-gray-400 uppercase tracking-widest text-sm py-10">No reviews yet. Be the first!</p>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;

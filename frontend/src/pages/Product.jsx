import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import ReviewSection from '../components/ReviewSection';
import { toast } from 'react-toastify';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';


const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart, token, navigate } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // ✅ HELPER: Format description with sections
  const formatDescription = (desc) => {
    if (!desc) return null;
    return desc.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={index} className="h-4"></div>; // Spacer for empty lines

      if (trimmedLine.startsWith('#')) {
        return <h3 key={index} className='font-black text-xl mt-8 mb-4 uppercase tracking-tight text-black border-l-4 border-black pl-4'>{trimmedLine.replace('#', '').trim()}</h3>
      }
      
      // Support multiple bullet styles: -, *, •
      if (trimmedLine.startsWith('-') || trimmedLine.startsWith('*') || trimmedLine.startsWith('•')) {
        return (
          <div key={index} className='flex items-start gap-3 mb-2 ml-2'>
            <span className='text-brand-red font-bold'>•</span>
            <span className='flex-1 text-gray-700 leading-relaxed'>{trimmedLine.replace(/^[-*•]/, '').trim()}</span>
          </div>
        );
      }

      return <p key={index} className='mb-4 leading-loose text-gray-600 font-medium'>{trimmedLine}</p>
    });
  };

  // ✅ LOGIN CHECK WRAPPER
  const handleAddToCart = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (!size) {
      toast.error('Please select a size');
      return;
    }
    addToCart(productData._id, size);
  };

  return productData ? (
    <>
      <SEO 
        title={productData.name} 
        description={productData.description.substring(0, 160)} 
        image={productData.image[0]}
        url={`/product/${productData._id}`}
        type="product"
      />
      
      {/* JSON-LD Product Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": productData.name,
          "image": productData.image,
          "description": productData.description,
          "brand": {
            "@type": "Brand",
            "name": "Wobblix"
          },
          "offers": {
            "@type": "Offer",
            "url": `https://wobblixclothing.in/product/${productData._id}`,
            "priceCurrency": "INR",
            "price": productData.price,
            "availability": "https://schema.org/InStock"
          }
        })}
      </script>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='pt-10 px-4 sm:px-10 lg:px-24 bg-[#edece8]'
      >
        {/*----------- Product Data-------------- */}
        <div className='flex gap-16 flex-col lg:flex-row items-start'>
          {/* ... existing code ... */}
          {/* Rest of the product page content stays same, just wrapped in motion.div */}
          
          {/*---------- Product Images------------- */}
          <div className='flex-1 flex flex-col-reverse gap-4 sm:flex-row w-full lg:sticky lg:top-24'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[15%] w-full no-scrollbar'>
              {productData.image.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setImage(item)}
                  src={item}
                  className={`w-[24%] sm:w-full sm:mb-4 flex-shrink-0 cursor-pointer border-2 transition-all ${image === item ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                  alt=""
                />
              ))}
            </div>
            <div className='w-full sm:w-[85%] bg-white p-4 shadow-sm'>
              <img className='w-full h-auto object-cover' src={image} alt="" />
            </div>
          </div>

          {/* -------- Product Info ---------- */}
          <div className='flex-1 lg:max-w-[45%]'>
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
               NEW DROP // {productData.category}
            </div>
            
            <h1 className='font-street text-5xl lg:text-6xl text-black leading-tight uppercase mb-2'>{productData.name}</h1>

            <div className='flex items-center gap-1 mt-4 mb-8'>
              {[1,2,3,4,5].map(i => (
                 <img key={i} src={i <= 4 ? assets.star_icon : assets.star_dull_icon} alt="" className="w-3" />
              ))}
              <p className='pl-2 text-[10px] font-bold text-gray-400'>(122 REVIEWS)</p>
            </div>

            <div className='mb-10'>
              <p className='text-5xl font-black tracking-tighter text-black'>
                {currency}{productData.price}
              </p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Inclusive of all taxes</p>
            </div>

            {/* -------- Sizes ---------- */}
            {productData.sizes && productData.sizes.length > 0 && (
              <div className='my-10'>
                <div className="flex justify-between items-end mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest">Select Size</p>
                  <p className="text-[10px] font-bold underline cursor-pointer text-gray-500 uppercase">Size Guide</p>
                </div>
                <div className='flex flex-wrap gap-3'>
                  {productData.sizes.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSize(item)}
                      className={`w-14 h-14 flex items-center justify-center font-bold text-xs transition-all border-2 ${
                        item === size ? 'bg-black text-white border-black scale-110 shadow-lg' : 'bg-white text-black border-gray-200 hover:border-black'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className='w-full bg-black text-white py-5 font-bold tracking-[0.3em] uppercase hover:bg-gray-900 transition-all'
            >
              ADD TO CART
            </button>

            <div className='grid grid-cols-2 gap-4 mt-12'>
               <div className="p-4 border border-gray-300 flex items-center gap-3 bg-white/50">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-[10px] font-bold uppercase">Ready to Ship</p>
               </div>
               <div className="p-4 border border-gray-300 flex items-center gap-3 bg-white/50">
                  <div className="w-2 h-2 rounded-full bg-black"></div>
                  <p className="text-[10px] font-bold uppercase">100% Original</p>
               </div>
            </div>

            <hr className='my-12 border-gray-300' />

            <div className='text-xs space-y-6 text-gray-600 uppercase tracking-wider font-medium'>
              <div className="flex gap-4">
                 <span className="font-bold text-black min-w-[80px]">FIT:</span>
                 <span>Oversized Drop Shoulder</span>
              </div>
              <div className="flex gap-4">
                 <span className="font-bold text-black min-w-[80px]">FABRIC:</span>
                 <span>240 GSM // 100% Heavyweight Cotton</span>
              </div>
              <div className="flex gap-4">
                 <span className="font-bold text-black min-w-[80px]">WASH:</span>
                 <span>Cold Wash // Do not iron on print</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Description Section ------------- */}
        <div className='mt-24 max-w-3xl'>
          <div className='flex gap-12 border-b border-gray-200 mb-8'>
            <button className='pb-4 text-[10px] font-bold tracking-[0.2em] uppercase border-b-2 border-black'>DESCRIPTION</button>
          </div>
          <div className='text-sm text-gray-700 font-medium'>
            {formatDescription(productData.description)}
          </div>
        </div>

        {/* --------- Related Products ---------- */}
        <div className="mt-32">
          <RelatedProducts
            category={productData.category}
            subCategory={productData.subCategory}
            currentProductId={productData._id}
          />
        </div>

        {/* --------- Reviews Section ---------- */}
        <div className="pb-32">
          <ReviewSection 
            productId={productData._id} 
            reviews={productData.reviews} 
          />
        </div>
      </motion.div>
    </>

  ) : <div className='h-screen flex items-center justify-center'><div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>
}

export default Product


/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { useParams, useNavigate } from "react-router-dom";

const Edit = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([null, null, null, null]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [quality, setQuality] = useState(0.8);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Oversized T-Shirts");

  const [sizes, setSizes] = useState([]);
  const [colour, setColour] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [badge, setBadge] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setFetching(true);
        const response = await axios.post(
          backendUrl + "/api/product/single",
          { productId: id }
        );

        if (response.data.success) {
          const product = response.data.product;
          setName(product.name || "");
          setDescription(product.description || "");
          setPrice(product.price ? String(product.price) : "");
          setCategory(product.category || "Men");
          setSubCategory(product.subCategory || "Oversized T-Shirts");
          setSizes(product.sizes || []);
          setColour(product.colour || "");
          setBestseller(product.bestseller || false);
          setBadge(product.badge || "");

          // Initialize images array with existing urls up to index 3
          const imgArr = [null, null, null, null];
          if (product.image && Array.isArray(product.image)) {
            product.image.forEach((url, idx) => {
              if (idx < 4) {
                imgArr[idx] = url;
              }
            });
          }
          setImages(imgArr);
        } else {
          toast.error(response.data.message || "Failed to load product details");
          navigate("/list");
        }
      } catch (error) {
        console.error("Fetch product error:", error);
        toast.error("Error fetching product data");
        navigate("/list");
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  /* ---------------- IMAGE COMPRESSION ---------------- */
  const processImage = async (file) => {
    const options = {
      maxSizeMB: 1.2,
      maxWidthOrHeight: 1200,
      initialQuality: quality,
      useWebWorker: true
    };

    const compressed = await imageCompression(file, options);

    if (compressed.size > 3 * 1024 * 1024) {
      throw new Error("Image must be under 3MB");
    }

    return compressed;
  };

  const handleImageAdd = async (file, index) => {
    try {
      toast.info("Compressing image...");
      const compressed = await processImage(file);

      const updated = [...images];
      updated[index] = compressed;
      setImages(updated);
    } catch (err) {
      toast.error(err.message || "Image processing failed");
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).slice(0, 4);

    for (let i = 0; i < files.length; i++) {
      await handleImageAdd(files[i], i);
    }
  };

  const getImageUrl = (img) => {
    if (!img) return assets.upload_area;
    if (typeof img === "string") return img; // Already stored URL
    return URL.createObjectURL(img); // Newly uploaded local file
  };

  /* ---------------- SUBMIT ---------------- */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Check if there is at least one image in the slots
    const hasImage = images.some((img) => img !== null);
    if (!hasImage) {
      toast.error("Please upload or retain at least one image");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("colour", colour);
      formData.append("bestseller", bestseller);
      formData.append("badge", badge);

      const imageSlots = [];
      const newFiles = [];
      let newFileCount = 0;

      images.forEach((img) => {
        if (img) {
          if (typeof img === "string") {
            imageSlots.push(img);
          } else {
            imageSlots.push(`new_file_${newFileCount}`);
            newFiles.push(img);
            newFileCount++;
          }
        }
      });

      formData.append("imageSlots", JSON.stringify(imageSlots));
      newFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await axios.post(
        backendUrl + "/api/product/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token
          },
          timeout: 60000,
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(percent);
          }
        }
      );

      if (response.data.success) {
        toast.success("Product updated successfully");
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }

    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 font-medium">Loading product details...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full gap-4 pb-10"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-black">Edit Product</h2>
        <button
          type="button"
          onClick={() => navigate("/list")}
          className="text-sm font-semibold border border-black px-4 py-2 hover:bg-black hover:text-white transition-all"
        >
          Cancel
        </button>
      </div>

      {/* ---------------- IMAGES ---------------- */}
      <div>
        <p className="mb-2 font-medium">Upload / Manage Images (Drag & Drop or Click to change)</p>
        <div className="flex gap-4 flex-wrap">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative w-24 h-24 border bg-white group shadow-sm rounded overflow-hidden">
              <label className="cursor-pointer block w-full h-full">
                <img
                  src={getImageUrl(images[i])}
                  className="w-full h-full object-cover"
                  alt={`Product img ${i + 1}`}
                />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files[0] &&
                    handleImageAdd(e.target.files[0], i)
                  }
                />
              </label>
              {images[i] && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...images];
                    updated[i] = null;
                    setImages(updated);
                  }}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md transition-all"
                  title="Remove image"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- QUALITY SLIDER ---------------- */}
      <div className="w-full max-w-xs bg-slate-50 p-3 border rounded">
        <p className="mb-1 text-sm font-medium">
          New Image Compression Quality: {Math.round(quality * 100)}%
        </p>
        <input
          type="range"
          min="0.4"
          max="1"
          step="0.05"
          value={quality}
          className="w-full cursor-pointer accent-black"
          onChange={(e) => setQuality(Number(e.target.value))}
        />
      </div>

      {/* ---------------- PROGRESS ---------------- */}
      {loading && (
        <div className="w-full max-w-md">
          <div className="h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-2 bg-green-500 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
        </div>
      )}

      {/* ---------------- NAME ---------------- */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Product Name</p>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          className="px-3 py-2 border w-full max-w-lg focus:outline-black"
        />
      </div>

      {/* ---------------- DESCRIPTION ---------------- */}
      <div className="flex flex-col gap-2 w-full max-w-lg">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Description</p>
          <button 
            type="button"
            onClick={async () => {
              if (!description) return toast.error("Enter description first");
              try {
                toast.info("AI is formatting...");
                const res = await axios.post(backendUrl + "/api/product/ai-format", { description }, { headers: { token } });
                if (res.data.success) {
                  setDescription(res.data.formattedDescription);
                  toast.success("Formatted by AI");
                }
              } catch (err) {
                toast.error("AI Formatting failed");
              }
            }}
            className="text-[10px] font-bold bg-pink-100 text-pink-600 px-3 py-1 rounded-full uppercase tracking-widest hover:bg-pink-200 transition-all"
          >
            ✨ AI Format (NVIDIA)
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            type="button" 
            onClick={() => setDescription(prev => prev + "\n# ")} 
            className="text-[10px] font-bold border border-black px-3 py-1 uppercase hover:bg-black hover:text-white transition-all"
          >
            + Heading
          </button>
          <button 
            type="button" 
            onClick={() => setDescription(prev => prev + "\n- ")} 
            className="text-[10px] font-bold border border-black px-3 py-1 uppercase hover:bg-black hover:text-white transition-all"
          >
            + Bullet
          </button>
          <button 
            type="button" 
            onClick={() => setDescription(prev => prev + "\n\n")} 
            className="text-[10px] font-bold border border-black px-3 py-1 uppercase hover:bg-black hover:text-white transition-all"
          >
            + Spacer
          </button>
        </div>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Use # for Heading and - for Bullets for a sexy formatted look."
          className="px-3 py-2 border h-48 font-mono text-sm focus:outline-black"
        />
      </div>

      {/* ---------------- CATEGORY & SUBCATEGORY ---------------- */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border focus:outline-black"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Sub Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="px-3 py-2 border focus:outline-black"
          >
            <option value="Oversized T-Shirts">Oversized T-Shirts</option>
            <option value="Normal T-Shirts">Normal T-Shirts</option>
            <option value="Tank Tops">Tank Tops</option>
            <option value="Hoodies">Hoodies</option>
          </select>
        </div>
      </div>

      {/* ---------------- PRICE ---------------- */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Price (₹)</p>
        <input
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="px-3 py-2 border w-40 focus:outline-black"
        />
      </div>

      {/* ---------------- COLOUR & BADGE ---------------- */}
      <div className="flex gap-4 max-w-lg">
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-sm font-medium">Colour</p>
          <input
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            placeholder="Colour (optional)"
            className="px-3 py-2 border w-full focus:outline-black"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-sm font-medium">Ribbon Text</p>
          <input
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
            placeholder="Ribbon Text (e.g. HOT, NEW)"
            className="px-3 py-2 border w-full focus:outline-black"
          />
        </div>
      </div>

      {/* ---------------- SIZES ---------------- */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((i) => i !== size)
                    : [...prev, size]
                )
              }
              className={`px-4 py-2 cursor-pointer font-medium select-none border transition-all ${
                sizes.includes(size)
                  ? "bg-black text-white border-black"
                  : "bg-slate-100 hover:bg-slate-200 border-transparent text-gray-800"
              }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* ---------------- BESTSELLER ---------------- */}
      <label className="flex items-center gap-2 cursor-pointer select-none font-medium text-sm my-2">
        <input
          type="checkbox"
          checked={bestseller}
          className="w-4 h-4 accent-black"
          onChange={() => setBestseller((p) => !p)}
        />
        Add to Bestseller List
      </label>

      <button
        disabled={loading}
        className="w-full max-w-xs py-3 bg-black text-white hover:bg-neutral-800 font-semibold disabled:opacity-60 transition-all"
      >
        {loading ? "Updating Product..." : "SAVE CHANGES"}
      </button>
    </form>
  );
};

export default Edit;

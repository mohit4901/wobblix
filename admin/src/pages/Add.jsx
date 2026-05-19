import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const Add = ({ token }) => {

  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [quality, setQuality] = useState(0.8);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // ✅ MUST MATCH BACKEND ENUM
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Oversized T-Shirts");
  const [design, setDesign] = useState("");

  const [sizes, setSizes] = useState([]);
  const [colour, setColour] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [badge, setBadge] = useState("");
  const [loading, setLoading] = useState(false);

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

  /* ---------------- SUBMIT ---------------- */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("design", design);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("colour", colour);
      formData.append("bestseller", bestseller);
      formData.append("badge", badge);

      images.forEach((img) => {
        formData.append("images", img);
      });

      const response = await axios.post(
        backendUrl + "/api/product/add",
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
        toast.success("Product added successfully");

        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Oversized T-Shirts");
        setDesign("");
        setSizes([]);
        setColour("");
        setBestseller(false);
        setBadge("");
        setImages([]);
        setUploadProgress(0);
      } else {
        toast.error(response.data.message);
      }

    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full gap-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >

      {/* ---------------- IMAGES ---------------- */}
      <div>
        <p className="mb-2">Upload Images (Drag & Drop / Click)</p>
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <label key={i} className="cursor-pointer">
              <img
                src={
                  images[i]
                    ? URL.createObjectURL(images[i])
                    : assets.upload_area
                }
                className="w-24 h-24 object-cover border"
                alt=""
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
          ))}
        </div>
      </div>

      {/* ---------------- QUALITY SLIDER ---------------- */}
      <div className="w-full max-w-xs">
        <p className="mb-1">
          Image Quality: {Math.round(quality * 100)}%
        </p>
        <input
          type="range"
          min="0.4"
          max="1"
          step="0.05"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
        />
      </div>

      {/* ---------------- PROGRESS ---------------- */}
      {loading && (
        <div className="w-full max-w-md">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-green-500 rounded"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm mt-1">{uploadProgress}% uploaded</p>
        </div>
      )}

      {/* ---------------- NAME ---------------- */}
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
        className="px-3 py-2 border"
      />

      {/* ---------------- DESCRIPTION ---------------- */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="mb-2">Description</p>
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
        <div className="flex flex-wrap gap-2 mb-2">
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
          className="px-3 py-2 border h-48 font-mono text-sm"
        />
      </div>

      {/* ---------------- CATEGORY & SUBCATEGORY & DESIGN ---------------- */}
      <div className="flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border"
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>

        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="px-3 py-2 border"
        >
          <option value="Oversized T-Shirts">Oversized T-Shirts</option>
          <option value="Normal T-Shirts">Normal T-Shirts</option>
          <option value="Tank Tops">Tank Tops</option>
          <option value="Hoodies">Hoodies</option>
        </select>

        <select
          value={design}
          onChange={(e) => setDesign(e.target.value)}
          className="px-3 py-2 border"
        >
          <option value="">Select Design (Optional)</option>
          <option value="Anime">Anime</option>
          <option value="Words">Words</option>
          <option value="Artists">Artists</option>
          <option value="Cars">Cars</option>
          <option value="Winters">Winters</option>
          <option value="Summers">Summers</option>
        </select>
      </div>

      {/* ---------------- PRICE ---------------- */}
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        className="px-3 py-2 border w-40"
      />

      {/* ---------------- COLOUR & BADGE ---------------- */}
      <div className="flex gap-4">
        <input
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          placeholder="Colour (optional)"
          className="px-3 py-2 border flex-1"
        />
        <input
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          placeholder="Ribbon Text (e.g. HOT, NEW)"
          className="px-3 py-2 border flex-1"
        />
      </div>

      {/* ---------------- SIZES ---------------- */}
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
            className={`px-3 py-1 cursor-pointer ${
              sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
            }`}
          >
            {size}
          </p>
        ))}
      </div>

      {/* ---------------- BESTSELLER ---------------- */}
      <label className="flex gap-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller((p) => !p)}
        />
        Add to bestseller
      </label>

      <button
        disabled={loading}
        className="w-32 py-3 bg-black text-white disabled:opacity-60"
      >
        {loading ? "Uploading..." : "ADD"}
      </button>
    </form>
  );
};

export default Add;

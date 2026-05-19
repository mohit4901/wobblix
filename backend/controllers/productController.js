import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      design,
      sizes,
      colour,
      bestseller,
      badge
    } = req.body;

    // NORMALIZE FILES
    let files = [];

    if (Array.isArray(req.files)) {
      files = req.files;
    } else if (req.files) {
      files = Object.values(req.files).flat();
    }

    if (!files || files.length === 0 || !files[0].buffer) {
      return res.status(400).json({
        success: false,
        message: "At least one valid image is required"
      });
    }

    //  CLOUDINARY UPLOAD
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { 
          resource_type: "image",
          timeout: 60000 
        }
      )
    );

    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map((r) => r.secure_url);

    // ✅ SAFE SIZE PARSE
    let parsedSizes = [];
    if (sizes) {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch {
        parsedSizes = [];
      }
    }

    // ✅ CATEGORY NORMALIZATION (MAIN FIX)
   const safeCategory = category
  ?.toLowerCase()
  .trim()
  .replace(/\b\w/g, (c) => c.toUpperCase());

    const productData = {
      name,
      description,
      category: safeCategory,
      price: Number(price),
      subCategory: subCategory || "",
      design: design || "",
      sizes: parsedSizes,
      colour: colour || "",
      bestseller: bestseller === "true" || bestseller === true,
      badge: badge || "",
      image: imageUrls,
      date: Date.now()
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({
      success: true,
      message: "Product Added"
    });

  } catch (error) {
    console.error("ADD PRODUCT ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// LIST PRODUCTS
const listProducts = async (req, res) => {
  try {
    const { category, subCategory, design } = req.query;
    let filter = {};

    // ✅ normalize filters too (future safe)
    if (category) filter.category = category.toLowerCase().trim();
    if (subCategory) filter.subCategory = subCategory;
    if (design) filter.design = design;

    const products = await productModel.find(filter);
    res.json({ success: true, products });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// REMOVE PRODUCT
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// SINGLE PRODUCT
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADD REVIEW
const addReview = async (req, res) => {
  try {
    const { productId, rating, comment, user } = req.body;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let imageUrls = [];
    if (req.files) {
      const files = Object.values(req.files).flat();
      const uploadPromises = files.map((file) =>
        cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { resource_type: "image" }
        )
      );
      const results = await Promise.all(uploadPromises);
      imageUrls = results.map((r) => r.secure_url);
    }

    const newReview = {
      user: user || "Anonymous",
      rating: Number(rating),
      comment,
      images: imageUrls,
      date: Date.now()
    };

    product.reviews.push(newReview);
    await product.save();

    res.json({ success: true, message: "Review Added", reviews: product.reviews });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// AI FORMAT DESCRIPTION (NVIDIA NIM)
const aiFormatDescription = async (req, res) => {
  try {
    const { description } = req.body;
    
    if (!description) {
      return res.status(400).json({ success: false, message: "Description is required" });
    }

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-405b-instruct",
        messages: [
          {
            role: "system",
            content: "You are an expert e-commerce copywriter for Wobblix, a premium streetwear brand. Format the given raw product description into a professional, high-conversion format. Use '#' for headings and '-' for bullet points. Bold important features using double asterisks. Keep it concise but cool. Ensure output is clean text without explanations."
          },
          {
            role: "user",
            content: `Format this description: ${description}`
          }
        ],
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 1024,
      }),
      signal: AbortSignal.timeout(60000) // 1 minute timeout
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      const formatted = data.choices[0].message.content;
      res.json({ success: true, formattedDescription: formatted });
    } else {
      throw new Error("AI failed to format");
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      subCategory,
      design,
      sizes,
      colour,
      bestseller,
      badge,
      imageSlots
    } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Process image slots
    let parsedImageSlots = [];
    if (imageSlots) {
      try {
        parsedImageSlots = JSON.parse(imageSlots);
      } catch {
        parsedImageSlots = [];
      }
    } else {
      parsedImageSlots = product.image || [];
    }

    // Process new uploaded files
    let files = [];
    if (Array.isArray(req.files)) {
      files = req.files;
    } else if (req.files) {
      files = Object.values(req.files).flat();
    }

    let newImageUrls = [];
    if (files && files.length > 0) {
      const uploadPromises = files.map((file) =>
        cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { resource_type: "image", timeout: 60000 }
        )
      );
      const results = await Promise.all(uploadPromises);
      newImageUrls = results.map((r) => r.secure_url);
    }

    // Replace the placeholders with the uploaded image URLs in order
    let uploadedCount = 0;
    const finalImageUrls = parsedImageSlots.map((slot) => {
      if (typeof slot === 'string' && slot.startsWith("new_file_")) {
        const url = newImageUrls[uploadedCount];
        uploadedCount++;
        return url;
      }
      return slot;
    }).filter(Boolean); // Filter out any empty/nulls if something went wrong

    if (finalImageUrls.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required"
      });
    }

    // SAFE SIZE PARSE
    let parsedSizes = [];
    if (sizes) {
      try {
        parsedSizes = JSON.parse(sizes);
      } catch {
        parsedSizes = [];
      }
    } else {
      parsedSizes = product.sizes;
    }

    // CATEGORY NORMALIZATION
    let safeCategory = product.category;
    if (category) {
      safeCategory = category
        ?.toLowerCase()
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    // Update product fields
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (category !== undefined) product.category = safeCategory;
    if (subCategory !== undefined) product.subCategory = subCategory;
    if (design !== undefined) product.design = design;
    if (sizes !== undefined) product.sizes = parsedSizes;
    if (colour !== undefined) product.colour = colour;
    if (bestseller !== undefined) {
      product.bestseller = bestseller === "true" || bestseller === true;
    }
    if (badge !== undefined) product.badge = badge;
    product.image = finalImageUrls;

    await product.save();

    res.json({
      success: true,
      message: "Product Updated Successfully",
      product
    });

  } catch (error) {
    console.error("UPDATE PRODUCT ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export { listProducts, addProduct, removeProduct, singleProduct, addReview, aiFormatDescription, updateProduct };



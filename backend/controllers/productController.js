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
      sizes,
      colour,
      bestseller
    } = req.body;

    // ✅ NORMALIZE FILES
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

    // ✅ CLOUDINARY UPLOAD
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { resource_type: "image" }
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
      sizes: parsedSizes,
      colour: colour || "",
      bestseller: bestseller === "true" || bestseller === true,
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
    const { category, subCategory } = req.query;
    let filter = {};

    // ✅ normalize filters too (future safe)
    if (category) filter.category = category.toLowerCase().trim();
    if (subCategory) filter.subCategory = subCategory;

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

export { listProducts, addProduct, removeProduct, singleProduct };


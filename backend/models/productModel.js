import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },

  category: {
    type: String,
    required: true,
    enum: [
      "Men",
      "Women",
      "Unisex"
    ]
  },

  subCategory: {
    type: String,
    enum: [
      "Oversized T-Shirts",
      "Normal T-Shirts",
      "Tank Tops",
      "Hoodies"
    ],
    default: ""
  },

  sizes: {
    type: Array,
    default: []
  },

  colour: {
    type: String,
    default: ""
  },

  bestseller: { type: Boolean, default: false },
  date: { type: Number, required: true }
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;

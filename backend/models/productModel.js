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
  badge: { type: String, default: "" },
  date: { type: Number, required: true },
  
  reviews: [
    {
      user: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
      images: { type: Array, default: [] },
      date: { type: Number, default: Date.now }
    }
  ]
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;

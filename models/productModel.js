const mongoose = require("../services/mongoose").mongoose;

const Schema = mongoose.Schema;

const productModel = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
    },
    imgSRC: {
      type: String,
    },
    price: {
      type: Number,
    },
    permalink: {
      type: String,
    },
  },
  { _id: true },
  {
    collection: "products",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("productModel", productModel);

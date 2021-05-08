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
      type: String,
    },
    permalink: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    hasOnlyDefaultVariant: {
      type: Boolean,
    },
    sku: {
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

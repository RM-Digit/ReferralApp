const mongoose = require("../services/mongoose").mongoose;

const Schema = mongoose.Schema;

const CustomerModel = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    referredBy: {
      type: String,
    },
    referredTo: {
      type: String,
    },
    referringSite: {
      type: String,
    },
    landingSite: {
      type: String,
    },
    referralLink: {
      type: String,
    },
    score: {
      type: Number,
      default: 0,
    },
    discountCode: {
      type: String,
    },
    browserIp: {
      type: String,
    },
  },
  { strict: true },
  {
    collection: "customers",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("CustomerModel", CustomerModel);

const mongoose = require("../services/mongoose").mongoose;

const Schema = mongoose.Schema;

const CustomerModel = new Schema(
  {
    id: {
      type: String,
    },
    referredBy: {
      type: String,
    },
    referredTo: {
      type: String,
    },
    location: {
      type: String,
    },
    score: {
      type: Number,
    },
  },
  { strict: false },
  {
    collection: "customers",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("CustomerModel", CustomerModel);

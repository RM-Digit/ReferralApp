const mongoose = require("../services/mongoose").mongoose;

const Schema = mongoose.Schema;

const ReferModel = new Schema(
  {
    customerId: {
      type: String,
    },
    referralLink: {
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

module.exports = mongoose.model("ReferModel", ReferModel);

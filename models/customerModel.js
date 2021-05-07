const mongoose = require("../services/mongoose").mongoose;

const Schema = mongoose.Schema;

const CustomerModel = new Schema(
  {
    customerId: {
      type: String,
    },
    left_number: {
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

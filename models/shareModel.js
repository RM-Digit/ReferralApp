const mongoose = require("../services/mongoose").mongoose;

const Schema = mongoose.Schema;

const ShareModel = new Schema(
  {
    shareLink: {
      type: String,
    },
  },
  { strict: true },
  {
    collection: "ShareLink",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("ShareModel", ShareModel);

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Title is discription"],
    },
    category: {
      type: String,
      required: [true, "Title is category"],
      enum: [
        "Technology",
        "Lifestyle",
        "Business",
        "Entertainment",
        "Sports",
        "Health",
        "Other",
      ],
    },
    
    image: {
      type: String,
      required: [true, "Title is image"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);

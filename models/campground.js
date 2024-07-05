import mongoose from "mongoose";
import Review from "./review.js";

const CampgroundSchema = new mongoose.Schema({
  title: String,
  image: String,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

CampgroundSchema.post("findOneAndDelete", function (doc) {
  doc.forEach(async (id) => {
    await Review.findByIdAndDelete(id);
  });
});

const Campground =
  mongoose.models.Campground || mongoose.model("Campground", CampgroundSchema);

export default Campground;

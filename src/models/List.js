import { User } from "./User.js";
import { Schema, model } from "mongoose";

const RatingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  movies: [{ type: String }],
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

RatingSchema.post("save", async function (doc) {
  await User.findByIdAndUpdate(doc.user, { $push: { ratings: doc._id } });
});

RatingSchema.post("findOneAndDelete", async function (doc) {
  await User.findByIdAndUpdate(doc.user, { $pull: { ratings: doc._id } });
});

export const Rating = model("Rating", RatingSchema);

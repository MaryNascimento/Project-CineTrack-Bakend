import { User } from "./User.js";
import { Schema, model } from "mongoose";

const ListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  movies: [{ type: String }],
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

ListSchema.post("save", async function (doc) {
  await User.findByIdAndUpdate(doc.user, { $push: { lists: doc._id } });
});

ListSchema.post("findOneAndDelete", async function (doc) {
  await User.findByIdAndUpdate(doc.user, { $pull: { lists: doc._id } });
});

export const List = model("List", ListSchema);

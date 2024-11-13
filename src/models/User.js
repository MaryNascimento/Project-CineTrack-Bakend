import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  isVerified: { type: Boolean, default: false },
  ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
  // listas: [{ type: Schema.Types.ObjectId, ref: "Lista" }],
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update && update.password) {
    update.password = await bcrypt.hash(update.password, 10);
  }

  next();
});

export const User = model("User", UserSchema);

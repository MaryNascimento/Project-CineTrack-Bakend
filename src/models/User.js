import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  // listas: [{ type: Schema.Types.ObjectId, ref: "Lista" }],
  // avaliacoes: [{ type: Schema.Types.ObjectId, ref: "Avaliacao" }],
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = model("User", UserSchema);

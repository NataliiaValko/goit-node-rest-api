import { Schema, model } from "mongoose";

import { handleMongooseError } from "../helpers/handleMongooseError.js";

const userSchema = new Schema(
  {
    password: {
      type: String,

      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      uniq: true,
      required: [true, "Email is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);

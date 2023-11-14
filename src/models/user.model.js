import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, //cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
/*
 *dont use arrow function as it dosnt have access to "this", here we need "this"
 *  middlesware need next ""
 */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 8);
  next();
});

//custuom method/hook
userSchema.methods.isPasswordCorrect = async function (password) {
  //password from user,
  //this.password the encrypted password
  //returns true or false
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = async function () {
  return (
    await jwt.sign(
      {
        _id: this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET
    ),
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return (
    await jwt.sign(
      {
        _id: this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName,
      },
      process.env.REFRESH_TOKEN_SECRET
    ),
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

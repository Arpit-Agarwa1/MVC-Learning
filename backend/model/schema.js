import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    phone: {
      type: String, // ✅ FIXED
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Phone must be 10 digits"],
    },

    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },

    dob: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "DOB must be yyyy-mm-dd"],
    },

    username: {
      type: String,
      required: true,
      minlength: 6,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

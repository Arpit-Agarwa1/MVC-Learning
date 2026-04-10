import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
});

const AdminModel = mongoose.model("adminPanel", adminSchema);

export default AdminModel;

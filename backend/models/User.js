import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  goal: String,

  calorieTarget: Number,
  proteinTarget: Number,
});

const User = mongoose.model("User", UserSchema);

export default User;
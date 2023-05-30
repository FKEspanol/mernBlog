import mongoose from "mongoose";

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  refreshToken: {
    type: String,
    default: null,
  },
});

// Define Post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define Comment schema
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define Category schema
const categorySchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define Tag schema
const tagSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create models from the defined schemas
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const Comments = mongoose.model("Comments", commentSchema);
const Category = mongoose.model("Category", categorySchema);
const Tag = mongoose.model("Tag", tagSchema);

export { User, Post, Comments, Category, Tag };

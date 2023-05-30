"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.Category = exports.Comments = exports.Post = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define User schema
const userSchema = new mongoose_1.default.Schema({
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
const postSchema = new mongoose_1.default.Schema({
    title: String,
    content: String,
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Define Comment schema
const commentSchema = new mongoose_1.default.Schema({
    postId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Post" },
    author: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    content: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Define Category schema
const categorySchema = new mongoose_1.default.Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Define Tag schema
const tagSchema = new mongoose_1.default.Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Create models from the defined schemas
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
const Post = mongoose_1.default.model("Post", postSchema);
exports.Post = Post;
const Comments = mongoose_1.default.model("Comments", commentSchema);
exports.Comments = Comments;
const Category = mongoose_1.default.model("Category", categorySchema);
exports.Category = Category;
const Tag = mongoose_1.default.model("Tag", tagSchema);
exports.Tag = Tag;

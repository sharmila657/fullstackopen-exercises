const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
  comment: String,
  blog_id: String,
});

commentSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
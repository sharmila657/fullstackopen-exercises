const Comment = require("../models/comment");
const commentRouter = require("express").Router();

commentRouter.get("/:id/comments", async (request, response, next) => {
  try {
    const comments = await Comment.find({ blog_id: request.params.id });
    response.send(comments);
  } catch (error) {
    next(error);
  }
});

commentRouter.post("/:id/comments", async (request, response, next) => {
  try {
    const remark = new Comment({
      comment: request.body.comment,
      blog_id: request.params.id,
    });
    const commentNew = await remark.save();
    response.send(commentNew);
  } catch (error) {
    next(error);
  }
})

module.exports = commentRouter;
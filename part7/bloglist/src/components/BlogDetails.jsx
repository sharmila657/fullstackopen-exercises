import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { increaseLike } from "../reducers/blogreducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

export const BlogDetails = ({ singleBlog, blogs }) => {
  const dispatch = useDispatch();

  const newLike = (id) => {
    const updatedLike = blogs.find((blog) => blog.id === id);
    dispatch(increaseLike(id));
    dispatch(setNotification(`you have like ${updatedLike.title}`, 3));
  };

  const [comments, setComment] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/blogs/${singleBlog.id}/comments`)
      .then((result) => {
        setComment(result.data);
      });
  }, []);

  const newComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    axios
      .post(`http://localhost:3003/api/blogs/${singleBlog.id}/comments`, {
        comment,
      })
      .then((result) => {
        setComment([...comments, result.data]);
      });
    event.target.comment.value = "";
  };
  return (
    <div>
      <h1>{singleBlog.title}</h1>
      <a href={singleBlog.url}>{singleBlog.url}</a>
      &nbsp; &nbsp; &nbsp;{" "}
      <div>
        {singleBlog.likes} likes
        <button
          onClick={() => {
            newLike(singleBlog.id);
          }}
        >
          like
        </button>
      </div>
      <strong>added by {singleBlog.author}</strong>
       <div>
        <strong>comments</strong>
        <form onSubmit={newComment}>
          <input name="comment" />
          <button>add comment</button>
        </form>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.comment}</li>;
        })}
      </div>
    </div>
  );
};
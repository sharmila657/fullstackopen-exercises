import { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { setNotification } from "../reducers/notificationReducer";
import { increaseLike, deletedBlog } from "../reducers/blogreducer";
const Blog = ({
  blog,
  user,
}) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state)=>state.blogs)
  const [blogToShow, setBlogToShow] = useState([]);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  blogStyle.removebutton = {
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
    border: "solid",
  };

  const handleLikes = (id) => {
    const updatedLike = blogs.find((blog) => blog.id === id);
    dispatch(increaseLike(id));
    dispatch(setNotification(`you have like ${updatedLike.title}`, 3));
  };

  const handleDelete = async (id) => {
   const blogToRemove = blogs.find((blog)=>blog.id === id)
    const confirmation = window.confirm(
      "Do you really want to remove this blog?"
    );
    if (confirmation) {
      dispatch(deletedBlog(id));
    }
    dispatch(setNotification(`${blogToRemove.title} deleted successfully!`,3))
  };

  if (blogToShow.includes(blog.id)) {
    return (
      <div style={blogStyle} className="blog-div">
        {blog.title}
        <button
          onClick={() =>
            setBlogToShow(blogToShow.filter((id) => id !== blog.id))
          }
        >
          hide
        </button>
        <br />
        url: {blog.url}
        <br />
        Likes: {blog.likes}{" "}
        <button onClick={() => handleLikes(blog.id)} id="likes" className="likes">
          Like
        </button>
        <br />
        {blog.author}
        <br />
        {blog.user.name}
        <br />
        <div>
          {user.username === blog.user.username ? (
            <button
              onClick={() => handleDelete(blog.id)}
              style={blogStyle.removebutton}
              id="remove"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
    );
  }
  return (
    <div style={blogStyle} className="blog-div">
      {blog.title} {blog.author}{" "}
      <button
        onClick={() => setBlogToShow([...blogToShow, blog.id])}
        className="view"
      >
        view
      </button>
    </div>
  );
};

export default Blog;

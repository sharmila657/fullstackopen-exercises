import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, loggedinUser, handleLikes}) => {
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

  const handleDelete = async (blog) => {
    const confirmation = window.confirm(
      "Do you really want to remove this blog?"
    );
    if (confirmation) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs((blogs) => blogs.filter((item) => item.id !== blog.id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
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
        <button onClick={() => handleLikes(blog)}  className="blog-div">Like</button>
        <br />
        {blog.author}
        <br />
        {blog.user.name}
        <br />
        <div>
          {loggedinUser.username === blog.user.username ? (
            <button
              onClick={() => handleDelete(blog)}
              style={blogStyle.removebutton}
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
      {blog.title} {blog.author}
      <button onClick={() => setBlogToShow([...blogToShow, blog.id])}>
        view
      </button>
    </div>
  );
};

export default Blog;

import { useState } from "react";

const BlogForm = ({ handleAddBlog }) => {
  const [newBlogTitle, setnewBlogTitle] = useState("");
  const [newBlogAuthor, setnewBlogAuthor] = useState("");
  const [newBlogUrl, setnewBlogUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };
    handleAddBlog(newBlog);
    setnewBlogTitle("");
    setnewBlogAuthor("");
    setnewBlogUrl("");
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="title">Title: </label>
          <input
            id="title"
            className="title"
            type="text"
            value={newBlogTitle}
            onChange={({ target }) => setnewBlogTitle(target.value)}
          />
        </div>
        <div>
        <label htmlFor="author">Author: </label>
          <input
            className="author"
            id="author"
            type="text"
            value={newBlogAuthor}
            onChange={({ target }) => setnewBlogAuthor(target.value)}
          />
        </div>
        <div>
        <label htmlFor="url">URL: </label>
          <input
            className="url"
            id="url"
            type="text"
            value={newBlogUrl}
            onChange={({ target }) => setnewBlogUrl(target.value)}
          />
        </div>

        <button type="submit" id="create" className="form">create</button>
      </form>
    </div>
  );
};

export default BlogForm;

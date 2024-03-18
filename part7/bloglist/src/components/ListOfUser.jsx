import React from "react";

export const ListOfUser = ({ singleUser }) => {
  if (!singleUser) return null;
  return (
    <div>
      <h1>{singleUser.name}</h1>
      <h1>added blogs</h1>
        <ul>
          {singleUser.Blog.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
    </div>
  );
};
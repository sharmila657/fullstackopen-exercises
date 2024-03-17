
import React from "react";
import Blog from "../components/Blog";

const Home = ({ user, loginForm, logOut, blogForm, blogs }) => {
  return (
    <div>
      {user === null ? (
        <>
          <h2>Log into application</h2>
          {loginForm()}
        </>
      ) : (
        <>
         <h2>blogs</h2>
          {user.name} logged in
          <button onClick={logOut}>logout</button>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
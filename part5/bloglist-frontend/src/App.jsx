import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginServices from "./services/login";
import "./main.css";
import Togglable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");
  const [errmessage, setErrmessage] = useState("");
  //new blog state
  const [newBlogTitle, setnewBlogTitle] = useState("");
  const [newBlogAuthor, setnewBlogAuthor] = useState("");
  const [newBlogUrl, setnewBlogUrl] = useState("");

  useEffect(() => {
    //get data from backend server
    blogService.getAll().then((blogs) => setBlogs(blogs));
    //get user from localstorage if available
    let myuser = window.localStorage.getItem("user");
    if (myuser) {
      setUser(JSON.parse(myuser));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      let user = await loginServices.login({
        username,
        password,
      });
      //save user data in localstorage
      window.localStorage.setItem("user", JSON.stringify(user));

      //set user state
      setUser(user);
      setNotification({ message: `${user.username} logged in` });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      setErrmessage("wrong username or password");
      setTimeout(() => {
        setErrmessage(null);
      }, 1000);
    }
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };
    //send new blogs to backend
    const createdBlog = await blogService.create(newBlog);

    //add new blogs to blogs state
    setBlogs([...blogs, createdBlog]);
    setnewBlogTitle("");
    setnewBlogAuthor("");
    setnewBlogUrl("");
    setNotification({
      message: `A new blog ${createdBlog.title}! by ${createdBlog.author} added successfully.`,
    });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>

        {notification && <Notification message={notification.message} />}
        {errmessage && <Notification type="errmessage" message={errmessage} />}

        <Togglable buttonLabel="Login">
          <LoginForm
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
            username={username}
            password={password}
          />
        </Togglable>
      </div>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    setNotification({ message: `${user.username} logged out` });
    setUser(null);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const handleLikes = async (blogs) => {
    const blogToUpdate = { ...blogs, likes: blogs.likes + 1 };
    try {
      const response = await blogService.update(blogToUpdate.id, blogToUpdate);
      setBlogs((prev) => {
        return prev.map((oldblogs) => {
          if (oldblogs.id === response.id) {
            return response;
          }
          return oldblogs;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notification ? notification.message : null} />
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <br />
        <Togglable buttonLabel="new note">
          <BlogForm
            handleAddBlog={handleAddBlog}
            newBlogTitle={newBlogTitle}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
            setnewBlogTitle={setnewBlogTitle}
            setnewBlogAuthor={setnewBlogAuthor}
            setnewBlogUrl={setnewBlogUrl}
          />
        </Togglable>
        <br />
        {blogs
          .sort((a,b)=>b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setBlogs={setBlogs}
              loggedinUser={user}
              handleLikes={handleLikes}
            />
        ))}
      </div>
    );
  };

  return <div>{user === null ? loginForm() : blogForm()}</div>;
};

export default App;

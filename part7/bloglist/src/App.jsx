import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import loginServices from "./services/login";
import "./main.css";
import Togglable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import { useDispatch,useSelector } from "react-redux";
import { initializedBlog,handleAddBlog } from "./reducers/blogreducer";
import { setNotification } from "./reducers/notificationReducer";
const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state=> state.blogs)
  // const [blogs, setBlogs] = useState([]);
  // const [notification,setNotification] =useState("");
  // const [errmessage, setErrmessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
// blogService.getAll().then((blogs) => setBlogs(blogs));
    //get user from localstorage if available
    let myuser = window.localStorage.getItem("user");
    if (myuser) {
      setUser(JSON.parse(myuser));
    }
    dispatch(initializedBlog());
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
      setUsername("");
      setPassword("");
    } catch (error) {
      setErrmessage("wrong username or password");
      setTimeout(() => {
        setErrmessage(null);
      }, 1000);
    }
  };

  const handleAddblog = async (newBlog) => {
    try{
      dispatch(handleAddBlog(newBlog))
      dispatch(setNotification(`Added new blog successfully`,3));
    }catch(error){
    dispatch(setNotification(`error`,3));
    }
  };


  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>

         <Notification />
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
    // setNotification({ message: `${user.username} logged out` });
    setUser(null);
    // setTimeout(() => {
    //   setNotification(null);
    // }, 2000);
  };

  // const handleLikes = async (blogs) => {
  //   const blogToUpdate = { ...blogs, likes: blogs.likes + 1 };
  //   try {
  //     const response = await blogService.update(blogToUpdate.id, blogToUpdate);
  //     setBlogs((prev) => {
  //       return prev.map((oldblogs) => {
  //         if (oldblogs.id === response.id) {
  //           return response;
  //         }
  //         return oldblogs;
  //       });
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
      
  const blogForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <br />
        <Togglable buttonLabel="new note">
          <BlogForm handleAddBlog={handleAddblog} />
        </Togglable>
        <br />
        {blogs
          // .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              // setBlogs={setBlogs}
              loggedinUser={user}
              // handleLikes={handleLikes}
              // setNotification={setNotification}
            />
          ))}
      </div>
    );
  };

  return <div>{user === null ? loginForm() : blogForm()}</div>;
};

export default App;

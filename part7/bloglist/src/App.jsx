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
import { setUser } from "./reducers/userReducer";
const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state=> state.blogs)
  const user = useSelector(state=> state.user)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let myuser = window.localStorage.getItem("user");
    if (myuser) {
      let user = setUser(JSON.parse(myuser));
      dispatch(user)
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
      dispatch(setUser(user))
      window.localStorage.setItem("user", JSON.stringify(user));
      setUsername("");
      setPassword("");
      dispatch(setNotification(`${user.name} has login successfully`, 3));

    } catch (error) {
     dispatch(setNotification("wrong username or password",3))
    }
  };

  const handleAddblog = async (newBlog) => {
    try{
      dispatch(handleAddBlog(newBlog))
      dispatch(setNotification(`Added new blog successfully`,3));
    }catch(error){
      dispatch(
        setNotification(
          "error creating blog ",3
        )
      );    
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
    dispatch(setUser(null));
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

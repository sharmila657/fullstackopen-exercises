import { useState, useEffect } from "react";
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
import { Routes,Route, Link, useMatch, useNavigate } from "react-router-dom";
import User from "./components/User";
import Home from "./home/Home";
import userService from "./services/users"
import { ListOfUser } from "./components/ListOfUser";
import { BlogDetails } from "./components/BlogDetails";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state=> state.blogs)
  const user = useSelector(state=> state.user)
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [listOfUser, setListOfUser] = useState([]);

  useEffect(() => {
    let myuser = window.localStorage.getItem("user");
    if (myuser) {
      let user = setUser(JSON.parse(myuser));
      dispatch(user)
    }
    dispatch(initializedBlog());
  }, []);

  useEffect(() => {
    userService.getAll().then((result) => {
      setListOfUser(result);
    });
  }, []);

  const matchUser = useMatch("/users/:id");

  const singleUser = matchUser
    ? listOfUser.find((user) => user.id === matchUser.params.id)
    : null;

    const matchBlog = useMatch("/blogs/:id");
    const singleBlog = matchBlog
      ? blogs.find((blog) => blog.id === matchBlog.params.id)
      : null;
  
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      let user = await loginServices.login({
        username,
        password,
      });
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

  const logOut = () => {
    window.localStorage.removeItem("user");
    dispatch(setUser(null));
    navigate("/");
  };

  const blogForm = () => (
    <Togglable buttonLabel="new blog" >
      <BlogForm handleAddBlog={handleAddblog} />
     </Togglable>
  );
    return (
      <div>
        <Notification />
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        <Routes>
        <Route path="/users" element={<User listOfUser={listOfUser} logOut={logOut} />} />
        <Route
          path="/users/:id"
          element={<ListOfUser singleUser={singleUser} logOut={logOut}/>}
        />
         <Route
          path="/blogs/:id"
          element={<BlogDetails singleBlog={singleBlog} blogs={blogs} />}
        />
        <Route
          path="/"
          element={
            <Home
              user={user}
              loginForm={loginForm}
              logOut={logOut}
              blogForm={blogForm}
              blogs={blogs}
            />
          }
        />
      </Routes>
        <br />
      </div>
    );
  };


export default App;

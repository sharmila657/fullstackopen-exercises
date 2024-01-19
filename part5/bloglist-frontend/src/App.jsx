import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginServices from './services/login'
import './main.css'
import Togglable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [errmessage , setErrmessage] = useState('')
  //new blog state
  const [newBlogTitle, setnewBlogTitle] = useState('')
  const [newBlogAuthor, setnewBlogAuthor] = useState('')
  const [newBlogUrl,setnewBlogUrl] = useState('')
  

  useEffect(() => {
    //get data from backend server
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    //get user from localstorage if available
    let myuser = window.localStorage.getItem("user")
    if (myuser) {
      setUser(JSON.parse(myuser))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {   
      let user = await loginServices.login({
        username,
        password
      })
  //set user token in blogService
  blogService.setToken(user.token);
  console.log(user.token,"anytoken?")
  
  //save user data in localstorage
  window.localStorage.setItem('user', JSON.stringify(user)) 
 
  //set user state
  setUser(user);
  setNotification({ message: `${user.username} logged in` })
  setTimeout(() => {
    setNotification(null)
  },3000)
      
    }
    catch (error){
      setErrmessage("wrong username or password")
      setTimeout(() => {
        setErrmessage(null)
      },1000)
    }
  }
 
  const handleAddBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    //send new blogs to backend
    const createdBlog = await blogService.create(newBlog)

    //add new blogs to blogs state
    setBlogs([...blogs, createdBlog]);
    setnewBlogTitle('')
    setnewBlogAuthor('')
    setnewBlogUrl('')
    setNotification({ message:`A new blog ${createdBlog.title}! by ${createdBlog.author} added successfully.` })
    setTimeout(() => {
    setNotification(null)
    },3000)
  }

    const loginForm = () => {
      return (
        <div >
          <h2>Log in to application</h2>
        
  {notification && <Notification message={notification.message} />}
  {errmessage && <Notification type="errmessage" message={errmessage} />}

          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    }
  const blogForm = () => {
    const handleLogout = () => {
      window.localStorage.removeItem('user');
      setNotification({ message: `${user.username} logged out` });
      setUser(null);
      setTimeout(() => {
        setNotification(null);
      }, 2000);
      }
      return (
        <div>
          <h2>blogs</h2>
          <Notification message={notification ? notification.message : null}/>
          
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <br />
          <Togglable buttonLabel="new note">
            <h2>create new</h2>
          <form onSubmit={handleAddBlog}>
            <div>
              Title:
              <input
                type="text"
                value={newBlogTitle}
                onChange={({ target })=>setnewBlogTitle(target.value)}
              />
            </div>
            <div>
              Author:
              <input
                type="text"
                value={newBlogAuthor}
                onChange={({ target })=>setnewBlogAuthor(target.value)}
              />
            </div>
            <div>
              Url:
              <input
                type="text"
                value={newBlogUrl}
                onChange={({ target })=>setnewBlogUrl(target.value)}
              />
            </div>

            <button type="submit">create</button>
            </form>
          </Togglable>
          <br/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}

        </div>
      )
    }
    return (
      <div>
        {user === null ? loginForm() : blogForm()}
        
      </div>
    )
  }


export default App
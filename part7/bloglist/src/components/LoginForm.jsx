const LoginForm = ({handleLogin,setUsername,setPassword,username,password}) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
         <div>
           username
            <input
            id="username"
             type="text"
             value={username}
             name="Username"
             onChange={({ target }) => setUsername(target.value)}
           />
         </div>
         <div>
           password
            <input
              id="password"
             type="password"
             value={password}
             name="Password"
             onChange={({ target }) => setPassword(target.value)}
           />
         </div>
         <button id="login-btn" type="submit">login</button>
        </form>
        </div>
    )
       
}

export default LoginForm;
import { TextField, Button } from "@mui/material";

const LoginForm = ({
  handleLogin,
  // setUsername,
  // setPassword,
  // username,
  // password
}) => {
    return (
        <div>
            <form onSubmit={handleLogin}>
         <div>
         <TextField name="username" label="username" />
            {/* <input
            id="username"
             type="text"
             value={username}
             name="Username"
             onChange={({ target }) => setUsername(target.value)}
           /> */}
          {/* <input type="text" name="username" /> */}

         </div>
         <div>
         <TextField label="password" name="password" />
            {/* <input
              id="password"
             type="password"
             value={password}
             name="Password"
             onChange={({ target }) => setPassword(target.value)}
           /> */}
          {/* <input type="password" name="password" /> */}

         </div>
         {/* <button id="login-btn" type="submit">login</button> */}
         <Button variant="contained" color="primary" type="login">
          login
        </Button>
         {/* <button type="submit">login</button> */}
        </form>
        </div>
    )
       
}

export default LoginForm;
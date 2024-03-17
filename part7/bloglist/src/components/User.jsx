import React from "react";
import { Link } from "react-router-dom";
const User = ({listOfUser}) => {
  return <div>
    <table>
        <thead>
          <tr>
            <td>
              <h1>Users</h1>
            </td>
          </tr>
        </thead>
        <tbody>
        <tr>
        <td></td>
            <td>
              <h2>blog created</h2>
            </td>
          </tr>
          {listOfUser.map((user) => {
            return (
              <tr key={user.id}>
                <td>                  
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                {/* <td>{user.blogs.length}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
  </div>;
};

export default User;
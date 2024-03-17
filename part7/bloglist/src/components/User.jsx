import React from "react";
import { UserInfo } from "./UserInfo";
const User = ({listOfUser}) => {
  return <div>
    <UserInfo />
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
                <td>{user.name}</td>
                {/* <td>{user.blogs.length}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
  </div>;
};

export default User;
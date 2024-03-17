import React from "react";
import { useSelector } from "react-redux";

export const UserInfo = ({logOut}) => {
  const user = useSelector((state) => state.user);
  if (user === null) return null;
  return (
    <div>
      {user.name} logged in <br/>
      <button onClick={logOut}>logout</button>
    </div>
  );
};
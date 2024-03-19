import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
const User = ({listOfUser}) => {
  return <div>
   
   <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <strong>Users</strong>
              </TableCell>
              <TableCell>
                <strong>Blogs</strong>
              </TableCell>
            </TableRow>
            {listOfUser.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>

                  <TableCell>{user.Blog.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
  </div>;
};

export default User;
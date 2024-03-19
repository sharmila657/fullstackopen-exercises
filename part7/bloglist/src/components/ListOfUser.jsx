import React from "react";
import { Typography, ListItemText } from "@mui/material";

export const ListOfUser = ({ singleUser }) => {
  if (!singleUser) return null;
  return (
    <div>
       <Typography
        align="justify"
        variant="h4"
        mt={4}
        fontSize="25px"
        fontStyle="italic"
        fontWeight="bold"
      >
        Added by {singleUser.name}
      </Typography>

      <Typography
        align="justify"
        variant="h4"
        mt={4}
        fontSize="20px"
        fontStyle="normal"
        fontWeight="bold"
      >
        Added Blogs
      </Typography>

        <ul>
          {singleUser.Blog.map((blog) => (
            <ListItemText key={blog.id} sx={{ color: "green" }}>
            {blog.title}
          </ListItemText>         
           ))}
        </ul>
    </div>
  );
};
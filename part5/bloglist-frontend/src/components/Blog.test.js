import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "The Joel Test: 12 Steps to Better Code",
    author: "Joel Spolsky",
    url: "https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/",
    likes: 112,
  };

  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blog-div");

  expect(div).toHaveTextContent("The Joel Test: 12 Steps to Better Code");
  expect(div).toHaveTextContent("Joel Spolsky");
  expect(screen.queryByText("likes")).toBeNull();
  expect(screen.queryByText("url")).toBeNull();
});

test("Likes and Url will be shown when toggled", async () => {
  const blog = {
    title: "test blog",
    author: "sharmila",
    url: "http://test.com",
    likes: 131,
    user: {
      username: "blogger",
      name: "blog",
      id: "blog",
    },
  };
  const  newUser = {
    username: "blogger",
    name: "blog",
    id: "blog",
  };

  const { container } = render(<Blog blog={blog} loggedinUser={newUser} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  // screen.debug();

  const div = container.querySelector(".blog-div");
  expect(div).toHaveTextContent(
    "http://test.com"
  );
  expect(div).toHaveTextContent("131");
  expect(screen.queryByText("url")).toBeDefined();
  expect(screen.queryByText("Likes")).toBeDefined();
});

test.only("if the like button is clicked twice, the event handler the component received as props is called twice.", async () => {
  const blog = {
    title: "test blog",
    author: "sharmila",
    url: "http://test.com",
    likes: 131,
    user: {
      username: "blogger",
      name: "blog",
      id: "blog",
    },
  };
  const newUser = {
    username: "mluukkai",
    name: "Matti Luukkainen",
    id: "65ae424942124c7723699cb8",
  };
 

  const mockHandler = jest.fn();

  render(
    <Blog blog={blog} loggedinUser={newUser} handleLikes={mockHandler} />
  )

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  expect(screen.queryByText("Like")).toBeDefined();
  const likebutton = screen.queryByText("Like")
  await user.click(likebutton);
  await user.click(likebutton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});


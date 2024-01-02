const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogSchema')

const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()
  noteObject = new Blog(initialBlogs[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    // .expect('Content-Type', /application \/ json/)
    .expect('Content-Type', "application/json; charset=utf-8")
  
},10000)

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const returnBlog = response.body;
  returnBlog.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test("creates a new blog", async () => {
  const newBlog = {
    title: "Post Title",
    author: "New Author",
    url: "myUrl",
    likes: 7,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

afterAll(async () => {
  await mongoose.connection.close()
})
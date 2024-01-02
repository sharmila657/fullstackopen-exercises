const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

afterAll(async () => {
  await mongoose.connection.close()
})
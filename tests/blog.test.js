const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
require("dotenv").config();

const token = process.env.TOKEN;
const id = process.env.ID;

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /api/blog", () => {
  it("should return all blogs", async () => {
    const res = await request(app).get("/api/blog");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.blogs.length).toBeGreaterThan(0);
  });
});

describe("POST /api/blog", () => {
  it("should create a new blog post", async () => {
    const res = await request(app)
      .post("/api/blog")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "test title",
        description: "test description",
        createdBy: "test author",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
  });

  it("returns 401 error with invalid auth token", async () => {
    const res = await request(app)
      .post("/api/blog")
      .set("Authorization", "Bearer invalidtoken")
      .send({
        title: "test title",
        description: "test description",
        createdBy: "test author",
      });

    expect(res.statusCode).toEqual(401);
  });
});

describe("PUT /api/blog", () => {
  it("updates a blog with title, description and createdBy", async () => {
    const res = await request(app)
      .put("/api/blog")
      .set("Authorization", `Bearer ${token}`)
      .send({
        id: id,
        title: "Test Blog Title",
        description: "Test Blog Description",
        createdBy: "Test User",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.blog).toHaveProperty("title", "Test Blog Title");
    expect(res.body.blog).toHaveProperty(
      "description",
      "Test Blog Description"
    );
    expect(res.body.blog).toHaveProperty("createdBy", "Test User");
  });

  it("returns 401 error with invalid auth token", async () => {
    const res = await request(app)
      .put("/api/blog")
      .set("Authorization", "Bearer invalidtoken")
      .send({
        id: id,
        title: "Test Blog Title",
        description: "Test Blog Description",
        createdBy: "Test User",
      });

    expect(res.statusCode).toEqual(401);
  });
});

describe("DELETE /api/blog", () => {
  it("should delete a blog post with valid id and auth token", async () => {
    const res = await request(app)
      .delete("/api/blog")
      .set("Authorization", `Bearer ${token}`)
      .send({ id: id });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
  });

  it("returns 401 error with invalid auth token", async () => {
    const res = await request(app)
      .delete("/api/blog")
      .set("Authorization", "Bearer invalidtoken")
      .send({ id: id });

    expect(res.statusCode).toEqual(401);
  });
});

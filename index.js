require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// //my routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

//port
if (!process.env.PORT) {
  throw new Error('Invalid/Missing environment variable: "PORT"');
}
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});

//DB connection
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((e) => {
    console.log("DB Connection Failed " + e);
  });

// //myroutes
app.use("/api", authRoutes);
app.use("/api", blogRoutes);

const express = require("express");
const colors = require("colors");
require("dotenv").config();
const cors = require("cors");
const { blogErrorHandler } = require("./Middleware/blogMiddleware");
const { userErrorHandler } = require("./Middleware/userMiddleware");
const connectDB = require("./Config/db_config");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DataBAse Connecttion

connectDB();

// Root Directory
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Blog application" });
});

// Blog Routes
app.use("/api/blog", require("./Routes/blogRoutes"));
app.use("/api/user", require("./Routes/userRoutes"));
app.use("/api/admin", require("./Routes/adminRoutes"));

// Error Handler
app.use(blogErrorHandler);
app.use(userErrorHandler);

// Port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.white.bgMagenta);
});

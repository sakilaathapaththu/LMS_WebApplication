const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");



const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");


// use middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use('/images', express.static('images'));

// Serve uploaded images statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from the "uploads" folder

// mongodb connection
const con = require("./database/connection.js");

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api/users", require("./routes/userRoutes")); // ✅ REQUIRED

app.use("/api/courses", require("./routes/courseRoutes"));

app.use("/api/enrollments", require("./routes/enrollmentRoutes"));

const quizRoutes = require("./routes/quizRoutes");
app.use("/api/quizzes", quizRoutes);



con
  .then((db) => {
    if (!db) return process.exit(1);

    // listen to the http server
    const server = app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });

    app.on("error", (err) =>
      console.log(`Failed To Connect with HTTP Server : ${err}`)
    );
    // error in mondb connection

   
  })
  .catch((error) => {
    console.log(`Connection Failed...! ${error}`);
  });



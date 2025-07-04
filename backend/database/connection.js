// const mongoose = require("mongoose");

// mongoose.set("strictQuery", false);

// const conn = mongoose
//   .connect(process.env.ATLAS_URI)
//   .then((db) => {
//     console.log("Database Connected");
//     return db;
//   })
//   .catch((err) => {
//     console.log("Connection Error");
//   });

// module.exports = conn;
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const conn = mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "LMS", // ✅ Ensures data goes into LMS DB
  })
  .then((db) => {
    console.log("✅ Database Connected to LMS");
    return db;
  })
  .catch((err) => {
    console.error("❌ Connection Error:", err.message);
  });

module.exports = conn;

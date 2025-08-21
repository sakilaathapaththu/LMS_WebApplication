
// const mongoose = require("mongoose");

// mongoose.set("strictQuery", false);

// const conn = mongoose
//   .connect(process.env.ATLAS_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: "LMS", // ✅ Ensures data goes into LMS DB
//   })
//   .then((db) => {
//     console.log("✅ Database Connected to LMS");
//     return db;
//   })
//   .catch((err) => {
//     console.error("❌ Connection Error:", err.message);
//   });

// database/connection.js
const mongoose = require("mongoose");
const MONGODB_URI = process.env.ATLAS_URI;
if (!MONGODB_URI) throw new Error("Missing ATLAS_URI");

mongoose.set("strictQuery", false);

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: "LMS" }) // no deprecated options
      .then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connect;

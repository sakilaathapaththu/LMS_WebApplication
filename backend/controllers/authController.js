// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { uploadToVercelBlob } = require("../middleware/upload"); 
// const JWT_SECRET = process.env.JWT_SECRET_KEY;

// // Register
// exports.register = async (req, res) => {
//   const { firstName, lastName, email, birthday, nic, username, password, role } = req.body;
//   const profileImage = req.file ? `uploads/${req.file.filename}` : null;


//   try {
//     const existingEmail = await User.findOne({ email });
//     const existingUsername = await User.findOne({ username });

//     if (existingEmail) return res.status(400).json({ message: "Email already registered" });
//     if (existingUsername) return res.status(400).json({ message: "Username already taken" });

//     const user = new User({
//       firstName,
//       lastName,
//       email,
//       birthday,
//       nic,
//       username,
//       password,
//       role,
//       profileImage // ✅ Save image path
//     });

//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Login with single-device session enforcement
// exports.login = async (req, res) => {
//   const { emailOrUsername, password } = req.body;

//   try {
//     const user = await User.findOne({
//       $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
//     });

//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // ✅ Enforce one-device login: store token
//     user.currentToken = token;
//     await user.save();

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         fullName: `${user.firstName} ${user.lastName}`,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         username: user.username,
//         email: user.email,
//         role: user.role,
//         nic: user.nic,
//         birthday: user.birthday,
//         profileImage: user.profileImage
//       }
//     });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadToVercelBlob } = require("../middleware/upload"); // uses memory + Blob
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Register
exports.register = async (req, res) => {
  const { firstName, lastName, email, birthday, nic, username, password, role } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) return res.status(400).json({ message: "Email already registered" });
    if (existingUsername) return res.status(400).json({ message: "Username already taken" });

    // ⬇️ Upload profile image (if any) to Vercel Blob — returns public URL
    const profileImage = req.file
      ? await uploadToVercelBlob(req.file, "profile-images")
      : null;

    const user = new User({
      firstName,
      lastName,
      email,
      birthday,
      nic,
      username,
      password,
      role,
      profileImage, // now stores a public Blob URL
    });

    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Login with single-device session enforcement
exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Enforce one-device login: store the current token on the user
    user.currentToken = token;
    await user.save();

    return res.json({
      token,
      user: {
        id: user._id,
        fullName: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
        nic: user.nic,
        birthday: user.birthday,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

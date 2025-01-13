const { db, admin } = require("../firebaseConfig");
const User = require("../Models/UserModels"); // You'll need to create a User model
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password: hashedPassword, // Use the hashed password
      displayName: username,
    });

    // Save the user to Firestore
    await db.collection("users").doc(userRecord.uid).set({
      email,
      username,
    });
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error signing up user", details: error.message });
  }
};

exports.login = async (req, res) => {
  // Implement login logic here using Firebase Authentication

  const { email, password } = req.body;
  try {
    // Fetch the user from MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate a Firebase Auth token
    const userRecord = await admin.auth().getUserByEmail(email);
    const idToken = await admin.auth().createCustomToken(userRecord.uid); // In a real-world app, you would verify the password and return a Firebase Auth token
    res.status(200).json({ token: idToken });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error logging in user", details: error.message });
  }
};

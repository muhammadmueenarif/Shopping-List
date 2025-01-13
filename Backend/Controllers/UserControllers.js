const { db, admin } = require("../firebaseConfig");
const User = require("../Models/UserModels"); // You'll need to create a User model

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: username,
    });

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
    const userRecord = await admin.auth().getUserByEmail(email);
    const idToken = await admin.auth().createCustomToken(userRecord.uid); // In a real-world app, you would verify the password and return a Firebase Auth token
    res.status(200).json({ token: idToken });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error logging in user", details: error.message });
  }
};

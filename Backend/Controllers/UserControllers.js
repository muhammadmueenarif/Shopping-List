const { db, admin } = require("../firebaseConfig");
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the user already exists in Firestore
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();
    if (!snapshot.empty) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password: password, // Use the original password
      displayName: username,
    });

    // Save the user to Firestore
    await db.collection("users").doc(userRecord.uid).set({
      email,
      username,
      hashedPassword, // Save the hashed password here for login verification
    });
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error signing up user", details: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Fetch the user from Firestore
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();
    if (snapshot.empty) {
      return res.status(404).json({ error: "User not found" });
    }
    const userDoc = snapshot.docs[0];
    const user = userDoc.data(); // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    } // Generate a Firebase Auth token
    const idToken = await admin.auth().createCustomToken(userDoc.id);
    res.status(200).json({ token: idToken });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error logging in user", details: error.message });
  }
};

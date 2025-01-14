const { db, admin } = require("../firebaseConfig");
const multer = require('multer');
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const upload = multer({ dest: 'uploads/' }); // Set the destination for file uploads
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
    const user = userDoc.data(); 

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Return the user's UID
    return res.status(200).json({ userId: userDoc.id });

    // Generate a Firebase Auth token
    const idToken = await admin.auth().createCustomToken(userDoc.id);

    // Return token and userId to the frontend
    return res.status(200).json({ token: idToken, userId: userDoc.id });
  } catch (error) {
    return res.status(500).json({ error: "Error logging in user", details: error.message });
  }
};


//update profile image and about
exports.updateProfile = async (req, res) => { 
  try { 
    const { userId, about } = req.body; 
    const profileImage = req.file ? req.file.path : null; 
    const userRef = db.collection('users').doc(userId); 
    const user = await userRef.get(); 
    if (!user.exists) { 
      return res.status(404).json({ error: "User not found" }); 
    } 
    const updateData = { about }; 
    if (profileImage) { 
      updateData.profileImage = profileImage; 
    } await userRef.update(updateData); 
    res.status(200).json({ message: "Profile updated successfully!" }); 
  } catch (error) { 
    console.error(error); // Log the error for debugging 
    res.status(500).json({ error: "Error updating profile", details: error.message }); 
  } 
};

exports.getProfile = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    
    if (!token) {
      return res.status(400).json({ error: 'Token is missing' });
    }

    const userId = req.headers['user-id'];

    console.log('Token:', token);
    console.log('User  ID:', userId);

    if (!token || !userId) {
      return res.status(400).json({ error: 'Token or User ID is missing' });
    }

    // verify token
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Decoded Token:', decodedToken);

    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    return res.status(200).json(userDoc.data());
  } catch (error) {
    console.error('Error fetching user profile:', error); // Log the error for debugging
    return res.status(500).json({ error: 'Error fetching user profile', details: error.message });
  }
};



exports.validateToken = async (req, res) => {
  const { token } = req.body;
  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.status(200).json({ valid: true, decodedToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid token", details: error.message });
  }
};
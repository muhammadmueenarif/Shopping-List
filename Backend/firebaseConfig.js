const admin = require('firebase-admin');
require('dotenv').config(); // Load environment variables from .env file
// const serviceAccount = require('./shopping-list-app-8d777-firebase-adminsdk-40f7u-0bd49b65f0.json'); // Download this from the Firebase Console

const serviceAccount = { type: "service_account", 
  project_id: process.env.FIREBASE_PROJECT_ID, 
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), 
  client_email: process.env.FIREBASE_CLIENT_EMAIL, 
  // Add other fields if needed 
  };

// Initialize Firebase app and connect to your Firestore database
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: 'https://shopping-list-app-8d777-default-rtdb.firebaseio.com' // Replace with your Firebase database URL
});

const db = admin.firestore();
module.exports = { admin, db };

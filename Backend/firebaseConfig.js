const admin = require('firebase-admin');
require('dotenv').config(); // Load environment variables from .env file

//check service account in firebase console
const serviceAccount = { 
  type: "service_account", 
  project_id: process.env.FIREBASE_PROJECT_ID, 
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), 
  client_email: process.env.FIREBASE_CLIENT_EMAIL, 
  // Add other fields if needed 
  };

// Initialize Firebase app and connect to your Firestore database
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { admin, db };

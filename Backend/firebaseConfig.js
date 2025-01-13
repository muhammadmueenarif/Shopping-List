const admin = require('firebase-admin');
const serviceAccount = require('./shopping-list-app-8d777-firebase-adminsdk-40f7u-f1c00515e0.json'); // Download this from the Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://shopping-list-app-8d777.firebaseio.com' // Replace with your Firebase database URL
});

const db = admin.firestore();
module.exports = { admin, db };

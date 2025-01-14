const admin = require('firebase-admin');
const serviceAccount = require('./shopping-list-app-8d777-firebase-adminsdk-40f7u-0bd49b65f0.json'); // Download this from the Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://shopping-list-app-8d777-default-rtdb.firebaseio.com' // Replace with your Firebase database URL
});

const db = admin.firestore();
module.exports = { admin, db };

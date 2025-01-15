import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Ensure environment variables are being correctly imported
console.log("API Key:", process.env.REACT_APP_API_KEY);
console.log("Auth Domain:", process.env.REACT_APP_AUTH_DOMAIN);
console.log("Project ID:", process.env.REACT_APP_PROJECT_ID);
console.log("Storage Bucket:", process.env.REACT_APP_STORAGE_BUCKET);
console.log("Messaging Sender ID:", process.env.REACT_APP_MESSAGING_SENDER_ID);
console.log("App ID:", process.env.REACT_APP_APP_ID);

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (user) {
      const idToken = await user.getIdToken();
      console.log('ID Token:', idToken);
      return idToken;
    }
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

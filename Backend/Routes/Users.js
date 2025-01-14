const express = require('express');
const multer = require('multer');
const { getProfile, updateProfile } = require('../Controllers/UserControllers');
const router = express.Router();
const userController = require('../Controllers/UserControllers');
const upload = multer({ dest: 'uploads/' }); // Configure multer to handle file uploads
const admin = require('firebase-admin')

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile); // Ensure this route is defined
router.post('/updateProfile', upload.single('profileImage'), updateProfile);
router.post('/generateCustomToken', async (req, res) => {
    try {
      const { userId } = req.body;
      const customToken = await admin.auth().createCustomToken(userId);
      res.status(200).json({ customToken });
    } catch (error) {
      res.status(500).json({ error: "Error generating custom token", details: error.message });
    }
  });
module.exports = router;

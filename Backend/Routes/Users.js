const express = require('express');
const multer = require('multer');
const { getProfile, updateProfile } = require('../Controllers/UserControllers');
const router = express.Router();
const userController = require('../Controllers/UserControllers');
const upload = multer({ dest: 'uploads/' }); // Configure multer to handle file uploads

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/profile', userController.getProfile); // Ensure this route is defined
router.post('/updateProfile', upload.single('profileImage'), updateProfile);

module.exports = router;

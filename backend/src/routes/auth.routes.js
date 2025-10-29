const express = require('express');
const authController = require('../controllers/auth.controller');
const authUserMiddleware = require('../middlewares/userAuthmidddleware')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// ✅ Define the uploads directory
const uploadDir = path.join(__dirname, '..', 'uploads');

// ✅ Automatically create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Setup multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// 🔹 AUTH ROUTES
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/profile', authUserMiddleware.authUserMiddleware, authController.getUserProfile);

// 🔹 IMAGE UPLOAD ROUTE
router.post('/user/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/api/upload/${req.file.filename}`;
    res.status(200).json({ imageUrl });
});

module.exports = router;

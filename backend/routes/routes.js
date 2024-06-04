import express from 'express';
import { createUser, showUsers, updateUser, getUser } from '../controllers/UserController.js';
import { loginUser } from '../controllers/LoginController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
//USERS
router.get('/', showUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.post('/login', loginUser);
router.put('/:id', upload.single('profileImage'), updateUser);

export default router;


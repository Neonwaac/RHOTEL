// CONFIGURACIÓN DE LAS RUTAS PARA LOS USUARIOS Y EL INICIO DE SESIÓN

import express from 'express';
import { createUser, showUsers, updateUser, getUser } from '../controllers/UserController.js';
import { loginUser } from '../controllers/LoginController.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// CONFIGURACIÓN DE MULTER PARA LA CARGA DE ARCHIVOS
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // DIRECTORIO DONDE SE GUARDARÁN LOS ARCHIVOS
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // NOMBRE DEL ARCHIVO CON MARCA DE TIEMPO
    }
});

const upload = multer({ storage: storage });

// RUTAS PARA LOS USUARIOS
router.get('/', showUsers); // OBTENER TODOS LOS USUARIOS EN .../users
router.post('/', createUser); // CREAR UN NUEVO USUARIO EN .../users
router.get('/:id', getUser); // OBTENER UN USUARIO ESPECÍFICO POR ID EN .../users/:id
router.post('/login', loginUser); // INICIAR SESIÓN EN .../users/login
router.put('/:id', upload.single('profileImage'), updateUser); // ACTUALIZAR UN USUARIO ESPECÍFICO POR ID EN .../users/:id

export default router; // EXPORTA EL ENRUTADOR PARA SU USO EN OTROS ARCHIVOS



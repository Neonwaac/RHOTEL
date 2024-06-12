// CONFIGURACIÓN DEL SERVIDOR PRINCIPAL

import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import path from 'path';
import userRoutes from './routes/routes.js';
import roomRoutes from './routes/roomroutes.js';
import bookingRouter from "./routes/bookingroutes.js";
import fs from 'fs';
import { fileURLToPath } from 'url';

// DETERMINA __dirname EN EL ÁMBITO DEL MÓDULO ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ASEGURA QUE EL DIRECTORIO 'uploads' EXISTA
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const app = express();

app.use(cors()); // HABILITA CORS PARA TODAS LAS RUTAS
app.use(express.json()); // HABILITA EL PARSEO DE JSON EN EL CUERPO DE LAS SOLICITUDES
app.use('/uploads', express.static('uploads')); // HABILITA LA SERVIDUMBRE DE ARCHIVOS ESTÁTICOS EN EL DIRECTORIO 'uploads'

// CONFIGURACIÓN DE RUTAS
app.use('/users', userRoutes); // RUTAS PARA LOS USUARIOS
app.use('/rooms', roomRoutes); // RUTAS PARA LAS HABITACIONES
app.use('/bookings', bookingRouter); // RUTAS PARA LAS RESERVAS

try {
    await db.authenticate(); // AUTENTICA LA CONEXIÓN A LA BASE DE DATOS
    console.log('Conexión exitosa a la DB');
} catch (error) {
    console.log(`El error de conexión es: ${error}`);
}

app.listen(8000, () => {
    console.log('Server up running in port 8000');
});
// CONFIGURACIÓN DE LAS RUTAS PARA LAS HABITACIONES

import express from 'express';
import { getAllRooms, getRoom } from '../controllers/RoomController.js';

const roomRouter = express.Router();

// RUTA PARA OBTENER TODAS LAS HABITACIONES EN .../rooms
roomRouter.get('/', getAllRooms);

// RUTA PARA OBTENER UNA HABITACIÓN ESPECÍFICA POR ID EN .../rooms/:id
roomRouter.get('/:id', getRoom);

export default roomRouter; // EXPORTA EL ENRUTADOR PARA SU USO EN OTROS ARCHIVOS

// CONFIGURACIÓN DE LAS RUTAS PARA LAS RESERVAS

import express from 'express';
import { getAllBookings, getBooking, createBooking, deleteBooking } from '../controllers/BookingController.js';

const bookingRouter = express.Router();

// RUTA PARA OBTENER TODAS LAS RESERVAS EN .../bookings
bookingRouter.get('/', getAllBookings);

// RUTA PARA OBTENER UNA RESERVA ESPECÍFICA POR ID EN .../bookings/:id
bookingRouter.get('/:id', getBooking);

// RUTA PARA CREAR UNA NUEVA RESERVA EN .../bookings
bookingRouter.post('/', createBooking);

// RUTA PARA ELIMINAR UNA RESERVA POR ID EN .../bookings/:bookings_id
bookingRouter.delete('/:bookings_id', deleteBooking); // ASEGURARSE DE QUE UTILIZA bookings_id

export default bookingRouter; // EXPORTA EL ENRUTADOR PARA SU USO EN OTROS ARCHIVOS

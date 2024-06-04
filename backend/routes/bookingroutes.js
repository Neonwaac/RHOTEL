import express from 'express';
import { getAllBookings, getBooking, createBooking, deleteBooking } from '../controllers/BookingController.js';

const bookingRouter = express.Router();
bookingRouter.get('/', getAllBookings);
bookingRouter.get('/:id', getBooking);
bookingRouter.post('/', createBooking);
bookingRouter.delete('/:bookings_id', deleteBooking); // Asegurarse de que utiliza bookings_id

export default bookingRouter;

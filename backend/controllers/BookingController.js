// CONTROLADOR PARA LAS RESERVAS
import BookingsModel from "../models/BookingModel.js";
import RoomsModel from "../models/RoomModel.js";
// OBTENER TODAS LAS RESERVAS EN .../bookings - FORMATO JSON
export const getAllBookings = async (req, res) => {
    const userId = req.query.userId;
    try {
        const bookings = await BookingsModel.findAll({
            where: { bookings_userid: userId },
            include: [{
                model: RoomsModel,
                attributes: ['rooms_title', 'rooms_description', 'rooms_photo']
            }]
        });
        res.json(bookings);
    } catch (error) {
        res.json({ message: error.message });
    }
};
// OBTENER UNA RESERVA EN ESPECIFICO POR ID EN .../bookings/:id - FORMATO JSON
export const getBooking = async (req, res) => {
    try {
        const booking = await BookingsModel.findOne({
            where: { bookings_id: req.params.id, bookings_userid: req.query.userId },
            include: [{
                model: RoomsModel,
                attributes: ['rooms_title', 'rooms_description', 'rooms_photo']
            }]
        });
        res.json(booking);
    } catch (error) {
        res.json({ message: error.message });
    }
};
// CREAR UNA NUEVA RESERVA EN .../bookings - FORMATO JSON
export const createBooking = async (req, res) => {
    try {
       await BookingsModel.create(req.body);
       res.json({
           "message": "¡Registro creado correctamente!"
       });
    } catch (error) {
        res.json({ message: error.message });
    }
};
// ELIMINAR UNA RE SERVA DE .../bookings/:id - FORMATO JSON
export const deleteBooking = async (req, res) => {
    try {
        await BookingsModel.destroy({ 
            where: { bookings_id: req.params.bookings_id, bookings_userid: req.query.userId }
        });
        res.json({
            "message": "¡Registro eliminado correctamente!"
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};
// CONTROLADOR PARA LAS HABITACIONES

import RoomsModel from "../models/RoomModel.js";

// OBTENER TODAS LAS HABITACIONES EN .../rooms - FORMATO JSON
export const getAllRooms = async (req, res) => {
    try {
        // OBTIENE TODAS LAS HABITACIONES DE LA BASE DE DATOS
        const rooms = await RoomsModel.findAll();
        // RESPONDE CON LA LISTA DE HABITACIONES EN FORMATO JSON
        res.json(rooms);
    } catch (error) {
        // SI OCURRE UN ERROR, RESPONDE CON EL MENSAJE DE ERROR
        res.json({ message: error.message });
    }
}

// OBTENER UNA HABITACIÓN ESPECÍFICA POR ID EN .../rooms/:id - FORMATO JSON
export const getRoom = async (req, res) => {
    try {
        // OBTIENE UNA HABITACIÓN ESPECÍFICA DE LA BASE DE DATOS SEGÚN EL ID PROPORCIONADO
        const room = await RoomsModel.findAll({
            where: { id: req.params.id }
        });
        // RESPONDE CON LOS DATOS DE LA HABITACIÓN ENCONTRADA
        res.json(room[0]);
    } catch (error) {
        // SI OCURRE UN ERROR, RESPONDE CON EL MENSAJE DE ERROR
        res.json({ message: error.message });
    }
}
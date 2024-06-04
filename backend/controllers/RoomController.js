import RoomsModel from "../models/RoomModel.js";
export const getAllRooms = async (req, res) => {
    try {
        const rooms = await RoomsModel.findAll()
        res.json(rooms)
    } catch (error) {
        res.json( {message: error.message} )
    }
}
export const getRoom = async (req, res) => {
    try {
        const room = await RoomsModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(room[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}
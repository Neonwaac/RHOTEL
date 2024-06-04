import express from 'express';
import { getAllRooms, getRoom } from '../controllers/RoomController.js';

const roomRouter = express.Router();
roomRouter.get('/', getAllRooms);
roomRouter.get('/:id', getRoom);

export default roomRouter
// MODELO PARA LAS RESERVAS EN LA BASE DE DATOS

import db from "../database/db.js";
import { DataTypes } from "sequelize";
import RoomsModel from "./RoomModel.js";

// DEFINE EL MODELO 'BookingsModel' PARA REPRESENTAR LAS RESERVAS EN LA BASE DE DATOS
const BookingsModel = db.define('bookings', {
    bookings_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    bookings_amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    bookings_nights: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookings_roomid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RoomsModel,
            key: 'rooms_id'
        }
    },
    bookings_userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookings_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false, // DESACTIVA LOS TIMESTAMPS AUTOMÁTICOS
    freezeTableName: true // PREVIENE LA MODIFICACIÓN DEL NOMBRE DE LA TABLA
});

// ESTABLECE LA RELACIÓN ENTRE LAS RESERVAS Y LAS HABITACIONES
RoomsModel.hasMany(BookingsModel, { foreignKey: 'bookings_roomid' });
BookingsModel.belongsTo(RoomsModel, { foreignKey: 'bookings_roomid' });

export default BookingsModel; // EXPORTA EL MODELO PARA SU USO EN OTROS ARCHIVOS


// MODELO PARA LAS HABITACIONES EN LA BASE DE DATOS

import db from "../database/db.js";
import { DataTypes } from "sequelize";

// DEFINE EL MODELO 'RoomsModel' PARA REPRESENTAR LAS HABITACIONES EN LA BASE DE DATOS
const RoomsModel = db.define('rooms', {
    rooms_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    rooms_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rooms_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rooms_price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    rooms_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rooms_photo: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false, // DESACTIVA LOS TIMESTAMPS AUTOMÁTICOS
    freezeTableName: true // PREVIENE LA MODIFICACIÓN DEL NOMBRE DE LA TABLA
});

export default RoomsModel; // EXPORTA EL MODELO PARA SU USO EN OTROS ARCHIVOS


// RoomModel.js
import db from "../database/db.js";
import { DataTypes } from "sequelize";

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
    timestamps: false,
    freezeTableName: true
});

export default RoomsModel;

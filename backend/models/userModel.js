// MODELO PARA LOS USUARIOS EN LA BASE DE DATOS

import db from "../database/db.js";
import { DataTypes } from "sequelize";

// DEFINE EL MODELO 'UserModel' PARA REPRESENTAR LOS USUARIOS EN LA BASE DE DATOS
const UserModel = db.define('users', {
    users_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    users_username: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    users_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    users_lastname: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    users_email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    users_birthdate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    users_password: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    users_status: {
        type: DataTypes.INTEGER,
    },
    users_rol: {
        type: DataTypes.INTEGER,
    },
    users_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    users_profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '/uploads/profile.png'
    }
}, {
    timestamps: false, // DESACTIVA LOS TIMESTAMPS AUTOMÁTICOS
    freezeTableName: true // PREVIENE LA MODIFICACIÓN DEL NOMBRE DE LA TABLA
});

export default UserModel; // EXPORTA EL MODELO PARA SU USO EN OTROS ARCHIVOS

//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const BlogModel = db.define('users', {
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
      allowNull: false,
      unique: true
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
   }
}, {
   timestamps: false,
   freezeTableName: true,
   hasPrimaryKeys: true // Agrega esta línea para evitar la creación automática de 'id'
});

 export default BlogModel
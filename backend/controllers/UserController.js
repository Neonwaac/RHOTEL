// UserController.js
import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

// Función para mostrar usuarios
export const showUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const createUser = async (req, res) => {

    const { users_password, ...otherFields } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(users_password, 10);


        await UserModel.create({
            ...otherFields,
            users_password: hashedPassword
        });


        res.json({
            message: "¡Registro creado correctamente!"
        });
    } catch (error) {

        res.json({ message: error.message });
    }
};
export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findAll({
            where:{ users_id:req.params.id }
        })
        res.json(user[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}
export const updateUser = async (req, res) => {
    try {
        await UserModel.update(req.body, {
            where: { users_id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
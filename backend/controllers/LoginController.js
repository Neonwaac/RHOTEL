import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({
            where: { users_username: username }
        });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.users_password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ id: user.users_id, username: user.users_username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: "Inicio de sesión exitoso", token, username: user.users_username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


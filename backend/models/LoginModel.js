// CONTROLADOR PARA EL INICIO DE SESIÓN DE USUARIOS

import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

// FUNCIÓN PARA INICIAR SESIÓN EN .../login - FORMATO JSON
export const loginUser = async (req, res) => {
    const { username, password } = req.body; // EXTRAE NOMBRE DE USUARIO Y CONTRASEÑA DEL CUERPO DE LA SOLICITUD

    try {
        // BUSCA UN USUARIO EN LA BASE DE DATOS QUE COINCIDA CON EL NOMBRE DE USUARIO PROPORCIONADO
        const user = await UserModel.findOne({
            where: { users_username: username }
        });

        // SI NO SE ENCUENTRA EL USUARIO, RESPONDE CON UN ESTADO 404
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // COMPARA LA CONTRASEÑA PROPORCIONADA CON LA ALMACENADA EN LA BASE DE DATOS
        const isPasswordValid = await bcrypt.compare(password, user.users_password);

        // SI LA CONTRASEÑA NO ES VÁLIDA, RESPONDE CON UN ESTADO 401
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // SI LA AUTENTICACIÓN ES EXITOSA, RESPONDE CON UN MENSAJE DE ÉXITO
        res.json({ message: "Inicio de sesión exitoso" });
    } catch (error) {
        // SI OCURRE UN ERROR DURANTE EL PROCESO, RESPONDE CON UN ESTADO 500 Y EL MENSAJE DE ERROR
        res.status(500).json({ message: error.message });
    }
};

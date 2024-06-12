// CONTROLADOR PARA EL MOMENTO DEL LOGIN DE LOS USUARIOS
import UserModel from "../models/userModel.js";
// BCRYPT PARA TRANSFORMAR LA CONTRASEÑA A UNA MÁS SEGURA (QUE NO SE PUEDA VER EN LA BASE DE DATOS)
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

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

        // CREA UN TOKEN JWT CON EL ID Y NOMBRE DE USUARIO DEL USUARIO, Y LA CLAVE SECRETA, EXPIRANDO EN 2 HORAS
        const token = jwt.sign({ id: user.users_id, username: user.users_username }, SECRET_KEY, { expiresIn: '2h' });

        // DEFINE LA IMAGEN DE PERFIL DEL USUARIO. SI NO TIENE, USA UNA IMAGEN PREDETERMINADA.
        const profileImage = user.users_profile_image ? `http://localhost:8000${user.users_profile_image}` : 'http://localhost:8000/uploads/profile.png';

        // RESPONDE CON UN MENSAJE DE ÉXITO, EL TOKEN JWT, EL NOMBRE DE USUARIO, ID Y LA IMAGEN DE PERFIL
        res.json({
            message: "Inicio de sesión exitoso",
            token,
            username: user.users_username,
            id: user.users_id,
            profileImage
        });
    } catch (error) {
        // SI OCURRE UN ERROR DURANTE EL PROCESO, RESPONDE CON UN ESTADO 500 Y EL MENSAJE DE ERROR
        res.status(500).json({ message: error.message });
    }
};
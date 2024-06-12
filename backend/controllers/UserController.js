// CONTROLADOR PARA USUARIOS

import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// DETERMINA __dirname EN EL ÁMBITO DEL MÓDULO ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// OBTENER TODOS LOS USUARIOS EN .../users - FORMATO JSON
export const showUsers = async (req, res) => {
  try {
    // OBTIENE TODOS LOS USUARIOS DE LA BASE DE DATOS
    const users = await UserModel.findAll();
    // RESPONDE CON LA LISTA DE USUARIOS EN FORMATO JSON
    res.json(users);
  } catch (error) {
    // SI OCURRE UN ERROR, RESPONDE CON EL MENSAJE DE ERROR
    res.json({ message: error.message });
  }
};

// CREAR UN NUEVO USUARIO EN .../users - FORMATO JSON
export const createUser = async (req, res) => {
  const { users_password, ...otherFields } = req.body; // EXTRAE LA CONTRASEÑA Y OTROS CAMPOS DEL CUERPO DE LA SOLICITUD
  try {
    // ENCRIPTA LA CONTRASEÑA DEL USUARIO USANDO bcrypt
    const hashedPassword = await bcrypt.hash(users_password, 10);
    // CREA UN NUEVO USUARIO EN LA BASE DE DATOS CON LA CONTRASEÑA ENCRIPTADA
    await UserModel.create({
      ...otherFields,
      users_password: hashedPassword
    });
    // RESPONDE CON UN MENSAJE DE ÉXITO
    res.json({
      message: "¡Registro creado correctamente!"
    });
  } catch (error) {
    // SI OCURRE UN ERROR, RESPONDE CON EL MENSAJE DE ERROR
    res.json({ message: error.message });
  }
};

// OBTENER UN USUARIO ESPECÍFICO POR ID EN .../users/:id - FORMATO JSON
export const getUser = async (req, res) => {
  try {
    // OBTIENE UN USUARIO ESPECÍFICO DE LA BASE DE DATOS SEGÚN EL ID PROPORCIONADO
    const user = await UserModel.findAll({
      where: { users_id: req.params.id }
    });
    // RESPONDE CON LOS DATOS DEL USUARIO ENCONTRADO
    res.json(user[0]);
  } catch (error) {
    // SI OCURRE UN ERROR, RESPONDE CON EL MENSAJE DE ERROR
    res.json({ message: error.message });
  }
};

// ACTUALIZAR UN USUARIO ESPECÍFICO POR ID EN .../users/:id - FORMATO JSON
export const updateUser = async (req, res) => {
  try {
    const { users_name, users_lastname, users_email, users_birthdate, users_username } = req.body; // EXTRAE LOS CAMPOS DEL CUERPO DE LA SOLICITUD
    const user = await UserModel.findByPk(req.params.id); // BUSCA EL USUARIO POR ID EN LA BASE DE DATOS

    if (!user) { // SI NO SE ENCUENTRA EL USUARIO, RESPONDE CON UN ESTADO 404
      return res.status(404).json({ message: 'User not found' });
    }

    // ACTUALIZA LOS CAMPOS DEL USUARIO CON LOS NUEVOS DATOS PROPORCIONADOS
    user.users_name = users_name;
    user.users_lastname = users_lastname;
    user.users_email = users_email;
    user.users_birthdate = users_birthdate;
    user.users_username = users_username;

    if (req.file) { // SI SE PROPORCIONA UNA NUEVA IMAGEN DE PERFIL
      const profileImagePath = `/uploads/${req.file.filename}`; // DEFINE LA RUTA DE LA NUEVA IMAGEN DE PERFIL
      if (user.users_profile_image && user.users_profile_image !== 'uploads/profile.png') {
        const oldImagePath = path.join(__dirname, user.users_profile_image); // DEFINE LA RUTA DE LA IMAGEN DE PERFIL ANTERIOR
        if (fs.existsSync(oldImagePath)) { // SI EXISTE LA IMAGEN DE PERFIL ANTERIOR, LA ELIMINA
          fs.unlinkSync(oldImagePath);
        }
      }
      user.users_profile_image = profileImagePath; // ACTUALIZA LA IMAGEN DE PERFIL DEL USUARIO
    }

    await user.save(); // GUARDA LOS CAMBIOS EN LA BASE DE DATOS
    // RESPONDE CON UN MENSAJE DE ÉXITO Y LA NUEVA IMAGEN DE PERFIL
    res.json({
      message: '¡Registro actualizado correctamente!',
      profileImage: user.users_profile_image
    });
  } catch (error) {
    // SI OCURRE UN ERROR, RESPONDE CON EL MENSAJE DE ERROR
    res.json({ message: error.message });
  }
};
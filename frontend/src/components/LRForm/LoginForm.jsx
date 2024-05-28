import React, { useState } from 'react';
import './LRForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import companyLogo from '../assets/logo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const URI = "http://localhost:8000/login";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envía la solicitud de inicio de sesión al backend
            const response = await axios.post(URI, { username, password });
            alert(response.data.message); // Muestra el mensaje de éxito del backend
            navigate('/'); // Redirige a la página principal u otra página después de iniciar sesión
        } catch (error) {
            alert(error.response ? error.response.data.message : 'Error de servidor');
        }
    };

    return (
        <div className='wrapper'>
            <div className='logo-container'>
                <img src={companyLogo} className='logo' alt='Logo'/>
            </div>
            <form onSubmit={handleSubmit}>
                <h1>Inicia Sesion</h1>
                <div className='input-box'>
                    <input
                        type='text'
                        placeholder='Nombre de usuario'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input
                        type='password'
                        placeholder='Contraseña'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className='icon'/>
                </div>
                <button type='submit'>Iniciar Sesion</button>
                <div className='register-link'>
                    <p>No tienes una cuenta? <Link to='/register'>Registrate</Link></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;

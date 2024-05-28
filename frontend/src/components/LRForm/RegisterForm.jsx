import React from 'react';
import './LRForm.css';
import { FaUser, FaLock, FaMailBulk, FaAddressCard, FaRegCalendar } from "react-icons/fa";
import companyLogo from '../assets/logo.png';
import axios from 'axios';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const URI = 'http://localhost:8000/blogs/';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    // Procedimiento para guardar
    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, { 
            users_name: name, 
            users_lastname: lastName, 
            users_email: email, 
            users_birthdate: birthdate, 
            users_password: password, 
            users_username: username
        });
        navigate('/');
    };

    return (
        <div className='wrapper'>
            <div className = "logo-container"><img src = {companyLogo} className = "logo"></img></div>
            <form onSubmit={store}>
                <h1>Registrate</h1>
                <div className='input-box'>
                    <input 
                        type='text' 
                        placeholder='Nombre de usuario' 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <FaUser className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type='text' 
                        placeholder='Nombres' 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <FaAddressCard className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type='text' 
                        placeholder='Apellidos' 
                        required 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                    <FaAddressCard className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type='text' 
                        placeholder='Email' 
                        required 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <FaMailBulk className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type='date' 
                        required 
                        value={birthdate} 
                        onChange={(e) => setBirthDate(e.target.value)} 
                    />
                    <FaRegCalendar className='icon' />
                </div>
                <div className='input-box'>
                    <input 
                        type='password' 
                        placeholder='Contraseña' 
                        required 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <FaLock className='icon' />
                </div>
                <button type="submit">Registrarse</button>
                <div className="register-link">
                    <p>Ya tienes una cuenta? <Link to ="/login">Inicia sesión</Link></p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;

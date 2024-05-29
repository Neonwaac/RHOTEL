import React, { useState, useEffect } from 'react';
import './EditForm.css';
import { FaUser, FaLock, FaMailBulk, FaAddressCard, FaRegCalendar } from "react-icons/fa";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const URI = 'http://localhost:8000/users/';

const EditForm = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // Procedimiento para guardar
    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URI}${id}`, {
                users_name: name,
                users_lastname: lastName,
                users_email: email,
                users_birthdate: birthdate,
                users_password: password,
                users_username: username
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        try {
            const response = await axios.get(`${URI}${id}`);
            const userData = response.data;
            setUsername(userData.users_username);
            setName(userData.users_name);
            setLastName(userData.users_lastname);
            setEmail(userData.users_email);
            setBirthDate(userData.users_birthdate);
            setPassword(userData.users_password);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={update}>
                <h1>Edita tu Perfil</h1>
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
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default EditForm;
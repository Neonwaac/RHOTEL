import React, { useState, useEffect } from 'react';
import './EditForm.css';
import { FaUser, FaMailBulk, FaAddressCard, FaRegCalendar } from "react-icons/fa";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const URI = 'http://localhost:8000/users/';

const EditForm = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthDate] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [isEditing, setIsEditing] = useState({
        username: false,
        name: false,
        lastName: false,
        email: false,
        birthdate: false
    });

    const navigate = useNavigate();
    const { id } = useParams();

    // update: Maneja la actualización de los datos del perfil del usuario
    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('users_name', name);
        formData.append('users_lastname', lastName);
        formData.append('users_email', email);
        formData.append('users_birthdate', birthdate);
        formData.append('users_username', username);
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }

        try {
            await axios.put(`${URI}${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                icon: 'success',
                title: '¡Actualización exitosa!',
                text: 'Tu perfil ha sido actualizado correctamente.',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/');
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.message : 'Error de servidor',
                confirmButtonText: 'OK'
            });
        }
    };

    // useEffect: Obtiene los datos del usuario por ID cuando se carga el componente
    useEffect(() => {
        getUserById();
    }, []);

    // getUserById: Obtiene los datos del usuario por su ID desde el servidor
    const getUserById = async () => {
        try {
            const response = await axios.get(`${URI}${id}`);
            const userData = response.data;
            setUsername(userData.users_username);
            setName(userData.users_name);
            setLastName(userData.users_lastname);
            setEmail(userData.users_email);
            setBirthDate(userData.users_birthdate);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error fetching user data',
                confirmButtonText: 'OK'
            });
        }
    };

    // toggleEdit: Permite alternar entre el modo de edición y vista de los campos del formulario
    const toggleEdit = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    // Renderiza el formulario de edición del perfil del usuario
    return (
        <div className='wrapper-edit'>
            <form onSubmit={update} encType="multipart/form-data">
                <h1>Edita tu Perfil</h1>
                <p>Cambia tu foto</p>
                <div className='custom-input-file'>
                    <input
                        className="input-file"
                        type='file'
                        onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                </div>
                <p>Username</p>
                <div className='input-edit'>
                    <FaUser className='icon' />
                    <input
                        type='text'
                        placeholder='Nombre de usuario'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={!isEditing.username}
                    />
                    <button className="confirm" type="button" onClick={() => toggleEdit('username')}>
                        {isEditing.username ? 'Guardar' : 'Editar'}
                    </button>
                </div>
                <p>Nombres</p>
                <div className='input-edit'>
                    <FaAddressCard className='icon' />
                    <input
                        type='text'
                        placeholder='Nombres'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={!isEditing.name}
                    />
                    <button className="confirm" type="button" onClick={() => toggleEdit('name')}>
                        {isEditing.name ? 'Guardar' : 'Editar'}
                    </button>
                </div>
                <p>Apellidos</p>
                <div className='input-edit'>
                    <FaAddressCard className='icon' />
                    <input
                        type='text'
                        placeholder='Apellidos'
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!isEditing.lastName}
                    />
                    <button className="confirm" type="button" onClick={() => toggleEdit('lastName')}>
                        {isEditing.lastName ? 'Guardar' : 'Editar'}
                    </button>
                </div>
                <p>Correo</p>
                <div className='input-edit'>
                    <FaMailBulk className='icon' />
                    <input
                        type='text'
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!isEditing.email}
                    />
                    <button className="confirm" type="button" onClick={() => toggleEdit('email')}>
                        {isEditing.email ? 'Guardar' : 'Editar'}
                    </button>
                </div>
                <p>Fecha de Nacimiento</p>
                <div className='input-edit'>
                    <FaRegCalendar className='icon' />
                    <input
                        type='date'
                        required
                        value={birthdate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        disabled={!isEditing.birthdate}
                    />
                    <button className="confirm" type="button" onClick={() => toggleEdit('birthdate')}>
                        {isEditing.birthdate ? 'Guardar' : 'Editar'}
                    </button>
                </div>
                <button className="update" type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default EditForm;
import React, { useEffect, useState } from 'react';
import companyLogo from '../assets/logo.png';
import './mainPage.css';
import { Link, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null); // Aquí agregamos userId
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername !== null) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId'); // Aquí limpiamos userId al cerrar sesión
    setIsLoggedIn(false);
    setUsername('');
    setUserId(null);
    navigate('/login');
  };

  return (
    <div>
      <div className="white-top-bar">
        <div className="logo2-container"><img src={companyLogo} className="logo2" alt="Logo" /></div>
        <div className="login">
          {isLoggedIn ? (
            <div>
              <p>Bienvenido, {username}</p>
              <button className="cerrar-sesion" onClick={handleLogout}>Cerrar Sesión</button>
              <Link to={`/edit/${userId}`}>Editar Perfil</Link>
            </div>
          ) : (
            <p><Link to='/login'>Iniciar Sesión</Link></p>
          )}
        </div>
      </div>
      <div className="container">
      </div>
    </div>
  );
}

export default MainPage;

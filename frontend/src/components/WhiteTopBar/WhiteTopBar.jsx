import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import companyLogo from '../assets/logo.png';
import { FaChevronDown } from 'react-icons/fa';

const WhiteTopBar = ({ isLoggedIn, username, profileImage, userId, onLogout, showBookingsButton }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="white-top-bar">
      <div className="logo2-container">
        <img src={companyLogo} className="logo2" alt="Logo" />
      </div>
      <div className="login">
        {isLoggedIn ? (
          <div className="user-menu">
            <div className="user-info" onClick={toggleMenu}>
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              )}
              <p>{username.toUpperCase()}</p>
              <FaChevronDown className="chevron-icon" />
            </div>
            {menuOpen && (
              <div className="dropdown-menu">
                <button className="cerrar-sesion" onClick={onLogout}>
                  Cerrar Sesión
                </button>
                {showBookingsButton && (
                  <Link to="/bookings">
                    <button className="ver-reservas">Ver Reservas</button>
                  </Link>
                )}
                <Link to={`/edit/${userId}`}>
                  <button className="cerrar-sesion">Editar Perfil</button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p>
            <Link to="/login">Iniciar Sesión</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default WhiteTopBar;
// MainPage.js
import React from 'react';
import companyLogo from '../assets/logo.png';
import './mainPage.css';
import {Link} from 'react-router-dom'

const MainPage = () => {
  return (
    <div>
      <div className="white-top-bar">
       <div className = "logo2-container"><img src = {companyLogo} className = "logo2"></img></div>
       <div className = "login"><p><Link to = './login'>Iniciar Sesion</Link></p></div>
      </div>
      <div className="container">
      </div>
    </div>
  );
}

export default MainPage;


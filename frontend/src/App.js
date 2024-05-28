import React from 'react';
import LoginForm from './components/LRForm/LoginForm';
import RegisterForm from './components/LRForm/RegisterForm';
import MainPage from './components/mainPage/mainPage.jsx'; // Importa usando PascalCase
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

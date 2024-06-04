import React from 'react';
import LoginForm from './components/LRForm/LoginForm';
import RegisterForm from './components/LRForm/RegisterForm';
import MainPage from './components/mainPage/mainPage.jsx';
import EditForm from './components/EditForm/EditForm.jsx';
import BookingsPage from './components/BookingsPage/BookingsPage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/register' element={<RegisterForm />}/>
          <Route path='/login' element={<LoginForm />}/>
          <Route path="/edit/:id" element={<EditForm />}/>
          <Route path="/bookings" element={<BookingsPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

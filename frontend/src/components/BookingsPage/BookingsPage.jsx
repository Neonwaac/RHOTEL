import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import WhiteTopBar from '../WhiteTopBar/WhiteTopBar';

const BookingsPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState(null);
    const [profileImage, setProfileImage] = useState("");
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    // useEffect: Maneja la carga inicial de datos del usuario y sus reservas
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        const storedUserId = localStorage.getItem('userId');
        const storedProfileImage = localStorage.getItem('profileImage');

        // Verifica si el usuario está autenticado
        if (!token || !storedUserId) {
            navigate('/login');
            return;
        }

        // Si el usuario está autenticado, carga los datos del usuario
        if (token && storedUsername && storedUserId && storedProfileImage) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            setUserId(storedUserId);
            setProfileImage(storedProfileImage);
        }

        // Fetch: Obtiene las reservas del usuario desde el servidor
        fetch(`http://localhost:8000/bookings?userId=${storedUserId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Bookings data:', data);
                setBookings(data);
            })
            .catch((error) => console.error('Error fetching bookings:', error));
    }, [navigate]);

    // handleLogout: Maneja el cierre de sesión del usuario
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("profileImage");
        setIsLoggedIn(false);
        setUsername("");
        setProfileImage("");
        navigate("/login");
    };

    // deleteBooking: Maneja la eliminación de una reserva
    const deleteBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8000/bookings/${bookingId}?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            Swal.fire({
                icon: 'success',
                title: '¡Reserva eliminada!',
                text: 'Tu reserva ha sido eliminada correctamente.',
                confirmButtonText: 'OK'
            });
            setBookings((prevBookings) => prevBookings.filter(booking => booking.bookings_id !== bookingId));
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar la reserva. Inténtalo de nuevo más tarde.',
                confirmButtonText: 'OK'
            });
            console.error('Error deleting booking:', error);
        }
    };

    // Renderiza la página de reservas, mostrando las reservas del usuario y opciones para gestionar las reservas
    return (
        <div>
            <WhiteTopBar
                isLoggedIn={isLoggedIn}
                username={username}
                profileImage={profileImage}
                userId={userId}
                onLogout={handleLogout}
                showBookingsButton={false}
            />
            <div className="container">
                <div className="titulo">
                    <p>Mis Reservas</p>
                </div>
                <div className="rooms-body">
                    {bookings.length > 0 ? (
                        bookings.map((booking) => (
                            <div key={booking.bookings_id} className="room-container">
                                <p>ID RESERVA: {booking.bookings_id}</p>
                                <p className="rooms_title">{booking.room ? booking.room.rooms_title : 'Sin título'}</p>
                                {booking.room && booking.room.rooms_photo && (
                                    <img
                                        src={`http://localhost:8000${booking.room.rooms_photo}`}
                                        alt="Room"
                                        className="room-image"
                                    />
                                )}
                                <p>{booking.bookings_nights} NOCHES</p>
                                <p>TOTAL A PAGAR: {booking.bookings_amount}$</p>
                                <p>RESERVADO EL: {new Date(booking.bookings_date).toLocaleDateString()}</p>
                                <button className="reservar-button" onClick={() => deleteBooking(booking.bookings_id)}>Eliminar</button>
                            </div>
                        ))
                    ) : (
                        <p>No tienes reservas.</p>
                    )}
                    <button className="reservar-button" onClick={() => navigate('/')}>Regresar a la Página Principal</button>
                </div>
            </div>
        </div>
    );
};

export default BookingsPage;


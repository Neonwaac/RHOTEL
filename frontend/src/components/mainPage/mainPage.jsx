import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./mainPage.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import WhiteTopBar from "../WhiteTopBar/WhiteTopBar";

const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [nights, setNights] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // useEffect: Carga datos del usuario y verifica la autenticación
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (token && storedUsername && storedUserId && storedProfileImage) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserId(storedUserId);
      setProfileImage(storedProfileImage);
    }
  }, []);

  // useEffect: Carga la lista de habitaciones disponibles
  useEffect(() => {
    fetch("http://localhost:8000/rooms")
      .then((response) => response.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  }, []);

  // handleLogout: Maneja el cierre de sesión del usuario
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("profileImage");
    setIsLoggedIn(false);
    setUsername("");
    setUserId(null);
    setProfileImage("");
    navigate("/login");
  };

  // openModal: Abre el modal para realizar una reserva
  const openModal = (room) => {
    setSelectedRoom(room);
    setModalIsOpen(true);
  };

  // closeModal: Cierra el modal de reserva
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRoom(null);
  };

  // handleSubmit: Maneja el envío del formulario de reserva
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch('http://localhost:8000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bookings_amount: nights * selectedRoom.rooms_price,
          bookings_nights: nights,
          bookings_roomid: selectedRoom.rooms_id,
          bookings_userid: userId,
          bookings_roomtitle: selectedRoom.rooms_title
        })
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Reserva exitosa!',
          text: 'Tu reserva ha sido creada correctamente.',
          confirmButtonText: 'OK'
        });
        closeModal();
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'Error creando la reserva. Inténtalo de nuevo.',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error creando la reserva. Inténtalo de nuevo.',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  // Renderiza la página principal con las habitaciones disponibles y el modal de reservas
  return (
    <div>
      <WhiteTopBar
        isLoggedIn={isLoggedIn}
        username={username}
        profileImage={profileImage}
        userId={userId}
        onLogout={handleLogout}
        showBookingsButton={true}
      />
      <div className="container">
        <div className="titulo">
          <p>Habitaciones Disponibles</p>
        </div>
        <div className="rooms-body">
          {rooms.map((room) => (
            <div key={room.rooms_id} className="room-container">
              <img
                src={`http://localhost:8000${room.rooms_photo}`}
                alt="Room"
                className="room-image"
              />
              <p className="rooms_title">{room.rooms_title}</p>
              <p>{room.rooms_description}</p>
              <p>Capacidad para: {room.rooms_capacity} personas</p>
              <p className="rooms_price">Desde {room.rooms_price}$ por noche</p>
              <button className="reservar-button" onClick={() => openModal(room)}>
                Reservar
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Reservation Form"
        ariaHideApp={false}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <form className="wrapper-booking" onSubmit={handleSubmit}>
          <h2>Reservar Habitación</h2>
          <label>
            Noches:
            <div className="input-box">
              <input
                type="number"
                value={nights}
                onChange={(e) => setNights(e.target.value)}
                min="1"
                required
              />
            </div>
          </label>
          <button className="reservar-button" type="submit" disabled={loading}>
            {loading ? 'Reservando...' : 'Reservar'}
          </button>
          <button className="reservar-button" type="button" onClick={closeModal}>Cancelar</button>
        </form>
      </Modal>
    </div>
  );
};

export default MainPage;

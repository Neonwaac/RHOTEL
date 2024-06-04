-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-06-2024 a las 00:25:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reservas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bookings`
--

CREATE TABLE `bookings` (
  `bookings_id` int(11) NOT NULL,
  `bookings_amount` decimal(10,2) NOT NULL,
  `bookings_nights` int(11) NOT NULL DEFAULT 1,
  `bookings_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `bookings_roomid` int(11) NOT NULL,
  `bookings_userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bookings`
--

INSERT INTO `bookings` (`bookings_id`, `bookings_amount`, `bookings_nights`, `bookings_date`, `bookings_roomid`, `bookings_userid`) VALUES
(16, 180.00, 1, '2024-06-04 21:48:40', 1, 27),
(17, 900.00, 5, '2024-06-04 21:58:08', 2, 27);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rooms`
--

CREATE TABLE `rooms` (
  `rooms_id` int(11) NOT NULL,
  `rooms_capacity` int(11) NOT NULL,
  `rooms_title` text NOT NULL,
  `rooms_description` text NOT NULL,
  `rooms_photo` varchar(100) NOT NULL,
  `rooms_price` decimal(10,2) NOT NULL,
  `rooms_status` int(11) NOT NULL DEFAULT 1,
  `rooms_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rooms`
--

INSERT INTO `rooms` (`rooms_id`, `rooms_capacity`, `rooms_title`, `rooms_description`, `rooms_photo`, `rooms_price`, `rooms_status`, `rooms_date`) VALUES
(1, 4, 'Hotel el paraíso.', 'Ubicado en la costa, Hotel El paraíso ofrece vistas espectaculares al mar y un ambiente relajante.', '/uploads/hotel1.jpg', 180.00, 1, '2024-06-03 16:36:04'),
(2, 2, 'Hotel La Montaña', 'Rodeado de montañas, este hotel es ideal para los amantes de la naturaleza y el senderismo.\r\n', '/uploads/hotel3.jpg', 180.00, 1, '2024-06-03 16:55:42'),
(3, 2, 'Hotel Urbano', 'Un hotel moderno y elegante en el corazón de la ciudad, perfecto para viajeros de negocios.', '/uploads/hotel2.jpg', 250.00, 1, '2024-06-03 16:55:42'),
(4, 3, 'Hotel La Riviera', 'Con un estilo mediterráneo, este hotel es perfecto para unas vacaciones relajantes en la playa.', '/uploads/hotel4.jpg', 220.00, 1, '2024-06-03 16:54:48'),
(5, 2, 'Hotel Campestre', 'Ubicado en el campo, ofrece un ambiente tranquilo y rústico ideal para desconectar.', '/uploads/hotel5.jpg', 150.00, 1, '2024-06-03 16:49:04'),
(6, 2, 'Hotel Metropolitano', 'Un hotel boutique en el centro histórico, lleno de encanto y estilo.', '/uploads/hotel6.jpg', 300.00, 1, '2024-06-03 16:49:36'),
(7, 5, 'Hotel EcoLodge', 'Un ecolodge sostenible que ofrece una experiencia única en la selva.', '/uploads/hotel7.jpg', 190.00, 1, '2024-06-03 16:58:09'),
(8, 1, 'Hotel de Lujo', 'Un hotel cinco estrellas que ofrece servicios de lujo y exclusividad.', '/uploads/hotel8.jpg', 400.00, 1, '2024-06-03 16:58:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `users_id` int(11) NOT NULL,
  `users_username` varchar(150) NOT NULL,
  `users_name` varchar(150) NOT NULL,
  `users_lastname` varchar(150) NOT NULL,
  `users_email` varchar(150) NOT NULL,
  `users_birthdate` date NOT NULL,
  `users_password` varchar(150) NOT NULL,
  `users_status` int(11) NOT NULL DEFAULT 1,
  `users_rol` int(11) NOT NULL DEFAULT 1,
  `users_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `users_profile_image` varchar(150) NOT NULL DEFAULT '../assets/default-profile.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`users_id`, `users_username`, `users_name`, `users_lastname`, `users_email`, `users_birthdate`, `users_password`, `users_status`, `users_rol`, `users_date`, `users_profile_image`) VALUES
(27, 'NEONWAAC', 'Jose Manuel', 'Pantoja Rosas', 'jomaparo3103@gmail.com', '2005-03-31', '$2b$10$5p1shRY4MoVS974K0vOJgu6qSS2/..AK0MQMRkjsEHMUnC7yfpiXO', 1, 1, '2024-06-03 08:41:38', '/uploads/1717404098810.png'),
(28, 'hola', 'asdsad', 'asdasdsa', 'dasdas', '1222-02-12', '$2b$10$NdnF6GnL6SwtjIZ3t4Os7eaal5QhdApmk83wUoZaG1NS1eFsLQHNG', 1, 1, '2024-06-03 22:51:40', '/uploads/profile.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`bookings_id`),
  ADD KEY `bookings_roomid` (`bookings_roomid`),
  ADD KEY `bookings_userid` (`bookings_userid`);

--
-- Indices de la tabla `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`rooms_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`users_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bookings`
--
ALTER TABLE `bookings`
  MODIFY `bookings_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `rooms`
--
ALTER TABLE `rooms`
  MODIFY `rooms_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `users_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`bookings_roomid`) REFERENCES `rooms` (`rooms_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`bookings_userid`) REFERENCES `users` (`users_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

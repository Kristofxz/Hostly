-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2024. Nov 15. 18:41
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `airbnb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ertekeles`
--

CREATE TABLE `ertekeles` (
  `id` int(11) NOT NULL,
  `foglalas_id` int(11) DEFAULT NULL,
  `szallaskereso_id` int(11) DEFAULT NULL,
  `szallas_id` int(11) DEFAULT NULL,
  `ertekeles` int(11) DEFAULT NULL CHECK (`ertekeles` between 1 and 5),
  `szoveg` text DEFAULT NULL,
  `ertekeles_datuma` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ertekeles`
--

INSERT INTO `ertekeles` (`id`, `foglalas_id`, `szallaskereso_id`, `szallas_id`, `ertekeles`, `szoveg`, `ertekeles_datuma`) VALUES
(1, 1, 2, 1, 5, 'Amazing stay, very comfortable!', '2024-11-06'),
(2, 2, 4, 2, 4, 'Good experience, would recommend.', '2024-12-16'),
(3, 3, 3, 3, 5, 'Perfect location and beautiful house.', '2024-11-26'),
(4, 4, 5, 4, 3, 'Nice place but had some issues.', '2024-11-23'),
(5, 5, 1, 5, 4, 'Affordable and clean, good for a short stay.', '2024-11-28');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalok`
--

CREATE TABLE `felhasznalok` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `vNev` varchar(100) DEFAULT NULL,
  `kNev` varchar(100) DEFAULT NULL,
  `jogosultsag_szallas` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalok`
--

INSERT INTO `felhasznalok` (`id`, `email`, `jelszo`, `vNev`, `kNev`, `jogosultsag_szallas`) VALUES
(1, 'john.doe@example.com', 'password123', 'John', 'Doe', 1),
(2, 'jane.smith@example.com', 'securepass', 'Jane', 'Smith', 0),
(3, 'alice.wonder@example.com', 'alice1234', 'Alice', 'Wonder', 1),
(4, 'bob.builder@example.com', 'bobpass', 'Bob', 'Builder', 0),
(5, 'charlie.chaplin@example.com', 'funnyguy', 'Charlie', 'Chaplin', 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `foglalas`
--

CREATE TABLE `foglalas` (
  `id` int(11) NOT NULL,
  `szallaskereso_id` int(11) DEFAULT NULL,
  `szallas_id` int(11) DEFAULT NULL,
  `kezdo_datum` date NOT NULL,
  `zaro_datum` date NOT NULL,
  `fo` int(11) DEFAULT NULL,
  `statusz` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `foglalas`
--

INSERT INTO `foglalas` (`id`, `szallaskereso_id`, `szallas_id`, `kezdo_datum`, `zaro_datum`, `fo`, `statusz`) VALUES
(1, 2, 1, '2024-11-01', '2024-11-05', 2, 'Confirmed'),
(2, 4, 2, '2024-12-10', '2024-12-15', 1, 'Pending'),
(3, 3, 3, '2024-11-20', '2024-11-25', 4, 'Confirmed'),
(4, 5, 4, '2024-11-18', '2024-11-22', 5, 'Cancelled'),
(5, 1, 5, '2024-11-25', '2024-11-27', 1, 'Confirmed');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szallas`
--

CREATE TABLE `szallas` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `telepules` varchar(100) NOT NULL,
  `iranyitoszam` varchar(10) DEFAULT NULL,
  `utca` varchar(100) DEFAULT NULL,
  `hazszam` varchar(10) DEFAULT NULL,
  `ferohely` int(11) DEFAULT NULL,
  `ar` decimal(10,2) DEFAULT NULL,
  `tipus` varchar(50) DEFAULT NULL,
  `atlag_ertekeles` decimal(3,2) DEFAULT NULL,
  `szallashirdeto_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szallas`
--

INSERT INTO `szallas` (`id`, `nev`, `telepules`, `iranyitoszam`, `utca`, `hazszam`, `ferohely`, `ar`, `tipus`, `atlag_ertekeles`, `szallashirdeto_id`) VALUES
(1, 'Cozy Cabin', 'Budapest', '1011', 'Main Street', '1', 4, 12000.00, 'Cabin', 4.50, 1),
(2, 'City Apartment', 'Debrecen', '4025', 'Freedom Blvd', '12B', 2, 15000.00, 'Apartment', 4.70, 2),
(3, 'Lake House', 'Balaton', '8230', 'Shore Road', '5A', 6, 30000.00, 'House', 4.80, 3),
(4, 'Mountain Retreat', 'Miskolc', '3530', 'Summit Ave', '9', 8, 50000.00, 'Villa', 4.90, 1),
(5, 'Budget Room', 'Szeged', '6720', 'Budget Lane', '22', 1, 5000.00, 'Room', 3.50, 5);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `foglalas_id` (`foglalas_id`),
  ADD KEY `szallaskereso_id` (`szallaskereso_id`),
  ADD KEY `szallas_id` (`szallas_id`);

--
-- A tábla indexei `felhasznalok`
--
ALTER TABLE `felhasznalok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `foglalas`
--
ALTER TABLE `foglalas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `szallaskereso_id` (`szallaskereso_id`),
  ADD KEY `szallas_id` (`szallas_id`);

--
-- A tábla indexei `szallas`
--
ALTER TABLE `szallas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `szallashirdeto_id` (`szallashirdeto_id`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `ertekeles`
--
ALTER TABLE `ertekeles`
  ADD CONSTRAINT `ertekeles_ibfk_1` FOREIGN KEY (`foglalas_id`) REFERENCES `foglalas` (`id`),
  ADD CONSTRAINT `ertekeles_ibfk_2` FOREIGN KEY (`szallaskereso_id`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `ertekeles_ibfk_3` FOREIGN KEY (`szallas_id`) REFERENCES `szallas` (`id`);

--
-- Megkötések a táblához `foglalas`
--
ALTER TABLE `foglalas`
  ADD CONSTRAINT `foglalas_ibfk_1` FOREIGN KEY (`szallaskereso_id`) REFERENCES `felhasznalok` (`id`),
  ADD CONSTRAINT `foglalas_ibfk_2` FOREIGN KEY (`szallas_id`) REFERENCES `szallas` (`id`);

--
-- Megkötések a táblához `szallas`
--
ALTER TABLE `szallas`
  ADD CONSTRAINT `szallas_ibfk_1` FOREIGN KEY (`szallashirdeto_id`) REFERENCES `felhasznalok` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mar 28, 2026 alle 16:51
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `piattaforma_emote`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `commenti`
--

CREATE TABLE `commenti` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `utente_id` int(10) UNSIGNED NOT NULL,
  `testo_commento` text NOT NULL,
  `commento_padre_id` bigint(20) UNSIGNED DEFAULT NULL,
  `creato_il` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `log_apprendimento`
--

CREATE TABLE `log_apprendimento` (
  `id` int(11) NOT NULL,
  `emote` varchar(10) NOT NULL,
  `contesto` varchar(50) NOT NULL,
  `messaggio_originale` text NOT NULL,
  `nuova_risposta` text NOT NULL,
  `data_creazione` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `parole_chiave`
--

CREATE TABLE `parole_chiave` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parola` varchar(100) NOT NULL,
  `frequenza` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `parole_chiave`
--

INSERT INTO `parole_chiave` (`id`, `parola`, `frequenza`) VALUES
(1, 'bello', 5),
(2, 'problema', 3),
(3, 'meme', 2),
(4, 'mare', 4),
(5, 'bug', 3),
(6, 'canzone', 2),
(7, 'traffico', 2),
(8, 'approvato', 1),
(9, 'riunione', 2),
(10, 'divertente', 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `reazioni`
--

CREATE TABLE `reazioni` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `utente_id` int(10) UNSIGNED NOT NULL,
  `commento_id` bigint(20) UNSIGNED NOT NULL,
  `emote` varchar(10) DEFAULT NULL,
  `risposta_generata` text DEFAULT NULL,
  `modello_usato` varchar(255) DEFAULT NULL,
  `hash_prompt` varchar(64) DEFAULT NULL,
  `creato_il` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `risposte_generate`
--

CREATE TABLE `risposte_generate` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `emote` varchar(10) NOT NULL,
  `testo_commento` text DEFAULT NULL,
  `testo_risposta` text DEFAULT NULL,
  `parola_chiave` varchar(100) DEFAULT NULL,
  `creato_il` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `risposte_preferite`
--

CREATE TABLE `risposte_preferite` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `emote` varchar(10) NOT NULL,
  `testo_risposta` text NOT NULL,
  `utilizzi` int(11) DEFAULT 1,
  `ultimo_utilizzo` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id` int(10) UNSIGNED NOT NULL,
  `nome_utente` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `creato_il` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `commenti`
--
ALTER TABLE `commenti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utente_id` (`utente_id`);

--
-- Indici per le tabelle `log_apprendimento`
--
ALTER TABLE `log_apprendimento`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `parole_chiave`
--
ALTER TABLE `parole_chiave`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `parola` (`parola`);

--
-- Indici per le tabelle `reazioni`
--
ALTER TABLE `reazioni`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utente_id` (`utente_id`),
  ADD KEY `commento_id` (`commento_id`);

--
-- Indici per le tabelle `risposte_generate`
--
ALTER TABLE `risposte_generate`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `risposte_preferite`
--
ALTER TABLE `risposte_preferite`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `emote` (`emote`,`testo_risposta`(255));

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `commenti`
--
ALTER TABLE `commenti`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT per la tabella `log_apprendimento`
--
ALTER TABLE `log_apprendimento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `parole_chiave`
--
ALTER TABLE `parole_chiave`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la tabella `reazioni`
--
ALTER TABLE `reazioni`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT per la tabella `risposte_generate`
--
ALTER TABLE `risposte_generate`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT per la tabella `risposte_preferite`
--
ALTER TABLE `risposte_preferite`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `commenti`
--
ALTER TABLE `commenti`
  ADD CONSTRAINT `commenti_ibfk_1` FOREIGN KEY (`utente_id`) REFERENCES `utenti` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `reazioni`
--
ALTER TABLE `reazioni`
  ADD CONSTRAINT `reazioni_ibfk_1` FOREIGN KEY (`utente_id`) REFERENCES `utenti` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reazioni_ibfk_2` FOREIGN KEY (`commento_id`) REFERENCES `commenti` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

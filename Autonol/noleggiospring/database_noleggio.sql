-- ============================================
-- DATABASE NOLEGGIO AUTO
-- Importare su phpMyAdmin
-- ============================================

CREATE DATABASE IF NOT EXISTS `noleggio_auto`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `noleggio_auto`;

-- ============================================
-- TABELLA AUTO
-- ============================================
DROP TABLE IF EXISTS `noleggio`;
DROP TABLE IF EXISTS `auto`;
DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `auto` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `marca` VARCHAR(100) NOT NULL,
  `modello` VARCHAR(100) NOT NULL,
  `anno` INT NOT NULL,
  `targa` VARCHAR(10) NOT NULL UNIQUE,
  `categoria` VARCHAR(50) NOT NULL,
  `prezzo_giornaliero` DECIMAL(10,2) NOT NULL,
  `disponibile` BOOLEAN NOT NULL DEFAULT TRUE,
  `immagine_url` VARCHAR(500) DEFAULT NULL,
  `descrizione` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELLA CLIENTE
-- ============================================
CREATE TABLE `cliente` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `cognome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `telefono` VARCHAR(20) DEFAULT NULL,
  `codice_fiscale` VARCHAR(16) NOT NULL UNIQUE,
  `indirizzo` VARCHAR(255) DEFAULT NULL,
  `data_registrazione` DATE NOT NULL DEFAULT (CURRENT_DATE),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABELLA NOLEGGIO
-- ============================================
CREATE TABLE `noleggio` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `auto_id` BIGINT NOT NULL,
  `cliente_id` BIGINT NOT NULL,
  `data_inizio` DATE NOT NULL,
  `data_fine` DATE NOT NULL,
  `prezzo_totale` DECIMAL(10,2) NOT NULL,
  `stato` VARCHAR(30) NOT NULL DEFAULT 'ATTIVO',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_noleggio_auto` FOREIGN KEY (`auto_id`) REFERENCES `auto`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_noleggio_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `cliente`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATI DI ESEMPIO — AUTO
-- ============================================
INSERT INTO `auto` (`marca`, `modello`, `anno`, `targa`, `categoria`, `prezzo_giornaliero`, `disponibile`, `immagine_url`, `descrizione`) VALUES
('Fiat', '500', 2023, 'AA000BB', 'Utilitaria', 35.00, TRUE, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600', 'Iconica city car italiana, perfetta per muoversi in città con stile e agilità.'),
('Fiat', 'Panda', 2024, 'BB111CC', 'Utilitaria', 30.00, TRUE, 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600', 'Compatta e versatile, ideale per la città e le gite fuori porta.'),
('Alfa Romeo', 'Giulia', 2023, 'CC222DD', 'Berlina', 75.00, TRUE, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600', 'Eleganza e sportività italiana in una berlina dal design mozzafiato.'),
('BMW', 'Serie 3', 2024, 'DD333EE', 'Berlina', 85.00, TRUE, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600', 'Berlina premium tedesca con tecnologia all''avanguardia e piacere di guida.'),
('Jeep', 'Renegade', 2023, 'EE444FF', 'SUV', 65.00, TRUE, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600', 'SUV compatto dallo spirito avventuroso, perfetto per ogni terreno.'),
('Audi', 'Q5', 2024, 'FF555GG', 'SUV', 95.00, TRUE, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600', 'SUV premium con interni raffinati e prestazioni eccellenti su strada.'),
('Porsche', '911 Carrera', 2023, 'GG666HH', 'Sportiva', 250.00, TRUE, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600', 'L''icona sportiva per eccellenza: emozioni pura ad ogni curva.'),
('Ferrari', 'Roma', 2024, 'HH777II', 'Sportiva', 450.00, TRUE, 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600', 'Gran Turismo italiana dal design elegante e prestazioni da brivido.'),
('Volkswagen', 'Touran', 2023, 'II888LL', 'Monovolume', 55.00, TRUE, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600', 'Monovolume spaziosa e confortevole, ideale per famiglie e viaggi lunghi.'),
('Ford', 'Galaxy', 2024, 'LL999MM', 'Monovolume', 60.00, TRUE, 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=600', 'Massimo spazio e comfort per tutta la famiglia con 7 posti.'),
('Fiat', 'Ducato', 2023, 'MM000NN', 'Furgone', 70.00, TRUE, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600', 'Il furgone più venduto in Europa: capiente, robusto e affidabile.'),
('Mercedes-Benz', 'Sprinter', 2024, 'NN111PP', 'Furgone', 90.00, TRUE, 'https://images.unsplash.com/photo-1632323091845-f636e5052247?w=600', 'Furgone premium per trasporti professionali con massimo comfort di guida.');

-- ============================================
-- DATI DI ESEMPIO — CLIENTI
-- ============================================
INSERT INTO `cliente` (`nome`, `cognome`, `email`, `telefono`, `codice_fiscale`, `indirizzo`, `data_registrazione`) VALUES
('Marco', 'Rossi', 'marco.rossi@email.it', '+39 333 1234567', 'RSSMRC85M01H501Z', 'Via Roma 15, 00100 Roma', '2024-01-15'),
('Laura', 'Bianchi', 'laura.bianchi@email.it', '+39 347 9876543', 'BNCLRA90D45F205X', 'Corso Italia 42, 20100 Milano', '2024-02-20'),
('Giuseppe', 'Verdi', 'giuseppe.verdi@email.it', '+39 320 5551234', 'VRDGPP78A12L219Q', 'Via Garibaldi 8, 10100 Torino', '2024-03-10'),
('Francesca', 'Esposito', 'francesca.esposito@email.it', '+39 366 4449876', 'SPSFNC92T55F839W', 'Via Toledo 120, 80100 Napoli', '2024-04-05'),
('Alessandro', 'Romano', 'alessandro.romano@email.it', '+39 389 7773210', 'RMNLSS88H22D612K', 'Via Etnea 200, 95100 Catania', '2024-05-18'),
('Giulia', 'Colombo', 'giulia.colombo@email.it', '+39 340 1112233', 'CLMGLI95R65F205P', 'Via Mazzini 33, 40100 Bologna', '2024-06-01');

-- ============================================
-- DATI DI ESEMPIO — NOLEGGI
-- ============================================
INSERT INTO `noleggio` (`auto_id`, `cliente_id`, `data_inizio`, `data_fine`, `prezzo_totale`, `stato`) VALUES
(1, 1, '2024-06-01', '2024-06-05', 140.00, 'COMPLETATO'),
(3, 2, '2024-06-10', '2024-06-15', 375.00, 'COMPLETATO'),
(7, 4, '2024-07-01', '2024-07-03', 500.00, 'ATTIVO'),
(5, 3, '2024-07-05', '2024-07-12', 455.00, 'ATTIVO');

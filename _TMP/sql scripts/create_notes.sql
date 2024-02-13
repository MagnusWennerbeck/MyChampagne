CREATE TABLE `notes` (
  `Id` int(11) NOT NULL,
  `Datum` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Location` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'LOCATION',
  `Company` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'COMPANY',
  `Producer` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'PRODUCER',
  `Wine` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'WINE',
  `TastingNote` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Comment` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Score` int(11) NOT NULL,
  `BuyMore` tinyint(1) NOT NULL,
  `LastUpdated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
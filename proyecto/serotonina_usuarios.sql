-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: serotonina
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL,
  `NombreUsu` varchar(45) NOT NULL,
  `ApellidoUsu` varchar(45) NOT NULL,
  `TelefonoUsu` varchar(45) NOT NULL,
  `ContraseñaUsu` varchar(45) NOT NULL,
  `TipoUsuario_idTipoUsuario` int NOT NULL,
  `Servicios_idServicios` int NOT NULL,
  PRIMARY KEY (`idUsuario`,`TipoUsuario_idTipoUsuario`,`Servicios_idServicios`),
  KEY `fk_Usuario_TipoUsurio_idx` (`TipoUsuario_idTipoUsuario`),
  KEY `fk_Usuario_Servicios1_idx` (`Servicios_idServicios`),
  CONSTRAINT `fk_Usuario_Servicios1` FOREIGN KEY (`Servicios_idServicios`) REFERENCES `servicios` (`idServicios`),
  CONSTRAINT `fk_Usuario_TipoUsurio` FOREIGN KEY (`TipoUsuario_idTipoUsuario`) REFERENCES `tipousuario` (`idTipoUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1110539089,'Mario',' Sanchez','3102994496','Mario.08',2,89817),(1110539090,'Yury',' Valderrama','3102889745','Yury.08',1,89526),(1110539090,'Luis',' Bermudez','3102889735','Luis.08',2,89522),(1110539090,'Beatriz',' Perez','3157894564','Beatriz.08',3,89519),(1110539090,'Maria',' Masmela','3102089745','Maria.08',3,89520),(1110539090,'Laura',' Triana','3102889645','laura.08',3,89521),(1110539090,'Angelica',' Ortiz','3102889745','Angelica.08',4,89527),(1110539090,'MARCELA',' Gualtero','3102889945','Marcela.08',5,89525),(1110539090,'Angie',' Oviedo','3102789745','Angie.08',6,89523),(1110539704,'Erika',' Oviedo','3219340640','Yussed.08',1,89518);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-13 21:09:55

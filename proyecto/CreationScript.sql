-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema serotonina
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema serotonina
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `serotonina` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `serotonina` ;

-- -----------------------------------------------------
-- Table `serotonina`.`servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`servicios` (
  `idServicios` INT NOT NULL,
  `TipoServicios` VARCHAR(45) NOT NULL,
  `Precio` DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (`idServicios`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `serotonina`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`carrito` (
  `idCarrito` INT NOT NULL,
  `Total` DECIMAL(10,0) NOT NULL,
  `Servicios_idServicios` INT NOT NULL,
  PRIMARY KEY (`idCarrito`, `Servicios_idServicios`),
  INDEX `fk_Carrito_Servicios1_idx` (`Servicios_idServicios` ASC) VISIBLE,
  CONSTRAINT `fk_Carrito_Servicios1`
    FOREIGN KEY (`Servicios_idServicios`)
    REFERENCES `serotonina`.`servicios` (`idServicios`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `serotonina`.`tipousuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`tipousuario` (
  `idTipoUsuario` INT NOT NULL,
  `TipoUsuarios` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipoUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `serotonina`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nombreusu` VARCHAR(45) NOT NULL,
  `ApellidoUsu` VARCHAR(45) NOT NULL,
  `TelefonoUsu` VARCHAR(45) NOT NULL,
  `ContraseñaUsu` VARCHAR(45) NOT NULL,
  `TipoUsuario_idTipoUsuario` INT NOT NULL,
  `Servicios_idServicios` INT NOT NULL,
  PRIMARY KEY (`idUsuario`, `TipoUsuario_idTipoUsuario`, `Servicios_idServicios`),
  INDEX `fk_Usuario_TipoUsurio_idx` (`TipoUsuario_idTipoUsuario` ASC) VISIBLE,
  INDEX `fk_Usuario_Servicios1_idx` (`Servicios_idServicios` ASC) VISIBLE,
  CONSTRAINT `fk_Usuario_Servicios1`
    FOREIGN KEY (`Servicios_idServicios`)
    REFERENCES `serotonina`.`servicios` (`idServicios`),
  CONSTRAINT `fk_Usuario_TipoUsurio`
    FOREIGN KEY (`TipoUsuario_idTipoUsuario`)
    REFERENCES `serotonina`.`tipousuario` (`idTipoUsuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

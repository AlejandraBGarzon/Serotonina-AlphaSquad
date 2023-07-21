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
-- Table `serotonina`.`tipo_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`tipo_usuario` (
  `id_tipo_usu` INT NOT NULL AUTO_INCREMENT,
  `tipo_usu` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_tipo_usu`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `serotonina`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`usuarios` (
  `id_usu` INT NOT NULL AUTO_INCREMENT,
  `nombre_usu` VARCHAR(45) NOT NULL,
  `telefono_usu` VARCHAR(45) NOT NULL,
  `correo_usu` VARCHAR(45) NOT NULL,
  `contrasenia_usu` VARCHAR(45) NOT NULL,
  `tipo_usuario_id_tipo_usu` INT NOT NULL,
  PRIMARY KEY (`id_usu`, `tipo_usuario_id_tipo_usu`),
  UNIQUE INDEX `uk_correo_usu` (`correo_usu` ASC) VISIBLE,
  INDEX `fk_usuarios_tipo_usuario1_idx` (`tipo_usuario_id_tipo_usu` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_tipo_usuario1`
    FOREIGN KEY (`tipo_usuario_id_tipo_usu`)
    REFERENCES `serotonina`.`tipo_usuario` (`id_tipo_usu`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `serotonina`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`carrito` (
  `id_car` BIGINT NOT NULL AUTO_INCREMENT,
  `total_car` BIGINT NULL DEFAULT NULL,
  `usuarios_id_usu` INT NOT NULL,
  PRIMARY KEY (`id_car`),
  INDEX `fk_carrito_usuarios_idx` (`usuarios_id_usu` ASC) VISIBLE,
  CONSTRAINT `fk_carrito_usuarios`
    FOREIGN KEY (`usuarios_id_usu`)
    REFERENCES `serotonina`.`usuarios` (`id_usu`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `serotonina`.`servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`servicios` (
  `id_serv` BIGINT NOT NULL,
  `tipo_serv` VARCHAR(45) NOT NULL,
  `precio_serv` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id_serv`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `serotonina`.`carrito_servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`carrito_servicios` (
  `carrito_id_car` BIGINT NOT NULL,
  `servicios_id_serv` BIGINT NOT NULL,
  PRIMARY KEY (`carrito_id_car`, `servicios_id_serv`),
  INDEX `fk_carrito_servicios_carrito_idx` (`carrito_id_car` ASC) VISIBLE,
  INDEX `fk_carrito_servicios_servicios_idx` (`servicios_id_serv` ASC) VISIBLE,
  CONSTRAINT `fk_carrito_servicios_carrito`
    FOREIGN KEY (`carrito_id_car`)
    REFERENCES `serotonina`.`carrito` (`id_car`),
  CONSTRAINT `fk_carrito_servicios_servicios`
    FOREIGN KEY (`servicios_id_serv`)
    REFERENCES `serotonina`.`servicios` (`id_serv`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema serotonina
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `serotonina` DEFAULT CHARACTER SET utf8 ;

-- -----------------------------------------------------
-- Schema serotonina
-- -----------------------------------------------------
USE `serotonina` ;

-- -----------------------------------------------------
-- Table `serotonina`.`tipo_usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`tipo_usuario` (
  `id_tipo_usu` INT NOT NULL AUTO_INCREMENT,
  `tipo_usu` VARCHAR(45) NULL,
  PRIMARY KEY (`id_tipo_usu`)
)
ENGINE = InnoDB;


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
  INDEX `fk_usuarios_tipo_usuario1_idx` (`tipo_usuario_id_tipo_usu` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_tipo_usuario1`
    FOREIGN KEY (`tipo_usuario_id_tipo_usu`)
    REFERENCES `serotonina`.`tipo_usuario` (`id_tipo_usu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `serotonina`.`carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`carrito` (
  `id_car` INT NOT NULL AUTO_INCREMENT,
  `total_car` DECIMAL(10) NOT NULL,
  `usuarios_id_usu` INT NOT NULL,
  PRIMARY KEY (`id_car`),
  INDEX `fk_carrito_usuarios_idx` (`usuarios_id_usu` ASC) VISIBLE,
  CONSTRAINT `fk_carrito_usuarios`
    FOREIGN KEY (`usuarios_id_usu`)
    REFERENCES `serotonina`.`usuarios` (`id_usu`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `serotonina`.`servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`servicios` (
  `id_serv` INT NOT NULL AUTO_INCREMENT,
  `tipo_serv` VARCHAR(45) NOT NULL,
  `precio_serv` DECIMAL(10) NOT NULL,
  PRIMARY KEY (`id_serv`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `serotonina`.`carrito_has_servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `serotonina`.`carrito_has_servicios` (
  `carrito_id_car` INT NOT NULL,
  `servicios_id_serv` INT NOT NULL,
  PRIMARY KEY (`carrito_id_car`, `servicios_id_serv`),
  INDEX `fk_carrito_has_servicios_servicios1_idx` (`servicios_id_serv` ASC) VISIBLE,
  INDEX `fk_carrito_has_servicios_carrito1_idx` (`carrito_id_car` ASC) VISIBLE,
  CONSTRAINT `fk_carrito_has_servicios_carrito1`
    FOREIGN KEY (`carrito_id_car`)
    REFERENCES `serotonina`.`carrito` (`id_car`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_has_servicios_servicios1`
    FOREIGN KEY (`servicios_id_serv`)
    REFERENCES `serotonina`.`servicios` (`id_serv`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

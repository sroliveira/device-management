CREATE SCHEMA `device` ;

CREATE TABLE `device`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`))
COMMENT = 'Stores device\'s category.';

CREATE TABLE `device`.`device` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category_id` INT NOT NULL,
  `color` VARCHAR(16) NOT NULL,
  `partnumber` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `device_fk01_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `device_fk01`
    FOREIGN KEY (`category_id`)
    REFERENCES `device`.`category` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
COMMENT = 'Stores device';
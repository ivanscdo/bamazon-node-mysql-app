DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `department_name` VARCHAR(30),
    `product_name` VARCHAR(30),
    `product_description` VARCHAR(255),
    `price` INTEGER(7), 
    `stock_quantity` INTEGER(7), 
    PRIMARY KEY (item_id)
);

INSERT INTO products (
    department_name,
    product_name,
    product_description,
    price, 
    stock_quantity
)
VALUES (
    "Items", 
    "Potion", 
    "Restores: 30HP", 
    "50",
    "30"
), (
    "Items", 
    "Antidote", 
    "Removes: Poison", 
    "50", 
    "30"
), (
    "Items", 
    "Phoenix Down", 
    "Removes: KO", 
    "300", 
    "15"
), (
    "Weapons", 
    "Broadsword", 
    "Atk: 4; Def: 5%", 
    "200", 
    "10"
), (
    "Weapons", 
    "Oak Staff", 
    "Atk: 3; Def: 15%", 
    "120", 
    "10"
), (
    "Weapons", 
    "Longbow", 
    "Atk: 4; Def: 0%", 
    "800", 
    "10"
), (
    "Equipment", 
    "Mythril Shield", 
    "Phys Ev: 22%; Mag Ev: 5%", 
    "2500", 
    "8"
), (
    "Equipment", 
    "Platinum Helm", 
    "HP Bonus: +90; MP Bonus: -", 
    "8000", 
    "3"
), (
    "Equipment", 
    "Crystal Armor", 
    "HP Bonus: +110; MP Bonus: -",      
    "19000", 
    "2"
), (
    "Equipment", 
    "Wizard's Robe", 
    "HP Bonus: +30; MP Bonus: 22",      
    "4000", 
    "4"
);
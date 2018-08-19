drop database if exists bamazon;
create database bamazon;
use bamazon;
create table PRODUCTS (
	item_id integer(10) not null auto_increment,
    product_name varchar(30),
    department_name varchar(30),
    price decimal(10,4),
    stock_quantity integer(4),
    primary key (item_id)
);
drop database hsdb;
create database hsdb;

\c hsdb;

create table pcategory (
    cid serial primary key,
    category_name varchar(50)
);

create table wallet (
    wallet_id serial primary key,
    amount int
);

create table users(
    username varchar(50) primary key,
	email varchar(50),
	password varchar(50),
	first_name varchar(50),
	last_name varchar(50),
	address varchar(50),
	phone bigint,
    wallet_id int references wallet
);

create table admin_user (
    username varchar(50) primary key,
	email varchar(50),
	password varchar(50),
	first_name varchar(50),
	last_name varchar(50),
	address varchar(50),
	phone bigint
);


create table product (
    pid serial primary key,
    product_name varchar(50),
    prod_category_id int references pcategory,
    price int,
    image_path varchar(50)
);


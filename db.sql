drop database hsdb;
create database hsdb;

\c hsdb;

create table pcategory (
    cid serial primary key,
    category_name varchar(50)
);

-- create table wallet (
--     wallet_id serial primary key,
--     amount int
-- );

create table user(
    username varchar(50) primary key,
	email varchar(50),
	password varchar(50),
	first_name varchar(50),
	last_name varchar(50),
	address varchar(50),
	phone bigint,
    is_admin boolean
    -- wallet_id int references wallet
);

-- create table admin_user (
--     username varchar(50) primary key,
-- 	email varchar(50),
-- 	password varchar(50),
-- 	first_name varchar(50),
-- 	last_name varchar(50),
-- 	address varchar(50),
-- 	phone bigint
-- );


create table product (
    pid serial primary key,
    product_name varchar(50),
    prod_cid int references pcategory,
    price int,
    description varchar(100),
    image_name varchar(50)
);

-- cart table
create table cart_items (
    cart_item_id serial,
    user_id int references user,
    product_id int references product,
    quantity int,
    primary key (cart_id, user_id)
);
-- history for each user
create table user_history (
    user_id int references user,
    product_id int references product,
    quantity int,
    primary key (user_id, product_id)
)
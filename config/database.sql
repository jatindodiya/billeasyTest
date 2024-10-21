create database test;
use test;

create table customers ( 
customer_id CHAR(36) primary key , 
Name varchar(50) not null, 
mobile varchar(20) unique not null,
email varchar(100) unique not null, 
location varchar(50) not null, 
createdAt Datetime default Now()
);

create table users (
user_id CHAR(36) primary key , 
mobile varchar(20) unique not null, 
email varchar(100) not null unique,
password varchar(100),
role varchar(50)
);



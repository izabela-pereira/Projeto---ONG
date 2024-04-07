create database auquemia;

use auquemia;

create table user (
	user_id int not null primary key,
    user_name varchar(250) not null,
    name varchar (250) not null,
    password varchar (20) not null,
    address varchar (250) not null,
    phone_number varchar (20) not null,
	email varchar (250) not null,
    volunteer bool not null,
    role int not null,
    observation varchar(250)
);

create table animal(
	animal_id int not null primary key,
    animal_name varchar(250) not null,
    user_id int not null,
    CONSTRAINT fk_user_animal FOREIGN KEY (user_id) REFERENCES user (user_id),
    species int not null,
    race varchar(50) not null,
    fur_color varchar(50) not null,
    age int not null,
    neutered bool not null,
    microchip bool null,
    status int not null,
    vaccines varchar(250) not null,
    history varchar(250)
);

create table event(
	event_id int not null primary key,
    user_id int not null,
    CONSTRAINT fk_user_event FOREIGN KEY (user_id) REFERENCES user (user_id),
    animal_id int,
    CONSTRAINT fk_animal_event FOREIGN KEY (animal_id) REFERENCES animal (animal_id),
    transaction_type int not null,
    value decimal(10,2) not null
);
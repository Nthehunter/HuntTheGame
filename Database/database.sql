use master

create database db_HunterGame

use db_HunterGame

create table AppUser (
idAppUser int identity (1,1) primary key ,
Email varchar(320) not null unique,
Password varchar(255) not null,
UserName varchar(45) not null unique,
Photo varchar(255) ,
Rol bit DEFAULT 0
)

create table VideoGame (
idVideoGame int identity (1,1) primary key ,
Name varchar(45) not null unique,
Photo varchar(255)
)

create table Collection (
idAppUser int   ,
idVideoGame int  ,
State bit not null ,
GameTime int not null,
FOREIGN KEY (idAppUser) REFERENCES AppUser(idAppUser) on update cascade on delete cascade,
FOREIGN KEY (idVideoGame) REFERENCES VideoGame(idVideoGame) on update cascade on delete cascade,
primary key (idAppUser , idVideoGame)
)

create table Music (

idMusic int identity (1,1) primary key,
BackgroundMusic varchar(255) unique ,
InUse bit not null DEFAULT 0

)

Insert into Music Values ('Persona4YingYang.mp3' , 1);
Insert into Music Values ('TengenToppaGurrenLagannOpening-SorairoDays(HQ).mp3' , 0);


Insert into AppUser Values ('admin@huntthegame.com', '$2a$10$Q./H5P5QAhVK8l9T5AejTeKjrNDSC6jwrDHOkHgNru7RvLfXmKRIe', 'Administrador', null, 1);
Insert into AppUser Values ('pruebaTestUser@gmail.com', '$2a$10$Q./H5P5QAhVK8l9T5AejTeKjrNDSC6jwrDHOkHgNru7RvLfXmKRIe', 'NaelUser', null, 0);

Insert into VideoGame Values ('Persona 3', null);

Insert into Collection Values (1, 1, 1, 30);

select * from AppUser
select * from VideoGame
select * from Music
select * from Collection

create schema kosumbaeva_saadat_hw_80 collate utf8_general_ci;

use kosumbaeva_saadat_hw_80;

create table categories
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table places
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table items
(
    id          int auto_increment
        primary key,
    category_id int                                 not null,
    place_id    int                                 not null,
    title       varchar(255)                        not null,
    description text                                null,
    image       varchar(31)                         null,
    date        timestamp default CURRENT_TIMESTAMP null,
    constraint items_categories_id_fk
        foreign key (category_id) references categories (id)
            on update cascade,
    constraint items_places_id_fk
        foreign key (place_id) references places (id)
            on update cascade
);

insert into kosumbaeva_saadat_hw_80.categories (id, title, description)
values  (1, 'Category1', 'Description1'),
        (2, 'Category2', 'Description2'),
        (3, 'Category3', 'Description3');

insert into kosumbaeva_saadat_hw_80.places (id, title, description)
values  (1, 'Place1', 'Description1'),
        (2, 'Place2', 'Description2'),
        (3, 'Place3', 'Description3');

insert into kosumbaeva_saadat_hw_80.items (id, category_id, place_id, title, description, image, date)
values  (1, 1, 1, 'Title1', 'Desciption1', 'GHfoilU6B1fc4uEFapGJZ.jpg', '2022-02-13 19:53:45'),
        (2, 2, 2, 'Title2', 'Desciption2', 'QEXKw95r-jtqv9yVeV9xv.jpeg', '2022-02-13 19:54:19'),
        (3, 3, 3, 'Title3', 'Desciption3', 'Ft4S7zXWtwJjt-eHlSYPu.jpeg', '2022-02-13 19:54:47');
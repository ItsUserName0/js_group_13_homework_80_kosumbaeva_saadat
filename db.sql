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
    category_id int          not null,
    place_id    int          not null,
    title       varchar(255) not null,
    description text         null,
    image       varchar(31)  null,
    constraint items_categories_id_fk
        foreign key (category_id) references categories (id)
            on update cascade,
    constraint items_places_id_fk
        foreign key (place_id) references places (id)
            on update cascade
);

insert into kosumbaeva_saadat_hw_80.categories (id, title, description)
values  (1, 'new category1', 'new description1'),
        (5, 'category1', 'description1'),
        (6, 'category1', 'description1'),
        (7, 'category2', 'description2'),
        (8, 'new category', 'new description'),
        (9, 'category4', 'description4'),
        (10, 'category5', 'description5'),
        (11, 'category6', 'description6');

insert into kosumbaeva_saadat_hw_80.items (id, category_id, place_id, title, description, image)
values  (2, 10, 1, 'title2', 'description', null),
        (4, 1, 1, '"title1"', '"description1"', 'xgT5z6z5rR7Wbk163KkRo.png'),
        (5, 1, 1, '"title1"', '"description1"', 'C739GNPUUoZFQNu08kKCl.png'),
        (6, 1, 1, 'title1', 'description1', 'lKJJVW74RXe5eSrQGnJ7P.png');

insert into kosumbaeva_saadat_hw_80.places (id, title, description)
values  (1, 'title1', 'description1'),
        (2, 'place1', 'description1');

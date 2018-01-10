create database test1;

grant all privileges on test1.* to 'www'@'%' indentified by "www";

create database dev1;

grant all privileges on dev1.* to 'www'@'%' indentified by "www";
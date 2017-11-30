create table board(
	num int auto_increment, 
	pwd varchar(20) not null,
	subject varchar(100) not null,
	content text not null,
	writer varchar(20) not null,
	regdate datetime default now() not null,
	hit int not null,
	primary key(num)
);
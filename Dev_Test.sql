CREATE DATABASE test_dev;
USE test_dev;

CREATE TABLE usuario(
	id INT(11) NOT NULL PRIMARY KEY auto_increment,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone INT (15) NOT NULL,
    senha VARCHAR(40) NOT NULL,
    data_criacao DATETIME default CURRENT_TIMESTAMP
);

CREATE TABLE jobs(
	id INT(11) NOT NULL PRIMARY KEY auto_increment,
    nome VARCHAR(150) NOT NULL,
    idUsuario INT(11) NOT NULL,
    statusJob VARCHAR(20) NOT NULL,
    tipoRecorrencia VARCHAR (45) NOT NULL,
    valorRecorrencia FLOAT NOT NULL,
    intervalo DATETIME,
    horarioFixo DATETIME,
    data_criacao DATETIME default CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuario(id)
);
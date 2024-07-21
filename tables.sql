CREATE TYPE type AS ENUM ('admin', 'tec', 'user');

CREATE TABLE Users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(10),
	userType type DEFAULT 'user',
	function INT,
	name VARCHAR(100),
	email VARCHAR(30)
);

CREATE TABLE Ticket (
	id INT PRIMARY KEY,
	userId INT,
	status VARCHAR(255),
	dateCreated DATE,
	dateClosed DATE,
	FOREIGN KEY (userId) REFERENCES Users(id)
);

CREATE TABLE Message (
	id INT PRIMARY KEY,
	ticketId INT,
	message VARCHAR(255),
	dateSent DATE,
	FOREIGN KEY (ticketId) REFERENCES Ticket(id)
);

CREATE TABLE Site (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	address VARCHAR(255),
	numberOfBuildings INT
);

CREATE TABLE UserSite (
	id INT PRIMARY KEY,
	userId INT,
	siteId INT,
	FOREIGN KEY (userId) REFERENCES Users(id),
	FOREIGN KEY (siteId) REFERENCES Site(id)
);

CREATE TABLE Equipment (
	id INT PRIMARY KEY,
	siteId INT,
	room VARCHAR(255),
	nome VARCHAR(255),
	equipmentType VARCHAR(255),
	issue VARCHAR(255)
);
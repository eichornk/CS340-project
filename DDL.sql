SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Drop Tables
DROP TABLE IF EXISTS Councils;
DROP TABLE IF EXISTS Chapters;
DROP TABLE IF EXISTS Members;
DROP TABLE IF EXISTS Positions;
DROP TABLE IF EXISTS Philanthropy_Events;
DROP TABLE IF EXISTS Chapter_Philanthropies;

-- Table structure for 'Councils'
CREATE TABLE Councils (
    council_id int NOT NULL UNIQUE AUTO_INCREMENT
    council_name varchar(255) NOT NULL
    PRIMARY KEY (council_id)
);

-- Table structure for 'Chapters'
CREATE TABLE Chapters (
    chapter_id int NOT NULL UNIQUE AUTO_INCREMENT
    chapter_name varchar(255) NOT NULL
    nickname varchar(255)
    colors varchar(255)
    philanthropy varchar(255) NOT NULL
    housed bool NOT NULL
    address varchar(255)
    council_id int NOT NULL
    event_id int NOT NULL
    PRIMARY KEY (chapter_id)
    FOREIGN KEY (council_id) REFERENCES Councils(council_id)
);

--Table structure for 'Members'
CREATE TABLE Members (
    member_id int NOT NULL UNIQUE AUTO_INCREMENT
    first_name varchar(255) NOT NULL
    last_name varchar(255) NOT NULL
    address varchar(255)
    email_address varchar(255)
    major varchar(255)
    chapter_id int NOT NULL
    PRIMARY KEY (member_id)
    FOREIGN KEY (chapter_id) REFERENCES Chapters(chapter_id)
);

--Table structure for 'Positions'
CREATE TABLE Positions (
    position_id int NOT NULL UNIQUE AUTO_INCREMENT
    position_name varchar(255) NOT NULL
    position_responsibility varchar(255) NOT NULL
    member_id int NOT NULL
    PRIMARY KEY (position_id)
    FOREIGN KEY (member_id) REFERENCES Members(member_id)
);

--Table structure for 'Philanthropy_Events'
CREATE TABLE Philanthropy_Events (
    event_id int NOT NULL UNIQUE AUTO_INCREMENT
    event_name varchar(255) NOT NULL
    event_type varchar(255) NOT NULL
    event_entry int NOT NULL
    event_status varchar(255) NOT NULL
    PRIMARY KEY (event_id)
); 

--Intersection table structure for 'Chapter Philanthropies'
CREATE TABLE Chapter_Philanthropies (
    philanthropy_id int NOT NULL UNIQUE AUTO_INCREMENT
    philanthropy_role varchar NOT NULL
    event_id int NOT NULL
    chapter_id int NOT NULL
    PRIMARY KEY (philanthropy_id)
    FOREIGN KEY (event_id) REFERENCES Philanthropy_Events(event_id)
    FOREIGN KEY (chapter_id) REFERENCES Chapters(chapter_id)
);

INSERT INTO Councils(`council_id`, `council_name`) 
VALUES (1, 'Panhellenic Council'),
(2, 'Interfraternity Council'),
(3, 'Collective Greek Council'),
(4, 'Multi-Cultural Greek Council'),
(5, 'National Pan-Hellenic Council');

INSERT INTO Chapters(`chapter_id`, `chapter_name`, `nickname`, `colors`, `philanthropy`, `housed`, `address`)
VALUES('Chapter Name 1', 'Chapter Nickname 1', 'Color 1 and Color 2', 'Philanthropy 1', 1, 'Address 1'),
('Chapter Name 2', 'Chapter Nickname 2', 'Color 3 and Color 4', 'Philanthropy 2', 1, 'Address 2'),
('Chapter Name 3', 'Chapter Nickname 3', 'Color 5 and Color 6', 'Philanthropy 3', 1, 'Address 3');

INSERT INTO Members(`first_name`, `last_name`, `address`, `email_address`, `major`)
VALUES('First name 1', 'Last name 1', NULL, NULL, 'Major 1'),
('First name 2', 'Last name 2', NULL, NULL, NULL),
('First name 3', 'Last name 3', NULL, NULL, 'Major 3');

INSERT INTO Positions(`position_name`, `position_responsibility`)
VALUES('Position 1', 'Position 1 description'),
('Position 2', 'Position 2 description'),
('Position 3', 'Position 3 description');

INSERT INTO Philanthropy_Events(`event_name`, `event_type`)
VALUES('Event name 1', 'Event type 1'),
('Event name 2', 'Event type 2'),
('Event name 3', 'Event type 3');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
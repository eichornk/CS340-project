-- TEAM GO GREEK
-- TEAM NUMBER: 50
-- TEAM MEMBERS: Kaylee Eichorn and Abby Ruff

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
    council_id int NOT NULL UNIQUE AUTO_INCREMENT,
    council_name varchar(255) NOT NULL,
    PRIMARY KEY (council_id)
);

-- Table structure for 'Chapters'
CREATE TABLE Chapters (
    chapter_id int NOT NULL UNIQUE AUTO_INCREMENT,
    chapter_name varchar(255) NOT NULL,
    nickname varchar(255),
    colors varchar(255),
    philanthropy varchar(255) NOT NULL,
    housed bool NOT NULL,
    address varchar(255),
    council_id int NOT NULL,
    event_id int NOT NULL,
    PRIMARY KEY (chapter_id),
    FOREIGN KEY (council_id) REFERENCES Councils(council_id) ON DELETE CASCADE
);

--Table structure for 'Members'
CREATE TABLE Members (
    member_id int NOT NULL UNIQUE AUTO_INCREMENT,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    address varchar(255),
    email_address varchar(255),
    major varchar(255),
    chapter_id int NOT NULL,
    PRIMARY KEY (member_id),
    FOREIGN KEY (chapter_id) REFERENCES Chapters(chapter_id) ON DELETE CASCADE
);

--Table structure for 'Positions'
CREATE TABLE Positions (
    position_id int NOT NULL UNIQUE AUTO_INCREMENT,
    position_name varchar(255) NOT NULL,
    position_responsibility varchar(255) NOT NULL,
    member_id int NOT NULL,
    PRIMARY KEY (position_id),
    FOREIGN KEY (member_id) REFERENCES Members(member_id) ON DELETE CASCADE
);

--Table structure for 'Philanthropy_Events'
CREATE TABLE Philanthropy_Events (
    event_id int NOT NULL UNIQUE AUTO_INCREMENT,
    event_name varchar(255) NOT NULL,
    event_type varchar(255) NOT NULL,
    event_entry int NOT NULL,
    event_status varchar(255) NOT NULL,
    PRIMARY KEY (event_id)
); 

--Intersection table structure for 'Chapter Philanthropies'
CREATE TABLE Chapter_Philanthropies (
    chapter_philanthropy_id int NOT NULL UNIQUE AUTO_INCREMENT,
    philanthropy_role varchar NOT NULL,
    event_id int NOT NULL,
    chapter_id int NOT NULL,
    PRIMARY KEY (philanthropy_id),
    FOREIGN KEY (event_id) REFERENCES Philanthropy_Events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (chapter_id) REFERENCES Chapters(chapter_id) ON DELETE CASCADE
);

--Inserts data into 'Councils'
INSERT INTO Councils(`council_id`, `council_name`) 
VALUES (1, 'Panhellenic Council'),
(2, 'Interfraternity Council'),
(3, 'Collective Greek Council'),
(4, 'Multi-Cultural Greek Council'),
(5, 'National Pan-Hellenic Council');

--Inserts data into 'Chapters'
INSERT INTO Chapters(`chapter_id`, `chapter_name`, `nickname`, `colors`, `philanthropy`, `housed`, `address`, `council_id`)
VALUES(001, 'Delta Gamma', 'Dee Gee', 'Bronze, Pink, Blue', 'Service for Sight', 1, '715 NW 23rd St', 1),
(002, 'Kappa Alpha Theta', 'Theta', 'Gold, Black', 'Court Appointed Special Advocates', 1, '465 NW 23rd St', 1),
(012, 'Pi Kappa Phi', 'Pi Kapp', 'White, Gold, Royal Blue', 'The Ability Experience', 1, '2111 NW Harrison Blvd', 2),
(023, 'Sigma Delta Omega', 'SDO', 'N/A', 'OSU Stem Academy', 0, NULL, 3);

--Inserts data into 'Members'
INSERT INTO Members(`member_id`, `first_name`, `last_name`, `address`, `email_address`, `major`, `chapter_id`)
VALUES(0001, 'Abby', 'Ruff', '2454 NW Jackson Ave', 'abbyruff078@comcast.net', 'Marketing', 001),
(0123, 'Kaylee', 'Eichorn', '465 NW 23rd St', 'eichornk@oregonstate.edu', 'Computer Science', 002),
(0254, 'Jake', 'Lyda', '4768 SE Harrison Blvd', 'lydaj@icloud.com', 'Business Administration' 003);

--Inserts data into 'Positions'
INSERT INTO Positions(`position_id`, `position_name`, `position_responsibility`, `member_id`)
VALUES(01, 'President', 'Leads formal chapter and manages all chapter members', 0001),
(02, 'Recruitment Director', 'Helps recruit more members for the chapter during Fall Formal Recruitment and COB', 0254),
(07, 'External Philanthropy', 'Engages the chapter in other chapters philanthropies', 0123),
(08, 'Internal Philanthropy', 'Plans their chapter philanthropy events', 0311);

--Inserts data into 'Philanthropy_Events'
INSERT INTO Philanthropy_Events(`event_id`, `event_name`, `event_type`, `event_entry`, `event_status`)
VALUES(003, 'Anchorsplash', 'Synchronized Swimming', 150, 'Inactive'),
(024, 'Ironbrawl', 'Flag Football', 100, 'Inactive'),
(031, 'SPE Sweetheartds', 'Pageant', 75, 'Active');

--Inserts data into 'Chapter_Philanthropies'
INSERT INTO Chapter_Philanthropies(`chapter_philanthropy_id`, `philanthropy_role`, `event_id`, `chapter_id`)
VALUES(1005, 'Host', 024, 002),
(1005, 'Participating', 024, 012),
(1023, 'Host', 003, 001);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
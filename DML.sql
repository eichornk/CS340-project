--------Councils--------
--Query for adding a council
INSERT INTO Councils(council_name)
VALUES (:council_nameInput);

--Query for reading council information
SELECT * FROM Councils;

--------Chapters--------
--Query for adding a chapter
SELECT council_id, council_name FROM Councils;
INSERT INTO Chapters(chapter_name, nickname, colors, philanthropy, housed, address, council_id, event_id)
VALUES (:chapter_nameInput, :nicknameInput, ;colorsInput, :philanthropyInput, :housedInput, :council_id_from_dropdown_Input, :event_id_from_dropdown_Input);

--Query for reading chapter information
SELECT chapter_id, chapter_name, nickname, colors, philanthropy, housed, address, Councils.council_name AS council_id
FROM Chapters
INNER JOIN Councils ON council_id = Councils.council_id;

--------Members--------
--Query for adding a memeber
SELECT chapter_id, chapter_name FROM Chapters;
INSERT INTO Members(first_name, last_name, address, email_address, major, chapter_id)
VALUES(:first_nameInput, :last_nameInput, :addressInput, :email_addressInput, :majorInput, :chapter_id_from_dropdown_Input);

--Query for reading member information
SELECT member_id, first_name, last_name, address, email_address, major, Chapters.chapter_name AS chapter_id 
FROM Members
INNER JOIN Chapters ON chapter_id = Chapters.chapter_id;

--Query for updating member information
SELECT member_id, first_name, last_name, address, email_address, major, Chapters.chapter_name AS chapter_id 
    FROM Members
    WHERE member_id = :member_ID_selection_from_page;
UPDATE Members 
    SET first_name = :first_nameInput, last_name= :last_nameInput, address = :addressInput, email_address = :email_addressInput, major = :majorInput, chapter = :chapter_id_from_dropdown_Input
    WHERE member_id= :member_ID_from_the_update_form;

--Query for deleting member information
DELETE FROM Members WHERE member_id = :member_ID_selection_from_page

--------Positions--------
--Query for adding a position
SELECT member_id, first_name, last_name FROM Members
INSERT INTO Position(position_name, position_responsibility, member_id)
VALUES(:position_nameInput, :position_responsibilityInput, :member_id_from_dropdown_Input);

--Query for reading postion information
SELECT position_id, position_name, position_responsibility, Members.first_name AND Members.last_name AS member_id 
FROM Positions
INNER JOIN Members ON member_id = Members.member_id;

--------Philanthropy_Events-------- 
--Query for adding a philanthropy event
INSERT INTO Philanthropy_Events(event_name, event_type, event_entry, event_status)
VALUES(:event_nameInput, :event_typeInput, :event_entryInput, event_statusInput);

--Query for reading event information
SELECT * FROM Philanthropy_Events;

--------Chapter_Philanthropies-------- (will add, read, delete, update)
--Query for adding a chapter to a philanthropy event
SELECT chapter_id, chapter_name FROM Chapters;
SELECT event_id, event_name FROM Philanthropy_Events;
INSERT INTO Chapter_Philanthropies(philanthropy_role, chapter_id, event_id)
VALUES(:philanthropy_roleInput, :chapter_id_from_dropdown_Input, :event_id_from_dropdown_Input);

--Query for reading chapter participation in philanthropies information
SELECT chapter_philanthropy_id, philanthropy_role, Chapter.chapter_name AS chapter_id, Philanthropy_Events.event_name AS event_id 
FROM Chapter_Philanthropies
INNER JOIN Chapters ON chapter_id = Chapters.chapter_id
INNER JOIN Philanthropy_Events ON event_id = Philanthropy_Events.event_id;

--Query for updating chapter philanthropy paticipation
SELECT chapter_philanthropy_id, philanthropy_role, Chapter.chapter_name AS council_id, Philanthropy_Events.event_name AS event_id
    FROM Chapter_Philanthropies
    WHERE chapter_philanthropy_id = :chapter_philanthropy_ID_selection_from_page;
UPDATE Chapter_Philanthropies
    SET philanthropy_role = :philanthropy_roleInput, chapter_id = :chapter_id_from_dropdown_Input, event_id :event_id_from_dropdown_Input
    WHERE chapter_philanthropy_id= :chapter_philanthropy_ID_from_the_update_form;

--Query for deleting chapter philanthropy participation
DELETE FROM Chapter_Philanthropies WHERE chapter_philanthropy_id = :chapter_philanthropy_ID_selection_from_page





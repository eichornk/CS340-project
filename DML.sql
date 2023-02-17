--------Councils--------
--Query for adding a council
INSERT INTO Councils(council_name)
VALUES (:council_nameInput);

--Query for reading council information
SELECT * FROM Councils;

--------Chapters--------
--Query for adding a chapter
SELECT council_id, council_name FROM Councils
SELECT event_id, event_name FROM Philanthropy_Events
INSERT INTO Chapters(chapter_name, nickname, colors, philanthropy, housed, address, council_id, event_id)
VALUES (:chapter_nameInput, :nicknameInput, ;colorsInput, :philanthropyInput, :housedInput, :council_id_from_dropdown_Input, :event_id_from_dropdown_Input);

--Query for reading chapter information
SELECT chapter_id, chapter_name, nickname, colors, philanthropy, housed, address, Councils.council_name AS council_id, Philanthropy_Events.philanthropy_name AS event_id  
FROM Chapters
INNER JOIN Councils ON council_id = Councils.council_id
INNER JOIN Philanthropy_Events ON event_id = Philanthropy_Events.event_id;

--------Members-------- (will add, read, delete, update)
--Query for adding 

--------Positions-------- (will add, read)

--------Philanthropy_Events-------- (will add, read)

--------Chapter_Philanthropies-------- (will add, read, delete, update)





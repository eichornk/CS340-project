// Citation for the following code:
// Date: 3/20/2023
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app) specifically step 8 on updating data.
// The code was adapted to match the attributes of the chapter philanthropies table in order to update records in the table
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

// Get the objects we need to modify
let updateChapterPhilanthropyForm = document.getElementById('update-chapter-philanthropy-form-ajax');

// Modify the objects we need
updateChapterPhilanthropyForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputChapterPhilanthropyId = document.getElementById("mySelect");
    let inputPhilanthropyRole = document.getElementById("update-philanthropy-role");
    let inputEventId = document.getElementById("input-event-id-update");
    let inputChapterId = document.getElementById("input-chapter-id-update");

    // Get the values from the form fields
    let ChapterPhilanthropyIdValue = inputChapterPhilanthropyId.value;
    let PhilanthropyRoleValue = inputPhilanthropyRole.value;
    let EventIdValue = inputEventId.value;
    let ChapterIdValue = inputChapterId.value;

    if (isNaN(ChapterPhilanthropyIdValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        chapter_philanthropy_id: ChapterPhilanthropyIdValue,
        philanthropy_role: PhilanthropyRoleValue,
        event_id: EventIdValue,
        chapter_id: ChapterIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-chapterphilo-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, ChapterPhilanthropyIdValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})
function updateRow(data, ChapterPhilanthropyID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("chapter-philanthropies-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == ChapterPhilanthropyID) {

            // Get the location of the row where we found the matching chapter philanthropy ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let role = updateRowIndex.getElementsByTagName("td")[2];
            let eventID = updateRowIndex.getElementsByTagName("td")[3];
            let chapterID = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign chapter to id we assigned it to
            role.innerHTML = parsedData[0].philanthropy_role; 
            eventID.innerHTML = parsedData[0].event_id;
            chapterID.innerHTML = parsedData[0].chapter_id;
       }
    }
}
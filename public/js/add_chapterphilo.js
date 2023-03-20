// Citation for the following code:
// Date: 3/20/2023
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app) specifically step 5 on adding new data.
// The code was adapted to match the attributes of the chapter philanthropies table in order to add new records to the table
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addChapterPhilanthropyForm = document.getElementById('add-chapter-philanthropy-form-ajax');

// Modify the objects we need
addChapterPhilanthropyForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPhilanthropyRole = document.getElementById("input-philanthropy-role");
    let inputEvent = document.getElementById("input-event-ajax"); //was input-event-id
    let inputChapter = document.getElementById("input-chapter-ajax"); //was input-chapter-id

    // Get the values from the form fields
    let PhilanthropyRoleValue = inputPhilanthropyRole.value;
    let EventValue = inputEvent.value;
    let ChapterValue = inputChapter.value;

    // Put our data we want to send in a javascript object
    let data = {
        philanthropy_role: PhilanthropyRoleValue,
        event_id: EventValue,
        chapter_id: ChapterValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-chapterphilo-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPhilanthropyRole.value = '';
            inputEvent.value = '';
            inputChapter.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();                        // Reloads the website after user inputs data 
})


// Creates a single row from an Object representing a single record from 
// Chapter_Philanthropies
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("chapter-philanthropies-table");                     // fix here 

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let ChapterPhiloIdCell = document.createElement("TD");
    let PhilanthropyRoleCell = document.createElement("TD");
    let EventCell = document.createElement("TD");
    let ChapterCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    ChapterPhiloIdCell.innerText = newRow.chapter_philanthropy_id;
    PhilanthropyRoleCell.innerText = newRow.philanthropy_role;
    EventCell.innerText = newRow.event; //was event_id
    ChapterCell.innerText = newRow.chapter; //was chapter_id

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteChapterPhilanthropies(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(ChapterPhiloIdCell);
    row.appendChild(PhilanthropyRoleCell);
    row.appendChild(EventCell);
    row.appendChild(ChapterCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.chapter_philanthropies_id); //was just id
    
    // Add the row to the table
    currentTable.appendChild(row);
     // Find drop down menu, create a new option, fill data in the option (id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.chapter_philanthropy_id;
    selectMenu.add(option); 
}

// Citation for the following code:
// Date: 3/2/2023
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addEventForm = document.getElementById('add-event-form-ajax');

// Modify the objects we need
addEventForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEventName = document.getElementById("input-event-name");
    let inputEventType = document.getElementById("input-event-type");
    let inputEventEntry = document.getElementById("input-event-entry");
    let inputEventStatus = document.getElementById("input-event-status");

    // Get the values from the form fields
    let EventNameValue = inputEventName.value;
    let EventTypeValue = inputEventType.value;
    let EventEntryValue = inputEventEntry.value;
    let EventStatusValue = inputEventStatus.value;

    // Put our data we want to send in a javascript object
    let data = {
        event_name: EventNameValue,
        event_type: EventTypeValue,
        event_entry: EventEntryValue,
        event_status: EventStatusValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-event-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEventName.value = '';
            inputEventType.value = '';
            inputEventEntry.value = '';
            inputEventStatus.value = '';
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
    let currentTable = document.getElementById("events-table");                     // fix here 

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let EventNameCell = document.createElement("TD");
    let EventTypeCell = document.createElement("TD");
    let EventEntryCell = document.createElement("TD");
    let EventStatusCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    EventNameCell.innerText = newRow.event_name;
    EventTypeCell.innerText = newRow.event_type;
    EventEntryCell.innerText = newRow.event_entry;
    EventStatusCell.innerText = newRow.event_status;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteEvents(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(EventNameCell);
    row.appendChild(EventTypeCell);
    row.appendChild(EventEntryCell);
    row.appendChild(EventStatusCell);
    row.appendChild(deleteCell);

    //row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
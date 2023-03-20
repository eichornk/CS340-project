// Citation for the following code:
// Date: 3/20/2023
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app) specifically step 5 on adding new data.
// The code was adapted to match the attributes of the positions table in order to add new records to the table
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addPositionForm = document.getElementById('add-position-form-ajax');

// Modify the objects we need
addPositionForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPositionName = document.getElementById("input-position-name");
    let inputPositionResponsibility = document.getElementById("input-position-responsibility");
    let inputMemberId = document.getElementById("input-member-id");

    // Get the values from the form fields
    let PositionNameValue = inputPositionName.value;
    let PositionResponsibilityValue = inputPositionResponsibility.value;
    let MemberIdValue = inputMemberId.value;

    // Put our data we want to send in a javascript object
    let data = {
        position_name: PositionNameValue,
        position_responsibility: PositionResponsibilityValue,
        member_id: MemberIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-position-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPositionName.value = '';
            inputPositionResponsibility.value = '';
            inputMemberId.value = '';
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
// Positions
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("positions-table");                     // fix here 

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let PositionNameCell = document.createElement("TD");
    let PositionResponsibilityCell = document.createElement("TD");
    let MemberIdCell = document.createElement("TD");

    // Fill the cells with correct data
    PositionNameCell.innerText = newRow.position_name;
    PositionResponsibilityCell.innerText = newRow.position_responsibility;
    MemberIdCell.innerText = newRow.member_id;

    // Add the cells to the row 
    //row.appendChild(ChapterPhiloIdCell);
    row.appendChild(PositionNameCell);
    row.appendChild(PositionResponsibilityCell);
    row.appendChild(MemberIdCell);

    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
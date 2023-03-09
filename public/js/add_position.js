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
// Chapter_Philanthropies
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
    //let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    PositionNameCell.innerText = newRow.position_name;
    PositionResponsibilityCell.innerText = newRow.position_responsibility;
    MemberIdCell.innerText = newRow.member_id;

    // deleteCell = document.createElement("button");
    // deleteCell.innerHTML = "Delete";
    // deleteCell.onclick = function(){
    //     deleteChapterPhilanthropies(newRow.id);
    // };

    // Add the cells to the row 
    //row.appendChild(ChapterPhiloIdCell);
    row.appendChild(PositionNameCell);
    row.appendChild(PositionResponsibilityCell);
    row.appendChild(MemberIdCell);
    //row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);
     // Find drop down menu, create a new option, fill data in the option (id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("mySelect");
    // let option = document.createElement("option");
    // option.text = newRow.chapter_philanthropy_id;
    // option.value = newRow.chapter_id;
    // selectMenu.add(option); 
}
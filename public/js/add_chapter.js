// Citation for the following code:
// Date: 3/20/2023
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app) specifically step 5 on adding new data.
// The code was adapted to match the attributes of the chapter table in order to add new records to the table
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data

// Get the objects we need to modify
let addChapterForm = document.getElementById('add-chapter-form-ajax');

// Modify the objects we need
addChapterForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    //let inputChapterPhilanthropyId = document.getElementById("input-chapter-philanthropy-id");
    let inputChapterName = document.getElementById("input-chapter-name");
    let inputNickname = document.getElementById("input-nickname");
    let inputColors = document.getElementById("input-colors");
    let inputPhilanthropy = document.getElementById("input-philanthropy");
    let inputHoused = document.getElementById("input-housed");
    let inputAddress = document.getElementById("input-address");
    let inputCouncilId = document.getElementById("input-council-ajax");

    // Get the values from the form fields
    let ChapterNameValue = inputChapterName.value;
    let NicknameValue = inputNickname.value;
    let ColorsValue = inputColors.value;
    let PhilanthropyValue = inputPhilanthropy.value;
    let HousedValue = inputHoused.value;
    let AddressValue = inputAddress.value;
    let CouncilIdValue = inputCouncilId.value;

    // Put our data we want to send in a javascript object
    let data = {
        chapter_name: ChapterNameValue,
        nickname: NicknameValue,
        colors: ColorsValue,
        philanthropy: PhilanthropyValue,
        housed: HousedValue,
        address: AddressValue,
        council_id: CouncilIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-chapter-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputChapterName.value = '';
            inputNickname.value = '';
            inputColors.value = '';
            inputPhilanthropy.value = '';
            inputHoused.value = '';
            inputAddress.value = '';
            inputCouncilId.value = '';
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
// Chapters
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("chapter-table");                     // fix here 

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 7 cells
    let row = document.createElement("TR");
    let ChapterNameCell = document.createElement("TD");
    let NicknameCell = document.createElement("TD");
    let ColorsCell = document.createElement("TD");
    let PhilanthropyCell = document.createElement("TD");
    let HousedCell = document.createElement("TD");
    let AddressCell = document.createElement("TD");
    let CouncilIdCell = document.createElement("TD");

    // Fill the cells with correct data
    ChapterNameCell.innerText = newRow.chapter_name;
    NicknameCell.innerText = newRow.nickname;
    ColorsCell.innerText = newRow.colors;
    PhilanthropyCell.innerText = newRow.philanthropy;
    HousedCell.innerText = newRow.housed;
    AddressCell.innerText = newRow.address;
    CouncilIdCell.innerText = newRow.council_id;

    // Add the cells to the row 
    row.appendChild(ChapterNameCell);
    row.appendChild(NicknameCell);
    row.appendChild(ColorsCell);
    row.appendChild(PhilanthropyCell);
    row.appendChild(HousedCell);
    row.appendChild(AddressCell);
    row.appendChild(CouncilIdCell);
    
    // Add the row to the table
    currentTable.appendChild(row); 
}

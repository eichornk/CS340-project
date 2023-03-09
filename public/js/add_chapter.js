
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
    let inputCouncilId = document.getElementById("input-council-id");

    // Get the values from the form fields
    //let ChapterPhilanthropyIdValue = inputChapterPhilanthropyId.value;
    let ChapterNameValue = inputChapterName.value;
    let NicknameValue = inputNickname.value;
    let ColorsValue = inputColors.value;
    let PhilanthropyValue = inputPhilanthropy.value;
    let HousedValue = inputHoused.value;
    let AddressValue = inputAddress.value;
    let CouncilIdValue = inputCouncilId.value;

    // Put our data we want to send in a javascript object
    let data = {
        //chapter_philanthropy_id: ChapterPhilanthropyIdValue,
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
// Chapter_Philanthropies
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("chapter-table");                     // fix here 

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
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

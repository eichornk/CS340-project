// Get the objects we need to modify
let addMemberForm = document.getElementById('add-member-form-ajax');

// Modify the objects we need
addMemberForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-first-name");
    let inputLastName = document.getElementById("input-last-name");
    let inputAddress = document.getElementById("input-address");
    let inputEmailAddress = document.getElementById("input-email-address");
    let inputMajor = document.getElementById("input-major");
    let inputChapterId = document.getElementById("input-chapter-id");
    

    // Get the values from the form fields
    let FirstNameValue = inputFirstName.value;
    let LastNameValue = inputLastName.value;
    let AddressValue = inputAddress.value;
    let EmailAddressValue = inputEmailAddress.value;
    let MajorValue = inputMajor.value;
    let ChapterIdValue = inputChapterId.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        first_name: FirstNameValue,
        last_name: LastNameValue,
        address: AddressValue,
        email_address: EmailAddressValue,
        major: MajorValue,
        chapter_id: ChapterIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-member-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputAddress.value = '';
            inputEmailAddress.value = '';
            inputMajor.value = '';
            inputChapterId.value = '';
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
    let currentTable = document.getElementById("members-table");                     // fix here 

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let FirstNameCell = document.createElement("TD");
    let LastNameCell = document.createElement("TD");
    let AddressCell = document.createElement("TD");
    let EmailAddressCell = document.createElement("TD");
    let MajorCell = document.createElement("TD");
    let ChapterIdCell = document.createElement("TD");
    //let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    FirstNameCell.innerText = newRow.first_name;
    LastNameCell.innerText = newRow.last_name;
    AddressCell.innerText = newRow.address;
    EmailAddressCell.innerText = newRow.email_address;
    MajorCell.innerText = newRow.major;
    ChapterIdCell.innerText = newRow.chapter_id;

    // deleteCell = document.createElement("button");
    // deleteCell.innerHTML = "Delete";
    // deleteCell.onclick = function(){
    //     deleteChapterPhilanthropies(newRow.id);
    // };

    // Add the cells to the row 
    //row.appendChild(ChapterPhiloIdCell);
    row.appendChild(FirstNameCell);
    row.appendChild(LastNameCell);
    row.appendChild(AddressCell);
    row.appendChild(EmailAddressCell);
    row.appendChild(MajorCell);
    row.appendChild(ChapterIdCell);

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
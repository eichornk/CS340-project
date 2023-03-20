// Citation for the following code:
// Date: 3/20/2023
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app) specifically step 7 on deleting new data.
// The code was adapted to match the attributes of the events table in order to delete records from the table
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data 

function deleteEvents(EventID) {
 // Put our data we want to send in a javascript object
 let data = {
    id: EventID
};

// Setup our AJAX request
var xhttp = new XMLHttpRequest();
xhttp.open("DELETE", "/delete-event-ajax", true);
xhttp.setRequestHeader("Content-type", "application/json");

// Tell our AJAX request how to resolve
xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {

        // Add the new data to the table
        deleteRow(EventID);

    }
    else if (xhttp.readyState == 4 && xhttp.status != 204) {
        console.log("There was an error with the input.")
    }
}
// Send the request and wait for the response
xhttp.send(JSON.stringify(data));
}

function deleteRow(EventID){

let table = document.getElementById("events-table");
for (let i = 0, row; row = table.rows[i]; i++) {
   //iterate through rows
   //rows would be accessed using the "row" variable assigned in the for loop
   if (table.rows[i].getAttribute("data-value") == EventID) {
        table.deleteRow(i);
        break;
   }
}
}
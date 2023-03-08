// Citation for the following code:
// Date: 3/2/2023
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP for a simple web app 
*/

// Express
var express = require('express');                           // We are using the express library for the web server
var app     = express(); 

// app.js - SETUP section 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))                           // We need to instantiate an express object to interact with the server in our code

PORT        = 65062;                                        // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');                 // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));              // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                             // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// Route to index 
app.get('/', function(req, res)
{
    res.render('index');                                    // Note the call to render() and not send(). Using render() ensures the templating engine
});                                                         // will process this file, before sending the finished HTML to the client.

// Route to chapterphilo 
app.get('/chapterphilo', function (req, res)              
{
    let query1 = "SELECT * FROM Chapter_Philanthropies;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('chapterphilo', { data: rows });         // Here I changed 'Chapter_Philanthropy' to 'chapterphilo' and the routing process worked 
        })
});

app.post('/add-chapterphilo-ajax', function(req, res){

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    // Capture NULL values - I think we can remove this section if they have to pick a value 
    // let chapter_philanthropy_id = parseInt(data['input-chapter-philanthropy-id']);
    // if (isNaN(chapter_philanthropy_id))                            // If philanthropyRole is nothing it will replace it with NULL. Not 100% sure if these are
    // {                                                       // allowed to be NULL values so I will look into this later 
        // chapter_philanthropy_id = 'NULL'                              
    // }

    let philanthropyRole = parseInt(data['input-philanthropy-role']);
    if (isNaN(philanthropyRole))                            // If philanthropyRole is nothing it will replace it with NULL. Not 100% sure if these are
    {                                                       // allowed to be NULL values so I will look into this later 
        philanthropyRole = 'NULL'                              
    }

    let eventID = parseInt(data['input-event-id']);
    if (isNaN(eventID))
    {
        eventID = 'NULL'
    }

    let chapterID = parseInt(data['input-chapter-id']);
    if (isNaN(chapterID))
    {
        chapterID = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Chapter_Philanthropies (philanthropy_role, event_id, chapter_id) VALUES ('${philanthropyRole}', ${eventID}, ${chapterID})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
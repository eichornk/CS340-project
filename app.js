// Citation for the following code:
// Date: 3/2/2023
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP for a simple web app 
*/

// Express
var express = require('express');   // We are using the express library for the web server
var app     = express(); 

// app.js - SETUP section 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))           // We need to instantiate an express object to interact with the server in our code

PORT        = 65062;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
    res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.

app.get('/chapterphilo', function (req, res)
    {
    let query1 = "SELECT * FROM Chapter_Philanthropies;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('chapterphilo', { data: rows });
        })
    });

/*
// Function Reads Chapter Philanthropies table
app.get('/chapterphilo', function (req, res)
{
    let query1 = "SELECT * FROM Chapter_Philanthropies;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('chapterphilo', { data: rows });             //'Chapter_Philanthropy vs. chapterphilo? 
    })
});
*/

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
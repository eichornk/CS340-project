// Citation for the following code:
// Date: 3/2/2023
// Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app)
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
/*
    SETUP for a simple web app 
*/
// Express
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
var express = require('express');   // We are using the express library for the web server
var app     = express(); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))           // We need to instantiate an express object to interact with the server in our code
PORT        = 65062;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/', function(req, res)
{
    res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
});                                         // will process this file, before sending the finished HTML to the client.
//Function Reads Chapter Philanthropies table
app.get('/chapterphilos', function (req, res) {
    let query1 = "SELECT * FROM Chapter_Philanthropies;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('chapter_philanthropies', { data: rows });
    })
});

//Function adds Chapter Philanthropy
app.post('/add-chapter-philanthropy-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    // Create the query and run it on the database
    query1 = `INSERT INTO Chapter_Philanthropies (philanthropy_role, event_id, chapter_id) VALUES ('${data.philanthropy_role}', ${data.event_id}, ${data.chapter_id})`;
    db.pool.query(query1, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Chapter_Philanthropies;`;
            db.pool.query(query2, function(error, rows, fields){
                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
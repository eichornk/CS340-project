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

// Route to chapterphilo ---------------------------------------------------------------------------------------------------
//Attempt at Dropdown functionality for update operation with dropdown
// app.get('/chaperphilo', function(req, res)
// {
//     let query1 = "SELECT * FROM Chapter_Philanthropies;";
//     let query2 = "SELECT * FROM Chapters;";

//     // Run the 1st query
//     db.pool.query(query1, function(error, rows, fields){
        
//         // Save the chapter_philanthropies
//         let chapter_philo = rows;
        
//         // Run the second query
//         db.pool.query(query2, (error, rows, fields) => {
            
//             // Save the chapter
//             let chapter = rows;

//             // Construct an object for reference in the table
//             // Array.map is awesome for doing something with each
//             // element of an array.
//             let chaptermap = {}
//             chapters.map( chapter=> {
//                 let id = parseInt(chapter.chapter_id, 10);

//                 chaptermap[id] = chapter["name"];
//             })

//             // Overwrite the homeworld ID with the name of the planet in the people object
//             chapter_philo = chapter_philo.map(chapter_philanthropy_id => {
//                 return Object.assign(chapter_philanthropy_id, {homeworld: chaptersmap[chapter_philanthropy_id.chapter_id]})
//             })

//             // END OF NEW CODE
//             return res.render('chapterphilo', {data: chapter_philo, chapters: chapter});
//         })
//     })
// });
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

    let philanthropyRole = data.philanthropy_role;
    let eventID = parseInt(data.event_id);
    let chapterID = parseInt(data.chapter_id);

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

app.delete('/delete-chapterphilo-ajax/', function(req,res,next){
    let data = req.body;
    let ChapterPhilanthropyID = parseInt(data.id);
    let deleteEvent= `DELETE FROM Philanthropy_Events WHERE event_id = ?`;
    let deleteChapter= `DELETE FROM Chapters WHERE chapter_id = ?`;
    let deleteChapterPhilanthropies= `DELETE FROM Chapter_Philanthropies WHERE chapter_philanthropy_id = ?`;
  
          // Run the 1st query
          db.pool.query(deleteEvent, [ChapterPhilanthropyID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteChapter, [ChapterPhilanthropyID], function(error, rows, fields) {
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } 
                      else {
                            db.pool.query(deleteChapterPhilanthropies, [ChapterPhilanthropyID], function(error, rows, fields) {
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);
                             } else {
                                res.sendStatus(204);
                            }
                        })
                      }
                  })
              }
  })});

  app.put('/put-chapterphilo-ajax', function(req,res,next){
    let data = req.body;
  
    let chapter = parseInt(data.chapter_id);
    let chapter_philanthropy = parseInt(data.chapter_philanthropy_id);
  
    let queryUpdateChapterPhilanthropy = `UPDATE Chapter_Philanthropies SET chapter_id = ? WHERE Chapter_Philanthropies.chapter_philanthropies_id = ?`;
    let selectChapter = `SELECT * FROM Chapters WHERE chapter_id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateChapterPhilanthropy, [chapter, chapter_philanthropy], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectChapter, [chapter], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});
  

// Route to chapters ---------------------------------------------------------------------------------------------------
app.get('/chapters', function (req, res)              
{
    let query1 = "SELECT * FROM Chapters;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('chapters', { data: rows });         
        })
});

app.post('/add-chapter-ajax', function(req, res){

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    let chapterName = data.chapter_name;
    let nickname = data.nickname;
    let colors = data.colors;
    let philanthropy = data.philanthropy;
    let housed = data.housed;
    let address = data.address;
    let councilId = parseInt(data.council_id);

    // Create the query and run it on the database
    query1 = `INSERT INTO Chapters (chapter_name, nickname, colors, philanthropy, housed, address, council_id) VALUES ('${chapterName}', '${nickname}', '${colors}', '${philanthropy}', ${housed}, '${address}', ${councilId})`;
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

// Route to events ---------------------------------------------------------------------------------------------------
app.get('/events', function (req, res)              
{
    let query1 = "SELECT * FROM Philanthropy_Events;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('events', { data: rows });         
        })
});
app.post('/add-event-ajax', function(req, res){

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    let EventName = data.event_name;
    let EventType = data.event_type;
    let EventEntry = data.event_entry;
    let EventStatus = data.event_status;

    // Create the query and run it on the database
    query1 = `INSERT INTO Philanthropy_Events (event_name, event_type, event_entry, event_status) VALUES ('${EventName}', '${EventType}', ${EventEntry}, '${EventStatus}')`;
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

app.delete('/delete-event-ajax/', function(req,res,next){
    let data = req.body;
    let EventID = parseInt(data.id);
    let deleteEvents= `DELETE FROM Philanthropy_Events WHERE event_id = ?`;
  
          // Run the 1st query
          db.pool.query(deleteEvents, [EventID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);
                }
             })
    });

 // Route to councils ---------------------------------------------------------------------------------------------------
app.get('/councils', function (req, res)              
{
    let query1 = "SELECT * FROM Councils;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('councils', { data: rows });         
        })
});
app.post('/add-council-ajax', function(req, res){

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    let CouncilName = data.council_name;
    // Create the query and run it on the database
    query1 = `INSERT INTO Councils (council_name) VALUES ('${CouncilName}')`;
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
// Route to members ---------------------------------------------------------------------------------------------------
//Attempt at Search Bar
// app.get('/', function(req, res)
// {
//     // Declare Query 1
//     let query1;

//     // If there is no query string, we just perform a basic SELECT
//     if (req.query.lname === undefined)
//     {
//         query1 = "SELECT * FROM Members;";
//     }

//     // If there is a query string, we assume this is a search, and return desired results
//     else
//     {
//         query1 = `SELECT * FROM Members WHERE last_name LIKE "${req.query.lname}%"`
//     }

//     // Query 2 is the same in both cases
//     let query2 = "SELECT * FROM Chapters;";

//     // Run the 1st query
//     db.pool.query(query1, function(error, rows, fields){
        
//         // Save the people
//         let members = rows;
        
//         // Run the second query
//         db.pool.query(query2, (error, rows, fields) => {
            
//             // Save the planets
//             let chapters = rows;

//             return res.render('index', {data: members, chapters: chapters});
//         })
//     })
// });

app.get('/members', function (req, res)              
{
    let query1 = "SELECT * FROM Members;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('members', { data: rows });         
        })
});

app.post('/add-member-ajax', function(req, res){

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    let firstName = data.first_name;
    let lastName = data.last_name;
    let address = data.address;
    let emailAddress = data.email_address;
    let major = data.major;
    let chapterID = parseInt(data.chapter_id);

    // Create the query and run it on the database
    query1 = `INSERT INTO Members (first_name, last_name, address, email_address, major, chapter_id) VALUES ('${firstName}', '${lastName}', '${address}', '${emailAddress}', '${major}', ${chapterID})`;
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


// Route to Positions -----------------------------------------------------------------------------------
app.get('/positions', function (req, res)              
{
    let query1 = "SELECT * FROM Positions;";
    db.pool.query(query1, function (error, rows, fields) {
        res.render('positions', { data: rows });         
        })
});

app.post('/add-position-ajax', function(req, res){

    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    console.log(data);

    let positionName = data.position_name;
    let positionResponsibility = data.position_responsibility;
    let memberID = parseInt(data.member_id);

    // Create the query and run it on the database
    query1 = `INSERT INTO Positions (position_name, position_responsibility, member_id) VALUES ('${positionName}', '${positionResponsibility}', ${memberID})`;
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
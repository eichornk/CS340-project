# CS340 Final Project
## Go Greek Database
### Overview of Website and Database
The Center for Fraternity and Sorority Life at Oregon State University is home to a community of 3,200 members on campus and manages information about all of these students, councils, and chapters. There are 5 councils with over 46 chapters between the 5 of them. Every member of Greek Life can only be a part of one council and chapter. Within their chapters, members can also hold one or many positions or they can hold no positions at all. Of the 46 chapters, 27 are fraternities and 19 are sororities. Additionally, 29 of the chapters are housed, which means they have a physical house where their members meet and live. Chapters that are not housed, will still have an address that is deemed their headquarters, which could be a different building on campus where they meet but no members live there. Every year there are around 60 philanthropy events hosted where many chapters can participate in many events. This means that every chapter can host events themselves that other chapters will participate in, but they also can participate in other chapters' philanthropies. The purpose of this database website is to identify what chapters and councils students at Oregon State are members of and also what positions these members may have within their chapter. The database also will identify what chapters are housed versus unhoused and philanthropy events that chapters are hosting and participating in. 

### Citations

For this database, the nodejs starter app that was provided by our Professors was adapted to meet the needs of our web and database design. 

The handlebars files located in the folder views were adapted from various steps of the starter app, specifically steps 3 through 8 to display the database properly and implement add, delete, and update operations.

Citation for the code in the folder called views:
Date: 3/20/2023
Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app) more specifically steps 3 and 5-8 that implement the design of the website.
The code was adapted to feature the same attribute names and entities as well as implementing dropdown menus. 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
Source for Dropdown Displays Menus: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%206%20-%20Dynamically%20Filling%20Dropdowns%20and%20Adding%20a%20Search%20Box 

The javascript files located in the public folder under js is used in adding, deleting, and updating database tables were adapted from the steps 5 through 8 of the nodejs starter app to make sure these operations were functional. 

Citation for the code in the folder called public/js:
Date: 3/20/2023
Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app) more specifically steps 5-8 that implement add, update, and delete functions to the website.
The code was adapted to feature the same attribute names and entities. 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
Source for Add Functions: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%205%20-%20Adding%20New%20Data
Source for Update Functions:https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data 
Source for Delete Functions: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%207%20-%20Dynamically%20Deleting%20Data

The app.js file was set up from beginning stages of the nodejs starter app in steps 1 and 2 and then were evolved to implement the add, update, read, and delete functions as well as to match the DML file that offers queries on how to access data from the database. 

Citation for the app.js file:
Date: 3/20/2023
Copied and adapted from OSU GitHub (osu-cs340-ecampus) project (nodejs-starter-app).
The code was adapted to implement queries from the DML file and the tables of the database as far as attribute and entity names. 
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app



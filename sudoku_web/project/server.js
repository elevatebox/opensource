const express = require('express');// taking express and using it to create server to make http request easier
const bodyParser = require('body-parser');// to parse the incoming data
const path = require('path');// The path module in Node.js is used to work with file and directory paths.
const { generateSudoku } = require('./utils/sudokuGenerator');// is used to import a specific function, generateSudoku, from a file called sudokuGenerator.js located in the utils folder.
const { validateSudoku } = require('./utils/sudokuValidator');// is used to import the validateSudoku function from a file called sudokuValidator.js located in the utils folder.

const app = express();// The line const app = express(); is used to create an instance of an Express application in a Node.js server.
const PORT = 3000;// is used to define a constant that stores the port number on which your Express server (or any Node.js server) will listen for incoming requests.

app.use(bodyParser.json());//  is used to set up middleware in your Express application that parses incoming request bodies with JSON payloads.
app.use(express.static('public'));//  is used to serve static files (like images, CSS files, JavaScript files, etc.) from a directory called public in your Express application.

//this is get request for the code
app.get('/api/new-game', (req, res) => {//  is used to define a GET route in an Express application.
  const puzzle = generateSudoku();//  is used to invoke a function called generateSudoku() and assign the result to the variable puzzle.
  res.json({ puzzle });//  is used to send a JSON response back to the client from an Express route handler.
});

//this is post request for the code 
app.post('/api/validate', (req, res) => {//is used to define a POST route in an Express application. Specifically, it sets up a route that listens for POST requests sent to the /api/validate URL.
  const { board } = req.body;//is used to extract the board property from the request body in an Express route handler.
  const isValid = validateSudoku(board);//is used to invoke the validateSudoku function and check whether the board (likely representing a Sudoku puzzle) is valid according to the rules of Sudoku.
  res.json({ isValid });//is used in an Express route handler to send a JSON response back to the client, typically indicating whether a particular operation (like validating a Sudoku puzzle) was successful or not.
});

app.listen(PORT, () => {//is used to start the Express server and have it listen for incoming HTTP requests on a specified port.
  console.log(`Server running on port ${PORT}`);//is used to log a message to the console that confirms the server is successfully running and listening on the specified port.
});
// Import the required modules
const express = require('express'); // Framework for building web applications
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies

// Define an array of books with initial data
const books = [ // Array holding objects representing books
    {
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available" // Indicates the availability of the book
    },
    {
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    }
];

// Create an instance of the Express app
const app = express();

// Set the template engine to EJS (Embedded JavaScript Templates)
app.set('view engine', 'ejs');

// Use body-parser middleware to parse JSON and URL-encoded data from requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to render the home page
app.get("/", function (req, res) {
    // Render the "home" view and pass the books array as "data"
    res.render("home", {
        data: books
    });
});

// Define a POST route to add a new book to the array
app.post("/", (req, res) => {
    // Extract book details from the request body
    const inputBookName = req.body.bookName;
    const inputBookAuthor = req.body.bookAuthor;
    const inputBookPages = req.body.bookPages;
    const inputBookPrice = req.body.bookPrice;

    // Add the new book to the books array
    books.push({
        bookName: inputBookName,
        bookAuthor: inputBookAuthor,
        bookPages: inputBookPages,
        bookPrice: inputBookPrice,
        bookState: "Available" // Default state for new books is "Available"
    });

    // Re-render the home page with the updated books array
    res.render("home", {
        data: books
    });
});

// Define a POST route to mark a book as "Issued"
app.post('/issue', (req, res) => {
    const requestedBookName = req.body.bookName; // Extract the book name from the request body
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Issued"; // Update the book's state to "Issued"
        }
    });
    res.render("home", {
        data: books // Re-render the home page with updated data
    });
});

// Define a POST route to mark a book as "Available" (returning it)
app.post('/return', (req, res) => {
    const requestedBookName = req.body.bookName; // Extract the book name from the request body
    books.forEach(book => {
        if (book.bookName == requestedBookName) {
            book.bookState = "Available"; // Update the book's state to "Available"
        }
    });
    res.render("home", {
        data: books // Re-render the home page with updated data
    });
});

// Define a POST route to delete a book from the array
app.post('/delete', (req, res) => {
    const requestedBookName = req.body.bookName; // Extract the book name from the request body
    let j = 0; // Index variable to track the current position in the array
    books.forEach(book => {
        j = j + 1; // Increment the index
        if (book.bookName == requestedBookName) {
            books.splice((j - 1), 1); // Remove the book at the specified index
        }
    });
    res.render("home", {
        data: books // Re-render the home page with updated data
    });
});

// Start the Express app and listen on port 3000
app.listen(3000, (req, res) => {
    console.log("App is running on port 3000"); // Log a message indicating the server is running
});

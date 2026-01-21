# Complete Web Development Guide

> **IMPORTANT**: Before diving into this guide, it is mandatory to complete these courses from freeCodeCamp:
> 
> 🌟 [Responsive Web Design Certification (2022)](https://www.freecodecamp.org/learn/2022/responsive-web-design/)
>
> This course will teach you:
> - HTML and HTML5 fundamentals
> - CSS basics and responsive design
> - Flexbox and Grid layouts
> - Accessibility principles
> - Responsive web design projects


## Table of Contents
1. [HTML Elements](#html-elements)
2. [CSS Fundamentals](#css-fundamentals)
3. [JavaScript Essentials](#javascript-essentials)

## HTML Elements

### Document Structure
- `<!DOCTYPE html>` - Declares the document type and version of HTML
- `<html>` - Root element of an HTML page
- `<head>` - Contains metadata and document information
- `<title>` - Defines the document title in browser tab
- `<meta>` - Specifies metadata like character encoding and viewport
- `<link>` - Links external resources, typically CSS files
- `<script>` - Embeds or references JavaScript code
- `<style>` - Contains internal CSS styles

### Content Structure
- `<body>` - Contains all visible content
- `<header>` - Introductory content or navigation
- `<nav>` - Navigation links
- `<main>` - Main content of the document
- `<article>` - Self-contained content
- `<section>` - Thematic grouping of content
- `<aside>` - Sidebar content
- `<footer>` - Footer content

### Text Content
- `<h1>` to `<h6>` - Heading levels
- `<p>` - Paragraph
- `<span>` - Inline container
- `<div>` - Block-level container
- `<br>` - Line break
- `<hr>` - Horizontal rule
- `<pre>` - Preformatted text

### Lists
- `<ul>` - Unordered list
- `<ol>` - Ordered list
- `<li>` - List item
- `<dl>` - Description list
- `<dt>` - Description term
- `<dd>` - Description details

### Links and Media
- `<a>` - Hyperlink
- `<img>` - Image
- `<video>` - Video content
- `<audio>` - Audio content
- `<iframe>` - Nested browsing context
- `<canvas>` - Drawing graphics

### Forms
- `<form>` - Form container
- `<input>` - Input field
- `<textarea>` - Multiline text input
- `<button>` - Clickable button
- `<select>` - Dropdown list
- `<option>` - Option in select element
- `<label>` - Label for form elements
- `<fieldset>` - Groups form elements
- `<legend>` - Caption for fieldset

## CSS Fundamentals

### Selectors
```css
/* Basic Selectors */
element       /* Element selector */
.class        /* Class selector */
#id           /* ID selector */
*             /* Universal selector */
element.class /* Element with class */
element#id    /* Element with ID */

/* Combinators */
ancestor descendant  /* Descendant selector */
parent > child      /* Direct child */
element1 + element2 /* Adjacent sibling */
element1 ~ element2 /* General sibling */

/* Pseudo-classes */
:hover
:active
:focus
:first-child
:last-child
:nth-child(n)
:not(selector)

/* Pseudo-elements */
::before
::after
::first-letter
::first-line
```

### Box Model Properties
```css
/* Dimensions */
width
height
max-width
max-height
min-width
min-height

/* Spacing */
margin
padding
border
border-radius

/* Box Behavior */
box-sizing
overflow
display
```

### Typography
```css
font-family
font-size
font-weight
font-style
line-height
text-align
text-decoration
text-transform
letter-spacing
word-spacing
```

### Layout
```css
/* Positioning */
position: static | relative | absolute | fixed | sticky
top
right
bottom
left
z-index

/* Flexbox */
display: flex
flex-direction
justify-content
align-items
flex-wrap
flex-grow
flex-shrink
flex-basis

/* Grid */
display: grid
grid-template-columns
grid-template-rows
grid-gap
grid-column
grid-row
```

### Visual Styling
```css
/* Colors and Backgrounds */
color
background-color
background-image
background-position
background-size
background-repeat

/* Effects */
box-shadow
text-shadow
opacity
transform
transition
animation
```

## JavaScript Essentials

### Variables and Data Types
```javascript
// Variable declarations
let variableName = value;
const constantName = value;
var oldWayToDeclave = value;

// Data Types
// Number
let num = 42;
// String
let str = "Hello";
// Boolean
let bool = true;
// Array
let arr = [1, 2, 3];
// Object
let obj = {key: "value"};
// Null
let empty = null;
// Undefined
let notDefined;
```

### Functions
```javascript
// Function Declaration
function functionName(parameter1, parameter2) {
    return value;
}

// Arrow Function
const arrowFunction = (param1, param2) => {
    return value;
};

// Callback Function
array.forEach(item => {
    console.log(item);
});

// Async Function
async function fetchData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

### Control Structures
```javascript
// Conditionals
if (condition) {
    // code
} else if (anotherCondition) {
    // code
} else {
    // code
}

// Switch Statement
switch (value) {
    case 1:
        // code
        break;
    default:
        // code
}

// Loops
for (let i = 0; i < array.length; i++) {
    // code
}

while (condition) {
    // code
}

do {
    // code
} while (condition);

// Array Methods
array.forEach()
array.map()
array.filter()
array.reduce()
array.find()
array.some()
array.every()
```

### DOM Manipulation
```javascript
// Selecting Elements
document.getElementById('id')
document.getElementsByClassName('class')
document.querySelector('selector')
document.querySelectorAll('selector')

// Modifying Elements
element.innerHTML = 'content'
element.textContent = 'text'
element.setAttribute('attr', 'value')
element.style.property = 'value'

// Event Handling
element.addEventListener('event', function(e) {
    // code
});

// Creating/Removing Elements
document.createElement('tag')
parent.appendChild(element)
parent.removeChild(element)
element.remove()
```

### AJAX and Fetch API
```javascript
// Fetch API
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Handle data
    })
    .catch(error => {
        // Handle error
    });

// Async/Await version
async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

### Error Handling
```javascript
try {
    // Code that might throw an error
} catch (error) {
    // Handle error
} finally {
    // Always executed
}

// Custom Error
throw new Error('Custom error message');
```

### ES6+ Features
```javascript
// Destructuring
const { property } = object;
const [first, second] = array;

// Spread Operator
const newArray = [...oldArray];
const newObject = {...oldObject};

// Template Literals
const message = `Hello ${name}`;

// Classes
class ClassName {
    constructor(param) {
        this.property = param;
    }

    method() {
        // code
    }
}

// Modules
export const function;
import { function } from './module';
```

Remember to:
1. Practice regularly
2. Build projects
3. Read documentation
4. Debug systematically
5. Keep up with new features and best practices

Additional Resources:
- MDN Web Docs
- JavaScript.info
- CSS-Tricks
- Can I Use
- GitHub
- Stack Overflow

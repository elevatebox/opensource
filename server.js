import express from 'express';     //importing express
import cors from 'cors';  //importing cors from the cors package
import { promises as fs } from 'fs';  // fs is file system
import { v4 as uuidv4 } from 'uuid';

const app = express();     // express is used to create servers
const PORT = 3000;  //port of the server

app.use(cors());  //allows restricted input or resources 
app.use(express.json());  //it allows js express application to parse input requests
app.use(express.static('public')); //it is used in express js app. when a file is requested it will search for iot in the public directory and give it

// Read tasks from JSON file
async function readTasks() {  //async function to read the tasks given
  const data = await fs.readFile('./data/tasks.json', 'utf8');   // reads file in async in a node.js application
    return JSON.parse(data); //converts a json string to a javascript object
}

// Write tasks to JSON file
async function writeTasks(tasks) {  //async function used to write given tasks
  await fs.writeFile('./data/tasks.json', JSON.stringify(tasks, null, 2));// writes data to a file asyncronously in a node js application
}

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const data = await readTasks(); // reads task in async in a node.js application
    res.json(data.tasks);
  } catch (error) {//handles any errors that occur during the task creation process.
    res.status(500).json({ error: 'Error reading tasks' });// Sets the HTTP status code to 500
  }
});

// Create new task
app.post('/api/tasks', async (req, res) => {
  try {
    const data = await readTasks();  // reads task in async in a node.js application
    const newTask = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    data.tasks.push(newTask);
    await writeTasks(data);// writes data to a file asyncronously in a node js application
    res.status(201).json(newTask); // used to indicate a resource has been created
  } catch (error) { //handles any errors that occur during the task creation process.
    res.status(500).json({ error: 'Error creating task' }); // Sets the HTTP status code to 500
  }
});

// Update task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const data = await readTasks();  // reads task in async in a node.js application
    const taskIndex = data.tasks.findIndex(task => task.id === req.params.id);// used to find index of the task using an array of tasks
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });//is used to send an HTTP response indicating that a requested resource
    }
    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...req.body };
    await writeTasks(data);// writes data to a file asyncronously in a node js application
    res.json(data.tasks[taskIndex]);
  } catch (error) {//handles any errors that occur during the task creation process.
    res.status(500).json({ error: 'Error updating task' });// Sets the HTTP status code to 500
  }
});

// Delete task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const data = await readTasks();  // reads task in async in a node.js application
    data.tasks = data.tasks.filter(task => task.id !== req.params.id);
    await writeTasks(data);// writes data to a file asyncronously in a node js application
    res.status(204).send();// used to indicate a resource has been created
  } catch (error) {//handles any errors that occur during the task deletion process.
    res.status(500).json({ error: 'Error deleting task' });// Sets the HTTP status code to 500
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  // this is used to start a server and listen to the port
});
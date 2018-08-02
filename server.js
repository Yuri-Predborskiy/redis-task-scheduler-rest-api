require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./src/routes');
const task = require('./src/services/task');

const app = express();

const port = process.env.PORT;
const WELCOME_TEXT = 'Welcome! POST to /api/schedule parameters { time: datetime (int), message: text (string) }';

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.get('/', (req, res) => res.json({message: WELCOME_TEXT}));
app.use('/api/', apiRoutes);

app.listen(port);
console.log(`App Runs on ${port}`);

// launch task mover, it moves tasks from one list into another when the time comes
task.moveTasksToList();
task.execTaskAsap();

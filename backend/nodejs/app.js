const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const database = require('./utils/database'); //import the database
const uploadController = require('./controllers/upload');

//Enable access to process.env
dotenv.config()

//Init Express
const app = express();
const port = process.env.PORT || 4000;

// parse requests as JSON
app.use(bodyParser.json());
//enable cors for all domains
app.use(cors());
//Serve public files
app.use(express.static('public'))

app.use('/api/', uploadController)

app.get('/', (req, res) => {
  res.send('Welcome to the API! Please visit /api-docs to see our documentation.');
});

// Start the server: Comment this code out if you're running tests
app.listen(port, async () => {
  await database();
  console.log(`Server started on port ${port}`);
});

module.exports = app;
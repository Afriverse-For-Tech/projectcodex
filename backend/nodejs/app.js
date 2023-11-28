const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
//Enable access to process.env
dotenv.config()

//controllers
const uploadController = require('./controllers/upload');

//Init Express
const app = express();
const port = process.env.PORT || 4000;

// parse requests as JSON
app.use(bodyParser.json());
//enable cors for all domains
app.use(cors());

/////////////////The API routes
app.get('/', (req, res) => {
  res.send('Welcome to the API! Please visit /api-docs to see our documentation.');
});

//Upload controller
app.use('/api/', uploadController)

// Start the server: Comment this code out if you're running tests
app.listen(port, async () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
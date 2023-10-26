const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route for the base URL  
app.get('/api/v1', (req, res) => {
  res.send('Hello World');
});

// Start the server: Comment this code out if you're running tests
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

module.exports = app;
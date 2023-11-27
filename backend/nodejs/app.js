const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appwrite = require("node-appwrite")
const waitlistRouter = require('./src/routes/waitlist')


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

const v1Router = express.Router()
v1Router.use("/waitlist", waitlistRouter)


app.use('/api/v1', v1Router)

app.get('/', (req, res) => {
  res.send('Welcome to the API! Please visit /api-docs to see our documentation.');
});

// Start the server: Comment this code out if you're running tests
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

module.exports = app;
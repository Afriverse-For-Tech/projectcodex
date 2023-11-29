import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from 'body-parser';
import WaitlistRouter from './routes/waitlist.routes';

import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());

app.use("/waitlist", WaitlistRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

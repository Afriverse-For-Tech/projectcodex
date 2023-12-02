import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from 'body-parser';
import WaitlistRouter from './routes/waitlist.routes';
import expressWinston from 'express-winston';
import logger from './logging/winston.config';

import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(expressWinston.logger({ winstonInstance: logger }));

app.use(bodyParser.json());
app.use(cors());

const v1Router = express.Router();
v1Router.use("/waitlist", WaitlistRouter);
app.use("/api/v1", v1Router);



app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.use(expressWinston.errorLogger({ winstonInstance: logger }));
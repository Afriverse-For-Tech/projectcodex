import { Router } from "express";
import WaitlistController from "../controllers/waitlist.controller";

const WaitlistRouter = Router();

WaitlistRouter.post("/join", WaitlistController.joinWaitlist);

export default WaitlistRouter;
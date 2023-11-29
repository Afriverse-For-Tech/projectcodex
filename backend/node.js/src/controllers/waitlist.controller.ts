import WaitlistService from "../services/waitlist.service";
import WaitlistValidator from "../validators/waitlist.validator";
import logger from "../logging/winston.config";
import { Request, Response } from "express";

const waitlistService = new WaitlistService();
const waitlistValidator = new WaitlistValidator();
class WaitlistController {

async joinWaitlist(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!waitlistValidator.validate({ email })) {
        res.status(400).json({ error: "Invalid email" });
        return;
    }

    try {
        const emailExists = await waitlistService.checkIfEmailExists(email);
        if (!emailExists) {
            await waitlistService.joinWaitlist(email);
            res.status(201).json({ status: true });
            const date = new Date();
            logger.info(`New waitlist entry created at ${date.toUTCString()} with email ${email}`);
        } else {
            res.status(409).json({ status: false, error: "Email already exists." })
        }
    } catch (error: any) {
        logger.error("Error joining waitlist: " + error);
        res.status(500).json({ status: false });
    }
}
}

export default new WaitlistController;
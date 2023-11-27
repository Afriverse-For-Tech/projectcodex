import WaitlistService from "../services/waitlist.service";
import WaitlistValidator from "../validators/waitlist.validator";
import { Request, Response } from "express";

class WaitlistController {
    private waitlistService = new WaitlistService();
    private waitlistValidator = new WaitlistValidator();

    async joinWaitlist(req: Request, res: Response): Promise<void> {
        const { email } = req.body;

        if (!this.waitlistValidator.validate({ email })) {
            res.status(400).json({ error: "Invalid email" });
            return;
        }

        try {
            if (await this.waitlistService.checkIfEmailExists(email)) {
                await this.waitlistService.joinWaitlist(email);
                res.status(201).json({ status: true });
            } else {
                res.status(409).json({status: false, error: "Email already exists."})
            }


        } catch (error: any) {
            console.error(error);
            res.status(500).json({ status: false });
        }
    }
}
import WaitlistModel from '../models/waitlist.model';
import EmailService from '../utils/email.service';
import logger from '../logging/winston.config';

class WaitlistService {
  private waitlistModel: WaitlistModel;

  constructor() {
    this.waitlistModel = new WaitlistModel();
  }

  async joinWaitlist(email: string): Promise<void> {
    try {
        await this.waitlistModel.addEmailToWaitlist(email);
        await this.sendWelcomeEmail(email);
    } catch (error) {
        logger.error("Error joining waitlist: " + error);
        throw error;
    }
  }

async checkIfEmailExists(email: string): Promise<boolean> {
  const emails = await this.waitlistModel.fetchEmails(email);
  return emails.length > 0;
}

  private async sendWelcomeEmail(email: string): Promise<void> {
    const subject = 'GitKraft: Welcome to our Waitlist!';
    const html = '<p>Thank you for joining our waitlist. We are excited to have you on board!</p>';
    
    try {
      await EmailService.sendEmail(email, subject, html);
    } catch (error) {
      logger.error("Error sending welcome email: " + error);
      throw error;
    }
  }
}

export default WaitlistService;

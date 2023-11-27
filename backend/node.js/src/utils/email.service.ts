import nodemailer from 'nodemailer';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      debug: true,
      logger: true,
      auth: {
        user: 'alexindevs@gmail.com',
        pass: process.env.EMAIL_PASS || '',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      const mailOptions = {
        from: 'alexindevs@gmail.com',
        to,
        subject,
        text: '',
        html: html || '',
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }
}

export default new EmailService();

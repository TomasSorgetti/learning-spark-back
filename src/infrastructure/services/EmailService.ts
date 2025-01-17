import nodemailer, { Transporter } from "nodemailer";
import { emailConfig } from "../config/email.config";
import { UnavailableError } from "../../shared/utils/app-errors";

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailConfig.EMAIL_USER,
        pass: emailConfig.EMAIL_PASS,
      },
    });
  }

  public async sendEmail(
    to: string,
    subject: string,
    body: string
  ): Promise<void> {
    const mailOptions = {
      from: emailConfig.EMAIL_USER,
      to,
      subject,
      text: body,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error: any) {
      console.error("Error sending email", error);
      throw new UnavailableError("Error sending email");
    }
  }
}

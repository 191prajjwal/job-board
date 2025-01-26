const nodemailer = require('nodemailer')

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendVerificationEmail(email, token) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Account Verification',
      html: `
        <h1>Verify Your Account</h1>
        <p>Click the link below to verify your account:</p>
        <a href="${process.env.FRONTEND_URL}/verify/${token}">Verify Account</a>
      `
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendJobAlertEmail(job, candidates) {
    const mailPromises = candidates.map(candidate => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: candidate,
        subject: `New Job Opportunity: ${job.title}`,
        html: `
          <h1>New Job Alert</h1>
          <h2>${job.title}</h2>
          <p>Experience Level: ${job.experienceLevel}</p>
          <p>Description: ${job.description}</p>
          <p>End Date: ${new Date(job.endDate).toLocaleDateString()}</p>
        `
      };

      return this.transporter.sendMail(mailOptions);
    });

    return Promise.all(mailPromises);
  }
}

module.exports= new EmailService();
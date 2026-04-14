const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendOtpEmail = async (email, otp) => {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "Password Reset OTP – Chetan Business School";
    sendSmtpEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <p>Hello,</p>
            <p>We received a request to reset your password.</p>
            <p style="font-size: 1.25rem; font-weight: bold; color: #1a365d;">Your OTP is ${otp}</p>
            <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
            <p>If you did not request this, please ignore this email.</p>
            <br>
            <p>Thanks & Regards,<br><strong>Chetan Business School</strong></p>
        </div>
    `;
    sendSmtpEmail.sender = { "name": "CBS Admin", "email": "nandeeshmn12@gmail.com" };
    sendSmtpEmail.to = [{ "email": email }];

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Brevo Email sent successfully. MessageId:', data.messageId);
        return data;
    } catch (error) {
        console.error('Brevo Email sending failed:', error);
        throw error;
    }
};

// Re-export as sendEmail for backward compatibility if needed, or just sendOtpEmail
module.exports = { sendOtpEmail, sendEmail: sendOtpEmail };

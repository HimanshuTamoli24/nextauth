// 51c84e0ae2e13e45274bd34157f58133

import bcrypt from 'bcryptjs';
import { config } from 'nextAuth/config/config';
import User from 'nextAuth/models/user.model';
import nodemailer from 'nodemailer';
// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2bceb3282fd855",
        pass: "464aac3d9110b2"
    }
});

export default transport

export const sendMail = async (emailType: string, email: string, userID: string) => {
    try {
        const hashedToken = await bcrypt.hash(userID.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
            })
        }
        const mailOptions = {
            from: "himanshutamoli2005@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <p>Click the link below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}:</p>
                <a href="${process.env.NEXTAUTH_URL}/auth/${emailType.toLowerCase()}?token=${hashedToken}">Click here</a>
                <p>This link will expire in 24 hours.</p> oe copy paste link
                <p>${process.env.NEXTAUTH_URL}/${emailType.toLowerCase()}?token=${hashedToken}</p>
                `
        };

        const res = await transport.sendMail(mailOptions);
        return res;

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }

}
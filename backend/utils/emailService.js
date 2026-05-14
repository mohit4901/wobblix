import nodemailer from 'nodemailer';

const sendOrderConfirmationEmail = async (order, userEmail) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            family: 4 // Force IPv4 to avoid ENETUNREACH errors on cloud providers like Render
        });

        const itemsList = order.items.map(item => `
            <div style="padding: 10px; border-bottom: 1px solid #eee;">
                <p style="margin: 0; font-weight: bold;">${item.name} x ${item.quantity}</p>
                <p style="margin: 0; font-size: 12px; color: #666;">Size: ${item.size} ${item.instruction ? `| Note: ${item.instruction}` : ''}</p>
            </div>
        `).join('');

        const mailOptions = {
            from: `"Wobblix Clothing" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Order Confirmed! Your Wobblix Drip is on the way 🚀',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #000; padding: 20px;">
                    <div style="text-align: center; background-color: #000; padding: 20px;">
                        <h1 style="color: #fff; margin: 0; letter-spacing: 5px;">WOBBLIX</h1>
                    </div>
                    <div style="padding: 20px;">
                        <h2>Hey there!</h2>
                        <p>Your order has been confirmed at Wobblix. Don't worry, our team is already working on getting your drip ready for dispatch.</p>
                        <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0;">
                            <h3 style="margin-top: 0;">Order Summary</h3>
                            ${itemsList}
                            <p style="text-align: right; font-weight: bold; font-size: 18px;">Total: ₹${order.amount}</p>
                        </div>
                        <p>We'll update you as soon as it's shipped!</p>
                        <hr />
                        <p style="font-size: 10px; color: #999;">If you have any questions, reply to this email or contact support@wobblixclothing.in</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent to:', userEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const sendVerificationOtpEmail = async (userEmail, otp) => {
    try {
        console.log('Attempting to send OTP email to:', userEmail);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            family: 4 // Force IPv4 to avoid ENETUNREACH errors on cloud providers like Render
        });

        const mailOptions = {
            from: `"Wobblix Clothing" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: 'Verify your Wobblix account',
            html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; background-color: #edece8; border: 1px solid #dcdad1; overflow: hidden; border-radius: 8px;">
                    <div style="background-color: #e60000; padding: 30px 0; text-align: center; border-bottom: 4px solid #000000;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 6px; text-transform: uppercase; font-weight: 900; text-shadow: 2px 2px 0px #000000;">Wobblix</h1>
                    </div>
                    <div style="padding: 40px 30px; text-align: center; background-color: #ffffff;">
                        <h2 style="color: #000000; margin-top: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">Verify Your Account</h2>
                        <p style="color: #444444; font-size: 15px; line-height: 1.6; margin-bottom: 30px; font-weight: 500;">
                            You're almost ready to shop the latest drops. Enter the code below to verify your email address. This code expires in 15 minutes.
                        </p>
                        <div style="background-color: #fff0f0; border: 2px solid #e60000; padding: 25px; margin: 0 auto; max-width: 320px; border-radius: 8px; box-shadow: 4px 4px 0px 0px rgba(230,0,0,1);">
                            <span style="display: block; color: #e60000; font-size: 40px; font-weight: 900; letter-spacing: 14px; margin-left: 14px;">${otp}</span>
                        </div>
                        <p style="color: #888888; font-size: 13px; margin-top: 40px;">
                            If you didn't request this code, you can safely ignore this email.
                        </p>
                    </div>
                    <div style="background-color: #000000; padding: 20px; text-align: center;">
                        <p style="color: #edece8; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">© ${new Date().getFullYear()} Wobblix Clothing. All rights reserved.</p>
                    </div>
                </div>
            `,
        };


        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully to:', userEmail);
    } catch (error) {
        console.error('Error sending OTP:', error);
    }
};

export { sendOrderConfirmationEmail, sendVerificationOtpEmail };


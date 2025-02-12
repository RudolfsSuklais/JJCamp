import express from "express";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create an express app
const app = express();

// Middleware to handle CORS and JSON requests
app.use(cors());
app.use(express.json());

// Define __dirname for ES modules using import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Serve static files from the 'dist' folder (frontend build output)
app.use(express.static(path.join(__dirname, "dist")));

// Serve index.html for all routes (single-page application routing)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Set up nodemailer transporter to send emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// Endpoint to handle the email sending
app.post("/send-email", async (req, res) => {
    const {
        name,
        lastName,
        phone,
        email,
        message,
        startDate,
        endDate,
        totalPrice,
    } = req.body;

    // Admin email configuration
    const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Booking Request",
        text: `
        Name: ${name} ${lastName}
        Phone: ${phone}
        Email: ${email}
        Start Date: ${startDate}
        End Date: ${endDate}
        Total Price: ${totalPrice}€
        Message: ${message}
        `,
    };

    // Customer confirmation email configuration
    const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Booking Confirmation - Jūrmalciema Jēkabi",
        text: `
        Hi ${name},

        Thank you for your booking request at Jūrmalciems Jēkabi Camping! 
        We have received your request and will get back to you shortly.

        Booking Details:
        - Start Date: ${startDate}
        - End Date: ${endDate}
        - Total Price: ${totalPrice}€

        If you have any questions, feel free to reply to this email.

        Best regards,  
        Jūrmalciems Jēkabi Team
        Phone number: +371 20 510 502
        E-mail: info@jekabi.com
        `,
    };

    try {
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(customerMailOptions);
        res.status(200).json({ message: "Emails sent successfully!" });
    } catch (error) {
        console.error("Error sending emails:", error);
        res.status(500).json({ error: "Failed to send emails" });
    }
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

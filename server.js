import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import rateLimit from "express-rate-limit"

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5
});

app.use("/send-email, limiter");

app.use(cors({
    origin: "https://shashi2504.github.io/shashi/"
}
));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!!");
})

app.use(express.json());


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post("/send-email", async (req, res) => {
    const {name, email, message} = req.body;

    if (!name || !email || !message) {
        return res.status(400).send("Please provide all required fields");
    }

    const mailOptions = {
        from: email,
        to: "shashireddy0403@gmail.com",
        subject: `New message from ${name}`,
        text: messsage
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email send successfully");
        res.status(200).send("Email send Successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email");
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

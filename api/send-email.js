const nodemailer = require('nodemailer');

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input) {
  return input.replace(/[&<>"']/g, function(match) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[match];
  });
}

module.exports = async (req, res) => {
  console.log("API route hit");
  if (req.method !== 'POST') {
    console.log("Method not allowed");
    return res.status(405).send('Method Not Allowed');
  }

  const { name, email, message } = req.body;
  console.log("Received data:", { name, email, message: message.substring(0, 20) + "..." });

  if (!name || !email || !message) {
    console.log("Missing required fields");
    return res.status(400).send('Please provide all required fields');
  }

  if (!isValidEmail(email)) {
    console.log("Invalid email provided");
    return res.status(400).send('Please provide a valid email address');
  }

  const sanitizedName = sanitizeInput(name);
  const sanitizedMessage = sanitizeInput(message);

  console.log("Environment variables:", {
    EMAIL_USER: process.env.EMAIL_USER ? "Set" : "Not set",
    EMAIL_PASS: process.env.EMAIL_PASS ? "Set" : "Not set"
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: "shashireddy0403@gmail.com",
    subject: `New message from ${sanitizedName}`,
    text: sanitizedMessage
  };

  try {
    console.log("Attempting to send email");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send(`Error sending email: ${error.message}`);
  }
};
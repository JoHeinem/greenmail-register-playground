const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// In-memory storage for registered users
let registeredUsers = [];

// Middleware to parse JSON data
app.use(bodyParser.json());

// Registration endpoint
app.post("/register", (req, res) => {
  const { email } = req.body;
  console.log(`Received registration request from user ${email}`);

  // Save the user to the registered users list (in a real app, this would save to a database)
  registeredUsers.push({ email });

  // Send email to the registered user
  sendEmail(email);

  res.status(200).json({
    message: "Registration successful. Check your email for confirmation.",
  });
});

// Function to send email
function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    port: 3025, // greenmail uses port 3025 as default
    host: "localhost",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "no-reply@up42.com",
      pass: "test123",
    },
  });

  const randomFourDigitNumber = Math.floor(1000 + Math.random() * 9000);
  const mailOptions = {
    from: "no-reply@up42.com",
    to: email,
    subject: "Registration Confirmation",
    text: `Thank you for registering! Here's your verification code: ${randomFourDigitNumber}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

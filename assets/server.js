// server.js
require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');

const app = express();
app.use(express.json());

const sns = new AWS.SNS({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Function to generate a random OTP
function generateOTP(length = 6) {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

// Function to send the OTP via Amazon SNS
function sendOTP(phoneNumber, otp) {
    const params = {
        Message: `Your OTP is ${otp}. Please enter this to confirm your submission.`,
        PhoneNumber: phoneNumber,
    };

    return sns.publish(params).promise();
}

// Endpoint to handle OTP requests
app.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;

    const otp = generateOTP();
    try {
        await sendOTP(phoneNumber, otp);
        // In a production scenario, you would not send the OTP back to the client
        res.json({ success: true, otp }); // Send OTP for demonstration; remove in production
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'https://absherif19.github.io',
}));

console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID);
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY);

const sns = new AWS.SNS({
    region: process.env.AWS_REGION || 'eu-north-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
AWS.config.logger = console;


function generateOTP(length = 6) {
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

function sendOTP(phoneNumber, otp) {
    const params = {
        Message: `Your OTP is ${otp}. Please enter this to confirm your submission.`,
        PhoneNumber: phoneNumber,
    };

    console.log('Sending OTP with params:', params);

    return sns.publish(params).promise();
}

app.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;

    const otp = generateOTP();
    try {
        const result = await sendOTP(phoneNumber, otp);
        console.log('SNS response:', result);
        res.json({ success: true, otp });
    } catch (error) {
        console.error("Error sending OTP:", error); // Log the full error object
        console.error("Error details:", error.stack); // Log the stack trace for detailed debugging
        res.status(500).json({ success: false, message: "Failed to send OTP", error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
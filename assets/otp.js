// Load environment variables from .env file
require('dotenv').config();

const AWS = require('aws-sdk');

// Initialize the SNS client with the correct region and credentials from environment variables
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

    sns.publish(params, (err, data) => {
        if (err) {
            console.error("Error sending OTP via SNS:", err);
        } else {
            console.log("OTP sent successfully:", data.MessageId);
        }
    });
}

// Event listener for the Submit button
document.querySelector('.submit-button button').addEventListener('click', (e) => {
    e.preventDefault();  // Prevent the form from submitting

    // Get the phone number from the session storage (this should be pre-filled from earlier steps)
    const phoneNumber = sessionStorage.getItem('phone');
    
    // Generate the OTP
    const otp = generateOTP();

    // Store the OTP in session storage
    sessionStorage.setItem('otp', otp);

    // Send the OTP via SNS
    sendOTP(phoneNumber, otp);

    // Show the OTP modal
    showOTPModal();
});

// Function to show the OTP modal
function showOTPModal() {
    const modalHTML = `
        <div class="otp-modal">
            <div class="modal-content">
                <h3>Enter OTP</h3>
                <input type="text" id="otpInput" placeholder="Enter OTP" maxlength="6">
                <button id="verifyOtpButton">Verify OTP</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Event listener for the Verify OTP button
    document.getElementById('verifyOtpButton').addEventListener('click', verifyOTP);
}

// Function to verify the entered OTP
function verifyOTP() {
    const enteredOtp = document.getElementById('otpInput').value;
    const storedOtp = sessionStorage.getItem('otp');

    if (enteredOtp === storedOtp) {
        alert("OTP verified successfully!");
        // You can now proceed to submit the form or any other action
        document.querySelector('.otp-modal').remove();  // Close the modal
    } else {
        alert("Invalid OTP. Please try again.");
    }
}

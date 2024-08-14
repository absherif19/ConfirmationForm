// Function to send the OTP request to the server
function sendOtpToServer(phoneNumber) {
  fetch("http://localhost:3000/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phoneNumber: phoneNumber }), // Pass the phone number in the request body
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Store the OTP in session storage (for demo purposes; avoid in production)
        sessionStorage.setItem("otp", data.otp);
        showOTPModal();
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
    });
}

// Event listener for the Submit button
document
  .querySelector(".submit-button button")
  .addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the form from submitting

    // Get the phone number from the session storage (this should be pre-filled from earlier steps)
    const phoneNumber = sessionStorage.getItem("phone");
    if (!phoneNumber) {
      alert("Phone number not found. Please ensure it is correctly entered.");
      return;
    }
    sendOtpToServer(phoneNumber);
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
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Event listener for the Verify OTP button
  document
    .getElementById("verifyOtpButton")
    .addEventListener("click", verifyOTP);
}

// Function to verify the entered OTP
function verifyOTP() {
  const enteredOtp = document.getElementById("otpInput").value;
  const storedOtp = sessionStorage.getItem("otp");

  if (enteredOtp === storedOtp) {
    alert("OTP verified successfully!");
    // You can now proceed to submit the form or any other action
    document.querySelector(".otp-modal").remove(); // Close the modal
  } else {
    alert("Invalid OTP. Please try again.");
  }
}
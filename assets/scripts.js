// Function to decode Base64 encoded strings
function decodeBase64(encodedString) {
    return decodeURIComponent(atob(encodedString));
}

// Function to extract query parameters from the URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const id = params.get('id');
    const phone = params.get('phone');
    return { email, id, phone };
}

// Extract and decode the query parameters
const { email, id, phone } = getQueryParams();
const decodedEmail = decodeBase64(email);
const decodedId = decodeBase64(id);

// Log the encoded and decoded values to the console
console.log("Encoded email:", email);
console.log("Encoded ID:", id);
console.log("Decoded email:", decodedEmail);
console.log("Decoded ID:", decodedId);
console.log("Phone (not encoded):", phone);

// You can also use these values to pre-fill the form if needed
document.getElementById('emailField').value = decodedEmail;
document.getElementById('idField').value = decodedId;
document.getElementById('phoneField').value = phone;

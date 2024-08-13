// Function to decode Base64 encoded strings
function decodeBase64(encodedString) {
    try {
        return atob(encodedString);
    } catch (e) {
        console.error("Error decoding Base64 string:", e);
        return null;
    }
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
const decodedEmail = email ? decodeBase64(email) : null;
const decodedId = id ? decodeBase64(id) : null;

// Log the encoded and decoded values to the console
console.log("Encoded email:", email);
console.log("Encoded ID:", id);
console.log("Decoded email:", decodedEmail);
console.log("Decoded ID:", decodedId);
console.log("Phone (not encoded):", phone);

// Ensure the form fields exist before trying to set their values
const emailField = document.getElementById('emailField');
const idField = document.getElementById('idField');
const phoneField = document.getElementById('phoneField');

if (emailField) {
    emailField.value = decodedEmail || '';
}

if (idField) {
    idField.value = decodedId || '';
}

if (phoneField) {
    phoneField.value = phone || '';
}

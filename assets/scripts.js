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

// Store the decoded values in session storage
if (decodedEmail) {
    sessionStorage.setItem('decodedEmail', decodedEmail);
    console.log('Email stored in session:', sessionStorage.getItem('decodedEmail'));
}

if (decodedId) {
    sessionStorage.setItem('decodedId', decodedId);
    console.log('ID stored in session:', sessionStorage.getItem('decodedId'));
}

if (phone) {
    sessionStorage.setItem('phone', phone);
    console.log('Phone stored in session:', sessionStorage.getItem('phone'));
}

// Ensure the form fields exist before trying to set their values
const emailField = document.getElementById('emailField');
const idField = document.getElementById('idField');
const phoneField = document.getElementById('phoneField');

console.log('Initial form field values:', {
    emailField: emailField ? emailField.value : null,
    idField: idField ? idField.value : null,
    phoneField: phoneField ? phoneField.value : null
});

if (emailField) {
    emailField.value = sessionStorage.getItem('decodedEmail') || '';
    console.log('Email field set to:', emailField.value);
}

if (idField) {
    idField.value = sessionStorage.getItem('decodedId') || '';
    console.log('ID field set to:', idField.value);
}

if (phoneField) {
    phoneField.value = sessionStorage.getItem('phone') || '';
    console.log('Phone field set to:', phoneField.value);
}

console.log('Final form field values:', {
    emailField: emailField ? emailField.value : null,
    idField: idField ? idField.value : null,
    phoneField: phoneField ? phoneField.value : null
});

// utils/validation.js

// Function to validate email addresses
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

// Function to validate password strength
function validatePassword(password) {
    // Check if password is at least 8 characters long, contains a number and a special character
    const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return strongPasswordRegex.test(password);
}

// Function to validate user data
function validateUserData(user) {
    const { username, email, password } = user;
    return (
        typeof username === 'string' && username.length > 0 &&
        validateEmail(email) &&
        validatePassword(password)
    );
}

module.exports = { validateEmail, validatePassword, validateUserData };
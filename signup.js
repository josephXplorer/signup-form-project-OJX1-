const form = document.querySelector('#form-container');
const firstName = document.querySelector('#fName');
const lastName = document.querySelector('#lName');
const emailInput = document.querySelector('#email');
const password = document.querySelector('#password');

// Get all error message containers and error icons
const errorIcons = document.querySelectorAll('.error-icon');
// const errorIcons = document.querySelectorAll('[class^="error"]'); // Selects error1, error2, error3, error4
const fError = document.querySelector('.fResult');
const lError = document.querySelector('.lResult');
const emailError = document.querySelector('.emailResult');
const passwordError = document.querySelector('.passwordResult');

form.setAttribute('novalidate', 'novalidate');

// Function to validate email using regex (standard email format)
function isValidEmail(email) {
    // Regular expression for basic email validation (something@something.something)
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

function isValidPassword(password) {
    const errors = [];

    // Check minimum length (usually 8 characters)
    if (password.length < 8) {
        errors.push('at least 8 characters');
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push('one uppercase letter');
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        errors.push('one lowercase letter');
    }

    // Check for at least one number
    if (!/[0-9]/.test(password)) {
        errors.push('one number');
    }

    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('one special character');
    }

    // Check for whitespace (passwords usually shouldn't contain spaces)
    if (/\s/.test(password)) {
        errors.push('no spaces');
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset all error messages and styles first
    const allResults = document.querySelectorAll('.result');
    allResults.forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });

    errorIcons.forEach(icon => {
        icon.style.display = 'none';
    });

    const inputs = document.querySelectorAll('.box');
    inputs.forEach(input => {
        input.style.marginBottom = '1rem';
        input.style.border = '1px solid var(--Purple-350)';
    });

    const fName = firstName.value.trim();
    const lName = lastName.value.trim();
    const email = emailInput.value.trim();
    const code = password.value.trim();

    let hasError = false;

    // Validate First Name
    if (fName === '') {
        firstName.style.marginBottom = '.2rem';
        firstName.style.border = '2px solid var(--Red-400)';
        fError.style.display = 'block';
        fError.textContent = 'First Name cannot be empty';
        document.querySelector('.error1').style.display = 'block';
        hasError = true;
    }
    if (lName === '') {
        lastName.style.marginBottom = '.2rem';
        lastName.style.border = '2px solid var(--Red-400)';
        lError.textContent = 'Last Name cannot be empty';
        lError.style.display = 'block';
        document.querySelector('.error2').style.display = 'block';
        hasError = true;
    }
    if (email === '') {
        emailInput.style.marginBottom = '.2rem';
        emailInput.style.border = '2px solid var(--Red-400)';
        emailError.textContent = 'Looks like this is not an email';
        emailError.style.display = 'block';
        document.querySelector('.error3').style.display = 'block';
        hasError = true;
    } else if (!isValidEmail(email)) {
        emailInput.style.marginBottom = '.2rem';
        emailInput.style.border = '2px solid var(--Red-400)';
        emailError.textContent = 'Looks like this is not an email';
        emailError.style.display = 'block';
        document.querySelector('.error3').style.display = 'block';
        hasError = true;
    }
    if (code === '') {
        password.style.marginBottom = '.2rem';
        password.style.border = '2px solid var(--Red-400)';
        passwordError.textContent = 'Password cannot be empty';
        passwordError.style.display = 'block';
        document.querySelector('.error4').style.display = 'block';
        hasError = true;
    } else {
        // Call the isValidPassword function
        const passwordValidation = isValidPassword(code);

        if (!passwordValidation.isValid) {
            password.style.marginBottom = '.2rem';
            password.style.border = '2px solid var(--Red-400)';

            // Create a user-friendly error message
            let errorMsg = '';
            if (passwordValidation.errors.length === 1) {
                errorMsg = passwordValidation.errors[0];
            } else {
                errorMsg = 'Must contain: ' + passwordValidation.errors.join(', ');
            }

            passwordError.textContent = errorMsg;
            passwordError.style.display = 'block';
            document.querySelector('.error4').style.display = 'block';
            hasError = true;
        }
    }


    // If no errors, you can submit the form
    if (!hasError) {
        // Form is valid - you can submit it or do something else
        form.submit(); // Uncomment to actually submit
    }
});

firstName.addEventListener('input', function () {
    // Hide error message while user types
    fError.style.display = 'none';
    firstName.style.marginBottom = '1rem';
    firstName.style.border = '1px solid var(--Purple-350)';
    document.querySelector('.error1').style.display = 'none';
});

lastName.addEventListener('input', function () {
    // Hide error message while user types
    lError.style.display = 'none';
    lastName.style.marginBottom = '1rem';
    lastName.style.border = '1px solid var(--Purple-350)';
    document.querySelector('.error2').style.display = 'none';
});

emailInput.addEventListener('input', function () {
    // Hide error message while user types (optional)
    emailError.style.display = 'none';
    emailInput.style.marginBottom = '1rem';
    emailInput.style.border = '1px solid var(--Purple-350)';
    document.querySelector('.error3').style.display = 'none';
});

password.addEventListener('input', function () {
    // Hide error message while user types (optional)
    passwordError.style.display = 'none';
    password.style.marginBottom = '1rem';
    password.style.border = '1px solid var(--Purple-350)';
    document.querySelector('.error4').style.display = 'none';
});
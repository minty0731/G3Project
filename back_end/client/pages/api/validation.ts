const errorMessage = {
    username: {
        empty: 'Username cannot be empty',
        format: 'Username can only contain letters and numbers',
        unique: 'This username already exist',
    },
    password: {
        empty: 'Password cannot be empty',
        error: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@?!#$%&.;,)',
    },
    email: {
        empty: 'Email cannot be empty',
        format: 'Invalid email format',
    },
    fullName: {
        empty: 'Full name cannot be empty',
        format: 'Full name can only contain letters and spaces',
        full: 'Full name must have a first name and last name',
    },
    phone: {
        empty: 'Phone cannot be empty',
        format: 'Phone number must contain between 7 and 15 digits',
    },
};
  
export type ValidationResult = [boolean, string];
  
const validationSuccess: ValidationResult = [true, ''];
  
const validationError = (errorMessage: string): ValidationResult => {
    return [false, errorMessage];
};
  
export const validateUsername = (username: string): ValidationResult => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!username) {
        return validationError(errorMessage.username.empty);
    }
    if (!usernameRegex.test(username)) {
        return validationError(errorMessage.username.format);
    }
    return validationSuccess;
};
  
export const validatePassword = (password: string): ValidationResult => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@?!#$%&.;,])[A-Za-z\d@?!#$%&.;,]{8,}$/;
    if (!password) {
        return validationError(errorMessage.password.empty);
    }
    if (!passwordRegex.test(password)) {
        return validationError(errorMessage.password.error);
    }
    return validationSuccess;
};
  
export const validateEmail = (email: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return validationError(errorMessage.email.empty);
    }
    if (!emailRegex.test(email)) {
        return validationError(errorMessage.email.format);
    }
    return validationSuccess;
};
  
export const validateFullName = (fullName: string): ValidationResult => {
    const fullNameRegex = /^[a-zA-Z\s]+$/;
    const nameParts = fullName.trim().split(' ');
  
    if (!fullName) {
        return validationError(errorMessage.fullName.empty);
    }
  
    if (!fullNameRegex.test(fullName)) {
        return validationError(errorMessage.fullName.format);
    }
  
    if (nameParts.length < 2) {
        return validationError(errorMessage.fullName.full);
    }
  
    return validationSuccess;
};
  
export const validatePhoneNumber = (phoneNumber: string): ValidationResult => {
    const phoneNumberRegex = /^\d{7,15}$/;
    if (!phoneNumber) {
        return validationError(errorMessage.phone.empty);
    }
    if (!phoneNumberRegex.test(phoneNumber)) {
        return validationError(errorMessage.phone.format);
    }
    return validationSuccess;
};
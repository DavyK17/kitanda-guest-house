/*
Password must be:
    - 8 to 20 characters long
    - contain at least one uppercase letter
    - contain at least one lowercase letter
    - contain at least one numeric digit
    - contain at least one special character
*/

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
export const checkPassword = (password) => (password.match(passwordRegex) ? true : false);

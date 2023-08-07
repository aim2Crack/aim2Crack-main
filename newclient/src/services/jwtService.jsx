import jwt_decode from 'jwt-decode';

export const saveToken = (token) => {
    localStorage.setItem('jwtToken', token);
}

export const getUserDetails = () => {
    try {
        const token = localStorage.getItem('jwtToken')
        const userDetails = jwt_decode(token);
        return userDetails
    } catch (err) {
        return null;
    }
}

export const logout = () => {
    try {
        localStorage.removeItem('jwtToken');
    } catch (err) {
        throw new Error('Unable to log out.');
    }
}
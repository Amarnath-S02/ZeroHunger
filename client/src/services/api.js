import axios from 'axios';

const API_URL = 'https://zerohunger-wzdk.onrender.com/api/users/register';

const registerUser = (formData) => {
    return axios.post(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default registerUser;


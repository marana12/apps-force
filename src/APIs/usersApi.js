import axios from 'axios';

const BASE_URL = 'https://randomuser.me/api';

export async function getRandomUsersApi(){
    const options = {
        method: 'GET',
        url: `${BASE_URL}?results=10`,
    }

    return await axios.request(options);
}
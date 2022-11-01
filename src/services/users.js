import { getRandomUsersApi } from '../APIs/usersApi';

export async function getRandomUsers(){
    const response = await getRandomUsersApi();

    if(!response.data){
        return null;
    }
    
    const result = response.data;
        
    return result.results;
}
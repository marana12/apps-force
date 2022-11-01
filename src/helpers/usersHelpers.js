export const UPDATE_USER_EVENT_KEY = "UPDATE_USER_EVENT_KEY";
export const USERS_STORAGE_KEY = "USERS_STORAGE_KEY";
const requiredMessage = "This field is required";

export const validateUserFields = {
    "fname": {
        required: {
            value: true,
            message: requiredMessage
        },
        minLength:{
            value: 3,
            message:"This input required min 3 words"
        },
    },
    "lname": {
        required: {
            value: true,
            message: requiredMessage
        },
        minLength:{
            value: 3,
            message:"This input required min 3 words"
        },
    },
    "email": {
        required: {
            value: true,
            message: requiredMessage
        },
        pattern:{
            value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "Enter valid email" 
        },
    },
    "address": {
        required: {
            value: true,
            message: requiredMessage
        },
    },
    "streetNumber": {
        required: {
            value: true,
            message: requiredMessage
        },
        pattern:{
            value: /[0-9]+/,
            message: "Enter just numbers" 
        },
    },
    "city": {
        required: {
            value: true,
            message: requiredMessage
        },
    },
    "country": {
        required: {
            value: true,
            message: requiredMessage
        },
    }
};

export function saveOnStorage(users){
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function getFromStorage(){
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    
    try{
        return JSON.parse(users);
    } catch {

        return null;
    }
}

export function changeUserDetails({
    uid, 
    fname, 
    lname, 
    email, 
    address, 
    streetNumber, 
    country, 
    city}){
    const users = getFromStorage();

    if(!users){
        return null;
    }

    users.forEach((user, index) => {
        if(user.login?.uuid === uid) {
            const name = {
                title: user.name.title,
                first: fname,
                last: lname
            };

            const location = {
                city,
                country,
                street: {
                    name: address,
                    number: streetNumber
                }
            };

            user.name = name;
            user.email = email;
            user.location = location;
            users[index] = user;
        }
    });

    saveOnStorage(users);

    return users;
}
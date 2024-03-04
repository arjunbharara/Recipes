import { LOGIN_POST, REGISTER_POST, CREATE_POST } from '../constants/Constants';

const getRequestOptions = {
    method: 'GET'
}

// GET
export async function getData(api) {
    const response = await fetch(api, getRequestOptions);
    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error(response.status);
    }
}

// POST LOGIN
export async function postLoginData(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }

    const response = await fetch(LOGIN_POST, requestOptions);
    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error(response.status);
    }
}

// POST REGISTRATION
export async function postRegistrationData(username, email, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    }

    const response = await fetch(REGISTER_POST, requestOptions);
    if(response.ok) {
        return true;
    }
    else {
        throw new Error(response.status);
    }
}

// POST CREATE
export async function postCreateData(title, ingredients, preparation, categoryId) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage['token']
        },
        body: JSON.stringify({
            title: title,
            ingredients: ingredients,
            preparation: preparation,
            categoryId: categoryId
        })
    }

    const response = await fetch(CREATE_POST, requestOptions);
    if(response.ok) {
        return true;
    }
    else {
        throw new Error(response.status);
    }
}
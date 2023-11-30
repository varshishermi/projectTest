// import dotenv  from 'dotenv';
// dotenv.config();
const baseUrl = 'http://localhost:4000';
// const baseUrl = process.env.SERVER_URL

export async function registerUser(userData) {
    return (await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
    })).json();
}

export async function loginUser(userData) {
    return (await fetch(`/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData)
    })).json();
}

export async function getUser() {
    return await (await fetch(baseUrl + '/auth/getUser', {credentials: 'include'})).json()
}

export async function getUserActiveSells(id) {
    return (await fetch(`${baseUrl}/products/sells/active/${id}`, {credentials: 'include'})).json();
}

export async function getUserArchivedSells() {
    return (await fetch(`${baseUrl}/products/sells/archived`, {credentials: 'include'})).json();
}

export async function getUserWishlist() {
    return (await fetch(`${baseUrl}/products/wishlist/getWishlist`, {credentials: 'include'})).json();
}

//export async function getUserCart() {
//    return (await fetch(`${baseUrl}/products/cart/getCart`, {credentials: 'include'})).json();
//}

export async function editUserProfile(id, data) {
    return (await fetch(`/user/edit-profile/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })).json();
}

export async function getUserById(id) {
    return await (await fetch(baseUrl + `/user/getUserById/${id}`, {credentials: 'include'})).json()
}

// In services/userData.js or similar file
export const getUserCart = async () => {
    const response = await fetch(baseUrl + `/cart/getCart`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // If you're using session cookies
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    console.log("GET USER CART");
    //console.log(response.json());
    return response.json();
};

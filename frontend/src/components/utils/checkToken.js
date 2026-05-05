import api from "../../axios";

export const checkToken = async () => {
    try {
        const token = localStorage.getItem("token"); // FIX HERE

        if (!token) return false;

        const response = await api.get("/verifytoken", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.status === 200;
    } catch (err) {
        console.log("Token error:", err.response?.data || err.message);
        return false;
    }
};

// export function checkToken() {
//     const decodedToken = decodeToken()
//     if (decodedToken) {
//         console.log("decoded token : ", decodedToken)
//         return true  // user is logged in
//     } else {
//         console.warn('No valid token found')
//         return false  // user is logged out
//     }
// }


// function decodeToken() {
//     const token = getCookie('token')
//     if (!token) {
//         return null
//     }
//     try {
//         const decodedToken = jwtDecode(token)
//         return decodedToken
//     } catch (error) {
//         console.error('Invalid token:', error.message)
//         return null
//     }
// }


// const getCookie = (name) => {
//     const value = `; ${document.cookie}`
//     console.log(`document.cookie : ${value}`)
//     const parts = value.split(`; ${name}=`)
//     if (parts.length === 2) return parts.pop().split(';').shift()
//     return null
// }
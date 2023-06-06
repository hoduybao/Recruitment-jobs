export default function authHeader() {

    const user = localStorage.getItem('user');
    if (user) {
        const headers={
            'content-type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${user}`
        }
        return  headers;
    } else {
        return {}
    }

}

export const jwt = () => {
    let token = localStorage.getItem('user');
    if (!token) return "{}"
    else return 'Bearer ' + token;
}
export const logout = () => {

    localStorage.removeItem("user");
}
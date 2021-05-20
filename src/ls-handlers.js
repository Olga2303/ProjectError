export const setToken = token => {
    localStorage.setItem('token', token)
};

export const getToken = () => {
    return localStorage.getToken('token')
}
const authServices = {
    login: ({ username, password }) => {
        const request = new Request('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('authToken', token);
            });
    },
    logout: () => {
        localStorage.removeItem('authToken');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('authToken') ? Promise.resolve() : Promise.reject();
    },
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('authToken');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};

export default authServices;
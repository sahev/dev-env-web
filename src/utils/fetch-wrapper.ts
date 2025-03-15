import envs from './envs';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    upload: uploadRequest('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
};

function request (method: string) {
    return (url: any, body?: any, headers?: object) => {
        const requestOptions: any = {
            method,
            headers: setHeaders(url, headers)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    };
}

function uploadRequest (method: string) {
    return (url: any, body?: any, headers?: object) => {
        var formData = new FormData();

        for (const file in body) {
            formData.append("files", body[file]);
        }

        const requestOptions: any = {
            method,
            headers: { },
            redirect: 'follow',
            body: formData
        };

        return fetch(url, requestOptions).then(handleResponse);
    };
}

// helper functions

function setHeaders (url: any, headers?: object) {

    const baseUrl = envs.api_url;
    // return auth header with jwt if user is logged in and request is to the api url
    const { token } = { token: 'token1234'}
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(baseUrl);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (token) {
        return { Token: token, Timezone: tz, ...headers };
    }

    if (isLoggedIn && isApiUrl) {
        return { Authorization: `${token}`, Timezone: tz, ...headers };
    } else {
        return { Timezone: tz, ...headers };
    }
}

function handleResponse (response: any) {
    return response.text().then((text: any) => {
        const data = text && JSON.parse(text);

        // invalid login
        if ((data.errors && data.errors[0]) && data.errors[0].detail.includes("Usuário ou senha inválidos"))
            throw new Error(data.errors[0].detail);

        if (!response.ok) {
            // const { user, logout } = useAuthStore();
            // if ([401].includes(response.status) && user) {
            //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            //     logout();
            // }

            // if ([403].includes(response.status) && user && response.message?.includes("supplied")) {
            //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            //     router.push('/forbidden')
            // }

            const error = data ?? response.statusText;

            // if (error.statusCode == 409) toast.warning("This register already exists")
            // else if (error.statusCode) toast.error("An error ocurred during save")

            return { error: true, ...error };
        }

        return data;
    });
}

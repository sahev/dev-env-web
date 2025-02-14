export default envs()

function envs () {
    const mode = import.meta.env.MODE;

    switch (mode) {
        case "release":
            return {
                api_url: import.meta.env.VITE_RELEASE__API_URL,
            }

        case "production":
            return {
                api_url: import.meta.env.VITE_PRODUCTION__API_URL,
            }

        default:
            return {
                api_url: import.meta.env.VITE_DEV__API_URL,
            }
    }
}

import fetch from 'node-fetch'

interface Auth {
    access_token: string
    expires_in: number
    token_type: string
}

const clientId: string = process.env.CLIENT_ID;
const clientSecret: string = process.env.CLIENT_SECRET;
const baseUrl: string = process.env.BASE_URL || "https://api.twitch.tv/helix";
let auth: Auth;

const getToken = async (): Promise<Auth> => {
    if (auth) return auth;
    const res = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=`, { method: 'POST' });
    const json = await res.json();
    auth = json;

    return json;
}

export const query = async (path: string = "/") => {

    const { access_token } = await getToken();
    const res = await fetch(baseUrl + path, { headers: { Authorization: `Bearer ${access_token}`, "Client-ID": clientId } })
    if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`)
    }
    const json = await res.json();

    return json;
}


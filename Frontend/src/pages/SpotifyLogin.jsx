const clientId = 'ff923ecf1dad4ad3b0d5e8e5ec0deaf7';
const redirectUri = 'http://localhost:5173';

// Generate a random code verifier
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

let codeVerifier = generateRandomString(43);

// Hash the code verifier with SHA256 and base64-encode the result
async function generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const base64Challenge = btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    return base64Challenge;
}

// Store the code verifier in local storage for later use
localStorage.setItem('codeVerifier', codeVerifier);

// Generate the code challenge and add the authorization request parameters to the URL
async function authorize() {
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectUri,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        state,
        scope,
    });

    const authorizationUrl = `https://accounts.spotify.com/authorize?${params}`;

    // Redirect the user to the Spotify authorization page
    window.location = authorizationUrl;
}

// Parse the authorization code from the URL and exchange it for an access token
async function getAccessToken() {
    let accessToken = localStorage.getItem('accessToken');
    let expirationTime = localStorage.getItem('expirationTime');

    // If the access token is not stored or has expired, get a new one
    if (!accessToken || Date.now() >= expirationTime) {
        const code = new URLSearchParams(window.location.search).get('code');
        const storedCodeVerifier = localStorage.getItem('codeVerifier');

        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            code_verifier: storedCodeVerifier,
        });

        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });

        const tokenJson = await tokenResponse.json();
        accessToken = tokenJson.access_token;

        // Set the expiration time to 1 hour from now
        expirationTime = Date.now() + 3600000;

        // Store the access token and expiration time in local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expirationTime', expirationTime);
    }

    // Use the access token to make API requests to Spotify
    return accessToken;
}

// Call the authorize function when the user clicks a button or takes some other action to initiate the authorization flow
authorize();

import { useState, useEffect } from 'react';

const clientId = 'ff923ecf1dad4ad3b0d5e8e5ec0deaf7';
const redirectUri = 'http://localhost:5173';

function Login() {
  const [authCode, setAuthCode] = useState(null);

  useEffect(() => {
  
    const urlSearchParams = new URLSearchParams(window.location.search);
    const code = urlSearchParams.get('code');
    if (code) {
      setAuthCode(code);
    }
  }, []);

  const handleLogin = () => {
  
    const state = Math.random().toString(36).substring(2);
    sessionStorage.setItem('spotify_auth_state', state);

    
    const codeVerifier = Math.random().toString(36).substring(2);
    sessionStorage.setItem('spotify_code_verifier', codeVerifier);
    const sha256 = require('js-sha256');
    const codeChallenge = sha256(codeVerifier);

  
    const authorizationUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=user-read-private`;

    window.location.href = authorizationUrl;
  };

  useEffect(() => {
    if (authCode) {
    
      const state = sessionStorage.getItem('spotify_auth_state');
      const codeVerifier = sessionStorage.getItem('spotify_code_verifier');

      // Exchange the authorization code for an access token
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&code_verifier=${codeVerifier}`,
      };
      fetch('https://accounts.spotify.com/api/token', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          // Guardo token
          localStorage.setItem('spotify_access_token', data.access_token);
        })
        .catch((error) => console.log(error));
    }
  }, [authCode]);

  return (
    <div>
      <button onClick={handleLogin}>Log in with Spotify</button>
    </div>
  );
}

export default Login;

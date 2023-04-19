import React, { useState } from 'react';
import { Button } from 'react-bootstrap';



const CLIENT_ID = "ff923ecf1dad4ad3b0d5e8e5ec0deaf7";
const REDIRECT_URI = "http://localhost:5173";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-library-read",
  "user-read-recently-played"
];



const SpotifyLogin = () => {
  const [token, setToken] = useState(null);



  const handleLogin = () => {
    localStorage.removeItem('token');
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`;
  };



  if (token) {
    localStorage.setItem('token', token);
    return <div>You are logged in!</div>;
  }



  return (
    <div>
      <Button onClick={handleLogin}>Login to Spotify</Button>
    </div>
  );
};



export default SpotifyLogin;
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const CLIENT_ID = 'YOUR_CLIENT_ID';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

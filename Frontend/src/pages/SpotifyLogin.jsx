const CLIENT_ID = "ff923ecf1dad4ad3b0d5e8e5ec0deaf7"
const REDIRECT_URI = "http://localhost:5173"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"


const SCOPES = [
    "user-read-private",
    "user-read-email",
    "user-top-read",
    "user-library-read",
    "user-read-recently-played"
  ]
  
  const SpotifyLogin = () => {
    return (
      <div>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join("%20")}`}>Login to Spotify</a>
      </div>
    )
  }
  
  export default SpotifyLogin
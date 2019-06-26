import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi();

function accessingToken(token){
    return {type: "ACCESS_TOKEN", token}
  }

function setCurrentUser(user){
    return {type:"LOGIN_USER", user}
}

//gets user info from spotify
function gettingUserInfo(token){
    return (dispatch) => {
      fetch('https://api.spotify.com/v1/me',{
      method: 'GET',
      headers: {
          "Accept" : "application/json",
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`}
    })
    .then(res => res.json())
    .then(user => {
      dispatch(setCurrentUser(user))})
    }
  }

export {
    accessingToken,
    gettingUserInfo,
    setCurrentUser
}

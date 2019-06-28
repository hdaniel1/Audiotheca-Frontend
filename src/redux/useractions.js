
function accessingToken(token){
    return {type: "ACCESS_TOKEN", token}
  }

function setCurrentUser(user){
    return {type:"LOGIN_USER", user}
}

function fetchPlaylists(userId) {
  return (dispatch) => {
      fetch(`http://localhost:3000/api/v1/playlists?user=${userId}`)
      .then(res => res.json())
      .then(playlists => dispatch({type:"GET_PLAYLISTS", playlists: playlists}))
  }
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
      dispatch(setCurrentUser(user))
      dispatch(fetchPlaylists(user.id))
    })
    }
  }

export {
    accessingToken,
    gettingUserInfo,
    setCurrentUser,
    fetchPlaylists
}

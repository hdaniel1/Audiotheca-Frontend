
function accessingToken(token){
    return {type: "ACCESS_TOKEN", token}
  }

function setCurrentUser(user){
    return {type:"LOGIN_USER", user}
}

function fetchUserAlbums(userId) {
  return (dispatch) => {
      fetch(`http://localhost:3000/api/v1/user_albums?user=${userId}`)
      .then(res => res.json())
      .then(userAlbums => dispatch({type:"GET_USER_ALBUMS", userAlbums: userAlbums}))
  }
}

function fetchPlaylistAlbums(userId) {
  return (dispatch) => {
      fetch(`http://localhost:3000/api/v1/playlist_albums?user=${userId}`)
      .then(res => res.json())
      .then(playlistAlbums => dispatch({type:"GET_PLAYLIST_ALBUMS", playlistAlbums: playlistAlbums}))
  }
}

function fetchPlaylists(userId) {
  return (dispatch) => {
      fetch(`http://localhost:3000/api/v1/playlists?user=${userId}`)
      .then(res => res.json())
      .then(playlists => dispatch({type:"GET_PLAYLISTS", playlists: playlists}))
  }
}

//gets user info from spotify and backend
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
      dispatch(fetchPlaylistAlbums(user.id))
      dispatch(fetchUserAlbums(user.id))
    })
    }
  }

export {
    accessingToken,
    gettingUserInfo,
    setCurrentUser,
    fetchPlaylists,
    fetchPlaylistAlbums,
    fetchUserAlbums
}

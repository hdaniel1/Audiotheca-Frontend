import {combineReducers} from 'redux'

const playlistReducer = (state = [], action) => {
  switch(action.type) {
    case "GET_PLAYLISTS":
      return action.playlists
    case "ADD_PLAYLIST":
      return [...state, action.playlist]
    case "UPDATE_PLAYLIST":
      return state.map(playlist => {
        if (playlist.id === action.playlist.id) {
          return {
            ...playlist,
            name: action.playlist.name,
            description: action.playlist.name, 
            image: action.playlist.image
        }
      }})
    case "DELETE_PLAYLIST":
      return [...state.filter(playlist => playlist.id !== action.playlist.id)]
    default:
      return state
  }
}

const selectPlaylistReducer = (state = null, action) => {
  switch(action.type) {
    case "SELECT_PLAYLIST":
      return action.playlist
    default:
      return state 
  }
}

const currentUserReducer = (state = null, action) => {
    switch(action.type) {
      case "LOGIN_USER":
        return action.user
      case "LOGOUT_USER":
        return null
      default:
        return state
    }
}

const authReducer = (state = null, action) => {
    switch(action.type) {
      case "ACCESS_TOKEN":
        return action.token
      case "LOGOUT_USER":
        return null
      default:
        return state
    }
}

const showAlbumReducer = (state = null, action) => {
  switch(action.type) {
    case "SHOW_ALBUM":
      return action.album
    default:
      return state
  }
}

const rootReducer = combineReducers({
    token: authReducer,
    currentUser: currentUserReducer,
    showAlbum: showAlbumReducer, 
    playlists: playlistReducer,
    currentPlaylist: selectPlaylistReducer
})

export default rootReducer
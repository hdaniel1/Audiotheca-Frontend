import {combineReducers} from 'redux'

const playlistReducer = (state = [], action) => {
  switch(action.type) {
    case "ADD_PLAYLIST":
      return [...state, action.playlist]
    case "GET_PLAYLISTS":
      return action.playlists
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
    playlists: playlistReducer
})

export default rootReducer
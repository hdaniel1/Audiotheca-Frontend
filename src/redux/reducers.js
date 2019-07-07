import {combineReducers} from 'redux'
import _ from "lodash";

const artistInfoReducer = (state = [], action) => {
  switch(action.type) {
    case "GET_ARTIST_INFO":
      return  [...state, action.artist];
    case "GET_ALBUM_COUNT":
      return state.map(artist => {
          if (artist.id === action.info.id) {
            return {
              ...artist,
              ...action.info
            }
          }
          else {
            return artist
          }
        })
    default:
      return state;
  }
}


const playlistAlbumReducer = (state = [], action) => {
  switch(action.type) {
    case "GET_PLAYLIST_ALBUMS":
        return action.playlistAlbums;
    case "ADD_PLAYLIST_ALBUM":
      return [...state, action.playlistAlbum];
    case "DELETE_PLAYLIST_ALBUM":
      return [...state.filter(playlistAlbum => playlistAlbum.id !== action.playlistAlbumId)];
    case "DELETE_PLAYLIST_ALBUMS":
      return state.filter(playlistAlbums => playlistAlbums.spotify_id !== action.userAlbum.spotify_id);
    default:
      return state;
  }
}

const userAlbumReducer = (state = [], action) => {
  switch(action.type) {
    case "GET_USER_ALBUMS":
          return action.userAlbums
    case "ADD_USER_ALBUM":
      return [...state, action.userAlbum];
    case "UPDATE_USER_ALBUM":
      return state.map(userAlbum => {
        if (userAlbum.id === action.userAlbum.id) {
          return {
            ...userAlbum,
            ...action.userAlbum
          }
        }
        else {
          return userAlbum
        }
      })
    case "DELETE_USER_ALBUM":
      return [...state.filter(userAlbum => userAlbum.id !== action.userAlbum.id)];
    case "MERGE_SPOTIFY_INFO_ALL_UA":
      return state.map(album => {
        return _.extend(album, _.omit(_.find(action.spotifyAlbums, {id: album.spotify_id}), "id"))
      })
    default:
      return state;
  }
}

const playlistReducer = (state = [], action) => {
  switch(action.type) {
    case "GET_PLAYLISTS":
      return action.playlists;
    case "ADD_PLAYLIST":
      return [...state, action.playlist];
    case "UPDATE_PLAYLIST":
      return state.map(playlist => {
        if (playlist.id === action.playlist.id) {
          return {
            ...playlist,
            name: action.playlist.name,
            description: action.playlist.description, 
            playlist_image: action.playlist.playlist_image
          }
        }
        else {
          return playlist;
        }
      })
    case "DELETE_PLAYLIST":
      return [...state.filter(playlist => playlist.id !== action.playlist.id)];
    default:
      return state;
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

const rootReducer = combineReducers({
    token: authReducer,
    currentUser: currentUserReducer,
    playlists: playlistReducer,
    currentPlaylist: selectPlaylistReducer,
    playlistAlbums: playlistAlbumReducer,
    userAlbums: userAlbumReducer,
    artistInfo: artistInfoReducer
})

export default rootReducer
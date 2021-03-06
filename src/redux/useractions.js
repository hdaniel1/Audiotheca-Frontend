
import SpotifyWebApi from 'spotify-web-api-js';
import _ from "lodash";

const spotifyApi = new SpotifyWebApi();

function accessingToken(token){
    return {type: "ACCESS_TOKEN", token}
  }

function setCurrentUser(user){
    return {type:"LOGIN_USER", user}
}

function getArtistAlbumCount(token, artist) {
  spotifyApi.setAccessToken(token)
  return (dispatch) => {
    spotifyApi.getArtistAlbums(artist)
    .then(results => {
      let info = {
        ...results,
        count: _.uniqBy(results.items, 'name').filter(album => album.album_type === "album" && album.album_group === "album").length,
        items: _.uniqBy(results.items, 'name').filter(album => album.album_type === "album" && album.album_group === "album"),
        id: artist
      }
      dispatch({type: "GET_ALBUM_COUNT", info: info})
    })
  }
}

function fetchArtistInformation(token, artistsToFetch) {
  spotifyApi.setAccessToken(token)
  return (dispatch) => {
    artistsToFetch.forEach(artist => {
        spotifyApi.getArtist(artist)
        .then(results => {
          dispatch({type:"GET_ARTIST_INFO", artist: results})
          dispatch(getArtistAlbumCount(token, results.id))
          })
      })
  }
}

function fetchUserAlbumInfo(token, albumsToFetch) {
    spotifyApi.setAccessToken(token)
    //array of spotify IDs to fetch
    let spotifyIDs = albumsToFetch.map(album => album.spotify_id)

    return (dispatch) => {
      spotifyApi.getAlbums(spotifyIDs)
      .then(results => {
        let artistIds = _.uniq(results.albums.map(album => album.artists[0].id))
        dispatch({type:"MERGE_SPOTIFY_INFO_ALL_UA", spotifyAlbums: results.albums})
        dispatch({type:"MERGE_SPOTIFY_INFO_ALL_PA", spotifyAlbums: results.albums})
        dispatch(fetchArtistInformation(token, artistIds))
      })
    }
}

function fetchUserAlbums(token, userId) {
  return (dispatch) => {
      fetch(`http://localhost:3000/api/v1/user_albums?user=${userId}`)
      .then(res => res.json())
      .then(userAlbums => {
        dispatch({type:"GET_USER_ALBUMS", userAlbums: userAlbums})
        //fetch 20 albums from spotify at a time to append album info to store's user albums
        for (let i=0;i < userAlbums.length;i+=20) {
          if (userAlbums.slice(i, i+20).length > 1) {
            let albumsToFetch = userAlbums.slice(i, i+20)
            dispatch(fetchUserAlbumInfo(token, albumsToFetch))
          }
          else {
            let albumsToFetch = userAlbums.slice(i)
            dispatch(fetchUserAlbumInfo(token, albumsToFetch))
          }
        }
      })
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
      dispatch(fetchUserAlbums(token, user.id))
    })
    }
  }

export {
    accessingToken,
    gettingUserInfo,
    setCurrentUser,
    fetchPlaylists,
    fetchPlaylistAlbums,
    fetchUserAlbums,
    fetchArtistInformation
}

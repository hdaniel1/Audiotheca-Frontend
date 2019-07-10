function createPlaylist(playlist){
    return (dispatch) => {
        fetch("http://localhost:3000/api/v1/playlists", {
        method: "POST", 
        headers: {
            "accepts": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({playlist})
    })
    .then(res => res.json())
    .then(playlist => {
        dispatch({type:"ADD_PLAYLIST", playlist: playlist})
        dispatch({type: "SELECT_PLAYLIST", playlist: playlist})
    })
    }
}

function updatePlaylist(playlist) {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/playlists/${playlist.id}`, {
        method: "PATCH", 
        headers: {
            "accepts": "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({playlist})
    })
    .then(res => res.json())
    .then(playlist => {
        dispatch({type:"UPDATE_PLAYLIST", playlist: playlist})
        dispatch({type:"SELECT_PLAYLIST", playlist: playlist})
        })
    }
}

function deletePlaylist(playlist){
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/playlists/${playlist.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(() => dispatch({type:"DELETE_PLAYLIST", playlist: playlist}))
    }
}

function selectPlaylist(playlist) {
    return {type: "SELECT_PLAYLIST", playlist: playlist}
}

function deletePlaylistAlbum(playlistAlbum) {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/playlist_albums/${playlistAlbum}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(() => {
            dispatch({type: "DELETE_UA_PLAYLIST_ALBUM", playlistAlbum: playlistAlbum})
            dispatch({type:"DELETE_PLAYLIST_ALBUM", playlistAlbumId: playlistAlbum.id})
        })
    }
}
export {
    createPlaylist,
    selectPlaylist,
    deletePlaylist,
    updatePlaylist,
    deletePlaylistAlbum
}
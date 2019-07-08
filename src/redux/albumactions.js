import _ from "lodash";

function addAlbum(album) {
    return (dispatch) => {
        fetch("http://localhost:3000/api/v1/playlist_albums", {
            method: "POST", 
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify(album)
        })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                console.log(response.error)
            }
            else if (response.user_album) {
                dispatch({type:"ADD_USER_ALBUM", userAlbum: {...response.user_album, ..._.omit(response.spotify_info, "id")}})
                dispatch({type:"ADD_PLAYLIST_ALBUM", playlistAlbum: {...response.playlist_album,..._.omit(response.spotify_info, "id")}})
            }
            else {
                dispatch({type:"ADD_PLAYLIST_ALBUM", playlistAlbum: {...response.playlist_album,..._.omit(response.spotify_info, "id")}})
            }
        })
    }
}

function updateUserAlbum (userAlbum) {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/user_albums/${userAlbum.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accepts": "application/json"
            },
            body: JSON.stringify(userAlbum)
        })
        .then(res => res.json())
        .then(userAlbum => {
            dispatch({type:"UPDATE_USER_ALBUM", userAlbum: userAlbum})
            dispatch({type:"DELETE_PLAYLIST_ALBUMS", userAlbum: userAlbum})
        })
    }
}

function deleteUserAlbum (userAlbum) {
    return (dispatch) => {
        fetch(`http://localhost:3000/api/v1/user_albums/${userAlbum.id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
        .then(() => {
            dispatch({type:"DELETE_USER_ALBUM", userAlbum: userAlbum})
            dispatch({type:"DELETE_PLAYLIST_ALBUMS", userAlbum: userAlbum})
        })
    }
}

export {
    addAlbum,
    deleteUserAlbum,
    updateUserAlbum
}
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
            else {
                dispatch({type:"ADD_PLAYLIST_ALBUM", playlistAlbum: response.playlist_album})
                dispatch({type:"ADD_USER_ALBUM", userAlbum: response.user_album})}})
    }
}

export {
    addAlbum
}
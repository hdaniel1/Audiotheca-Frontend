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
        .then(playlistAlbum => dispatch({type:"ADD_PLAYLIST_ALBUM", playlistAlbum: playlistAlbum}))  
    }
}

export {
    addAlbum
}
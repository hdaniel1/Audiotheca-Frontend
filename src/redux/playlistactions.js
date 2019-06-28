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
    .then(playlist => dispatch({type:"ADD_PLAYLIST", playlist: playlist}))
    }
}

export {
    createPlaylist
}
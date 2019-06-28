function logoutUser(){
    return {type:"LOGOUT_USER"}
}

function showAlbum(album) {
    return {type:"SHOW_ALBUM", album: album}
}

export {
    logoutUser,
    showAlbum
}
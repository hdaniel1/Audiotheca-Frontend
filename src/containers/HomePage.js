import React from 'react'
import PlaylistContainer from './PlaylistContainer'
import Banner from './Banner'
import '../styles/App.css';

export default class HomePage extends React.Component {
    render() {
        const {bannerAlbums, playlists, userAlbums} = this.props
        return(
            <React.Fragment>
                <Banner bannerAlbums={bannerAlbums}/>
                {playlists.length > 0 ? 
                <PlaylistContainer playlists={playlists} userAlbums={userAlbums}/>
                :
                <div id="playlist-placeholder">
                    <h2>Click the "Add New Playlist" button to start adding playlists to your account.</h2>
                </div>}
            </React.Fragment>
        )
    }
}
import React from 'react'
import {Card} from 'semantic-ui-react'
import PlaylistCard from '../components/PlaylistCard'
import Fade from 'react-reveal/Fade';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {selectPlaylist} from '../redux/playlistactions'
import '../styles/Playlists.css';

class PlaylistContainer extends React.Component {

    takeToPlaylistPage = (playlist) => {
        this.props.history.push(`/playlist/${playlist.id}`)
        this.props.selectPlaylist(playlist)
    }

    render() {
        const {currentUser, playlists, userAlbums} = this.props
        return (
            <Fade>
            <Card.Group centered itemsPerRow="2" id="playlist-container">
                {playlists.map(playlist => <PlaylistCard 
                                                        playlistAlbums={userAlbums.filter(album => album.playlist_albums.find(playlistAlbum => playlistAlbum.playlist_id === playlist.id) ? album : null)}
                                                        key={playlist.id} 
                                                        playlist={playlist} 
                                                        currentUser={currentUser}
                                                        selectPlaylist={this.takeToPlaylistPage}/>)}
            </Card.Group>
            </Fade>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectPlaylist: (playlist) => dispatch(selectPlaylist(playlist))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PlaylistContainer))

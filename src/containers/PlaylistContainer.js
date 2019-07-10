import React from 'react'
import {Card} from 'semantic-ui-react'
import PlaylistCard from '../components/PlaylistCard'
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
        const {currentUser, playlists} = this.props
        return (
            <Card.Group centered itemsPerRow="2" id="playlist-container">
                {playlists.map(playlist => <PlaylistCard 
                                                        key={playlist.id} 
                                                        playlist={playlist} 
                                                        currentUser={currentUser}
                                                        selectPlaylist={this.takeToPlaylistPage}/>)}
            </Card.Group>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectPlaylist: (playlist) => dispatch(selectPlaylist(playlist))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PlaylistContainer))

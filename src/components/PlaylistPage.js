import React from 'react'
import {Image, Button, Confirm, Transition, Card} from 'semantic-ui-react'
import '../styles/Playlists.css';
import Album from './Album'
import PlaylistFormModal from './PlaylistFormModal'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import SpotifyWebApi from 'spotify-web-api-js';
import {updatePlaylist, deletePlaylist, deletePlaylistAlbum} from '../redux/playlistactions'

const spotifyApi = new SpotifyWebApi();

class PlaylistPage extends React.Component {
    state = {
        showModal: false,
        confirmMessage: false
    }

    open = () => this.setState({ confirmMessage: true })
    close = () => this.setState({ confirmMessage: false })

    closeModal = () => this.setState({showModal:false})

    handleDelete = () => {
        this.props.history.push("/home")
        this.props.deletePlaylist(this.props.playlist)
    }

    addToSpotify = (token, user, playlist) => {
        spotifyApi.setAccessToken(token)
        let playlistInfo = {
            name: playlist.name, 
            description: playlist.description
        }
        spotifyApi.createPlaylist(user.id,playlistInfo)
        alert("Check your spotify!")
    }

    render() {
        return (
            <React.Fragment>
                <Card.Group centered itemsPerRow="2" id="playlist-container">
                    <Card>
                        <Card.Content>
                            <Image floated='left' size='small' src={this.props.playlist.playlist_image ? this.props.playlist.playlist_image : 'https://react.semantic-ui.com/images/wireframe/short-paragraph.png'} />
                            <Card.Header>{this.props.playlist.name}</Card.Header>
                            <Card.Meta>Playlist</Card.Meta><br/>
                            <Card.Header id="playlist-description-header"><b><u>Description:</u></b><br/>{this.props.playlist.description}</Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <Button className="playlist-info-button" id="add-to-spotify" onClick={() => this.addToSpotify(this.props.token,this.props.user, this.props.playlist)}>Add to Spotify</Button>
                            <Button className="playlist-info-button" color='blue' onClick={() => this.setState({showModal:true})}>Update Playlist</Button>
                            <Button className="playlist-info-button" color='red' onClick={this.open}>Delete Playlist</Button>
                            <Confirm open={this.state.confirmMessage} onCancel={this.close} onConfirm={this.handleDelete} />
                        </Card.Content>
                    </Card>
                        <PlaylistFormModal closeModal={this.closeModal} open={this.state.showModal} playlist={this.props.playlist} user={this.props.user} updatePlaylist={this.props.updatePlaylist}/>
                    </Card.Group>
                        <div id="playlist-album-container">
                            {this.props.playlistAlbums.map(playlistAlbum => <Album key={playlistAlbum.id} id={playlistAlbum.id} updateUserAlbum={this.props.updateUserAlbum} albumInfo={this.props.userAlbums.find(userAlbum => userAlbum.spotify_id === playlistAlbum.spotify_id)} deletePlaylistAlbum={this.props.deletePlaylistAlbum}/>)}
                        </div>
                </React.Fragment>      
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePlaylist: (playlist) => dispatch(deletePlaylist(playlist)),
        updatePlaylist: (playlist) => dispatch(updatePlaylist(playlist)),
        deletePlaylistAlbum: (playlistAlbum) => dispatch(deletePlaylistAlbum(playlistAlbum))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(PlaylistPage))
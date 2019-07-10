import React from 'react'
import {Image, Button, Confirm, Transition, Card, Icon} from 'semantic-ui-react'
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
        confirmMessage: false,
        buttonLoading: false,
        buttonColor: "grey"
    }

    open = () => this.setState({ confirmMessage: true })
    close = () => this.setState({ confirmMessage: false })

    closeModal = () => this.setState({showModal:false})

    handleDelete = () => {
        this.props.history.push("/home")
        this.props.deletePlaylist(this.props.playlist)
    }

    addToSpotify = (token, user, playlist, playlistAlbums) => {
        this.setState({
            buttonLoading: true
        }, () => {
        spotifyApi.setAccessToken(token)
        let playlistInfo = {
            name: playlist.name, 
            description: playlist.description
        }
        //first create the playlist
        spotifyApi.createPlaylist(user.id,playlistInfo)
        .then(spotifyPlaylist => {
            //for each album in the playlist, get the tracks
            playlistAlbums.forEach(album => {
                spotifyApi.getAlbumTracks(album.spotify_id)
                .then(tracks => {
                    //then add the tracks to the playlist
                    let trackIRIs = tracks.items.map(track => track.uri)
                    spotifyApi.addTracksToPlaylist(spotifyPlaylist.id, trackIRIs)
                    .then(spotifyResponse => {
                        this.props.updatePlaylist({...playlist, spotify_id: spotifyPlaylist.id})
                        this.setState({buttonLoading: false, buttonColor: "green"})
                    })
                })
            })
        })})
    }


    render() {
        const {playlist, token, user, updatePlaylist, playlistAlbums, userAlbums, deletePlaylistAlbum, updateUserAlbum} = this.props 
        const {showModal, confirmMessage, buttonLoading, buttonColor} = this.state
        return (
            <React.Fragment>
                <Card.Group centered itemsPerRow="2" id="playlist-container">
                    <Card>
                        <Card.Content>
                            <Image floated='left' size='small' src={playlist.playlist_image ? playlist.playlist_image : 'https://react.semantic-ui.com/images/wireframe/short-paragraph.png'} />
                            <Card.Header>{playlist.name}</Card.Header>
                            <Card.Meta>Playlist</Card.Meta><br/>
                            <Card.Header id="playlist-description-header"><b><u>Description:</u></b><br/>{playlist.description}</Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            {playlistAlbums.length  > 0 ? <Button className="playlist-info-button" color={buttonColor} disabled={playlist.spotify_id ? true : false} icon={buttonColor === "green" ? "check" : false} content={buttonColor === "green" ? "Success!" : "Add to Spotify"} loading={buttonLoading} onClick={() => this.addToSpotify(token,user, playlist, playlistAlbums)} /> : null}
                            <Button className="playlist-info-button" color='blue' onClick={() => this.setState({showModal:true})}>Update Playlist</Button>
                            <Button className="playlist-info-button" color='red' onClick={this.open}>Delete Playlist</Button>
                            <Confirm open={confirmMessage} onCancel={this.close} onConfirm={this.handleDelete} />
                        </Card.Content>
                    </Card>
                        <PlaylistFormModal closeModal={this.closeModal} open={showModal} playlist={playlist} user={user} updatePlaylist={updatePlaylist}/>
                    </Card.Group>
                        <div id="playlist-album-container">
                            {playlistAlbums.map(playlistAlbum => <Album key={playlistAlbum.id} info={playlistAlbum} updateUserAlbum={updateUserAlbum} albumInfo={userAlbums.find(userAlbum => userAlbum.spotify_id === playlistAlbum.spotify_id)} deletePlaylistAlbum={deletePlaylistAlbum}/>)}
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
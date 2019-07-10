import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import '../styles/Playlists.css';

export default class PlaylistCard extends React.Component {
    render() {
        const {playlist, selectPlaylist, playlistAlbums} = this.props
        return (
            <Card onClick={() => selectPlaylist(playlist)}>
                <Card.Content >
                    <Image floated='left' size='small' src={playlist.playlist_image ? playlist.playlist_image : 'https://react.semantic-ui.com/images/wireframe/short-paragraph.png'} />
                    <Card.Header>{playlist.name}</Card.Header>
                    <Card.Meta>Playlist</Card.Meta>
                    <Card.Header id="playlist-description-header"><b><u>Description:</u></b><br/> {playlist.description}</Card.Header>
                    {playlistAlbums.length > 0 ? playlistAlbums.map(album => album.images ? <Image size="mini" src={album.images[2].url} alt="playlist-album-preview"/> : null) :null }
                </Card.Content>
            </Card>
        )
    }
}
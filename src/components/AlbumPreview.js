import React from 'react'
import _ from "lodash";
import {Card, Image, Button} from 'semantic-ui-react'
import '../styles/Sidebar.css';

export default class AlbumPreview extends React.Component {

    handleAdd = () => {
        let newAlbum = {
            playlist_id: this.props.playlist.id,
            user_id: this.props.playlist.user.id,
            spotify_id: this.props.albumInfo.id
        }
        this.props.addAlbum(newAlbum)
    }

    render() {
        const {playlist, userAlbums, playlistAlbums, albumInfo} = this.props
        return (
                <Card id="preview-card">
                    <Image src={albumInfo.images[1].url} />
                    <Card.Content textAlign="center">
                        <Card.Header >{albumInfo.name}</Card.Header>
                        <Card.Meta >{albumInfo.artists[0].name}</Card.Meta>
                        <Card.Description>Release Date: {albumInfo.release_date}</Card.Description>
                        <Card.Content extra><br />
                            {_.some(playlistAlbums, {"spotify_id": albumInfo.id, playlist_id: playlist.id}) ? 
                            <Button disabled>
                                Already in this Playlist
                            </Button>
                            :
                            <Button color='green' onClick={this.handleAdd}>
                                Add to Backlog
                            </Button>}
                        </Card.Content>                     
                    </Card.Content>
                </Card>
        )}
}
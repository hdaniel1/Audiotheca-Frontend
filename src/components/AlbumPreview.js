import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'

export default class AlbumPreview extends React.Component {

    handleAdd = () => {
        let newAlbum = {
            playlist_id: this.props.playlist.id,
            user_id: this.props.playlist.user_id,
            spotify_id: this.props.albumInfo.id
        }
        this.props.addAlbum(newAlbum)
    }
    render() {
        return (
                <Card  textAlign="center">
                    <Image src={this.props.albumInfo.images[1].url} />
                    <Card.Content textAlign="left">
                        <Card.Header floated='left'>{this.props.albumInfo.name}</Card.Header>
                        <Card.Meta floated='left'>{this.props.albumInfo.artists[0].name}</Card.Meta>
                        <Card.Description>Release Date: {this.props.albumInfo.release_date}</Card.Description>
                        <Card.Content extra><br />
                            <Button color='green' onClick={this.handleAdd}>
                                Add to Backlog
                            </Button>
                        </Card.Content>                     
                    </Card.Content>
                </Card>
        )}
}
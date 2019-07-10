import React from 'react'
import {Card, Image} from 'semantic-ui-react'

export default class PlaylistCard extends React.Component {
    render() {
        const {playlist, selectPlaylist} = this.props
        return (
            <Card onClick={() => selectPlaylist(playlist)}>
                <Card.Content >
                    <Image floated='left' size='small' src={playlist.playlist_image ? playlist.playlist_image : 'https://react.semantic-ui.com/images/wireframe/short-paragraph.png'} />
                    <Card.Header>{playlist.name}</Card.Header>
                    <Card.Meta>Playlist</Card.Meta>
                    <Card.Header><b><u>Description:</u></b> {playlist.description}</Card.Header>
                </Card.Content>
            </Card>
        )
    }
}
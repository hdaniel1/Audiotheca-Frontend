import React from 'react'
import {Card, Image} from 'semantic-ui-react'

export default class PlaylistCard extends React.Component {
    render() {
        return (
            <Card onClick={() => this.props.selectPlaylist(this.props.playlist)}>
                <Card.Content >
                    <Image floated='right' size='small' src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    <Card.Header>{this.props.playlist.name}</Card.Header>
                    <Card.Meta>Playlist</Card.Meta>
                    <Card.Description><b><u>Description:</u></b> {this.props.playlist.description}</Card.Description>
                </Card.Content>
            </Card>
        )
    }
}
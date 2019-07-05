import React from 'react'
import {Card, Image, Button, Icon} from 'semantic-ui-react'

export default class Album extends React.Component {

    handleDelete = () => {
        if (this.props.deletePlaylistAlbum) {
            this.props.deletePlaylistAlbum(this.props.id) 
        }
        else if (this.props.deleteUserAlbum) {
            this.props.deleteUserAlbum(this.props.albumInfo)
        }
    }

    render() {
        return(
            <Card >
                <Image src={this.props.albumInfo.images[1].url} />
                <span className="close" onClick={() => this.handleDelete()}><Icon name="delete"/></span>
                <Card.Content textAlign="center">
                    <Card.Header className="album-header">{this.props.albumInfo.name}</Card.Header>
                    <Card.Meta>{this.props.albumInfo.artists[0].name}</Card.Meta>
                    <Card.Description>Release Date: {this.props.albumInfo.release_date}</Card.Description>
                    <Card.Content extra><br />
                        
                    </Card.Content>                     
                </Card.Content>
            </Card>
        )
    }
}

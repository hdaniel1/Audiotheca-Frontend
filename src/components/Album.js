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

    handleListen = (userAlbum) => {
       let updatedAlbum = {...userAlbum, listened_to: true}
       this.props.updateUserAlbum(updatedAlbum)
    }

    render() {
        return(
            <Card id="album-card">
                <Image src={this.props.albumInfo.images[1].url} />
                {this.props.deletePlaylistAlbum || this.props.deleteUserAlbum ? <span className="close" onClick={() => this.handleDelete()}><Icon name="delete"/></span> : null}
                <Card.Content textAlign="center">
                    <Card.Header id="album-header">{this.props.albumInfo.name}</Card.Header>
                    <Card.Meta>{this.props.albumInfo.artists[0].name}</Card.Meta>
                    <Card.Description>Release Date: {this.props.albumInfo.release_date}</Card.Description>
                    {this.props.deletePlaylistAlbum || this.props.deleteUserAlbum ? 
                    <Card.Content extra><br />
                        <Button color="green">Listen</Button>
                        <Button color="orange" onClick={() => this.handleListen(this.props.albumInfo)}>Done Listening?</Button>
                    </Card.Content>       
                    : 
                    null}              
                </Card.Content>
            </Card>
        )
    }
}

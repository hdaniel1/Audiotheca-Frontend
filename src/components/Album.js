import React from 'react'
import {Card, Image, Button, Icon, Rating} from 'semantic-ui-react'

export default class Album extends React.Component {

    state = {
        albumPlaying: null
    }
    
    playAlbum = (album) => {
        this.state.albumPlaying ? 
            this.setState({albumPlaying: null})
            :
            this.setState({albumPlaying: album.spotify_id})
    }

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

    rateAlbum = (data, userAlbum) => {
        let updatedAlbum = {...userAlbum, rating: data.rating}
        this.props.updateUserAlbum(updatedAlbum)
    }

    render() {
        return(
            <Card id="album-card">
                {this.state.albumPlaying ? <iframe src={`https://open.spotify.com/embed/album/${this.state.albumPlaying}`} width="290" height="286" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> :<Image src={this.props.albumInfo.images[1].url} />}
                {this.props.deletePlaylistAlbum || this.props.deleteUserAlbum ? <span className="close" onClick={() => this.handleDelete()}><Icon name="delete"/></span> : null}
                <Card.Content textAlign="center">
                    <Card.Header id="album-header">{this.props.albumInfo.name}</Card.Header>
                    <Card.Meta>{this.props.albumInfo.artists[0].name}</Card.Meta>
                    <Card.Description>Release Date: {this.props.albumInfo.release_date}</Card.Description>
                    {this.props.deletePlaylistAlbum || this.props.deleteUserAlbum ? 
                    <Card.Content extra><br />
                        <Button color="green" onClick={() => this.playAlbum(this.props.albumInfo)}>{this.state.albumPlaying ? "Album Art" : "Listen"}</Button>
                        <Button color="orange" onClick={() => this.handleListen(this.props.albumInfo)}>Done Listening?</Button>
                    </Card.Content>       
                    : 
                    <Rating icon='star' maxRating={5} defaultRating={this.props.albumInfo.rating} onRate={(e, data)=> this.rateAlbum(data, this.props.albumInfo)}/>}              
                </Card.Content>
            </Card>
        )
    }
}

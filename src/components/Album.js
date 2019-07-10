import React from 'react'
import {Card, Image, Button, Icon, Rating, Modal, Header} from 'semantic-ui-react'

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
            this.props.deletePlaylistAlbum(this.props.info) 
        }
        else if (this.props.deleteUserAlbum) {
            this.props.deleteUserAlbum(this.props.albumInfo)
        }
    }

    handleListen = (userAlbum, rating=0) => {
       let updatedAlbum = {...userAlbum, listened_to: true, rating: rating}
       this.props.updateUserAlbum(updatedAlbum)
    }

    rateAlbum = (rating, userAlbum) => {
        let updatedAlbum = {...userAlbum, rating: rating}
        this.props.updateUserAlbum(updatedAlbum)
    }

    render() {
        const {deletePlaylistAlbum, deleteUserAlbum, albumInfo} = this.props
        const {albumPlaying} = this.state
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let releaseDate = new Date(albumInfo.release_date)
        return(
            <Card id="album-card">
                {albumPlaying ? <iframe title="spotify-widget" src={`https://open.spotify.com/embed/album/${albumPlaying}`} width="290" height="286" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> :<Image src={albumInfo.images[1].url} />}
                {deletePlaylistAlbum || deleteUserAlbum ? <span className="close" onClick={() => this.handleDelete()}><Icon name="delete"/></span> : null}
                <Card.Content textAlign="center">
                    <Card.Header id="album-header">{albumInfo.name}</Card.Header>
                    <Card.Meta>{albumInfo.artists[0].name}</Card.Meta>
                    <Card.Description>Release Date: {`${monthNames[releaseDate.getMonth()]} ${releaseDate.getDate()}, ${releaseDate.getFullYear()}`}</Card.Description>
                    {deletePlaylistAlbum || deleteUserAlbum ? 
                    <Card.Content extra><br />
                        <Button style={{background: "#29a84f", color: "#FFFFFF"}} onClick={() => this.playAlbum(albumInfo)}>{this.state.albumPlaying ? "Album Art" : "Listen"}</Button>
                        <Modal trigger={<Button color="orange">Done Listening?</Button>} onClose={() => this.handleListen(albumInfo)}>
                        <Modal.Content image>
                            <Header>Rate this Album?</Header>
                            <Rating icon='star' maxRating={5} defaultRating={albumInfo.rating} onRate={(e, data)=> this.handleListen(albumInfo,data.rating)}/>                
                        </Modal.Content>
                        </Modal>
                    </Card.Content>       
                    : 
                    <Rating icon='star' maxRating={5} defaultRating={albumInfo.rating} onRate={(e, data)=> this.rateAlbum(data.rating, albumInfo)}/>}              
                </Card.Content>
            </Card>
        )
    }
}

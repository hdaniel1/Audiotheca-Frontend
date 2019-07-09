import React from 'react'
import _ from "lodash";
import {Card, Image, Button} from 'semantic-ui-react'
import '../styles/Sidebar.css';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default class AlbumPreview extends React.Component {

    handleAdd = () => {
        let newAlbum = {
            spotify_info: this.props.albumInfo,
            playlist_id: this.props.playlist.id,
            user_id: this.props.playlist.user.id,
            spotify_id: this.props.albumInfo.id
        }
        this.props.addAlbum(newAlbum)
        this.props.fetchArtistInformation(this.props.token, this.props.albumInfo.artists[0].id.split())
    }

    render() {
        const {playlist, userAlbums, playlistAlbums, albumInfo} = this.props
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let releaseDate = new Date(albumInfo.release_date)
        return (
                <Card id="preview-card">
                    <Image src={albumInfo.images[1].url} />
                    <Card.Content textAlign="center">
                        <Card.Header >{albumInfo.name}</Card.Header>
                        <Card.Meta >{albumInfo.artists[0].name}</Card.Meta>
                        <Card.Description>Release Date: {`${monthNames[releaseDate.getMonth()]} ${releaseDate.getDate()}, ${releaseDate.getFullYear()}`}}</Card.Description>
                            {/*If already listened to buttons*/}<br/>
                            {_.some(userAlbums, {"spotify_id": albumInfo.id, "listened_to": true}) ? 
                                <Button color="orange" disabled >Listened!</Button>
                                : 
                            /*Otherwise, check if in playlist*/
                                _.some(playlistAlbums, {"spotify_id": albumInfo.id, playlist_id: playlist.id}) ? <Button color="green" disabled>Already in Playlist</Button> :  <Button color="green" onClick={this.handleAdd} >Add to Playlist</Button>}                  
                    </Card.Content>
                </Card>
        )}
}
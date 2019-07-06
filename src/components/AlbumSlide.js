import React from 'react'
import {List, Image, Divider, Button, Modal} from 'semantic-ui-react'
import AlbumPreview from './AlbumPreview'
import _ from "lodash";
import '../styles/Sidebar.css';

const AlbumSlide = ({ key, albumInfo, showAlbum, playlist, addAlbum, playlistAlbums, userAlbums, ...rest }) => {

        function handleAdd () {
            let newAlbum = {
                spotify_info: albumInfo,
                playlist_id: playlist.id,
                user_id: playlist.user.id,
                spotify_id: albumInfo.id
            }
            addAlbum(newAlbum)
        }

        return (
            <React.Fragment>
                <List.Item key={albumInfo.id} {...rest}  id ="album-slide">
                    <Image 
                        href={albumInfo.uri}
                        id="album-image"
                        src={albumInfo.images[2] ? albumInfo.images[2].url : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Pictogram_voting_question.svg/220px-Pictogram_voting_question.svg.png"}
                        alt="album-screenshot"
                    />
                    <List.Content>
                        <List.Header id="album-name">{albumInfo.name}</List.Header>
                        <div id="slide-buttons">
                            {/*If already listened to buttons*/}
                            {_.some(userAlbums, {"spotify_id": albumInfo.id, "listened_to": true}) ? 
                                <Button color="orange" disabled >Listened!</Button>
                                : 
                            /*Otherwise, check if in playlist*/
                                _.some(playlistAlbums, {"spotify_id": albumInfo.id, playlist_id: playlist.id}) ? <Button icon="check" disabled></Button> :  <Button color="green" icon="check" onClick={handleAdd} ></Button>}
                            <Modal id="preview-modal" trigger={<Button color='blue'> Info</Button>}>
                                <AlbumPreview key={albumInfo.id} 
                                            userAlbums={userAlbums} 
                                            albumInfo={albumInfo}
                                            playlistAlbums={playlistAlbums} 
                                            addAlbum={addAlbum} 
                                            playlist={playlist}/>
                            </Modal>
                        </div>
                    </List.Content>
                </List.Item>
                <Divider inverted/>
            </React.Fragment>
        )
    }

export default AlbumSlide
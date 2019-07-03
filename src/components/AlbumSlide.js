import React from 'react'
import {List, Image, Divider} from 'semantic-ui-react'
import '../styles/Sidebar.css';

const AlbumSlide = ({ key, albumInfo, showAlbum, ...rest }) => {
    debugger
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
                    </List.Content>
                </List.Item>
                <Divider inverted/>
            </React.Fragment>
        )
    }

export default AlbumSlide
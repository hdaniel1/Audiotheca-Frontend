import React from 'react'
import Album from '../components/Album'
import Sorting from '../components/Sorting'
import {Card} from 'semantic-ui-react'
import '../styles/App.css';

export default class BacklogPage extends React.Component {


    render() {
        const {handleSort} = this.props
        return (
            <React.Fragment>
                <Sorting handleSort={handleSort} showRatingSort={true}/>
                <Card.Group id="user-album-container">
                    {this.props.albums.map(album => {
                        return (
                            <Album key={album.id} albumInfo={album} updateUserAlbum={this.props.updateUserAlbum}/>
                        )
                    })}
                </Card.Group>
            </React.Fragment>
        )
    }
}

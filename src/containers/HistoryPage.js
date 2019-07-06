import React from 'react'
import Album from '../components/Album'
import {Card} from 'semantic-ui-react'

export default class BacklogPage extends React.Component {

    render() {
        return (
            <Card.Group >
                {this.props.albums.map(album => {
                    return (
                        <Album key={album.id} albumInfo={album} updateUserAlbum={this.props.updateUserAlbum}/>
                    )
                })}
            </Card.Group>
        )
    }
}

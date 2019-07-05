import React from 'react'
import Album from '../components/Album'
import {Item, Button, Confirm, Transition, Card} from 'semantic-ui-react'

export default class HistoryPage extends React.Component {
    render() {
        return (
            <Card.Group id="playlist-albums-grid">
                {this.props.albums.map(album => {
                    return (
                        <Album key={album.id} albumInfo={album}/>
                    )
                })}
            </Card.Group>
        )
    }
}
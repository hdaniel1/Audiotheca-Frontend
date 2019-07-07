import React from 'react'
import {Card, Image, Progress} from 'semantic-ui-react'
import '../styles/StatsPage.css';

export default class ArtistsStats extends React.Component {
  
    render() {
        const {artists, albums} = this.props
        return (
            <Card.Group centered itemsPerRow="1">
                {artists.map(artist => {
                let listenedAlbums = albums.filter(album => album.artists[0].id === artist.id)
                let unlistenedAlbums = artist.items.filter(album => !listenedAlbums.map(listenedAlbum => listenedAlbum.spotify_id).includes(album.id))
                debugger
                return (
                    <Card>
                        <Card.Content >
                            <Image floated='left' size='massive' avatar src={artist.images[2].url}/>
                            <Card.Header><u>{artist.name}</u></Card.Header>
                            <br/>
                            <Card.Header>
                                {listenedAlbums.map(album => <Image size="tiny" src={album.images[1].url} />)}
                                {unlistenedAlbums.map(album => <Image className="unlistened-album" size="tiny" src={album.images[1].url} />)}
                            </Card.Header>
                        </Card.Content>
                        <Card.Content extra>
                            <Progress autoSuccess color="blue" value={listenedAlbums.length} total={artist.count} progress='ratio' />
                        </Card.Content>
                    </Card>
                )
                })}
            </Card.Group>
        )
    }
}
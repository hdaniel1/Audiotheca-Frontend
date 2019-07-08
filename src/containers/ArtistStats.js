import React from 'react'
import {Card, Image, Progress, Popup} from 'semantic-ui-react'
import '../styles/StatsPage.css';

export default class ArtistsStats extends React.Component {
  
    render() {
        const {artists, albums} = this.props
        debugger
        return (
            artists.length > 0 && albums.length > 0 ? 
            <Card.Group centered itemsPerRow="1">
                {artists.map(artist => {
                if (artist.items) { 
                    let listenedAlbums = albums.filter(album => album.artists[0].id === artist.id)
                    let unlistenedAlbums = artist.items.filter(album => !listenedAlbums.map(listenedAlbum => listenedAlbum.spotify_id).includes(album.id))
                    return (
                        <Card>
                            <Card.Content >
                                <Image floated='left' size='massive' avatar src={artist.images[1].url}/>
                                <Card.Header><u>{artist.name}</u></Card.Header>
                                <br/>
                                <Card.Header>
                                    {listenedAlbums.map(album => <Popup content={album.name} key={album.id} trigger={<Image size="tiny" src={album.images[1].url} />}/>)}
                                    {unlistenedAlbums.map(album => <Popup content={album.name} key={album.id} trigger={<Image className="unlistened-album" size="tiny" src={album.images[1].url} />}/>)}
                                </Card.Header>
                            </Card.Content>
                            <Card.Content extra>
                                <Progress autoSuccess color="blue" value={listenedAlbums.length} total={artist.count} progress='ratio' />
                            </Card.Content>
                        </Card>
                    )
                }
                })}
            </Card.Group>
            :
            null
        )
    }
}
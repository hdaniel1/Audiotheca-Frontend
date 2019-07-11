import React from 'react'
import {Card, Image, Progress, Popup, Rating} from 'semantic-ui-react'
import '../styles/StatsPage.css';

export default class ArtistsStats extends React.Component {
  
    render() {
        const {artists, albums} = this.props
        return (
            artists.length > 0 && albums.length > 0 ? 
            <Card.Group centered itemsPerRow="1">
                {artists.map(artist => {
                if (artist.items) { 
                    //find the listened to / not listened to albums for that artist
                    let listenedAlbums = albums.filter(album => album.artists[0].id === artist.id)
                    let unlistenedAlbums = artist.items.filter(album => !listenedAlbums.map(listenedAlbum => listenedAlbum.spotify_id).includes(album.id))
                    return (
                        <Card key={artist.id}>
                            <Card.Content >
                                <Image floated='left' size='massive' avatar src={artist.images[1].url}/>
                                <Card.Header href={artist.uri}><u>{artist.name}</u></Card.Header>
                                <br/>
                                <Card.Header>
                                    {listenedAlbums.map(album => {
                                        return (
                                        <Popup key={album.id} trigger={<Image size="tiny" src={album.images[1].url} />}>
                                            <Popup.Content>
                                                <Popup.Header>{album.name}</Popup.Header>
                                                <Popup.Header>Rating: <Rating icon='star' defaultRating={album.rating} maxRating={5} /></Popup.Header>
                                            </Popup.Content>
                                        </Popup>
                                        )
                                    })}
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
            <div>
                <h3>Listen to some albums to unlock this feature!</h3>
            </div>
        )
    }
}
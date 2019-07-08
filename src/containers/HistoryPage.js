import React from 'react'
import Album from '../components/Album'
import AlbumFilters from './AlbumFilters'
import {Card} from 'semantic-ui-react'
import '../styles/App.css';

export default class BacklogPage extends React.Component {

    state = {
        artistFilter: ""
    }

    handleFilter = (event, {value}) => this.setState({artistFilter: value})
    
    render() {
        const {handleSort, updateUserAlbum, artists, albums} = this.props
        const {artistFilter} = this.state
        let artistOptions = albums.map(album => album.artists[0].name)
        return (
            <React.Fragment>
                <AlbumFilters handleSort={handleSort} artists={artists} artistOptions={artistOptions} showRatingSort={true} handleFilter={this.handleFilter}/>
                <Card.Group id="user-album-container">
                    {albums.filter(album => album.artists[0].name.includes(artistFilter)).map(album => <Album key={album.id} albumInfo={album} updateUserAlbum={updateUserAlbum}/>)}
                </Card.Group>
            </React.Fragment>
        )
    }
}

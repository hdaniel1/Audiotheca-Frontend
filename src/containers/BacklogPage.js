import React from 'react'
import Album from '../components/Album'
import {Card} from 'semantic-ui-react'
import {deleteUserAlbum} from '../redux/albumactions'
import {connect} from 'react-redux'
import AlbumFilters from './AlbumFilters'
import '../styles/App.css';

class BacklogPage extends React.Component {
    state = {
        artistFilter: ""
    }

    handleFilter = (event, {value}) => this.setState({artistFilter: value})

    render() {
        const {handleSort, albums, updateUserAlbum, deleteUserAlbum,} = this.props
        const {artistFilter} = this.state
        let artistOptions = albums.map(album => album.artists[0].name)
        
        return (
            <React.Fragment>
                <AlbumFilters handleSort={handleSort} artistOptions={artistOptions} showRatingSort={false} handleFilter={this.handleFilter} />
                <Card.Group id="user-album-container">
                    {albums.filter(album => album.artists[0].name.includes(artistFilter)).map(album => <Album key={album.id} updateUserAlbum={updateUserAlbum} albumInfo={album} deleteUserAlbum={deleteUserAlbum}/>)}
                </Card.Group>
            </React.Fragment>
        )
    }
}

  const mapDispatchToProps = (dispatch) => {
    return {
      deleteUserAlbum: (userAlbum) => dispatch(deleteUserAlbum(userAlbum))
    }
  }
  
  export default connect(null, mapDispatchToProps)(BacklogPage)
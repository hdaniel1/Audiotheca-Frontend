import React from 'react'
import Album from '../components/Album'
import {Card} from 'semantic-ui-react'
import {deleteUserAlbum} from '../redux/albumactions'
import {connect} from 'react-redux'
import Sorting from '../components/Sorting'
import '../styles/App.css';


class BacklogPage extends React.Component {

    render() {
        const {handleSort} = this.props
        return (
            <React.Fragment>
                <Sorting handleSort={handleSort} showRatingSort={false}/>
                <Card.Group id="user-album-container">
                    {this.props.albums.map(album => {
                        return (
                            <Album key={album.id} updateUserAlbum={this.props.updateUserAlbum} albumInfo={album} deleteUserAlbum={this.props.deleteUserAlbum}/>
                        )
                    })}
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
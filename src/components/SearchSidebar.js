import React from 'react'
import {Menu, Sidebar, Divider, List} from 'semantic-ui-react'
import PlaylistPage from './PlaylistPage'
import AlbumPreview from './AlbumPreview'
import Searchbar from './Searchbar'
import {connect} from 'react-redux'
import '../styles/Sidebar.css';
import SpotifyWebApi from 'spotify-web-api-js';
import AlbumSlide from './AlbumSlide'
import _ from "lodash";
import {deletePlaylist, updatePlaylist} from '../redux/playlistactions'


const spotifyApi = new SpotifyWebApi();

//REVISIT CLEARING SEARCH RESULTS AT SOME POINT//

class SearchSidebar extends React.Component {
    constructor() {
        super() 
        this.state = {
            artistAlbums: [],
            clearSearch: false,
            albumPreview: null
        }
    }

    //clear album list if sidebar is hidden, then set clearSearch to true so passed down to Searchbar
    static getDerivedStateFromProps(props, state) {
        if (props.visible === false && state.artistAlbums.length > 0) {
            state.artistAlbums = []
            state.clearSearch =  true
        }
    }

    //get unique albums by name since Spotify sometimes returns dupes
    fetchArtistAlbums = (artistID) => {
        spotifyApi.getArtistAlbums(artistID)
        .then(albums => this.setState({
            artistAlbums: _.uniqBy(albums.items, 'name')
                           .filter(album => album.album_type === "album" && album.album_group === "album")
        }))
    }

    //clears album list
    clearAlbums = () => this.setState({artistAlbums: [], clearSearch: false, albumPreview: null})

    //callback for albumpreview
    showAlbumInfo = (album) => {debugger;this.setState({albumPreview: album})}

    render() {    
        return (
            <div id="sidebar">
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='push'
                        icon='labeled'
                        inverted
                        vertical
                        target={this.segmentRef}
                        visible={this.props.visible}
                        width='wide'
                    >
                        <Searchbar 
                            handleChange={this.handleChange} 
                            token={this.props.token} 
                            fetchAlbums={this.fetchArtistAlbums}
                            clearAlbums={this.clearAlbums}
                            clearSearch={this.state.clearSearch}
                        />
                        <Divider id="searchbar-divider"/>
                        {/* List of selected artist's albums */}
                        <List inverted relaxed celled>
                            {this.state.artistAlbums.map(album => <AlbumSlide key={album.id} albumInfo={album} showAlbum={this.showAlbumInfo}/>)}
                        </List>     
                    </Sidebar>
                    {/* components that get pushed to the side*/}
                    <Sidebar.Pusher >
                        <PlaylistPage playlist={this.props.playlist} deletePlaylist={this.props.deletePlaylist} user={this.props.user} updatePlaylist={this.props.updatePlaylist}/>
                        {this.state.albumPreview ? <AlbumPreview albumInfo={this.state.albumPreview}/> : null}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePlaylist: (playlist) => dispatch(deletePlaylist(playlist)),
        updatePlaylist: (playlist) => dispatch(updatePlaylist(playlist))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSidebar)
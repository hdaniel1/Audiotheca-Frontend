import React from 'react'
import {Menu, Sidebar, Divider, List} from 'semantic-ui-react'
import Searchbar from './Searchbar'
import {connect} from 'react-redux'
import '../styles/Sidebar.css';
import SpotifyWebApi from 'spotify-web-api-js';
import AlbumSlide from './AlbumSlide'
import _ from "lodash";

const spotifyApi = new SpotifyWebApi();

//REVISIT CLEARING SEARCH RESULTS AT SOME POINT//

class SearchSidebar extends React.Component {
    constructor() {
        super() 
        this.state = {
            artistAlbums: [],
            clearSearch: false
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

    handleChange = (text) => {
        this.setState({searchText: text})
    }

    clearAlbums = () => this.setState({artistAlbums: [], clearSearch: false})

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
                        <Divider />
                        <List inverted relaxed celled>
                            {this.state.artistAlbums.map(album => <AlbumSlide key={album.id} albumInfo={album}/>)}
                        </List>     
                    </Sidebar>
                    <Sidebar.Pusher dimmed={this.props.visible}>
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
        test: "test"
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSidebar)
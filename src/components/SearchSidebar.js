import React, { createRef } from 'react'
import {Menu, Sidebar, Divider, List, Ref, Modal} from 'semantic-ui-react'
import App from '../containers/App'
import AlbumPreview from './AlbumPreview'
import Searchbar from './Searchbar'
import {connect} from 'react-redux'
import '../styles/Sidebar.css';
import SpotifyWebApi from 'spotify-web-api-js';
import AlbumSlide from './AlbumSlide'
import {withRouter} from 'react-router-dom'
import _ from "lodash";
import {addAlbum} from '../redux/albumactions'


const spotifyApi = new SpotifyWebApi();

//REVISIT CLEARING SEARCH RESULTS AT SOME POINT//

class SearchSidebar extends React.Component {
    constructor() {
        super() 
        this.state = {
            artistAlbums: [],
            clearSearch: false,
            visible: false
        }
    }

    segmentRef = createRef()
    //callback for route and visibility via navbar
    showSideBar = () => {
        !this.state.visible ?
            this.setState({visible: true}, (() => this.props.history.push(`/playlist/${this.props.playlist.id}/search`)))  
            :
            this.setState({visible: false}, (() => this.props.history.push(`/playlist/${this.props.playlist.id}`)))
    } 

    //hide on ESC -FIGURE OUT HOW TO MAKE THIS WORK
    handleKeyPress = (event) => {
        debugger
        if (event.keyCode === 27 && this.state.visible) {
          this.setState({ visible: false })
        }
    }  

    //clear album list if sidebar is hidden, then set clearSearch to true so passed down to Searchbar. If not hidden, add event listener to close on ESC
    componentWillMount() {
        if (this.state.artistAlbums.length > 0) {
            this.setState({artistAlbums: [] })
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

    //for closing on click in pushable content
    handleSidebarHide = () => this.setState({ visible: false, clearSearch: true }, () => this.clearAlbums())

    //clears album list
    clearAlbums = () => this.setState({artistAlbums: [], clearSearch: false, albumPreview:null})

    render() {    
        return (
            <React.Fragment>
                <div id="sidebar">
                    <Sidebar.Pushable>
                        <Sidebar
                            as={Menu}
                            animation='overlay'
                            icon='labeled'
                            onHide={this.handleSidebarHide}
                            inverted
                            vertical
                            target={this.segmentRef}
                            visible={this.state.visible}
                            width='wide'
                            onKeyPress
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
                                {this.state.artistAlbums.map(album => <Modal id="preview-modal" onActionClick={this.showAlbumInfo} trigger={<AlbumSlide key={album.id} albumInfo={album}/>}><AlbumPreview albumInfo={album}/></Modal>)}
                            </List>     
                        </Sidebar>
                        {/*entire app is pushable content*/}
                        <Ref innerRef={this.segmentRef}>
                            <Sidebar.Pusher dimmed={this.state.visible}>
                                <App sidebarVisible={this.state.visible} showSideBar={this.showSideBar}/>
                            </Sidebar.Pusher>
                        </Ref>
                    </Sidebar.Pushable>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.token,
        playlist: store.currentPlaylist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAlbum: (album) => dispatch(addAlbum(album))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchSidebar))
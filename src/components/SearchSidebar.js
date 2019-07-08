import React, { createRef } from 'react'
import {Menu, Sidebar, Divider, List, Ref} from 'semantic-ui-react'
import App from '../containers/App'
import Searchbar from './Searchbar'
import {connect} from 'react-redux'
import '../styles/Sidebar.css';
import SpotifyWebApi from 'spotify-web-api-js';
import AlbumSlide from './AlbumSlide'
import {withRouter} from 'react-router-dom'
import _ from "lodash";
import {fetchArtistInformation} from '../redux/useractions'
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
        if (!this.state.visible) {
            this.setState({visible: true}, (() => this.props.history.push(`/playlist/${this.props.playlist.id}/search`)))  
        }
        else {
            this.setState({
                visible: false
            }, (() => this.props.history.push(`/playlist/${this.props.playlist.id}`)))
        }
    } 

    // hide on Esc
    // handleKeyPress = (event) => {
    //     if (event.keyCode === 27 && this.state.visible) {
    //         this.showSideBar()
    //         document.removeEventListener("keydown", this.handleKeyPress)
    //     }
    // }  

    //clear album list if sidebar is hidden, then set clearSearch to true so passed down to Searchbar. If not hidden, add event listener to close on ESC
    componentWillMount() {
        if (this.state.artistAlbums.length > 0) {
            this.setState({artistAlbums: [] })
        }
    }

    getRecommendations = (userAlbums) => {
        if (userAlbums.filter(album => album.listened_to === true).length >= 5) {
            //get least 5 artists listened to 
            let artistSeeds = _.uniq(_.sortBy(userAlbums, "date_listened_to").reverse().map(album => album.artists[0].id)).slice(0, 5).join()
            let seedObject = {limit: 100, seed_artists: artistSeeds}
            spotifyApi.getRecommendations(seedObject)
            .then(recommendations => {  
                //get the unique album recommendations from seed data that have yet to be listened to 
                let userAlbumIds = this.props.userAlbums.filter(album => album.listened_to).map(album => album.spotify_id)
                let recs = _.uniqBy(recommendations.tracks.map(track => track.album), "id").filter(album => !userAlbumIds.includes(album.id))
                //set artistAlbums state to 20 random albums from recs, set state recommendations to all recommendations
                this.setState({artistAlbums: recs.sort(() => 0.5 - Math.random()).slice(0, 20), recommendations: recs})
            })
    }}

    //get unique albums by name since Spotify sometimes returns dupes
    fetchArtistAlbums = (artistID) => {
        spotifyApi.getArtistAlbums(artistID, {limit: 50})
        .then(albums => this.setState({
            artistAlbums: _.uniqBy(albums.items, 'name')
                           .filter(album => album.album_type === "album" && album.album_group === "album")
        }))
    } 

    //for closing on click in pushable content
    handleSidebarHide = () => this.setState({ 
        visible: false, clearSearch: true }, 
        () => this.clearAlbums(),
        this.props.history.push(`/playlist/${this.props.playlist.id}`)
        )

    //clear button in search
    clearAlbums = () => this.setState({artistAlbums: [], clearSearch: false, albumPreview:null})
    
    //shuffle recommendations
    shuffleRecs = () => this.setState({artistAlbums: this.state.recommendations.sort(() => 0.5 - Math.random()).slice(0, 20)})


    render() {    
        const {token, playlist, userAlbums, playlistAlbums, addAlbum, fetchArtistInformation} = this.props
        const {artistAlbums, clearSearch, visible} = this.state
        return (
            <React.Fragment>
                <div id="sidebar">
                    <Sidebar.Pushable>
                        <Sidebar
                            as={Menu}
                            animation='push'
                            icon='labeled'
                            onShow={() => this.getRecommendations(this.props.userAlbums)}
                            onHide={this.handleSidebarHide}
                            inverted
                            vertical
                            target={this.segmentRef}
                            visible={visible}
                            width='wide'
                        >
                            <Searchbar 
                                handleChange={this.handleChange} 
                                token={token} 
                                fetchAlbums={this.fetchArtistAlbums}
                                clearAlbums={this.clearAlbums}
                                clearSearch={clearSearch}
                            />
                            {this.state.recommendations ? <button id="recs-button" onClick={() => this.shuffleRecs()}>Recommendations</button> : null}
                            <Divider id="searchbar-divider"/>
                            {/* List of selected artist's albums */}
                            <List inverted relaxed celled>
                                {artistAlbums.map(album => <AlbumSlide 
                                                                key={album.id} 
                                                                userAlbums={userAlbums} 
                                                                albumInfo={album}
                                                                playlistAlbums={playlistAlbums} 
                                                                addAlbum={addAlbum} 
                                                                playlist={playlist}
                                                                token={token}
                                                                fetchArtistInformation={fetchArtistInformation}/>
                                )}
                            </List>     
                        </Sidebar>
                        {/*entire app is pushable content*/}
                        <Ref innerRef={this.segmentRef}>
                            <Sidebar.Pusher dimmed={visible}>
                                <App userAlbums={userAlbums} token={token} playlistAlbums={playlistAlbums} currentPlaylist={playlist} sidebarVisible={visible} showSideBar={this.showSideBar}/>
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
        playlist: store.currentPlaylist,
        userAlbums: store.userAlbums,
        playlistAlbums: store.playlistAlbums
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAlbum: (album) => dispatch(addAlbum(album)),
        fetchArtistInformation: (token, artist) => dispatch(fetchArtistInformation(token, artist))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchSidebar))
import React from 'react'
import {Search, Image} from 'semantic-ui-react'
import SpotifyWebApi from 'spotify-web-api-js';
import _ from "lodash";
import '../styles/Sidebar.css';

const spotifyApi = new SpotifyWebApi();

export default class Searchbar extends React.Component {
    state = {
        isLoading: false,
        results: [],
        value: ""
    };

    //clear search if sidebar is hidden based on clearSearch props then invoke callback function to clear albums / set clear search prop back to false (to allow future searching)
    static getDerivedStateFromProps(props, state) {
        if (props.clearSearch === true) {
            state.value = ""
            props.clearAlbums()
        }
    }
    
    //helper for resetting state
    resetComponent = () => this.setState({ isLoading: false, results: [], value: "" }, () => this.props.clearAlbums())

    //callback for fetching albums
    handleResultSelect = (e, {result}) => {
        this.setState({
            value: result.title,
            results: []
        }, () => this.props.fetchAlbums(result.key))
    }

    //sets state for results
    handleSearchChange = (event) => {
        this.setState({ isLoading: true, value: event.target.value });

        setTimeout(() => {
            if (this.state.value.length < 1) {
                this.resetComponent();}
            else {
            this.setState({
                isLoading: false
            }, () => this.searchArtists(this.state.value));}
        }, 300)
    };

    //api request to spotify search
    searchArtists = (searchText) => { 
        spotifyApi.searchArtists(searchText, {limit: 10})   
        .then(spotifyResponse => this.setState({
            results: spotifyResponse.artists.items.map(artist => ({
                key: artist.id, 
                title:artist.name,
                images: artist.images,
                uri: artist.uri}))}))
    }

    //how each artist is displayed
    resultRenderer({key, images, title}) {
        return (
        <div key={key} title={title} className='artist-result'>
            {title}
            <Image 
            id="artist-image"
            avatar 
            src={images[2] ? images[2].url : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Pictogram_voting_question.svg/220px-Pictogram_voting_question.svg.png"} 
            alt="artist-screenshot"
            />
        </div>
        )
      }
    
    //clears search value and albums
    clearResults = () => this.setState({value: ""}, () => this.props.clearAlbums())


    render() {
        spotifyApi.setAccessToken(this.props.token)
        return (
            <React.Fragment>
            <Search 
                onSearchChange={_.debounce(this.handleSearchChange, 200, {
                    leading: true,
                  })}
                value={this.state.value}
                id="artist-search"
                placeholder="Search Artist..."
                showNoResults={false}
                results={this.state.results}
                resultRenderer={this.resultRenderer}
                onResultSelect={this.handleResultSelect}
            />
            <button id="clear-button" onClick={() => this.clearResults()}>Clear</button>
            </React.Fragment>
        )
    }
}


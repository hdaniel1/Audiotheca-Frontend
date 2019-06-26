import React from 'react'
import {Search} from 'semantic-ui-react'
import SpotifyWebApi from 'spotify-web-api-js';
import _ from "lodash";

const spotifyApi = new SpotifyWebApi();

export default class Searchbar extends React.Component {
    state = {
        isLoading: false,
        results: [],
        value: "",
        spotifyArtists: []
    };

    componentWillMount() {
        this.resetComponent();
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: "" });

    handleSearchChange = (event) => {
        this.setState({ isLoading: true, value: event.target.value });

        setTimeout(() => {
            if (this.state.value.length < 1) this.resetComponent();
       
            const re = new RegExp(_.escapeRegExp(this.state.value), "i");
            const isMatch = result => re.test(result.name);
            debugger
            this.setState({
                isLoading: false,
                results: _.filter(this.searchArtists(this.state.value).then(response => response), isMatch)
            });
        }, 500);
    };

    searchArtists = (searchText) => { 
        return spotifyApi.searchArtists(searchText)   
    }

    render() {
        spotifyApi.setAccessToken(this.props.token)
        return (
            <Search 
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                  })}
                value={this.state.value}
                id="artist-search"
                placeholder="Search artist..."
                showNoResults={false}
                results={this.state.results}
            />
        )
    }
}


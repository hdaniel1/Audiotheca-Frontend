import React from 'react'
import PlaylistContainer from './PlaylistContainer'
import Banner from './Banner'

export default class HomePage extends React.Component {
    render() {
        return(
            <React.Fragment>
                <PlaylistContainer playlists={this.props.playlists}/>
            </React.Fragment>
        )
    }
}
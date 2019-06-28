import React from 'react'
import PlaylistContainer from './PlaylistContainer'

export default class HomePage extends React.Component {
    render() {
        return(
           <PlaylistContainer playlists={this.props.playlists}/>
        )
    }
}
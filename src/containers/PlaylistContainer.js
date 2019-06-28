import React from 'react'
import {List} from 'semantic-ui-react'
import PlaylistCard from '../components/PlaylistCard'
import '../styles/Playlists.css';

export default class PlaylistContainer extends React.Component {
    render() {
        return (
            <List>
                {this.props.playlists.map(playlist => <PlaylistCard key={playlist.id} playlistInfo={playlist}/>)}
            </List>
        )
    }
}
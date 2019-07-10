import React from 'react'
import PlaylistContainer from './PlaylistContainer'
import Banner from './Banner'

export default class HomePage extends React.Component {
    render() {
        const {bannerAlbums, playlists} = this.props
        return(
            <React.Fragment>
                <Banner bannerAlbums={bannerAlbums}/>
                <PlaylistContainer playlists={playlists}/>
            </React.Fragment>
        )
    }
}
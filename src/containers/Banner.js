import React from 'react'
import '../styles/App.css';
import Roll from 'react-reveal/Roll';

export default class Banner extends React.Component {
    render() {
        return (
            <div id="banner">
            {this.props.bannerAlbums.length > 0 ? 
                    this.props.bannerAlbums.sort(() => 0.5 - Math.random()).slice(0, 20).map(album => album.images ? <img id="banner-image" src={album.images[1].url} alt="banner-album"/> : null)
                :
                null
            }
            </div>
        )
    }
}

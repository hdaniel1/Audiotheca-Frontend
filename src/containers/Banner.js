import React from 'react'
import '../styles/App.css';
import {Grid, Image} from 'semantic-ui-react'

export default class Banner extends React.Component {
    render() {
        return (
            this.props.bannerAlbums ? 
                <Grid columns="10" id="banner" >
                    {this.props.bannerAlbums.sort(() => 0.5 - Math.random()).slice(0, 32).map(album => album.images ?  <Grid.Column key={album.id} width="1"><Image size="small" src={album.images[1].url} /></Grid.Column> : null)}
                </Grid>
                :
                    null
        )
    }
}

import React from 'react'
import {Grid, Item, Image, Container} from 'semantic-ui-react'
import Playlist from '../components/Playlist'
import '../styles/Playlists.css';

const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />

export default class PlaylistContainer extends React.Component {
    //render a dynamic 3x3 grid for playlists
    render() {
        return (
            <Container id="playlist-container">
                {this.props.playlists.map(playlist => <Playlist key={playlist.id} playlist={playlist}/>)}
            </Container>
        )
    }
}

 // <Grid columns={3} divided id="playlist-container">
            //     {this.props.playlists ? 
            //         this.props.playlists.map((playlist, i) => {
            //             if (i % 3 === 0) {
            //                 return (
            //                     <Grid.Row>
            //                         <Grid.Column classname="playlist-item">
            //                             <Item.Group>
            //                                 <Item >
            //                                     <Item.Image size='tiny' src={this.props.playlists[i].image} />
            //                                     <Item.Content>
            //                                         <Item.Header>{this.props.playlists[i].name}</Item.Header>
            //                                         <Item.Description>{this.props.playlists[i].description}</Item.Description>
            //                                     </Item.Content>
            //                                 </Item>
            //                             </Item.Group>
            //                         </Grid.Column>
            //                         <Grid.Column className="playlist-item">
            //                             <Item.Group>
            //                                 {this.props.playlists[i+1] ?
            //                                 <Item>
            //                                     <Item.Image size='small' src={this.props.playlists[i+1].image} />
            //                                         <Item.Content>
            //                                             <Item.Header>{this.props.playlists[i+1] ? this.props.playlists[i+1].name : null}</Item.Header>
            //                                             <Item.Description>{this.props.playlists[i+1] ? this.props.playlists[i+1].name : null}</Item.Description>
            //                                         </Item.Content>
            //                                 </Item>
            //                                 :
            //                                 <Item className="playlist-item">
            //                                     <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            //                                     <Item.Content>{paragraph} <br/> {paragraph}}</Item.Content>
            //                                 </Item>}
            //                             </Item.Group>
            //                         </Grid.Column>
            //                         <Grid.Column className="playlist-item">
            //                             <Item.Group>
            //                                 {this.props.playlists[i+2] ? 
            //                                 <Item>
            //                                     <Item.Image size='small' src={this.props.playlists[i+2].image} />
            //                                         <Item.Content>
            //                                             <Item.Header>{this.props.playlists[i+2] ? this.props.playlists[i+2].name : null}</Item.Header>
            //                                             <Item.Description>{this.props.playlists[i+2] ? this.props.playlists[i+2].name : null}</Item.Description>
            //                                         </Item.Content>
            //                                 </Item>
            //                             :
            //                                 <Item>
            //                                     <Item.Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
            //                                     <Item.Content>{paragraph} <br/> {paragraph}</Item.Content>
            //                                 </Item>}
            //                             </Item.Group>
            //                         </Grid.Column>
            //                     </Grid.Row>
            //                 )
            //             }
            //         })
            //     :      
            //     <div>
            //         Placeholder text goes here for users without playlists
            //     </div>
            //     }
            // </Grid>
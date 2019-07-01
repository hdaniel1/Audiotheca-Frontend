import React from 'react'
import {Grid, Item, Image, Divider} from 'semantic-ui-react'

export default class Playlist extends React.Component {
    render() {
        return (
            <Item.Group>
                <Item>
                    <Item.Image size="tiny" src='https://react.semantic-ui.com/images/wireframe/image.png'></Item.Image>
                    <Item.Content>
                        <Item.Header>{this.props.playlist.name}</Item.Header>
                        <Item.Meta>{this.props.playlist.description}</Item.Meta>
                    </Item.Content>
                </Item>
            </Item.Group>
        )
    }
}
import React from 'react'
import {List, Image} from 'semantic-ui-react'

export default class PlaylistCard extends React.Component {
    render() {
        return (
            <List.Item>
                <Image size="medium" avatar src={this.props.playlistInfo.image} />
                <List.Content>
                    <List.Header>{this.props.playlistInfo.name}</List.Header>
                    <List.Description>
                        {this.props.playlistInfo.description}
                    </List.Description>
                </List.Content>
            </List.Item>
        )
    }
}

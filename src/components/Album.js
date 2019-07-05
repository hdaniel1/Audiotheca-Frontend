import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'

export default class Album extends React.Component {

    render() {
        debugger
        return(
            <Card >
                <Image src={this.props.albumInfo.images[1].url} />
                <Card.Content textAlign="center">
                    <Card.Header className="album-header">{this.props.albumInfo.name}</Card.Header>
                    <Card.Meta>{this.props.albumInfo.artists[0].name}</Card.Meta>
                    <Card.Description>Release Date: {this.props.albumInfo.release_date}</Card.Description>
                    <Card.Content extra><br />
                        
                    </Card.Content>                     
                </Card.Content>
            </Card>
        )
    }
}

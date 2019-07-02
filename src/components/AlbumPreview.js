import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'

export default class AlbumPreview extends React.Component {
    constructor() {
        super()
        this.state = {
            flipped: false
        }
    }

    showMoreInfo = (album) => {
        this.setState({
            flipped: !this.state.flipped
        })
    }

    render() {
        return (
            !this.state.flipped ? 
                <Card  textAlign="center">
                    <Image src={this.props.albumInfo.images[1].url} />
                    <Button onClick={() => this.showMoreInfo(this.props.albumInfo)} >Album Info</Button>
                </Card>
                :
                <Card textAlign="center">
                    <Card.Content textAlign="left">
                        <Image floated='right' size='mini' src={this.props.albumInfo.images[2].url} />
                        <Card.Header floated='left'>{this.props.albumInfo.name}</Card.Header>
                        <Card.Meta floated='left'>{this.props.albumInfo.artists[0].name}</Card.Meta>
                        <Card.Description>Release Date: {this.props.albumInfo.release_date}</Card.Description>
                        <Card.Content extra><br />
                            <Button basic color='green' onClick={() => this.props.addToBacklog(this.props.albumInfo)}>
                                Add to Backlog
                            </Button>
                        </Card.Content>                     
                    </Card.Content>
                    <Button onClick={() => this.showMoreInfo(this.props.albumInfo)} >Album Art</Button>
                </Card>
        )}
}
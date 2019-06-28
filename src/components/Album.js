import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'

export default class Album extends React.Component {
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
        return(
            !this.state.flipped ? 
                <Card  textAlign="center">
                    <Image src={this.props.albumInfo.images[0].url} />
                    <Button onClick={() => this.showMoreInfo(this.props.albumInfo)} >Album Info</Button>
                </Card>
                :
                <Card textAlign="center">
                    <Card.Content textAlign="left">
                        <Image floated='right' size='mini' src={this.props.albumInfo.images[2].url} />
                        <Card.Header floated='left'>{this.props.albumInfo.name}</Card.Header>
                        {/* <Card.Meta floated='left'>{this.props.albumInfo.artist}</Card.Meta> */}
                        {/* <Card.Description>Release Date: {this.props.albumInfo.release_date}</Card.Description>
                        <Card.Content extra><br />
                            <div className='ui two buttons'>
                                {this.props.addToBacklog ? 
                                <Button basic color='green' onClick={() => this.props.addToBacklog(this.props.albumInfo)}>
                                Add to Backlog
                                </Button>
                                :
                                <Button basic color='red' onClick={() => this.props.removeFromBacklog(this.props.albumInfo)}>
                                Remove from Backlog
                                </Button>}
                            </div>
                        </Card.Content>                      */}
                    </Card.Content>
                    <Button onClick={() => this.showMoreInfo(this.props.albumInfo)} >Album Art</Button>
                </Card>
        )
    }
}
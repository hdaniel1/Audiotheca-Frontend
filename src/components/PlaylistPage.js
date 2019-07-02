import React from 'react'
import {Item, Button, Confirm} from 'semantic-ui-react'
import '../styles/Playlists.css';
import PlaylistFormModal from './PlaylistFormModal'
import {withRouter} from 'react-router-dom'

class PlaylistPage extends React.Component {
    state = {
        showModal: false,
        confirmMessage: false
    }

    open = () => this.setState({ confirmMessage: true })
    close = () => this.setState({ confirmMessage: false })

    closeModal = () => this.setState({showModal:false})

    handleDelete = () => {
        this.props.history.push("/home")
        this.props.deletePlaylist(this.props.playlist)
    }

    render() {
        return (
            <div id="playlist-info">
                <Item.Group>
                    <Item>
                        <Item.Image id="playlist-info-image" size='small' circular src='http://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg' />
                        <Item.Content id="playlist-info-content">
                            <Item.Header id="playlist-info-header">Name: {this.props.playlist.name}</Item.Header>
                            <Item.Meta>Description</Item.Meta>
                            <Item.Description id="playlist-info-description">
                                {this.props.playlist.description}
                            </Item.Description>
                            <Button id="playlist-info-button" color='blue' onClick={() => this.setState({showModal:true})}>Update Playlist</Button>
                            <Button id="playlist-info-button" color='red' onClick={this.open}>Delete Playlist</Button>
                            <Confirm open={this.state.confirmMessage} onCancel={this.close} onConfirm={this.handleDelete} />
                        </Item.Content>
                    </Item>
                    <PlaylistFormModal closeModal={this.closeModal} open={this.state.showModal} playlist={this.props.playlist} user={this.props.user} updatePlaylist={this.props.updatePlaylist}/>
                </Item.Group>
            </div>
        )
    }
}

export default withRouter(PlaylistPage)
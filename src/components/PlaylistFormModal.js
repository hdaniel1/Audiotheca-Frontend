import React from 'react'
import {Image, Modal, Button, Form} from 'semantic-ui-react'

export default class PlaylistFormModal extends React.Component { 
    
    state = {
        image: "", 
        name: "", 
        description: "",
        header: "New Playlist"
    }

    //check if opened from update button on playlist page
    checkUpdate = () => {
        if (this.props.updatePlaylist) { 
            this.setState({
                image: this.props.playlist.image,
                name: this.props.playlist.name, 
                description: this.props.playlist.description,
                header: "Update Playlist"
            })
        }
    }

    //handle form field changes to state
    handleChange = (event) => {
        if (event.target.name !== "image") {
            this.setState({[event.target.name]: event.target.value})
        }
        else if (event.target.name === "image") {
            this.setState({ image: URL.createObjectURL(event.target.files[0])})
        }
    }

    //handle close button
    handleClose = () => this.props.closeModal()

    //reset state
    resetState = () => this.setState({
        image: null, 
        name: null, 
        description: null
    })

    //submission of playlist form
    handleSubmit = () => {
        const {image, name, description} = this.state

        let newPlaylist = {
            image: image,
            name: name, 
            description: description,
            user_id: this.props.user.id
        }

        this.props.updatePlaylist ? this.props.updatePlaylist({...this.props.playlist, name: name, description: description, image: image}) : this.props.createPlaylist(newPlaylist)
        this.props.closeModal()
    }

    render() {
        return (
            <Modal onMount={this.checkUpdate} onUnmount = {this.resetState} open = {this.props.open}>
                <Modal.Header>{this.state.header}<Button onClick={() => this.handleClose()} floated="right">Close</Button></Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src={this.state.image ? this.state.image : 'https://www.templaza.com/blog/components/com_easyblog/themes/wireframe/images/placeholder-image.png'} />
                <Modal.Description>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input label='Name' value={this.state.name} placeholder="Name" name="name" onChange={(event) => this.handleChange(event)}></Form.Input>
                        <Form.TextArea label='Description' value={this.state.description}placeholder='Description' name="description" onChange={(event) => this.handleChange(event)}/>
                        <Form.Field >
                            <label>Image</label>
                            <input id="upload" type="file" name="image" onChange={(event) => this.handleChange(event)}/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

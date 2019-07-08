import React from 'react'
import {Image, Modal, Button, Form} from 'semantic-ui-react'

export default class PlaylistFormModal extends React.Component { 

    state = {
        previewImage: null,
        image: "", 
        name: "", 
        description: "",
        header: "New Playlist"
    }

    //check if opened from update button on playlist page
    checkUpdate = () => {
        if (this.props.updatePlaylist) { 
            this.setState({
                image: this.props.playlist.playlist_image,
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
            this.setState({
                previewImage: URL.createObjectURL(event.target.files[0]),
                image: event.target.files[0]
        })}
    }

    //reset state
    resetState = () => this.setState({
        previewImage:null,
        image: null, 
        name: null, 
        description: null
    })

    //submission of playlist form
    handleSubmit = (event) => {
        event.preventDefault()
        const {image, name, description} = this.state
        
        if (!name) {
            alert("Playlist Name Required!")
        }
        else {
            let reader = new FileReader();
            reader.readAsDataURL(image);

            reader.onload = () => {
                let newPlaylist = {
                    playlist_image: reader.result,
                    name: name, 
                    description: description,
                    user_id: this.props.user.id
                }
                this.props.updatePlaylist ? this.props.updatePlaylist({...this.props.playlist, name: name, description: description, playlist_image: reader.result}) : this.props.createPlaylist(newPlaylist)
                this.props.closeModal()
        };}
    }

    render() {
        return (
            <Modal onMount={this.checkUpdate} onUnmount = {this.resetState} open = {this.props.open}>
                <Modal.Header>{this.state.header}<Button onClick={() => this.props.closeModal()} floated="right">Close</Button></Modal.Header>
                <Modal.Content image>
                    {this.state.previewImage ? <Image wrapped size='medium' src={this.state.previewImage ? this.state.previewImage : 'https://www.templaza.com/blog/components/com_easyblog/themes/wireframe/images/placeholder-image.png'} /> 
                    :
                    <Image wrapped size='medium' src={this.state.image} />}
                <Modal.Description>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required><label>Name</label> <input placeholder='Name' value={this.state.name} name="name" onChange={(event) => this.handleChange(event)}/></Form.Field>
                        <Form.TextArea label='Description' value={this.state.description}placeholder='Description' name="description" onChange={(event) => this.handleChange(event)}/>
                        <Form.Field >
                            <label>Image</label>
                            {/* <Button onClick={() => this.openWidget()}>Upload Photo</Button> */}
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

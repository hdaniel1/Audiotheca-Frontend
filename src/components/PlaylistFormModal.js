import React from 'react'
import {Image, Modal, Button, Form} from 'semantic-ui-react'
import '../styles/Navbar.css';

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
        else if (image) {
            if (typeof(image) === "object") {
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
                }
            }
                else {
                    let newPlaylist = {
                        playlist_image: image,
                        name: name, 
                        description: description,
                        user_id: this.props.user.id
                    }
                    this.props.updatePlaylist ? this.props.updatePlaylist({...this.props.playlist, name: name, description: description, playlist_image: image}) : this.props.createPlaylist(newPlaylist)
                    this.props.closeModal()
                }
        }
        else {
            let newPlaylist = {
                name: name, 
                description: description,
                user_id: this.props.user.id
            }
            this.props.updatePlaylist ? this.props.updatePlaylist({...this.props.playlist, name: name, description: description}) : this.props.createPlaylist(newPlaylist)
                this.props.closeModal()
        }
    }

    render() {
        const {header, previewImage, image, name, description} = this.state
        const {open, closeModal} = this.props
        return (
            <Modal onMount={this.checkUpdate} onUnmount = {this.resetState} open = {open}>
                <Modal.Header id="modal-header">{header}<Button id="close-button" onClick={() => closeModal()} floated="right">Close</Button></Modal.Header>
                <Modal.Content image>
                    {previewImage ? <Image wrapped size='medium' src={previewImage}/> 
                    :
                    <Image wrapped size='medium' src={image ? image : 'https://www.templaza.com/blog/components/com_easyblog/themes/wireframe/images/placeholder-image.png'}/>}
                <Modal.Description>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field required><label>Name</label> <input placeholder='Name' value={name} name="name" onChange={(event) => this.handleChange(event)}/></Form.Field>
                        <Form.TextArea label='Description' value={description} placeholder='Description' name="description" onChange={(event) => this.handleChange(event)}/>
                        <Form.Field >
                            <label>Image</label>
                            {/* <Button onClick={() => this.openWidget()}>Upload Photo</Button> */}
                            <input id="upload" type="file" name="image" onChange={(event) => this.handleChange(event)}/>
                        </Form.Field>
                        <Button type='submit' id="submit-button">Submit</Button>
                    </Form>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

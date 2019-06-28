import React from 'react'
import { Menu, Icon, Image, Modal, Button, Form} from 'semantic-ui-react'

export default class NewPlaylistForm extends React.Component { 
    state = {
        image: null, 
        name: null, 
        description: null,
        showModal: false
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

    resetState = () => this.setState({
        image: null, 
        name: null, 
        description: null,
        showModal: false
    })

    handleSubmit = () => {
        let newPlaylist = {
            image: this.state.image,
            name: this.state.name, 
            description: this.state.description,
            user_id: this.props.user.id
        }
        this.props.createPlaylist(newPlaylist)
        this.resetState()
    }

    render() {
        return (
            <Modal open = {this.state.showModal} onClose={this.resetState} trigger={<Menu.Item onClick={() => this.setState({showModal: true})} name='add-playlist' ><Icon name='plus'></Icon> Add New Playlist</Menu.Item>}>
                <Modal.Header>New Playlist</Modal.Header>
                <Modal.Content image>
                    <Image 
                    wrapped 
                    size='medium' 
                    src={this.state.image ? this.state.image : 'https://www.templaza.com/blog/components/com_easyblog/themes/wireframe/images/placeholder-image.png'} />
                <Modal.Description>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Input label='Name' placeholder="Name" name="name" onChange={(event) => this.handleChange(event)}></Form.Input>
                        <Form.TextArea label='Description' placeholder='Description' name="description" onChange={(event) => this.handleChange(event)}/>
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

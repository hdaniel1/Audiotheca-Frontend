import React from 'react'
import {Menu, Image, Dropdown, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PlaylistFormModal from './PlaylistFormModal'
import '../styles/Navbar.css';
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: false, 
            innerText: "Search",
            showModal: false
        }
    }

    closeModal = () => this.setState({showModal:false})

    //callback for search sidebar showing
    handleItemClick = () => {
        this.state.innerText === "Search" ?
        this.setState({ 
            activeItem: true,
            innerText: "Hide Search"
        }, () => this.props.showSidebar())
        :
        this.setState({ 
            activeItem: false,
            innerText: "Search"
        }, () => this.props.showSidebar())
    }
    
    //revisit this logic to render items based on url path
    render() {
        return (
            <React.Fragment>
                {!this.props.currentUser ? 
                //login page menu
                <Menu icon='labeled' id="menu-bar" size="large" >
                    <Menu.Item  href='http://localhost:3000/api/v1/login'name='Login'position="right" >Login</Menu.Item>
                </Menu>

                :
                //normal menu
                <Menu id="menu-bar" size="large" >
                    {this.props.location.pathname.match("/playlist") ? <Menu.Item  position="left" name='Search' onClick={this.handleItemClick}>{this.state.innerText}</Menu.Item> : null}
                    <Menu.Item onClick={() => this.setState({showModal: true})} name='add-playlist' position="right"><Icon name='plus'></Icon> Add New Playlist</Menu.Item>
                    <PlaylistFormModal closeModal={this.closeModal} open={this.state.showModal} createPlaylist={this.props.createPlaylist} user={this.props.currentUser}/>
                    <Menu.Item as={Link} to="/history" name='history' >History</Menu.Item>
                    <Menu.Item as={Link} to="/backlog" name='backlog'>Backlog</Menu.Item>
                    <Menu.Item as={Link} to="/stats" name='stats' >Stats</Menu.Item>
                    <Menu.Item as={Link} to="/home" name='home'>Home</Menu.Item>
                    <Menu.Item><Image href={this.props.currentUser.uri} id="profile-img" avatar src={this.props.currentUser.images[0].url} /></Menu.Item>
                    <Dropdown closeOnEscape item simple text={this.props.currentUser.display_name.split(" ")[0]}>
                        <Dropdown.Menu>
                            <Dropdown.Item><NavLink onClick={this.props.logoutUser} to="/login">Logout</NavLink></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>}
            </React.Fragment>
        )
    }
}

export default withRouter(Navbar)



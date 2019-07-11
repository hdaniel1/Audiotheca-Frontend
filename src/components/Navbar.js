import React from 'react'
import {Menu, Image, Dropdown, Icon, Modal} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PlaylistFormModal from './PlaylistFormModal'
import AboutModal from './AboutModal'
import '../styles/Navbar.css';
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: false,
            showModal: false
        }
    }

    closeModal = () => this.setState({showModal:false})

    //revisit this logic to render items based on url path
    render() {
        const {currentUser, location, createPlaylist, currentPlaylist, logoutUser, showSideBar} = this.props 
        const {showModal, activeItem} = this.state
        return (
            <React.Fragment>
                {!currentUser ? 
                //login page menu
                <Menu icon='labeled' size="massive" >
                    <Menu.Item  id="login-button" href='http://localhost:3000/api/v1/login'name='Login'position="right" >Login</Menu.Item>
                </Menu>

                :
                //normal menu
                <Menu size="massive" >
                    {location.pathname.match("/playlist") ? <Menu.Item  id="menu-item" position="left" name='Search' onClick={showSideBar}>Search Albums</Menu.Item> : <Modal trigger={<Menu.Item id="menu-item" position="left" name="About"/>}><AboutModal/></Modal>}
                    <Menu.Item id="menu-item"  onClick={() => this.setState({showModal: true})} name='add-playlist' position="right"><Icon style={{color: "#29a84f"}} name='plus'></Icon> Add New Playlist</Menu.Item>
                    <PlaylistFormModal closeModal={this.closeModal} open={showModal} createPlaylist={createPlaylist} user={currentUser} currentPlaylist={currentPlaylist}/>
                    <Menu.Item id="menu-item" as={Link} to="/history" name='history' >History</Menu.Item>
                    <Menu.Item id="menu-item" as={Link} to="/backlog" name='backlog'>Backlog</Menu.Item>
                    <Menu.Item id="menu-item" as={Link} to="/stats" name='stats' >Stats</Menu.Item>
                    <Menu.Item id="menu-item" as={Link} to="/home" name='home'>My Playlists</Menu.Item>
                    <Menu.Item id="profile-img"><Image href={currentUser.uri} avatar src={currentUser.images[0].url} /></Menu.Item>
                    <Dropdown id="logout-button" closeOnEscape item simple text={currentUser.display_name.split(" ")[0]}>
                        <Dropdown.Menu >
                            <Dropdown.Item><NavLink onClick={logoutUser} to="/login" >Logout</NavLink></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>}
            </React.Fragment>
        )
    }
}

export default withRouter(Navbar)



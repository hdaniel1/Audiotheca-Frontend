import React from 'react'
import {Menu, Image, Dropdown} from 'semantic-ui-react'
import '../styles/Navbar.css';
import {NavLink} from 'react-router-dom'


export default class Navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            activeItem: false, 
            innerText: "Search"
        }
    }
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

    render() {
        return (
            <React.Fragment>
                {!this.props.currentUser ? 
   
                <Menu id="menu-bar" size="large" >
                    <Menu.Item  
                        href='http://localhost:3000/api/v1/login'
                        name='Login'
                        position="right" 
                    >
                    Login
                    </Menu.Item>
                </Menu>

                :

                <Menu id="menu-bar" size="large" >
                    <Menu.Item  
                        name='Search' 
                        active={this.state.activeItem} 
                        onClick={this.handleItemClick}
                    >
                    {this.state.innerText}
                    </Menu.Item>
                    <Menu.Item  
                        name='Login'
                        position="right" 
                    >   
                    <Image 
                        href={this.props.currentUser.uri} 
                        id="profile-img" 
                        avatar 
                        src={this.props.currentUser.images[0].url} />
                    </Menu.Item>
                    <Dropdown closeOnEscape item simple text={this.props.currentUser.display_name.split(" ")[0]}>
                        <Dropdown.Menu>
                            <Dropdown.Item><NavLink onClick={this.props.logoutUser} to="/Login">Logout</NavLink></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu>}
            </React.Fragment>
        )
    }
}



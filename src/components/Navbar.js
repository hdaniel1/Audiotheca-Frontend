import React from 'react'
import {Menu} from 'semantic-ui-react'
import '../styles/Navbar.css';

export default class Navbar extends React.Component {
    constructor() {
        super()
        this.state = {
            activeItem: false, 
            innerText: "Search"
        }
    }

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
                <Menu id="menu-bar">
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
                    Login
                    </Menu.Item>
                </Menu>
            </React.Fragment>
        )
    }
}

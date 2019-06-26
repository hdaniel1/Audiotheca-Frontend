import React from 'react'
import {Menu, Sidebar, Divider} from 'semantic-ui-react'
import Searchbar from './Searchbar'
import '../styles/Sidebar.css';

export default class SearchSidebar extends React.Component {

    render() {    
        return (
            <div id="sidebar">
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation='push'
                        icon='labeled'
                        inverted
                        vertical
                        target={this.segmentRef}
                        visible={this.props.visible}
                        width='wide'
                    >
                        <Searchbar />
                        <Divider />
                    </Sidebar>
                    <Sidebar.Pusher dimmed={this.props.visible}>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

import React from 'react'
import {Menu, Sidebar, Divider} from 'semantic-ui-react'
import Searchbar from './Searchbar'
import {connect} from 'react-redux'
import '../styles/Sidebar.css';

class SearchSidebar extends React.Component {
    constructor() {
        super() 
        this.state = {
            clickedArtist:null,
            artistAlbums: null
        }
    }

    handleChange = (text) => {
        this.setState({searchText: text})
    }

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
                        <Searchbar handleChange={this.handleChange} token={this.props.token}/>
                        <Divider />
                    </Sidebar>
                    <Sidebar.Pusher dimmed={this.props.visible}>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        token: store.token
    }
}

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSidebar)
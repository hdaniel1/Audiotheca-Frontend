import React from 'react'
import SearchSidebar from '../components/SearchSidebar'

export default class HomePage extends React.Component {
    render() {
        return(
            <div>
                <SearchSidebar visible={this.props.visible} token={this.props.token}/>
            </div>
        )
    }
}
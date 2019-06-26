import React from 'react'
import {Search} from 'semantic-ui-react'


export default class Searchbar extends React.Component {


    render() {
        return (
            <Search 
                id="artist-search"
                placeholder="Search artist..."
                showNoResults={false}
            />
        )
    }
}
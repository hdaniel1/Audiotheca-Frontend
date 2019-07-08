import React from 'react'
import { Dropdown} from 'semantic-ui-react'
import _ from "lodash";
import '../styles/App.css';

export default class AlbumFilters extends React.Component {
    render() {
        const {handleSort, showRatingSort, handleFilter, artistOptions} = this.props
        let artistDropDown = artistOptions.map(artist => {
            return ({
                key: artist,
                text: artist,
                value: artist
            })
        })
        artistDropDown.push({key: "All", text: "All", value: ""})

        return (
            <div id="album-filters">
                <h1>Filters:</h1>
                 <Dropdown text='Sort By:' pointing className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item id="artist-name" onClick={handleSort}>Artist Name</Dropdown.Item>
                        <Dropdown.Item id="album-name" onClick={handleSort}>Album Name</Dropdown.Item>
                        <Dropdown.Item id="release-date" onClick={handleSort}>Release Date</Dropdown.Item>
                        {showRatingSort ? <Dropdown.Item id="rating" onClick={handleSort}>Rating</Dropdown.Item> : null}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                    placeholder='Filter by Artist'
                    selection
                    options={_.sortBy(_.uniqBy(artistDropDown, "text"), "text")}
                    onChange={handleFilter}
                />
            </div>
        )
    }
}
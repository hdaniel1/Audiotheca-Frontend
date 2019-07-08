import React from 'react'
import { Dropdown} from 'semantic-ui-react'

export default class Sorting extends React.Component {

    render() {
        const {handleSort} = this.props
        return (
            <Dropdown text='Sort By:' pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Item id="artist-name" onClick={handleSort}>Artist Name</Dropdown.Item>
                <Dropdown.Item id="album-name" onClick={handleSort}>Album Name</Dropdown.Item>
                <Dropdown.Item id="release-date" onClick={handleSort}>Release Date</Dropdown.Item>
                {this.props.showRatingSort ? <Dropdown.Item id="rating" onClick={handleSort}>Rating</Dropdown.Item> : null}
              </Dropdown.Menu>
            </Dropdown>
        //   <Dropdown icon='angle up'  text='Name' labeled open className='icon' onClick={this.handleClick}/>
        )
    }
}
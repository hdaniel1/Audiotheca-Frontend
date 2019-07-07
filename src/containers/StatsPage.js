import React from 'react'
import ArtistStats from './ArtistStats'
import { Tab } from 'semantic-ui-react'

export default class StatsPage extends React.Component {
    
    render() {
        const {artists, albums} = this.props
        return (
            <Tab menu={{ fluid: true, vertical: true, tabular: true, pointing: true}} panes={[
                { menuItem: 'Artist Progress', render: () => <Tab.Pane attached={false}><ArtistStats artists = {artists} albums={albums}/></Tab.Pane> },
                { menuItem: 'Genre Info', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
                { menuItem: 'Listening History', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
              ]} />
        )
    }
}
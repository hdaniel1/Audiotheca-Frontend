import React from 'react'
import { Tab } from 'semantic-ui-react'

const panes = [
    { menuItem: 'Artist Progress', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Genre Info', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Listening History', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
  ]

export default class StatsPage extends React.Component {
    render() {
        return (
            <Tab menu={{ pointing: true }} panes={panes} />
        )
    }
}
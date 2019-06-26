import React from 'react';
import Navbar from './components/Navbar'
import SearchSidebar from './components/SearchSidebar'
import './styles/App.css';

export default class App extends React.Component{
  constructor() {
    super()
    this.state = {
      sidebarVisible: false
    }
  }

  showSidebar = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    })
  }

  render() {
    return (
      <React.Fragment>
          <Navbar showSidebar={this.showSidebar}/>
          <SearchSidebar visible={this.state.sidebarVisible}/>
      </React.Fragment>
    )
  }
  
}


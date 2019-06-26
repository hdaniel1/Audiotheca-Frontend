import React from 'react';
import Navbar from '../components/Navbar'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import '../styles/App.css';
import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {accessingToken, gettingUserInfo} from '../redux/spotifyactions'
import {logoutUser} from '../redux/frontendactions'

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      sidebarVisible: false
    }
  }

  componentDidMount(history) {
    //get the token from the URL

    let hashParams = {}
    let e, r = /([^&;=]+)=?([^&;]*)/g,
       q = window.location.hash.substring(1)
      while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    if (hashParams.access_token === undefined){
      this.props.history.push("/Login")
    } 
    else {
      this.props.accessingToken(hashParams.access_token)
      this.props.gettingUserInfo(hashParams.access_token)
      this.props.history.push("/Home")
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
          <Navbar 
          showSidebar={this.showSidebar} 
          logoutUser={this.props.logoutUser} 
          currentUser = {this.props.currentUser}/>
          <Route path="/Login" component={LoginPage} />
          <Route path="/Home" 
          render={() => <HomePage visible={this.state.sidebarVisible} 
          token = {this.props.token} />}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    token: store.token,
    currentUser: store.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    accessingToken: (token) => {dispatch(accessingToken(token))},
    gettingUserInfo: (token) => {dispatch(gettingUserInfo(token))},
    logoutUser: () => {dispatch(logoutUser())}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


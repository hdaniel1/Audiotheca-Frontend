import React from 'react';
import Navbar from '../components/Navbar'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import SearchSidebar from '../components/SearchSidebar'
import '../styles/App.css';
import { Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {accessingToken, gettingUserInfo} from '../redux/useractions'
import {logoutUser} from '../redux/frontendactions'
import {createPlaylist} from '../redux/playlistactions'

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      sidebarVisible: false
    }
  }

  componentDidMount() {
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
    }, () => this.props.history.push("/Search"))
  }

  render() {
    return (
      <React.Fragment>
          <Navbar 
          createPlaylist={this.props.createPlaylist}
          showSidebar={this.showSidebar} 
          logoutUser={this.props.logoutUser} 
          currentUser = {this.props.currentUser}/>
          <Route  path="/Login" component={LoginPage} />
          <Route  path="/Home" render={() => <HomePage token = {this.props.token} playlists={this.props.playlists}/>}/>
          <Route  path="/Search" render={() => <SearchSidebar visible={this.state.sidebarVisible} token={this.props.token}/>}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    token: store.token,
    currentUser: store.currentUser,
    showAlbum: store.showAlbum,
    playlists: store.playlists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    accessingToken: (token) => {dispatch(accessingToken(token))},
    gettingUserInfo: (token) => {dispatch(gettingUserInfo(token))},
    logoutUser: () => {dispatch(logoutUser())},
    createPlaylist: (playlist) => {dispatch(createPlaylist(playlist))}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


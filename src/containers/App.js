import React from 'react';
import Navbar from '../components/Navbar'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import PlaylistPage from '../components/PlaylistPage'
import Banner from './Banner'
import SearchSidebar from '../components/SearchSidebar'
import '../styles/App.css';
import { Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {accessingToken, gettingUserInfo} from '../redux/useractions'
import {logoutUser} from '../redux/frontendactions'
import {createPlaylist, deletePlaylist, updatePlaylist} from '../redux/playlistactions'

class App extends React.Component{
  constructor() {
    super()
    this.state = {
      sidebarVisible: false
    }
  }

  //check url for token, then get the user's info / albums / playlists / etc.
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

  //callback for showing sidebar
  showSidebar = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    }, () => this.props.history.push("/Search"))
  }

  render() {
    return (
      <React.Fragment>
          <Navbar createPlaylist={this.props.createPlaylist} showSidebar={this.showSidebar} logoutUser={this.props.logoutUser} currentUser = {this.props.currentUser}
          />
          <Banner />
          <Route  path="/Login" component={LoginPage} />
          <Route  path="/Home" render={() => <HomePage token = {this.props.token} playlists={this.props.playlists} deletePlaylist={this.props.deletePlaylist}/>}/>
          <Route  path="/Search" render={() => <SearchSidebar visible={this.state.sidebarVisible} token={this.props.token}/>}/>
          <Route  path="/Playlist" render={() => <PlaylistPage playlist={this.props.currentPlaylist} deletePlaylist={this.props.deletePlaylist} user={this.props.currentUser} updatePlaylist={this.props.updatePlaylist}/>}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    token: store.token,
    currentUser: store.currentUser,
    showAlbum: store.showAlbum,
    playlists: store.playlists,
    currentPlaylist: store.currentPlaylist
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    accessingToken: (token) => dispatch(accessingToken(token)),
    gettingUserInfo: (token) => dispatch(gettingUserInfo(token)),
    logoutUser: () => dispatch(logoutUser()),
    createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
    deletePlaylist: (playlist) => dispatch(deletePlaylist(playlist)),
    updatePlaylist: (playlist) => dispatch(updatePlaylist(playlist))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


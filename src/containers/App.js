import React from 'react';
import Navbar from '../components/Navbar'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import PlaylistPage from '../components/PlaylistPage'
import '../styles/App.css';
import { Route, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {accessingToken, gettingUserInfo} from '../redux/useractions'
import {logoutUser} from '../redux/frontendactions'
import {createPlaylist, updatePlaylist, deletePlaylist} from '../redux/playlistactions'

class App extends React.Component{

  //check url for token, then get the user's info / albums / playlists / etc.

  componentWillReceiveProps(nextProps) {
    debugger
    if (this.props.currentPlaylist !== nextProps.currentPlaylist) {
      this.props.history.push(`/playlist/${nextProps.currentPlaylist.id}`)
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
      this.props.history.push("/login")
    } 
    else {
      this.props.accessingToken(hashParams.access_token)
      this.props.gettingUserInfo(hashParams.access_token)
      this.props.history.push("/home")
    }
  }

  render() {
    return (
      <React.Fragment>
          <Navbar currentPlaylist={this.props.currentPlaylist} createPlaylist={this.props.createPlaylist} showSideBar={this.props.showSideBar} logoutUser={this.props.logoutUser} currentUser = {this.props.currentUser}/>
          <Route  path="/login" component={LoginPage} />
          <Route  path="/home" render={() => <HomePage token = {this.props.token} playlists={this.props.playlists} deletePlaylist={this.props.deletePlaylist}/>}/>
          <Route  path="/playlist" render={() => <PlaylistPage user={this.props.currentUser} updatePlaylist={this.props.updatePlaylist} deletePlaylist={this.props.deletePlaylist} token={this.props.token} playlist={this.props.currentPlaylist}/>}/>
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
    accessingToken: (token) => dispatch(accessingToken(token)),
    gettingUserInfo: (token) => dispatch(gettingUserInfo(token)),
    logoutUser: () => dispatch(logoutUser()),
    createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
    deletePlaylist: (playlist) => dispatch(deletePlaylist(playlist)),
    updatePlaylist: (playlist) => dispatch(updatePlaylist(playlist))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


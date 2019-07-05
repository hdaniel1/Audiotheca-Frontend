import React from 'react';
import Navbar from '../components/Navbar'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import BacklogPage from './BacklogPage'
import PlaylistPage from '../components/PlaylistPage'
import '../styles/App.css';
import { Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {accessingToken, gettingUserInfo} from '../redux/useractions'
import {logoutUser} from '../redux/frontendactions'
import {createPlaylist} from '../redux/playlistactions'

class App extends React.Component{

  //for redirecting to playlist page after creation 
  componentWillReceiveProps(nextProps) {
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
          <Route  path="/home" render={() => <HomePage token = {this.props.token} playlists={this.props.playlists} />}/>
          <Route  path="/playlist" render={() => <PlaylistPage user={this.props.currentUser} playlistAlbums={this.props.playlistAlbums.filter(playlistAlbum => playlistAlbum.playlist_id === this.props.currentPlaylist.id)} userAlbums={this.props.userAlbums} playlist={this.props.currentPlaylist}/>}/>
          <Route  path="/backlog" render={() => <BacklogPage albums={this.props.userAlbums.filter(album => album.listened_to === false)} />}/>
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
    createPlaylist: (playlist) => dispatch(createPlaylist(playlist))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


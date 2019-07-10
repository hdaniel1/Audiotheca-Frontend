import React from 'react';
import Navbar from '../components/Navbar'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import BacklogPage from './BacklogPage'
import StatsPage from './StatsPage'
import HistoryPage from './HistoryPage'
import PlaylistPage from '../components/PlaylistPage'
import '../styles/App.css';
import { Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUserAlbum} from '../redux/albumactions'
import {accessingToken, gettingUserInfo} from '../redux/useractions'
import {logoutUser} from '../redux/frontendactions'
import {createPlaylist} from '../redux/playlistactions'
import _ from "lodash";

class App extends React.Component{
  state = {
    sortCondition: "", 
    ascend: true
  }

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
  //for sorting on history / backlog pages
  handleSort = (event) => {
    if (event.target.id === "album-name") {
      this.setState({sortCondition: "album-name", ascend: !this.state.ascend})
    } 
    else if (event.target.id === "artist-name") {
      this.setState({sortCondition: "artist-name", ascend: !this.state.ascend})
    }
    else if (event.target.id === "rating") {
      this.setState({sortCondition: "rating", ascend: !this.state.ascend})
    }
    else if (event.target.id === "release-date") {
      this.setState({sortCondition: "release-date", ascend: !this.state.ascend})
    }
  }

  sortDescend = (albums) => {
    if (this.state.sortCondition === "album-name") {
      return albums.sort((a,b) => {
        if (a.name.toLowerCase()  < b.name.toLowerCase()) {return -1;}
        else if (a.name.toLowerCase()  > b.name.toLowerCase()) {return 1;}
        else {return 0}
      }).reverse()
    }
    else if (this.state.sortCondition === "rating") {
      return albums.sort((a,b) => a.rating - b.rating).reverse()
    }
    else if (this.state.sortCondition === "release-date") {
      return albums.sort((a,b) => new Date(a.release_date) - new Date(b.release_date)).reverse()
    }
    else if (this.state.sortCondition === "artist-name") {
      return albums.sort((a,b) => {
        let x = a.artists[0].name.toLowerCase() 
        let y = b.artists[0].name.toLowerCase()
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      }).reverse()
    }
    else {
      return albums
    }
  }

  sortAscend = (albums) => {
    if (this.state.sortCondition === "album-name") {
      return albums.sort((a,b) => {
        if (a.name.toLowerCase()  < b.name.toLowerCase()) {return -1;}
        else if (a.name.toLowerCase()  > b.name.toLowerCase()) {return 1;}
        else {return 0}
      })
    }
    else if (this.state.sortCondition === "rating") {
      return albums.sort((a,b) => a.rating - b.rating)
    }
    else if (this.state.sortCondition === "release-date") {
      return albums.sort((a,b) => new Date(a.release_date) - new Date(b.release_date))
    }
    else if (this.state.sortCondition === "artist-name") {
      return albums.sort((a,b) => {
        let x = a.artists[0].name.toLowerCase() 
        let y = b.artists[0].name.toLowerCase()
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      })
    }
    else {
      return albums
    }
  }

  render() {
    const {ascend} = this.state
    const {artists, currentUser, playlists, createPlaylist, showSideBar, logoutUser, currentPlaylist, token, userAlbums, playlistAlbums, updateUserAlbum} = this.props

    let listenedTo = userAlbums.filter(album => album.listened_to)
    let notListenedTo = userAlbums.filter(album => !album.listened_to)
    
    return (
      <React.Fragment>
          <Navbar currentPlaylist={currentPlaylist} createPlaylist={createPlaylist} showSideBar={showSideBar} logoutUser={logoutUser} currentUser = {currentUser}/>
          <Route  path="/login" component={LoginPage} /> 
          <Route  path="/home" render={() => <HomePage token={token} userAlbums={userAlbums} bannerAlbums={userAlbums.filter(album => album.listened_to)} playlists={playlists} />}/>
          <Route  path="/playlist" render={() => <PlaylistPage token={token} user={currentUser} updateUserAlbum={updateUserAlbum} playlistAlbums={playlistAlbums.filter(playlistAlbum => playlistAlbum.playlist_id === currentPlaylist.id)} userAlbums={userAlbums} playlist={currentPlaylist}/>}/>
          <Route  path="/backlog" render={() => <BacklogPage handleSort={this.handleSort} updateUserAlbum={updateUserAlbum} albums={ascend ? this.sortAscend(notListenedTo) : this.sortDescend(notListenedTo)}/>}/>
          <Route  path="/history" render={() => <HistoryPage handleSort={this.handleSort} albums={ascend ? this.sortAscend(listenedTo) : this.sortDescend(listenedTo)} updateUserAlbum={updateUserAlbum} />}/>
          <Route  path="/stats" render={() => <StatsPage albums={listenedTo} artists={_.sortBy(artists, "name")} />}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    currentUser: store.currentUser,
    playlists: store.playlists,
    artists: store.artistInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    accessingToken: (token) => dispatch(accessingToken(token)),
    gettingUserInfo: (token) => dispatch(gettingUserInfo(token)),
    logoutUser: () => dispatch(logoutUser()),
    createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
    updateUserAlbum: (userAlbum) => dispatch(updateUserAlbum(userAlbum))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))


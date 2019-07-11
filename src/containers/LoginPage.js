import React from 'react'
import '../styles/App.css';

export default class LoginPage extends React.Component {
    render() {
        return(
            <div id="login">
                <div id="login-text">
                    <h1>Welcome to Audiotheca!</h1>
                    <h3>Audiotheca's primary purposes is to keep track of music (specifically albums) you would like to listen to in the future.</h3>
                    <h3>However, there's a twist - once you listen to an album once, you it is archived and can no longer be listened to again. The idea is to keep your ear out for new music rather than listen to the same old same old.</h3>
                    <br/>
                    <h3>By integrating with your Spotify account, you can do the following through this app:</h3><br/>
                    <ul>
                        <li><b>Create and manage playlists</b></li>
                        <li><b>Search across the Spotify database for artists and add their albums to your playlists</b></li>
                        <li>Check out album information, listen directly to music from the app, and mark an album as finished listening</li>
                        <li>The more albums you listen to, the more music you'll get recommended based on what you've been listening to</li>
                        <li>Gain insight into listening trends, like your most popular genres over time and how far along you are in an artist's discography</li>
                    </ul>
                    <h2><i>Click the Login button in the navigation bar to get started!</i></h2>
                </div>
            </div>
        )
    }
}
import React from 'react'
import { Icon} from 'semantic-ui-react'
import '../styles/App.css';

export default class AboutModal extends React.Component {
    render() {
        return (
            <div id="login-text">
            <h1><u><i>Welcome to Audiotheca!</i></u></h1>
            <h3>Audiotheca's primary purposes is to keep track of music (specifically albums) you would like to listen to in the future.</h3>
            <h3>However, there's a twist - once you listen to an album once, it is archived and can no longer be listened to again. The idea is to keep your ear out for new music rather than listen to the same old same old.</h3>
            <h3>By integrating with your Spotify account, you can do the following through this app:*</h3>
            <ul>
                <li><b>Create and manage playlists</b></li>
                <li><b>Search across the Spotify database for artists and add their albums to your playlists</b></li>
                <li><b>Check out album information, listen directly to music from the app, and mark an album as finished listening</b></li>
                <li><b>Add a playlist to your Spotify account directly</b></li>
                <li><b>Get recommended albums based on what you've been listening to</b></li>
                <li><b>Gain insight into listening trends, like your most popular genres over time and how far along you are in an artist's discography</b></li>
            </ul>
            <h3 id="listening-header">Happy listening!</h3><Icon id="about-icon" name="headphones"/>

            <h5>*No personal information is stored in this application</h5>
        </div>
        )
    }
}
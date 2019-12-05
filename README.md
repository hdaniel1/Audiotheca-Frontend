# Audiotheca

Auditheca is an app that lets you manage playlists of albums you would like to listen to with a twist - you can only listen to an album once before it goes into your history. The idea is to constantly be listening to and discovering new music. 

Using the Spotify API (https://developer.spotify.com/documentation/web-api/), users can search albums by artist, get album recommendations based on their recent listening history, manage their backlog of playlists, export a playlist to spotify, and listen to albums directly via spotify in the application. You can also track your listening stats over time, such as your most listened to artist / genres. 

Try it here:

https://audiotecha-frontend.herokuapp.com/

(Note: it may take a while for the app to start, and it may error out the first time - just refresh!)
Demo:

https://www.youtube.com/watch?v=dDKCkAlhjts&t=2s

Audiotheca uses a Ruby on Rails backend API with active storage to keep track of your playlist and user information, as well as albums in your backlog / playlists. See it here:

https://github.com/hdaniel1/Audiotheca-Backend

The frontend is comprised of React.js, with redux for managing state / props and Semantic UI for styling. 

Keep track of updates and upcoming features / bug fixes via the trello board located here:

https://trello.com/b/08r9hfny

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

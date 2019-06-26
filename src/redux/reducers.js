import {combineReducers} from 'redux'

const currentUserReducer = (state = null, action) => {
    switch(action.type) {
      case "LOGIN_USER":
        return action.user
      case "LOGOUT_USER":
        return null
      default:
        return state
    }
}

const authReducer = (state = null, action) => {
    switch(action.type) {
      case "ACCESS_TOKEN":
        return action.token
      case "LOGOUT_USER":
        return null
      default:
        return state
    }
}

const rootReducer = combineReducers({
    token: authReducer,
    currentUser: currentUserReducer
})

export default rootReducer
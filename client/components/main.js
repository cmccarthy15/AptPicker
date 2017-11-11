import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, Route, Switch} from 'react-router-dom'
import {logout} from '../store'
import { Nav, MapPage, HomePage, Login, Signup } from './index'


import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from "react-google-maps"
/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends React.Component {

  render() {
    const {children, handleClick, isLoggedIn} = this.props

    return (
      <div>
        <Nav isLoggedIn={isLoggedIn} />
        <Switch>
          {isLoggedIn && <Route path="/map" component={MapPage} />}
          {/*isLoggedIn && <Route path="/profile" component={Profile} />*/}
          {!isLoggedIn && <Route path="/login" component={Login} />}
          {!isLoggedIn && <Route path="/signup" component={Signup} />}
          <Route component={HomePage} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

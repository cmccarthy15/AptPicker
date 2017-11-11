import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { getFeaturesThunk } from '../store'
import { MyMapComponent, Nav, AddLocation } from './index'
import { googleMapsApi } from '../../secrets'

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
class MapPage extends React.Component {
  state = { maps: null }

  componentDidMount(){
    this.props.getFeatures();
  }

  initGlobalGoogle = () => {
    const { google } = window
    this.setState({
      maps: google.maps,
    })
  }


  render() {
    const { features } = this.props
      , { maps } = this.state
      console.log(features);
    return (
      <div>
        <AddLocation maps={maps} features={features} />
        <hr />
        <MyMapComponent
          onMapLoaded={this.initGlobalGoogle}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApi}&v=3.exp&libraries=geometry,drawing,places,visualization`} // this may not work anymore...
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return ({
    features: state.features
  })
};

const mapDispatch = dispatch => {
  return {
    getFeatures() {
      dispatch(getFeaturesThunk());
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(MapPage))

/**
 * PROP TYPES
 */


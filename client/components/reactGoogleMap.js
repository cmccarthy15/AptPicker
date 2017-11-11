import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from 'react-google-maps'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAddrThunk } from '../store'


export class MyMapComponent extends Component {

  componentDidMount(){
    console.log('map mounted with user: ', this.props.user);
    this.props.getAllAddr(this.props.user.id);
  }

  render(){
    const { onMapLoaded } = this.props;
    console.log('this component has addresses... ', this.props.addresses)
    return (
      <GoogleMap
        ref={onMapLoaded}
        defaultZoom={11}
        center={{
          lat: 40.714,
          lng: -74.005
        }} >
        {this.props.addresses.map( address => {
          return (
            <div key={address.id}>
              <Marker position={{ lat: Number(address.lat), lng: Number(address.lng) }} />
              <Circle
                options={{ strokeColor: '#FF0000', fillColor: `#ff0000` }}
                center={{
                  lat: Number(address.lat),
                  lng: Number(address.lng)
                }}
                radius={1000}
              />
            </div>
          )
        })}
      </GoogleMap>
    )
  }
}


// const MyMapComponent = withScriptjs(withGoogleMap(({
//   isMarkerShown=true,
//   onMapLoaded=_ => _,
// }) =>
//   ))
const mapState = (state) => {
  return {
    addresses: state.addresses,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    getAllAddr(userId) {
      dispatch(getAddrThunk(userId))
    }
  }
}


export default connect(mapState, mapDispatch)(withScriptjs(withGoogleMap(MyMapComponent)));

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from "react-google-maps"

import React from 'react'

const MyMapComponent = withScriptjs(withGoogleMap(({
  isMarkerShown=true,
  onMapLoaded=_ => _
}) =>
  <GoogleMap
    ref={onMapLoaded}
    defaultZoom={12}
    center={{
      lat: 40.714,
      lng: -74.005 }} >
    {isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    <Circle
      options={{ strokeColor: '#FF0000', fillColor: `#ff0000`}}
      center= {{
        lat: 40.714,
        lng: -74.005
      }}
      radius={1000}
    />

  </GoogleMap>))


export default MyMapComponent;

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Link } from 'react-router-dom'
import { addAddr } from '../store'


export class AddLocation extends Component{
  constructor(props){
    super(props);
    this.state = { address: '' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() { this.createGeocoder(this.props) }
  componentWillReceiveProps(props) { this.createGeocoder(props) }

  createGeocoder(props) {
    if (this.geocoder) return
    if (props.maps && props.maps.Geocoder) this.geocoder = new props.maps.Geocoder();
  }

  handleChange(evt){
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit(evt){
    evt.preventDefault();
    const optionInfo = this.props.user.features.map(feature => ([feature.id, feature.type]));
    this.geocoder.geocode({address: this.state.address},
      (results) => {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        const user = this.props.user
        const userId = this.props.user.id
        this.props.addNewAddr({
          address: this.state.address,
          lat, lng, userId,
          radius: user.radius,
          options: optionInfo})
      })
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit} className=" vert-margin row">
          <label className="font20" >
            Address:
            <input
              type="text"
              value={this.state.address}
              name="address"
              className="address-input"
              onChange={this.handleChange} />
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
    )}
}


const mapState = state => {
  return {
    user: state.user
  }
};

const mapDispatch = (dispatch) => {
  return {
    addNewAddr({address, lat, lng, userId, radius, options}){
      dispatch(addAddr({ address, lat, lng, userId, radius, options }))
    }
  }
};

export default connect(mapState, mapDispatch)(AddLocation);

// geocoder.geocode({
// "address": "55 East 117th St New York NY 10035"
// },
// function (results) {
//   console.log(results[0].geometry.location.lat()); //LatLng
//   var marker = new google.maps.Marker({
//     map: map,
//     position: results[0].geometry.location
//   });

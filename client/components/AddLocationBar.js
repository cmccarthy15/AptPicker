import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Link } from 'react-router-dom'
import { addAddr, addNewAddress } from '../store'


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
    this.geocoder.geocode({address: this.state.address},
      (results) => {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        const userId = this.props.user.id
        this.props.addNewAddr({address: this.state.address, lat, lng, userId})
      })
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit} className="row spread">
          <label>
            Address:
            <input
              type="text"
              value={this.state.address}
              name="address"
              onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
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
    addNewAddr({address, lat, lng, userId}){
      console.log('inside of handler')
      dispatch(addAddr({ address, lat, lng, userId }))
      console.log('completed addAddr')
      dispatch(addNewAddress({userId, lat, lng}))
      console.log('completed addNewAddress (features)')
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

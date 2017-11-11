import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Link } from 'react-router-dom'
import { addAddr } from '../store'


export class AddLocation extends Component{
  constructor(props){
    super(props);
    this.state = {
      address: '',
      radius: "1000",
      extras: {cafe: false, gym: false, park: false, library: false, yoga: false, grocery: false}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() { this.createGeocoder(this.props) }
  componentWillReceiveProps(props) { this.createGeocoder(props) }

  createGeocoder(props) {
    if (this.geocoder) return
    if (props.maps && props.maps.Geocoder)
      this.geocoder = new props.maps.Geocoder();
  }

  handleChange(evt){
    console.log('updating state: ', this.state)
    this.state.hasOwnProperty(evt.target.name) ?
      this.setState({ [evt.target.name]: evt.target.value })
    : this.setState({extras: {...this.state.extras, [evt.target.name]: evt.target.checked }})
    console.log('now state: ', this.state);
  }

  handleSubmit(evt){
    evt.preventDefault();
    console.log(this.geocoder);
    this.geocoder.geocode({address: this.state.address},
      (results) => {
        const location = results[0].geometry.location;
        const lat = location.lat();
        const lng = location.lng();
        console.log(this.state.address, lat, lng);
        this.props.addNewAddr({address: this.state.address, lat, lng})
        // console.log('results from geocoder: ', results);
        // console.log('results[0] from geocoder: ', results[0]);
        // console.log('results[0].geometry from geocoder: ', results[0].geometry);
        // console.log('results[0].geometry.location from geocoder: ', results[0].geometry.location);
        //   var marker = new google.maps.Marker({
        //     map: map,
        //     position: results[0].geometry.location

      })
  }

  render() {
    const options = Object.keys(this.state.extras);
    console.log(options);

    console.log(this.geocoder)

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
          <label>
            Radius (meters):
            <select
            value={this.state.radius}
            onChange={this.handleChange}
            name="radius" >
              <option value="500">500</option>
              <option value="800">800</option>
              <option value="1000">1000</option>
            </select>
          </label>
          <label className="row">
            Extras:
            {options.map( (option, index) => (
              <label key={index}>
                {option}
              <input
                name={option}
                type="checkbox"
                checked={this.state.extras[option]}
                onChange={this.handleChange} />
              </label>
              ))}
            </label>
          <input type="submit" value="Submit" />
        </form>
    )}
}


const mapState = null;
const mapDispatch = (dispatch) => {
  return {
    addNewAddr(addr){
      dispatch(addAddr(addr))
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

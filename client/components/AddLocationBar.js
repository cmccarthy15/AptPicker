import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Link } from 'react-router-dom'


export class AddLocation extends Component{
  constructor(props){
    super(props);
    this.state = {
      address: '',
      radius: "1000",
      extras: {cafe: false, gym: false, park: false, library: false, yoga: false, grocery: false}
    }
    this.handleChange = this.handleChange.bind(this);
  }

  // componentDidMount() {
  //   if (typeof window === 'undefined') {
  //     return;
  //   }
  //   console.log('window is: ', window, window.google, window.alert);

  //   var googleMaps = this.props.googleMaps ||
  //     (window.google && // eslint-disable-line no-extra-parens
  //       window.google.maps) ||
  //     this.googleMaps;

  //   /* istanbul ignore next */
  //   if (!googleMaps) {
  //     if (console) {
  //       console.error(// eslint-disable-line no-console
  //         'Google map api was not found in the page.');
  //     }
  //     return;
  //   }
  //   this.googleMaps = googleMaps;
  //   console.log('google maps were found: ', this.googleMaps);

  //   this.autocompleteService = new googleMaps.places.AutocompleteService();
  //   this.geocoder = new googleMaps.Geocoder();
  // }

  componentDidMount() { this.createGeocoder(this.props) }
  componentWillReceiveProps(props) { this.createGeocoder(props) }

  createGeocoder(props) {
    if (this.geocoder) return
    if (props.maps && props.maps.Geocoder)
      this.geocoder = new props.maps.Geocoder
  }


  handleChange(evt){
    console.log('updating state: ', this.state)
    this.state.hasOwnProperty(evt.target.name) ?
      this.setState({ [evt.target.name]: evt.target.value })
    : this.setState({extras: {...this.state.extras, [evt.target.name]: evt.target.checked }})
    console.log('now state: ', this.state);
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
        </form>
    )}
}


const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(AddLocation);

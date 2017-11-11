import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export class Profile extends Component {
  constructor(){
    super();
    this.state = {
      radius: 1000,
      //features: this.props && this.props.features.map(feature => ({[feature.name]: false}))
    }
    this.handleRadius = this.handleRadius.bind(this);
  }

  handleRadius(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
    // also needs to dispatch a thunk to update the user's radius
  }

  render() {
    const { email, name, radius, features } = this.props
    console.log('this.props: ', this.props);
    console.log('this.state: ', this.state);

    return (
      <div>
        <h3>Welcome, {name ? name : email}</h3>
        <p>{`Currently your radius is set to ${radius}.`}</p>
        <form>
          <label>
            Radius (meters):
              <select
              value={this.state.radius}
              onChange={this.handleRadius}
              name="radius" >
              <option value="500">500</option>
              <option value="800">800</option>
              <option value="1000">1000</option>
            </select>
          </label>
          <label className="row">
            Extras:
              {features.map((option) => (
              <label key={option.id}>
                {option.type}
                <input
                  name={option.type}
                  type="checkbox"
                  checked={this.state.extras[option]}
                  onChange={this.handleChange} />
              </label>
            ))}
          </label>
        </form>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    name: state.user.name,
    radius: state.user.radius,
    features: state.features
  }
}

export default connect(mapState)(Profile)

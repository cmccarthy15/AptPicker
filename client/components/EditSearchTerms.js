import React, { Component } from 'react'
import { connect } from 'react-redux'

export class EditSearchTerms extends Component {
  constructor(){
    super();
    const featuresProp = this.props.features.map(feature => ({[feature.type]: false}))
    this.state = {
      radius: 1000,
      features: featuresProp
    }
  }

  handleRadius(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
    // also needs to dispatch a thunk to update the user's radius
  }

  render(){
    const features = this.state.features
    return (
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
              {features.map((feature) => (
                console.log(feature)
            // <label key={option.id}>
            //   {option.type}
            //   <input
            //     name={option.type}
            //     type="checkbox"
            //     checked={this.state.extras[option]}
            //     onChange={this.handleChange} />
            // </label>
          ))}
        </label>
      </form>
    )
  }
}


const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(EditSearchTerms)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateRadius, updateInterests, me } from '../store'

export class EditSearchTerms extends Component {
  constructor(props){
    super(props);
    const options = {}
    this.props.options.map( option => (options[option.type] = {...option, selected: false}))
    this.state = {
      radius: 1000,
      options: options
    }
    this.handleRadius = this.handleRadius.bind(this);
    this.handleOptions = this.handleOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRadius(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
    // also needs to dispatch a thunk to update the user's radius
  }

  handleOptions(evt){
    const target = evt.target.value
    console.log('target: ', target)
    const targetState = this.state.options[target]
    const targetPrevValue = targetState.selected;
    this.setState({options: {...this.state.options, [target]: {...targetState, selected: !targetPrevValue} }})
  }

  handleSubmit(evt){
    evt.preventDefault();
    const optionIds = [];
    Object.keys(this.state.options).map(option => {
      if (this.state.options[option].selected) optionIds.push(this.state.options[option].id)
    })
    this.props.editUser({userId: this.props.user.id, radius: this.state.radius, options: optionIds})
    console.log('handling submit with info: ', this.state, this.props.user, optionIds)
//  the thunk that event exists needs to..
// find all user features and delete where userId is our userId but featureId is not one of the listed ones
}

  render(){
    const {options, radius} = this.state;
    console.log('this state: ', this.state);
    return (
      <div>
        <h3>Edit your options below: </h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Radius (meters):
              <select
              value={radius}
              onChange={this.handleRadius}
              name="radius" >
              <option value="500">500</option>
              <option value="800">800</option>
              <option value="1000">1000</option>
            </select>
          </label>
          <label className="column">
            Extras:
            {Object.keys(options).map((option) => (
              <label key={options[option].id}>
                {options[option].type}
                <input
                  name={options[option].type}
                  value={options[option].type}
                  type="checkbox"
                  checked={options[option].selected}
                  onChange={this.handleOptions} />
              </label>
            ))}
          </label>
          <input className="button" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    editUser({userId, radius, options}){
      dispatch(updateRadius({id: userId, radius}))
      dispatch(updateInterests({id: userId, options}))
    }
  }
}

export default connect(mapState, mapDispatch)(EditSearchTerms)


/*

constructor(){
    super();
    //const featuresProp = this.props.features.map(feature => ({[feature.type]: false}))
    this.state = {
      radius: 1000,
      features: []
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
*/

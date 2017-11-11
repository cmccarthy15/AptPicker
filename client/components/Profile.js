import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFeaturesThunk, EditSearch } from '../store'

/**
 * COMPONENT
 */
export class Profile extends Component {
  constructor(){
    super();
    this.state = {
      editSearch: false
    }
    // this.handleRadius = this.handleRadius.bind(this);
  }

  componentDidMount(){
    this.props.getFeatures();
  }

  render() {
    const { email, name, radius, features, user } = this.props
    return (
      <div>
        <h3>Welcome, {name ? name : email}</h3>
        <p>{`Currently your radius is set to ${radius}.`}</p>
        <p>{`And you're currently looking for these features:${
          user.features.map(feature => ' '.concat(feature.type))
        }`}</p>
        <button onClick={() => this.setState({editSearch: !this.state.editSearch})}>
          Edit Search Terms </button>
        {this.state.editSearch && <EditSearch />}
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
    user: state.user,
    features: state.features
  }
}

const mapDispatch = dispatch => {
  return {
    getFeatures() {
      dispatch(getFeaturesThunk())
    }
  }
}

export default connect(mapState, mapDispatch)(Profile)


/*

*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFeaturesThunk, getAddrThunk } from '../store'
import { EditSearch, AddressInfo } from './index'

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
    this.props.getFeatures(this.props.user.id);
  }

  render() {
    const { email, name, radius, options, user, addresses } = this.props
    return (
      <div>
        <h3>Welcome, {name ? name : email}</h3>
        <p>{`Currently your radius is set to ${radius}.`}</p>
        <p>{`And you're currently looking for these options:${
          user.features ? user.features.map(feature => ' '.concat(feature.type)) : ' None. Edit your search terms to start looking!'
        }`}</p>
        <button onClick={() => this.setState({editSearch: !this.state.editSearch})}>
          Edit Search Terms </button>
        {this.state.editSearch && <EditSearch options={options} />}
        <hr />
        {addresses.map( address => (<AddressInfo key={address.id} address={address} />))}
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
    features: state.features,
    addresses: state.addresses,
    options: state.options
  }
}

const mapDispatch = dispatch => {
  return {
    getFeatures(userId) {
      dispatch(getFeaturesThunk())
      dispatch(getAddrThunk(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Profile)


/*

*/

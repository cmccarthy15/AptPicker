import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const Profile = (props) => {
  const { email, name, radius } = props

  return (
    <div>
      <h3>Welcome, {name}</h3>
      <p>{`Currently your radius is set to ${radius}.`}</p>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    name: state.user.name,
    radius: state.user.radius
  }
}

export default connect(mapState)(Profile)

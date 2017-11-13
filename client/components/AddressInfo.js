import React from 'react'

import { connect } from 'react-redux'


export const AddressInfo = ({address}) => {
  console.log('address is: ', address);
  return (
    <div>
      <h3>{address.address}</h3>
      <div>
      {address.UserFeatures.map( feature => {
        return (
          <p key={feature.id}>{`${feature.name} at ${feature.address} has a rating of ${feature.rating} (${feature.feature ? feature.feature.type : 'oops'})`}</p>
        )
      })}
      </div>
    </div>
  )
}


const mapState = null

const mapDispatch = null

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(AddressInfo)

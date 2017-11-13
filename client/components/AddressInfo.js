import React from 'react'

import { connect } from 'react-redux'


export const AddressInfo = ({address}) => {
  console.log('address is: ', address);
  return (
    <div>
      <h3 className="address-name">{address.address}</h3>
      <div className="column wrap">
      {address.UserFeatures.map( feature => {
        return (
          <p key={feature.id}><a href={feature.url} target="_blank">{feature.name}</a>{` at ${feature.address} has a rating of ${feature.rating} (${feature.feature ? feature.feature.type : 'oops'})`}
          </p>
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

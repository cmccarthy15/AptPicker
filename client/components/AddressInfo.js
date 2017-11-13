import React from 'react'

import { connect } from 'react-redux'


export const AddressInfo = ({address}) => {
  console.log('address is: ', address);
  return (
    <div>
      <h3 className="address-name font20">{address.address}</h3>
      <div className="column address-column">
      {address.UserFeatures.map( feature => {
        return (
          <div className="address-info" key={feature.id}>
            <a href={feature.url} target="_blank">{`${feature.name} (${feature.feature ? feature.feature.type : 'oops'})`}</a>
             <p>{`Address: ${feature.address}`}</p>
             <p>{`Rating: ${feature.rating}`}</p>
          </div>
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

import React from 'react'
import { connect } from 'react-redux'
import { deleteUserFeature } from '../store'


export const AddressInfo = (props) => {
  const {address} = props
  console.log('address is: ', address);
  return (
    <div>
      <h3 className="address-name font20">{address.address}</h3>
      <div className="column address-column">
      {address.UserFeatures.map( feature => {
        return (
          <div className="row" key={feature.id}>
            <div className="address-info">
              <a href={feature.url} target="_blank">{`${feature.name} (${feature.feature ? feature.feature.type : 'oops'})`}</a>
              <p>{`Address: ${feature.address}`}</p>
              <p>{`Rating: ${feature.rating}`}</p>
             </div>
             <button onClick={() => props.deleteFeature({userId: address.userId, id: feature.id})}>x</button>
          </div>
        )
      })}
      </div>
    </div>
  )
}


const mapState = null

const mapDispatch = dispatch => {
  return {
    deleteFeature({id, userId}){
      dispatch(deleteUserFeature({id, userId}))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(AddressInfo)

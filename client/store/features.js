import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_FEATURES = 'GET_FEATURES'

/**
* INITIAL STATE
*/
const defaultState = [];

/**
* ACTION CREATORS
*/

const getFeatures = (features) => ({ type: GET_FEATURES, features })

/**
* THUNKS
*/

export const getFeaturesThunk = () =>
  dispatch => {
    axios.get('/api/features')
      .then(features => {
        dispatch(getFeatures(features.data))
      })
      .catch(err => console.error(err))
  }


/**
* REDUCER
* curl -H "Content-Type: application/json" -X POST -d '{"username":"kate","password":"1234"}' http://localhost:3000/api/login
*/

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_FEATURES:
      return action.features;
    default:
      return state;
  }
}

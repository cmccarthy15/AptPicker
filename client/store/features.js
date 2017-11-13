import axios from 'axios'
import { getAddrThunk } from './index'
/**
 * ACTION TYPES
 */
const GET_SELECTED = 'GET_SELECTED'
const ADDED_ADDRESS = 'ADDED_ADDRESS'

/**
* INITIAL STATE
*/
const defaultState = [];

/**
* ACTION CREATORS
*/

const getSelected = (features) => ({ type: GET_SELECTED, features })
const addedAddress = (features) => ({ type: ADDED_ADDRESS, features})

/**
* THUNKS
*/

export const getSelectedThunk = (id) =>
  dispatch => {
    axios.get(`/api/features/user/${id}`)
      .then(features => {
        dispatch(getSelected(features.data))
      })
      .catch(err => console.error(err))
  }

export const addNewAddress = (info) =>
  dispatch => {
    console.log('info inside of the thunk in question: ', info);
    return axios.post(`/api/features/user/${info.userId}/newaddr`, info)
      .then( () => {
        // console.log('features data is ---> ', features.data)
        // const limitedData = features.data.map(({ name, rating, coordinates, price, location }) => {
        //   return { name, rating, lng: coordinates.longitude, lat: coordinates.latitude, price, address: location.display_address[0] }
        // })
        // console.log('limited data is ---> ', limitedData)
        // dispatch(addedAddress(limitedData))
        dispatch(getSelectedThunk(info.userId))
      })
      .catch(err => console.error(err))
  }

export const deleteUserFeature = ({id, userId}) =>
  dispatch => {
    return axios.delete(`/api/features/${id}`)
    .then( () => {
      dispatch(getSelectedThunk(userId))
      dispatch(getAddrThunk(userId))
    })
    .catch(err => console.error(err))
  }

/**
* REDUCER
* curl -H "Content-Type: application/json" -X POST -d '{"username":"kate","password":"1234"}' http://localhost:3000/api/login
*/

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_SELECTED:
      return action.features;
    case ADDED_ADDRESS:
      return [...state, ...action.features];
    default:
      return state;
  }
}

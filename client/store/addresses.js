import axios from 'axios'
import { addNewAddress } from './index'

/**
 * ACTION TYPES
 */
 const GET_ADDRESSES = 'GET_ADDRESSES'
 const REMOVE_ADDRESSES = 'REMOVE_ADDRESSES'

 /**
 * INITIAL STATE
 */
 const defaultState = [];

 /**
 * ACTION CREATORS
 */

 const getAddresses = (addresses) => ({type: GET_ADDRESSES, addresses})
 const removeAddresses = () => ({type: REMOVE_ADDRESSES})

 /**
 * THUNKS
 */

export const getAddrThunk = (userId) =>
  dispatch => {
    axios.get(`/api/addresses/user/${userId}`)
      .then(addresses => {
        dispatch(getAddresses(addresses.data))
      })
      .catch(err => console.error(err))
  }

export const addAddr = (addr) =>
  dispatch => {
    console.log('inside of the thunk', addr)
    axios.post('api/addresses/new', addr)
      .then( address => {
        console.log('got a response back')
        dispatch(addNewAddress({...addr, AddressId: address.data.id}))
        dispatch(getAddrThunk(addr.userId))
      })
      .catch(err => console.error(err));
  }

 /**
 * REDUCER
 * curl -H "Content-Type: application/json" -X POST -d '{"username":"kate","password":"1234"}' http://localhost:3000/api/login
 */

 export default function (state = defaultState, action){
   switch (action.type) {
    case GET_ADDRESSES:
      return action.addresses;
    case REMOVE_ADDRESSES:
      return [];
    default:
      return state;
   }
 }

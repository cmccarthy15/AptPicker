import axios from 'axios'

/**
 * ACTION TYPES
 */
 const GET_ADDRESSES = 'GET_ADDRESSES'

 /**
 * INITIAL STATE
 */
 const defaultState = [];

 /**
 * ACTION CREATORS
 */

 const getAddresses = (addresses) => ({type: GET_ADDRESSES, addresses})

 /**
 * THUNKS
 */

export const getAddrThunk = () =>
  dispatch => {
    axios.get('/api/addresses')
      .then(addresses => {
        dispatch(getAddresses(addresses.data))
      })
      .catch(err => console.error(err))
  }

export const addAddr = (addr) =>
  dispatch => {
    console.log('inside of the thunk')
    axios.post('api/addresses/new', addr)
      .then( () => {
        console.log('got a response back')
        dispatch(getAddrThunk())
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
    default:
      return state;
   }
 }

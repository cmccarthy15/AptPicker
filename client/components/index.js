/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as MyMapComponent} from './reactGoogleMap'
export {default as Nav} from './Nav'
export {default as AddLocation} from './AddLocationBar'
export {default as MapPage} from './MapPage'
export {default as HomePage} from './HomePage'
export {default as Profile} from './Profile'

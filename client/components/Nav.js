import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Link } from 'react-router-dom'
import { logout } from '../store'


const Nav = (props) => {
  const { isLoggedIn, handleClick } = props;

  return (
    <div className="row spread">
      <Link to="/home"><img src='' /><h1>AptPicker</h1></Link>
      <div>
        { isLoggedIn ?
          <div className="nav-buttons">
            <Link to="/map"> Map </Link>
            <Link to="/profile"> Profile </Link>
            <Link to="/home" onClick={handleClick}>Logout</Link>
          </div>
        : <div>
            <Link to="/login"> Login </Link>
            <Link to="/signup"> Sign Up </Link>
          </div>
        }
      </div>
    </div>
  )
}


const mapState = null;
const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Nav);

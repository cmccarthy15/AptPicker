import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Link } from 'react-router-dom'
import { logout } from '../store'


const Nav = (props) => {
  const { isLoggedIn, handleClick } = props;

  return (
    <div className="row spread">
      <Link className="row name-icon" to="/home">
        <img className="icon-nav" src="https://image.flaticon.com/icons/svg/585/585531.svg" />
        <h1 className="nav-name">Get-Apt</h1>
      </Link>
      <div>
        { isLoggedIn ?
          <div className="nav-buttons">
            <Link className="font20" to="/map"> Map </Link>
            <Link className="font20" to="/profile"> Profile </Link>
            <Link className="font20" to="/home" onClick={handleClick}>Logout</Link>
          </div>
        : <div className="row spread">
            <Link className="font20" to="/login"> Login </Link>
            <Link className="font20" to="/signup"> Sign Up </Link>
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

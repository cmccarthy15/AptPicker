import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Link } from 'react-router-dom'


const Nav = (props) => {
  const { isLoggedIn } = props;

  return (
    <div className="row spread">
      <Link to="/home"><img src='' /><h1>AptPicker</h1></Link>
      <div>
        { isLoggedIn ?
          <div className="nav-buttons">
            <Link to="/map"> Map </Link>
            <Link to="/profile"> Profile </Link>
            <a href="#" >Logout</a>
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
const mapDispatch = null;

export default Nav;

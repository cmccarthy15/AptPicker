import React from 'react'
import { connect } from 'react-redux'

const HomePage = () => {
  return (
    <div>
      <h1> Welcome to Apt Picker</h1>
      <p> When looking for apartments, there are plenty of website that can help you identify if it's the right can of place for you on metrics like apartment size, features of the apartment itself and some high level features of the neighborhood like schools and crimes. All of those things are really important. AptPicker is a tool to give you another layer of information before you even go to check out the place. It allows you to visualize what kinds of features are in the area, based on a radius you set and features you choose - like cafes, parks, or gyms. Figure out if the area has what you need without having to go there. </p>
    </div>
  )
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(HomePage);

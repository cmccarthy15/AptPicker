import React from 'react'
import { connect } from 'react-redux'

const HomePage = () => {
  return (
    <div className="center-text">
      <img src="https://goo.gl/images/Vgqkzx" />
      <h1> Welcome to Get-Apt</h1>
      <p> When looking for an apartment, there are plenty of website that can help you identify if it's the right can of place for you on metrics like apartment size and schools and crimes rates in the area. </p>
      <p>Get-Apt gives you another level of information about places you want to have in the immediate area. You choose the businesses you want in your area, and how close you want them to be. You can submit any address and it will visualize the radius you chose and the businesses you were interested in within that radius. Find out what's around before you even visit.</p>
    </div>
  )
}

const mapState = null;
const mapDispatch = null;

export default connect(mapState, mapDispatch)(HomePage);

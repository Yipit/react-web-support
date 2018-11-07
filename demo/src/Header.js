import React, { Component } from 'react'

class Header extends Component {
  render () {
    return (
      <div className="demo-header">
        <div className="demo-header--title">react-web-support</div>
        <div className="demo-header--links">
          <a href="https://github.com/kingofthestack/react-web-support">Usage</a>
        </div>
      </div>
    )
  }
}

export default Header
import React, { Component } from 'react'
import { MenuButton } from './menuButton';
import SlideMenu from './slideMenu';

class Header extends Component {

  state = {
    showSlideMenu : false
  }

  onMenuButtonClick = () => {
    this.setState({ showSlideMenu: true })
  }

  onSlideMenuClose = () => {
    this.setState({showSlideMenu: false})
  }

  render() {
    const { siteTitle } = this.props;
    return (
      <div
        style={{
          background: `rebeccapurple`,
          marginBottom: `1.45rem`,
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <h1 style={{ margin: 0, color: `white` }}>
              {siteTitle}
          </h1>
          <MenuButton onClick={this.onMenuButtonClick}/>
          { this.state.showSlideMenu && <SlideMenu onClose={this.onSlideMenuClose}/> }
        </div>
      </div>
    )
  }
} 

export default Header

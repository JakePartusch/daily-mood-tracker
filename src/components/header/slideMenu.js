import React, { Component } from 'react'
import styled from '@emotion/styled';
import { keyframes} from '@emotion/core';
import GatsbyLink from 'gatsby-link';

import { MenuButton } from './menuButton';

const invariant = (condition, message) => {
    if (!condition && process.env.NODE_ENV === 'development') {
      console.error(message);
    }
  };

const breakpoints = {
    xsmall: 0,
    small: 480,
    medium: 768,
    large: 1024,
  };
  
 const MEDIA = {
    greaterThan(property) {
      invariant(
        breakpoints.hasOwnProperty(property),
        `The property ${property} is not a valid breakpoint`
      );
      return `@media only screen and (min-width: ${breakpoints[property] ||
        0}px)`;
    },
  };

const SCALE_FADE_IN = keyframes({
    from: {
      transform: 'scaleX(0) scaleY(0)',
      opacity: 0,
    },
    to: {
      transform: 'scaleX(1) scaleY(1)',
      opacity: 1,
    },
  });

const Container = styled.div({
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: 'auto',
    width: '100%',
    boxSizing: 'border-box',
    zIndex: '100',
    overflow: 'hidden',
    overflowY: 'scroll',
    paddingBottom: '1rem',
    transformOrigin: 'top right',
    animation: `${SCALE_FADE_IN} 175ms cubic-bezier(.39, .575, .565, 1)`,
    [MEDIA.greaterThan('medium')]: {
      display: 'none',
    },
  });
  
  const Content = styled.div({
    backgroundColor: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
    padding: '1rem',
    paddingTop: '2.3rem',
  });
  
  const CloseButton = styled(MenuButton)({
    position: 'absolute',
    top: '0.25rem',
    right: '0.25rem',
  });
  
  const StyledLink = styled(GatsbyLink)(
    {
      display: 'inline-block',
      backgroundColor: 'white',
      color: 'rebeccapurple',
      fontWeight: 100,
      border: `2px solid rebeccapurple`,
      margin: '0.5rem 0',
      padding: '0.5rem 1rem',
      textAlign: 'center',
      textDecoration: 'none',
      width: '100%',
      transition: '0.3s all',
      ':hover, &.active': {
        fontWeight: 700,
        letterSpacing: 0.35,
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.15)',
        transform: 'scale(1.02)',
      },
    },
    ({ primary }) => ({
      ...(primary
        ? {
            color: 'white',
            backgroundColor: 'rebeccapurple',
          }
        : {}),
    })
  );
  
  const Link = ({ children, primary, onLinkClick, to }) => (
    <StyledLink
      onClick={onLinkClick}
      to={to}
      primary={primary}
      activeClassName="active"
      exact
    >
      {children}
    </StyledLink>
  );

export default class SlideMenu extends Component {
  render() {
      const { className, onClose } = this.props;
    return (
        <Container className={className}>
        <Content>
            <CloseButton color={'black'} open={true} onClick={onClose} />
            <Link
                to="/"
                aria-label="Home"
                onLinkClick={onClose}
                primary
            >
            Home
            </Link>
            <Link
                to="/history"
                aria-label="History"
                onLinkClick={onClose}
                primary
                >
                History
            </Link>
            <Link
                to="/logout"
                aria-label="Logout"
                onLinkClick={onClose}
                primary
                >
                Logout
            </Link>
        </Content>
      </Container>
    )
  }
}

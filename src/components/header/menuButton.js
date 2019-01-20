import React from 'react';
import styled from '@emotion/styled';

const sizes = {
  padding: {
    x: 5,
    y: 5,
  },
  layer: {
    width: 30,
    height: 3,
    spacing: 6,
  },
};

const Button = styled.button({
  padding: `${sizes.padding.y}px ${sizes.padding.x}px`,
  display: 'inline-block',
  cursor: 'pointer',
  transitionProperty: 'opacity, filter',
  transitionDuration: '150ms',
  transitionTimingFunction: 'linear',
  font: 'inherit',
  color: 'inherit',
  textTransform: 'none',
  backgroundColor: 'transparent',
  border: 0,
  margin: 0,
  overflow: 'visible',
});

const Box = styled.span({
  width: sizes.layer.width,
  height: sizes.layer.height * 3 + sizes.layer.spacing * 2,
  display: 'inline-block',
  position: 'relative',
});

const InnerBox = styled.span`
  display: block;
  top: ${sizes.layer.height / 2}px
  margin-top: -${sizes.layer.height / 2}px;
  transition: background-color 0s 0.13s linear;
  &.active {
    transition-delay: 0.22s;
    background-color: transparent;
    &::before {
      top: 0;
      transition: top 0.1s 0.15s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
                  transform 0.13s 0.22s cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translate3d(0, 10px, 0) rotate(45deg);
    }
    &::after {
      top: 0;
      transition: top 0.2s cubic-bezier(0.33333, 0, 0.66667, 0.33333),
                  transform 0.13s 0.22s cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translate3d(0, 10px, 0) rotate(-45deg);
    }
  }
  &, &::before, &::after {
    width: ${sizes.layer.width}px;
    height: ${sizes.layer.height}px;
    background-color: ${props => props.color || 'white'};
    position: absolute;
    transition: 150ms ease;
  }
  &::before, &::after {
    content: '';
    display: block;
  }
  &::before {
    top: ${sizes.layer.spacing + sizes.layer.height}px;
    transition: top 0.1s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
    transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  };
  &::after {
    top: ${2 * (sizes.layer.spacing + sizes.layer.height)}px;
    transition: top 0.2s 0.2s cubic-bezier(0.33333, 0.66667, 0.66667, 1),
    transform 0.13s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
`;

export function MenuButton({ className, color, onClick, open }) {
  return (
    <Button className={className} aria-label="Menu" onClick={onClick}>
      <Box>
        <InnerBox className={open ? 'active' : ''} color={color} />
      </Box>
    </Button>
  );
}
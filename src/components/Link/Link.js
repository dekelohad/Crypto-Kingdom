import React from 'react';
import { StyledLink } from './Link.styles';

const Link = ({ to, style, children, ...rest }) => {
  return (
    <StyledLink style={style} to={to} {...rest}>
      {children}
    </StyledLink>
  );
};

export default Link;

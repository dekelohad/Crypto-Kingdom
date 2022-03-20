import { Link as ReactRouterLink } from 'react-router-dom';
import { styled } from '@material-ui/styles';

export const StyledLink = styled(ReactRouterLink)({
  color: '#0052cc',
  '&:hover': {
    textDecoration: 'underline',
  },
});

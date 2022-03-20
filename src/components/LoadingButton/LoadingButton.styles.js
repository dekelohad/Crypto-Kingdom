import Button from '@mui/material/Button';
import { styled } from '@material-ui/styles';

export const StyledButton = styled(Button)({
  marginTop: 20,
  borderRadius: 20,
  padding: 14,
  width: '100%',
  background: '#0052cc',
  '&:hover': {
    background: 'green',
  },
});

export const styles = {
  loadingContainer: {
    display: 'flex',
  },
  circularProgress: {
    color: 'gold',
    height: 22,
    width: 22,
  },
  circularProgressContainer: {
    paddingRight: 8,
  },
};

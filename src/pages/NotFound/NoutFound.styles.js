import { styled } from '@material-ui/styles';
import { LoadingButton } from '../../components';

export const StyledLoadingButton = styled(LoadingButton)({
  backgroundColor: 'red',
  color: 'white',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: 'gold',
  },
});

export const styles = {
  container: {
    textAlign: 'center',
    marginTop: 40,
    maxWidth: 550,
    width: '90%',
    margin: '20px auto',
  },
  title: {
    fontSize: '2rem',
    color: 'white',
    marginTop: 10,
    marginBottom: 20,
  },
};

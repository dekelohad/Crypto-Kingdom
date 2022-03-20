import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled } from '@material-ui/styles';

export const DarkVisibilityIcon = styled(VisibilityIcon)({
  color: 'black',
});

export const DarkVisibilityOffIcon = styled(VisibilityOffIcon)({
  color: 'black',
});

export const ErorMessage = styled('div')({
  color: '#d32f2f',
  marginTop: 10,
  marginBottom: 8,
  fontSize: '0.95rem',
  display: 'inline-block',
  '&::before': {
    display: 'inline',
    content: `"⚠ "`,
  },
});

export const styles = {
  input: {
    marginTop: 12,
  },
};

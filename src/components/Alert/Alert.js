import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { AuthState } from '../../contexts/AuthContext';

const Alert = () => {
  const { alert, setAlert } = AuthState();

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3500}
      onClose={handleCloseAlert}
    >
      <MuiAlert
        onClose={handleCloseAlert}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;

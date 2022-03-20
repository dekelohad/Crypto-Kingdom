import { CircularProgress } from '@material-ui/core';
import { styles, StyledButton } from './LoadingButton.styles';

const LoadingButton = ({
  loading,
  disabled,
  onClick,
  text,
  type = 'submit',
  size = 'large',
  style,
  ...rest
}) => {
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      loading={loading.toString()}
      variant="contained"
      onClick={onClick}
      size={size}
      style={style}
      {...rest}
    >
      {loading ? (
        <div style={styles.loadingContainer}>
          <span style={styles.circularProgressContainer}>
            <CircularProgress style={styles.circularProgress} />
          </span>
          <span> Loading... </span>
        </div>
      ) : (
        text
      )}
    </StyledButton>
  );
};

export default LoadingButton;

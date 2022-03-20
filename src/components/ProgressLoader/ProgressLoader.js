import { LinearProgress } from '@material-ui/core';
import { styles } from './ProgressLoader..styles';

const ProgressLoader = ({ style, className = '', ...rest }) => {
  return (
    <LinearProgress
      {...rest}
      className={className}
      style={{ ...styles.progressLoader, ...style }}
    />
  );
};

export default ProgressLoader;

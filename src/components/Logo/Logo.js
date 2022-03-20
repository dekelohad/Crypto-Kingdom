import { Typography } from '@material-ui/core';
import { styles } from './Logo.styles';

const Logo = ({ style, ...rest }) => {
  return (
    <div style={{ ...styles.container, ...style }} {...rest}>
      <Typography variant="h2" style={styles.text}>
        Crypto Kingdom
      </Typography>
    </div>
  );
};

export default Logo;

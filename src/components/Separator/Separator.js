import { styles } from './Separator.styles';

const Separator = ({ style, ...rest }) => {
  return <hr style={{ ...styles.separator, ...style }} {...rest} />;
};

export default Separator;

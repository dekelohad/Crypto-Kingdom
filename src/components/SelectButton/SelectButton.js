import Button from '@mui/material/Button';
import { styles } from './SelectButton.styles';

const SelectButton = ({ children, selected, onClick, ...rest }) => {
  const active = selected ? styles.active : '';
  return (
    <Button
      onClick={onClick}
      {...rest}
      style={{ ...styles.selectbutton, ...active }}
    >
      {children}
    </Button>
  );
};

export default SelectButton;

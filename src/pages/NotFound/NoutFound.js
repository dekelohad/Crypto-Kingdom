import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components';
import { styles, StyledLoadingButton } from './NoutFound.styles';

const NoutFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <Logo />
      <h1 style={styles.title}>Oops something went wrong...</h1>
      <StyledLoadingButton
        loading={false}
        text="Go Back To Login page"
        onClick={() => {
          navigate(`/`);
        }}
      />
    </div>
  );
};

export default NoutFound;

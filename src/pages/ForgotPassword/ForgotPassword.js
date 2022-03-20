import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthState } from '../../contexts';
import * as ROUTES from '../../constants/routes';
import { ValidationsUtils } from '../../utils';
import { Separator, Input, LoadingButton, Logo, Link } from '../../components';
import { styles } from './ForgotPassword.styles';

const ForgotPassword = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const navigate = useNavigate();
  const { loading, forgotPassword, user } = AuthState();

  useEffect(() => {
    user && navigate(ROUTES.HOME);
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const { email } = data;
    await forgotPassword(email);
  };
  return (
    <>
      <Logo
        style={styles.logo}
        onClick={() => {
          navigate(ROUTES.SIGN_IN);
        }}
      />
      <div style={styles.container}>
        <div align="center">
          <h1 style={styles.title}>Can't log in?</h1>
          <p style={styles.topText}>We'll send a recovery link to</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            control={control}
            label="Email"
            placeholder="Enter your email"
            autoFocus
            style={styles.forgotPasswordInput}
            rules={{
              ...ValidationsUtils.requiredValidation('Email'),
              ...ValidationsUtils.emailValidation(),
            }}
            errors={errors.email}
          />
          <LoadingButton
            disabled={!getValues('email')}
            text={'Send recovery link'}
            loading={loading}
          />
        </form>
        <Separator />
        <div style={styles.linkContainer}>
          <Link style={styles.link} to={ROUTES.SIGN_IN}>
            Return To Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

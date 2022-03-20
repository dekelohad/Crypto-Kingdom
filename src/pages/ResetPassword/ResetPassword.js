import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthState } from '../../contexts';
import * as ROUTES from '../../constants/routes';
import { ValidationsUtils } from '../../utils';
import { Separator, Input, LoadingButton, Logo, Link } from '../../components';
import { styles } from './ResetPassword.styles';

const ResetPassword = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const navigate = useNavigate();
  const { loading, resetPassword, user } = AuthState();
  const [showPassword, setShowPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    !oobCode && navigate(ROUTES.SIGN_IN);
  }, [navigate, oobCode]);

  useEffect(() => {
    user && navigate(ROUTES.HOME);
  }, [user, navigate]);

  const onSubmit = async ({ password }) => {
    const { error } = await resetPassword(oobCode, password);
    !error && navigate(ROUTES.SIGN_IN);
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
          <h1 style={styles.title}>Reset Password</h1>
          <p style={styles.topText}>Enter your new password here</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your new password"
            type="password"
            onClick={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
            showAdornment
            rules={{
              ...ValidationsUtils.requiredValidation('Password'),
              ...ValidationsUtils.passwordValidation(),
              ...ValidationsUtils.minLengthValidation('Password', 6),
            }}
            errors={errors.password}
          />
          <LoadingButton
            disabled={!getValues('password')}
            text={'Reset Password'}
            loading={loading}
          />
        </form>
        <Separator />
        <div style={styles.linkContainer}>
          <Link style={styles.link} to={ROUTES.SIGN_IN}>
            Return to login
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

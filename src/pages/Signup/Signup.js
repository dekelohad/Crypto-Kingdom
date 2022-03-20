import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthState } from '../../contexts';
import * as ROUTES from '../../constants/routes';
import { ValidationsUtils } from '../../utils';
import { Separator, Input, LoadingButton, Logo, Link } from '../../components';
import { styles } from './Signup.styles';

const Signup = () => {
  const {
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUpWithEmailAndPassword, loading, setAlert, user } = AuthState();

  useEffect(() => {
    user && navigate(ROUTES.HOME);
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Passwords do not match',
        type: 'error',
      });
      return;
    }
    await signUpWithEmailAndPassword(email, password);
  };
  return (
    <>
      <Logo
        onClick={() => {
          navigate(ROUTES.SIGN_IN);
        }}
        style={styles.logo}
      />
      <div style={styles.container}>
        <div align="center">
          <h1 style={styles.title}>Sign Up</h1>
          <p style={styles.topText}>
            Please fill out this form to create an account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            control={control}
            label="Email"
            placeholder="Enter your email"
            style={styles.firstInput}
            autoFocus
            rules={{
              ...ValidationsUtils.requiredValidation('Email'),
              ...ValidationsUtils.emailValidation(),
            }}
            errors={errors.email}
          />
          <Input
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your password"
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

          <Input
            name="confirmPassword"
            control={control}
            label="ConfirmPassword"
            placeholder="Enter your password again"
            type="password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            showPassword={showConfirmPassword}
            showAdornment
            rules={{
              ...ValidationsUtils.requiredValidation('confirmPassword'),
              ...ValidationsUtils.passwordValidation(),
              ...ValidationsUtils.minLengthValidation('Password', 6),
            }}
            errors={errors.confirmPassword}
          />

          <LoadingButton
            disabled={
              !getValues('email') ||
              !getValues('password') ||
              !getValues('confirmPassword')
            }
            text={'Sign up'}
            loading={loading}
          />
        </form>
        <Separator style={styles.separator} />
        <div style={styles.alreadyHaveAccountContainer}>
          Already have an account?
          <Link to={ROUTES.SIGN_IN}>
            <span style={styles.alreadyHaveAccountText}> Login</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;

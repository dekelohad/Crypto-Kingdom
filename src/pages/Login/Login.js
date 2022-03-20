import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthState } from '../../contexts/AuthContext';
import * as ROUTES from '../../constants/routes';
import {
  requiredValidation,
  emailValidation,
} from '../../utils/ValidationsUtils';
import { Separator, Input, LoadingButton, Logo, Link } from '../../components';
import { styles } from './Login.styles';

const Login = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const navigate = useNavigate();
  const { loginWithEmailAndPassword, loading, user } = AuthState();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const { error } = await loginWithEmailAndPassword(email, password);
    !error && navigate(ROUTES.HOME);
  };

  useEffect(() => {
    user && navigate(ROUTES.HOME);
  }, [user, navigate]);

  return (
    <>
      <Logo />
      <div style={styles.container}>
        <div align="center">
          <h1 style={styles.title}>Log In</h1>
          <p style={styles.topText}>Enter your email and password to log in.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            control={control}
            label="Email"
            placeholder="Enter your Email"
            style={styles.firstInput}
            autoFocus
            rules={{
              ...requiredValidation('Email'),
              ...emailValidation(),
            }}
            errors={errors.email}
          />
          <Input
            name="password"
            control={control}
            label="Password"
            placeholder="Enter your Password"
            type="password"
            onClick={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
            showAdornment
            rules={{
              ...requiredValidation('Password'),
            }}
            errors={errors.password}
          />
          <LoadingButton
            disabled={!getValues('email') || !getValues('password')}
            text={'Log in'}
            loading={loading}
          />
        </form>
        <Separator />
        <div style={styles.linksContainer}>
          <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
          <Link to={ROUTES.SIGN_UP}>Create Account</Link>
        </div>
      </div>
      <div style={styles.demoAccountContainer}>
        <p>Demo Account: demo@gmail.com | demo12</p>
      </div>
    </>
  );
};

export default Login;

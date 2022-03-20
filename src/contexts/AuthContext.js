import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from 'firebase/auth';
import { auth } from '../firebase';

import { onAuthStateChanged } from 'firebase/auth';

const Auth = createContext();
const AuthContext = ({ children }) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signUpWithEmailAndPassword = async (email, password) => {
    try {
      setLoading(true);
      const userCreated = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${userCreated.user.email}`,
        type: 'success',
      });
      return userCreated;
    } catch {
      setAlert({
        open: true,
        message: `We couldn't create your account. Please try again.`,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        message: `Log In Successful. Welcome ${userCredential.user.email}`,
        type: 'success',
      });
      return { error: null };
    } catch (e) {
      setAlert({
        open: true,
        message: 'Incorrect email or password',
        type: 'error',
      });
      return { error: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      setLoading(true);
      signOut(auth);
      setAlert({
        open: true,
        message: 'Log Out Successfull',
        type: 'success',
      });
    } catch (e) {
      setAlert({
        open: true,
        message: 'Log Out unsuccessful',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setAlert({
        open: true,
        message: 'Check your inbox for instructions',
        type: 'success',
      });
    } catch (e) {
      setAlert({
        open: true,
        message: 'No users found',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (oobCode, newPassword) => {
    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, newPassword);
      setAlert({
        open: true,
        message: 'Password has been changed, you can login now.',
        type: 'success',
      });
      return { error: null };
    } catch (e) {
      setAlert({
        open: true,
        message: 'There was an error setting your password',
        type: 'error',
      });
      return { error: e };
    } finally {
      setLoading(false);
    }
  };

  return (
    <Auth.Provider
      value={{
        loading,
        alert,
        user,
        setAlert,
        signUpWithEmailAndPassword,
        loginWithEmailAndPassword,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthContext;

export const AuthState = () => {
  return useContext(Auth);
};

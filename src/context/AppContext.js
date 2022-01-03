import React, {useContext, useEffect, useReducer} from 'react';
import AppReducer, {initialState} from './AppReducer';
import {signInWithPopup} from 'firebase/auth';
import {auth, provider} from '../firebase';
import {
  FALSE_LOGGED_IN,
  GOOGLE_LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  OFF_LOADING,
  SET_LOADING,
} from '../utils/action';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const googleLogin = async () => {
    dispatch({type: FALSE_LOGGED_IN});
    dispatch({type: SET_LOADING});
    try {
      const {user} = await signInWithPopup(auth, provider);
      dispatch({type: GOOGLE_LOGIN, payload: user});
    } catch (error) {
      dispatch({type: LOGIN_ERROR, payload: error.message});
    }
  };

  const googleLogout = async () => {
    dispatch({type: SET_LOADING});
    try {
      await auth.signOut();
      dispatch({type: LOGOUT});
    } catch (error) {
      dispatch({type: LOGIN_ERROR, payload: error.message});
    }
  };

  const stayLogin = () => {
    auth.onAuthStateChanged((user) => {
      if (user === null || user.displayName === '') {
        dispatch({type: OFF_LOADING});
      }
      if (user) {
        dispatch({type: GOOGLE_LOGIN, payload: user});
      }
    });
  };

  useEffect(() => {
    stayLogin();
  }, []);

  return (
    <AppContext.Provider
      value={{...state, googleLogin, googleLogout, stayLogin}}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;

import {
  FALSE_LOGGED_IN,
  GOOGLE_LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  OFF_LOADING,
  SET_LOADING,
} from '../utils/action';

export const initialState = {
  isLoggedIn: false,
  loading: true,
  login_error: {
    state: false,
    msg: '',
  },
  user: {
    name: '',
    photo: '',
    email: '',
    id: '',
  },
};

const AppReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {...state, loading: true};

    case OFF_LOADING:
      return {...state, loading: false};

    case FALSE_LOGGED_IN:
      return {...state, isLoggedIn: false};

    case GOOGLE_LOGIN:
      const {displayName, photoURL, email, uid} = action.payload;

      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        user: {
          ...state.user,
          name: displayName,
          photo: photoURL,
          email,
          id: uid,
        },
      };

    case LOGIN_ERROR:
      return {
        ...state,
        login_error: {...state.login_error, state: true, msg: action.payload},
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        user: {...state.user, name: '', photo: '', email: ''},
      };

    default:
      return {...state};
  }
};

export default AppReducer;

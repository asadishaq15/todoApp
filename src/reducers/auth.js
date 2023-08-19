// reducers/auth.js
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  uid: null, // Add the uid field
  
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
        uid: action.payload.uid, // Set the uid when authenticated
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        isAuthenticated: false,
        uid: null, // Clear the uid when signed out
      };
    
    default:
      return state;
  }
};

export default authReducer;

// actions/auth.js
export const signIn = (credentials) => (dispatch) => {
 
  
    dispatch({ type: "SIGN_IN_SUCCESS" });
  };
  
  export const signUp = (newUser) => (dispatch) => {
   
    dispatch({ type: "SIGN_UP_SUCCESS" });
  };
  
  export const logIn = (credentials) => (dispatch) => {

    dispatch({ type: "LOGIN_SUCCESS" });
  };
  
  export const signOut = () => (dispatch) => {
   
  
    dispatch({ type: "SIGN_OUT_SUCCESS" });
  };
  
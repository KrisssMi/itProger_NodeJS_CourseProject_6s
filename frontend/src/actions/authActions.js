import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//registerUser action creator takes data and dispatch action to reducer along with payload
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:9000/auth/registration", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("http://localhost:9000/auth/login", userData)
    .then(res => {
      //save token to local storage
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({                    // позволяет отправить action в reducer, reducer - это функция которая принимает action и возвращает новый state
        type: GET_ERRORS,
        payload: err.response.data  //payload - это данные которые мы хотим отправить в reducer
      })
    );
};

export const setCurrentUser = decoded => {  //decoded - это данные которые мы получили из токена
  return {
    type: SET_CURRENT_USER,   
    payload: decoded  
  };
};


export const logoutUser = () => dispatch => {
  //удаляем токен из local storage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future requests
  setAuthToken(false);
  dispatch(setCurrentUser({})); //передаем пустой объект
};

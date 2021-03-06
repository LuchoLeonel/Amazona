import Axios from "axios";
import Cookie from 'js-cookie';
import { USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: {email, password} });
    try {
        const {data} = await Axios.post("/api/users/signin", {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
        return true;
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload: error.message});
        return false;
    }
}

const logout = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT })
    Cookie.remove("userInfo");
  }

const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: {name, email, password} });
    try {
        const {data} = await Axios.post("/api/users/register", {name, email, password});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
        return true;
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.message});
        return false;
    }
}


export { signin, logout, register };
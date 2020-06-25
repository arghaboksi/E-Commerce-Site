import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS, ADMIN_REGISTER_FAIL,
  ADMIN_LIST_REQUEST, ADMIN_LIST_SUCCESS, ADMIN_LIST_FAIL,
  USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
  ADMIN_DELETE_REQUEST, ADMIN_DELETE_SUCCESS, ADMIN_DELETE_FAIL,
  USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
  USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put("/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("/api/users/register", { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const registerAdmin = (name, email, password) => async (dispatch, getState) => {
  dispatch({ type: ADMIN_REGISTER_REQUEST, payload: { name, email, password } });
  const { userSignin: { userInfo } } = getState();
  try {
    const { data } = await Axios.post("/api/users/addadmin", { name, email, password},{
      headers: {
        'Authorization': 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_REGISTER_FAIL, payload: error.message });
  }
}

const listAdmins = () => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: ADMIN_LIST_REQUEST });
    const { data } = await Axios.get("/api/users/alladmins",{
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: ADMIN_LIST_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({ type: ADMIN_LIST_FAIL, payload: error.message });
  }
}

const listUsers = () => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await Axios.get("/api/users/allusers",{
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  }
  catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.message });
  }
}

const deleteAdmin = (adminId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: ADMIN_DELETE_REQUEST, payload: adminId });
    const { data } = await Axios.delete("/api/users/" + adminId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: ADMIN_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: ADMIN_DELETE_FAIL, payload: error.message });
  }
}

const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    const { data } = await Axios.delete("/api/users/" + userId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}
export { signin, register, logout, update, registerAdmin, listAdmins, listUsers, deleteAdmin, deleteUser };
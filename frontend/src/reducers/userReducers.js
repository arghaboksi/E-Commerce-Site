import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
  ADMIN_REGISTER_REQUEST, ADMIN_REGISTER_SUCCESS, ADMIN_REGISTER_FAIL,
  ADMIN_LIST_REQUEST, ADMIN_LIST_SUCCESS, ADMIN_LIST_FAIL,
  USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
  ADMIN_DELETE_REQUEST, ADMIN_DELETE_SUCCESS, ADMIN_DELETE_FAIL,
  USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default: return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function adminRegisterReducer(state = {}, action) {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return { loading: true };
    case ADMIN_REGISTER_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function adminListReducer(state = { admins: [] }, action) {

  switch (action.type) {
    case ADMIN_LIST_REQUEST:
      return { loading: true, admins: [] };
    case ADMIN_LIST_SUCCESS:
      return { loading: false, admins: action.payload };
    case ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

function userListReducer(state = { users: [] }, action) {

  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [] };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

function adminDeleteReducer(state = { admin: {} }, action) {

  switch (action.type) {
    case ADMIN_DELETE_REQUEST:
      return { loading: true };
    case ADMIN_DELETE_SUCCESS:
      return { loading: false, admin: action.payload, success: true };
    case ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

function userDeleteReducer(state = { user: {} }, action) {

  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state;
  }
}

export {
  userSigninReducer, userRegisterReducer, userUpdateReducer, adminRegisterReducer,
  adminListReducer, userListReducer, adminDeleteReducer, userDeleteReducer
}
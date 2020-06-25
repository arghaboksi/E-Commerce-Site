import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listUsers,
  deleteUser
} from "../actions/userActions";

function AllUsersScreen(props) {

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = userDelete;

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(listUsers());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (user) => {
    dispatch(deleteUser(user._id));
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>USERS</h3>
      </div>
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>EMAIL</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default AllUsersScreen;

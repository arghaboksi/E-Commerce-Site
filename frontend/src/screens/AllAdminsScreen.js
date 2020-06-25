import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listAdmins,
  deleteAdmin
} from "../actions/userActions";

function AllAdminsScreen(props) {

  const adminList = useSelector((state) => state.adminList);
  const { loading, admins, error } = adminList;

  const adminDelete = useSelector((state) => state.adminDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = adminDelete;

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(listAdmins());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (admin) => {
    dispatch(deleteAdmin(admin._id));
  };
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>ADMINS</h3>
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
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin._id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => deleteHandler(admin)}
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
export default AllAdminsScreen;

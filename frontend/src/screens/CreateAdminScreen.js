import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerAdmin } from "../actions/userActions";

function CreateAdminScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const adminRegister = useSelector((state) => state.adminRegister);
  const { loading, adminInfo, error } = adminRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (adminInfo) {
      props.history.push(redirect);
      window.location.reload();
    }
    return () => {
      //
    };
  }, [adminInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerAdmin(name, email, password));
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create New Admin Account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit" className="button primary">
              Register Admin
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default CreateAdminScreen;

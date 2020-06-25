import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen1";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";
import CreateAdminScreen from "./screens/CreateAdminScreen";
import AllAdminsScreen from "./screens/AllAdminsScreen";
import AllUsersScreen from "./screens/AllUsersScreen";

function App() {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const Thisyear = new Date().getFullYear();

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">My-Shopping</Link>
          </div>
          <div className="header-links">
          {cartItems.length !== 0 && <div className="badge">{cartItems.length}</div>}
            <Link className="header-link" to="/cart">
              Cart
            </Link>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="/">Admin Portal</a>
                <ul className="dropdown-content">
                  <li>
                    {/* <Link to="/orders">Orders</Link> */}
                    <Link to="/products">Products</Link>
                  </li>
                  { userInfo && userInfo.isAdmin && userInfo.isSuperAdmin && (
                      <li>
                      <Link to="/createAdmin">AddAdmin</Link>
                    </li>
                  )}
                  { userInfo && userInfo.isAdmin && userInfo.isSuperAdmin && (
                      <li>
                      <Link to="/allAdmins">Admins</Link>
                    </li>
                  )}
                  { userInfo && userInfo.isAdmin && userInfo.isSuperAdmin && (
                      <li>
                      <Link to="/allUsers">Users</Link>
                    </li>
                  )}                                    
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
            <li>
              <Link to="/category/Pants">Pants</Link>
            </li>
            <li>
              <Link to="/category/Shirts">Shirts</Link>
            </li>
            <li>
              <Link to="/category/Sarees">Sarees</Link>
            </li>
            <li>
              <Link to="/category/Mobiles">Mobiles</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            {userInfo && userInfo.isAdmin && userInfo.isSuperAdmin && (
              <Route path="/createAdmin" component={CreateAdminScreen} />
            )}
            {userInfo && userInfo.isAdmin && userInfo.isSuperAdmin && (
              <Route path="/allAdmins" component={AllAdminsScreen} />
            )}
            {userInfo && userInfo.isAdmin && userInfo.isSuperAdmin && (
              <Route path="/allUsers" component={AllUsersScreen} />
            )}
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/order/:id" component={OrderScreen} />
          </div>
        </main>
        <footer className="footer">
          &copy; 2019 - {Thisyear}. All Rights Reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

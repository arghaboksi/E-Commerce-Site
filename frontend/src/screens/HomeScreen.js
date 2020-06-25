import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
    return () => {
      //
    };
  }, [category]);

  useEffect(() => {
    dispatch(listProducts(category, searchKeyword, sortOrder, priceRange));
  }, [sortOrder]);

  useEffect(() => {
    dispatch(listProducts(category, searchKeyword, sortOrder, priceRange));
  }, [priceRange]);

  const priceRangeHandler = (event) => {
    setPriceRange(event.target.value);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder, priceRange));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          <label>Select Price Range </label>
          <select value={priceRange} onChange={priceRangeHandler}>
            <option value="">All Products</option>
            <option value="0-2000">0-2000</option>
            <option value="2000-4000">2000-4000</option>
            <option value="4000-6000">4000-6000</option>
            <option value="6000 and Above">6000 and Above</option>
          </select>
        </li>
        <li>
          Sort By{" "}
          <select value={sortOrder} onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Low-High</option>
            <option value="highest">High-Low</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
            <ul className="products">
              {products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <Link to={"/product/" + product._id}>
                      <img
                        className="product-image"
                        src={product.image}
                        alt="product"
                      />
                    </Link>
                    <div className="product-name">
                      <Link to={"/product/" + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">RS. {product.price}</div>
                    {/* <div className="product-rating">{product.rating} Stars ({product.numReiews} Reviews)</div> */}
                  </div>
                </li>
              ))}
            </ul>
          )}
    </>
  );
}
export default HomeScreen;

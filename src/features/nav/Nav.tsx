import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNav } from "./navSlice";
import styles from "./Nav.module.css";
import { NavMenu } from "../navMenu/NavMenu";
import { Link } from "react-router-dom";
import { Search } from "../search/Search";

export function Nav() {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.logo_container}>
        <span className={styles.logo}></span>
      </Link>
      <ul className={styles.product_container}>Products</ul>
      <div className={styles.search_container}>
        <Search></Search>
      </div>
      <div className={styles.menu_container}>
        <NavMenu></NavMenu>
      </div>
    </div>
  );
}

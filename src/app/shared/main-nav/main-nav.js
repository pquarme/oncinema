import React from "react";
import "./main-nav.css";
import { NavLink } from "react-router-dom";

const Nav = props => {
  const genres = ["action", "romance", "comedy", "horror", "drama"];
  const list = genres.map((genre, index) => (
    <li key={index} className={genre}>
      <NavLink to={`/${genre}`}>
        <p>{genre}</p>
      </NavLink>
    </li>
  ));

  return <ul className="nav">{list}</ul>;
};

export default Nav;

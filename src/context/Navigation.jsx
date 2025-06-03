import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-title">EZTechMovie</div>
      <div className="nav-icons">
        <NavLink to="/" className="nav-item">
          <img src="/assets/star.svg" alt="Home" />
        </NavLink>
        <NavLink to="/movies" className="nav-item">
          <img src="/assets/tv.svg" alt="Movies" />
        </NavLink>
        <NavLink to="/cart" className="nav-item">
          <img src="/assets/cart.svg" alt="Cart" />
        </NavLink>
        <NavLink to="/about" className="nav-item">
          <img src="/assets/person.svg" alt="About" />
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;

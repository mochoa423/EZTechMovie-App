import React, { useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "./CartContext";
import LoginButton from "./LoginButton";
import ProfileDropdown from "./ProfileDropdown";

const Navigation = ({ user, setUser }) => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="nav-wrapper">
      <nav className="nav-bar">
        {/* App title stays on the far left */}
        <div className="nav-title">EZTechMovie</div>

        {/* Navigation icons with login/profile on far left of icons group */}
        <div className="nav-icons">
          {/* Login/Profile comes first in icons group */}
          {user ? (
            <>
              <img
                ref={anchorRef}
                src={user.picture || "/assets/default_profile.png"}
                alt="Profile"
                className="profile-pic clickable"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <ProfileDropdown
                  user={user}
                  onLogout={handleLogout}
                  onClose={() => setDropdownOpen(false)}
                  anchorRef={anchorRef}
                />
              )}
            </>
          ) : (
            <LoginButton />
          )}

          {/* App navigation icons */}
          <NavLink to="/" className="nav-item">
            <img src="/assets/star.svg" alt="Home" />
          </NavLink>
          <NavLink to="/movies" className="nav-item">
            <img src="/assets/tv.svg" alt="Movies" />
          </NavLink>
          <NavLink to="/cart" className="nav-item">
            <div className="nav-cart-icon">
              <img src="/assets/cart.svg" alt="Cart" />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </div>
          </NavLink>
          <NavLink to="/about" className="nav-item">
            <img src="/assets/person.svg" alt="About" />
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;

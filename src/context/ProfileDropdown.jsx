import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const ProfileDropdown = ({ user, onLogout, onClose, anchorRef }) => {
  const menuRef = useRef(null);

  // Position dropdown under the anchor (profile pic)
  useEffect(() => {
    const anchor = anchorRef.current;
    const menu = menuRef.current;

    if (anchor && menu) {
      const rect = anchor.getBoundingClientRect();
      menu.style.position = "absolute";
      menu.style.top = `${rect.bottom + 8}px`;
      menu.style.left = `${rect.right - 160}px`; // aligns right
    }

    const handleClickOutside = (e) => {
      if (menu && !menu.contains(e.target) && !anchor.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [anchorRef, onClose]);

  return ReactDOM.createPortal(
    <div ref={menuRef} className="dropdown-menu">
      <div className="dropdown-name">{user.name}</div>
      <button onClick={onLogout} className="logout-btn">Logout</button>
    </div>,
    document.body
  );
};

export default ProfileDropdown;

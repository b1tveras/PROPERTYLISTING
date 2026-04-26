import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        <div className="logo-icon">🏠</div>
        PropertyHub
      </Link>

      <div className="navbar-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/properties/new" className="nav-link">+ Add Property</Link>
      </div>

      <div className="nav-user">
        {user && (
          <>
            <div className="nav-user-avatar">{getInitials(user.name)}</div>
            <span className="nav-user-name">{user.name}</span>
          </>
        )}
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

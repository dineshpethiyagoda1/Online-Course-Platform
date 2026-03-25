import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        Skill<span>Gro</span>
      </Link>
      <div className={styles.links}>
        <NavLink to="/"            end   className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
        <NavLink to="/about"            className={({ isActive }) => isActive ? styles.active : ''}>About</NavLink>
        <NavLink to="/courses"          className={({ isActive }) => isActive ? styles.active : ''}>Courses</NavLink>
        <NavLink to="/instructors"      className={({ isActive }) => isActive ? styles.active : ''}>Instructors</NavLink>
        <NavLink to="/events"           className={({ isActive }) => isActive ? styles.active : ''}>Events</NavLink>
        <NavLink to="/blog"             className={({ isActive }) => isActive ? styles.active : ''}>Blog</NavLink>
        <NavLink to="/shop"             className={({ isActive }) => isActive ? styles.active : ''}>Shop</NavLink>
      </div>
      <div className={styles.right}>
        {user ? (
          <>
            <span className={styles.welcome}>Hi, {user.firstName}</span>
            <button className="btn btn-ghost" onClick={handleLogout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/login"  className="btn btn-ghost">Log In</Link>
            <Link to="/signup" className="btn btn-lime">Get Started ↗</Link>
          </>
        )}
      </div>
    </nav>
  );
}


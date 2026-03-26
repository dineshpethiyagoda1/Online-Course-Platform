import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => {
        if (c <= 1) { clearInterval(interval); navigate('/'); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const quickLinks = [
    { href:'/courses',     icon:'📚', label:'All Courses' },
    { href:'/instructors', icon:'👨‍🏫', label:'Instructors' },
    { href:'/events',      icon:'🗓', label:'Events' },
    { href:'/blog',        icon:'✍️', label:'Blog' },
    { href:'/contact',     icon:'💬', label:'Contact' },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.orb1} /> <div className={styles.orb2} />
      <div className={styles.grid} />
      <div className={styles.content}>
        <span className={styles.icon}>🔭</span>
        <div className={styles.num}>404</div>
        <div className={styles.chip}>Page Not Found</div>
        <h1 className={styles.title}>Sorry! This Page Is<br /><em>Not Available!</em></h1>
        <p className={styles.sub}>The page you're looking for has been moved, deleted, or never existed. Let's get you back on track.</p>
        <div className={styles.actions}>
          <Link to="/" className="btn btn-lime">Go to Homepage ↗</Link>
          <Link to="/courses" className="btn btn-ghost">Browse Courses</Link>
        </div>
        <div className={styles.quickLinks}>
          {quickLinks.map(l => (
            <Link key={l.href} to={l.href} className={styles.qlLink}>
              <span>{l.icon}</span> {l.label}
            </Link>
          ))}
        </div>
        <div className={styles.redirectBar}>
          <div className={styles.rbLabel}>Redirecting to home in <strong>{count}</strong>s…</div>
          <div className={styles.rbTrack}><div className={styles.rbFill} style={{width:`${count*10}%`}} /></div>
        </div>
      </div>
    </div>
  );
}


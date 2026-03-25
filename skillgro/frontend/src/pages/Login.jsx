import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]   = useState({ email:'', password:'' });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) return setError('Please fill all fields');
    setLoading(true); setError('');
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      {/* Left panel */}
      <div className={styles.left}>
        <div className={styles.leftBefore} />
        <div className={styles.leftAfter} />
        <div className={styles.leftContent}>
          <div className={styles.chip}><span className={styles.chipDot} />Welcome Back</div>
          <h1 className={styles.leftTitle}>Ready to<br />keep <em>Learning?</em></h1>
          <p className={styles.leftSub}>Log back in and pick up right where you left off. Your courses, certificates, and progress are all waiting for you.</p>

          <div className={styles.testCard}>
            <p className={styles.testText}>SkillGro helped me land my first dev job. The courses are incredible and I love being able to learn at my own pace.</p>
            <div className={styles.testFooter}>
              <div className={styles.testAv} style={{background:'var(--lime)'}}>W</div>
              <div><div className={styles.testName}>Wade Warren</div><div className={styles.testRole}>Frontend Developer</div></div>
              <div className={styles.testStars}>★★★★★</div>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}><div className={styles.statNum} style={{color:'var(--lime)'}}>36K+</div><div className={styles.statLabel}>Students</div></div>
            <div className={styles.statDiv} />
            <div className={styles.stat}><div className={styles.statNum} style={{color:'var(--lime)'}}>450+</div><div className={styles.statLabel}>Courses</div></div>
            <div className={styles.statDiv} />
            <div className={styles.stat}><div className={styles.statNum} style={{color:'var(--lime)'}}>99%</div><div className={styles.statLabel}>Graduation</div></div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className={styles.right}>
        <div className={styles.formBox}>
          <h2 className={styles.formTitle}>Log <em>In</em></h2>
          <p className={styles.formSub}>Hey there! Ready to log in? Just enter your details below.</p>

          <button className={styles.socialBtn}>G &nbsp; Continue with Google</button>
          <button className={styles.socialBtn}>f &nbsp; Continue with Facebook</button>

          <div className={styles.divider}><div className={styles.divLine}/><span className={styles.divText}>or</span><div className={styles.divLine}/></div>

          {error && <div className={styles.error}>{error}</div>}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className={styles.pwWrap}>
              <input className="form-input" style={{paddingRight:44}} type={showPw?'text':'password'} placeholder="Enter your password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} onKeyDown={e=>e.key==='Enter'&&handleSubmit()} />
              <span className={styles.pwToggle} onClick={()=>setShowPw(!showPw)}>{showPw?'🙈':'👁'}</span>
            </div>
          </div>

          <div className={styles.formRow}>
            <label className={styles.remember}><input type="checkbox" style={{accentColor:'var(--lime)'}} /> <span>Remember me</span></label>
            <button className={styles.forgotLink}>Forgot Password?</button>
          </div>

          <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In ↗'}
          </button>

          <div className={styles.formFooter}>Don't have an account? <Link to="/signup">Sign Up</Link></div>
        </div>
      </div>
    </div>
  );
}


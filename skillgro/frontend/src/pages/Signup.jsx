import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

const FEATURES = [
  { icon:'🎓', bg:'rgba(200,255,0,0.1)',   title:'450+ Expert Courses',         sub:'Across design, dev, marketing & more' },
  { icon:'🏆', bg:'rgba(0,212,255,0.1)',    title:'Recognized Certificates',      sub:'Shareable directly to LinkedIn' },
  { icon:'📱', bg:'rgba(123,92,240,0.1)',   title:'Learn Anywhere, Anytime',      sub:'Mobile & desktop, online & offline' },
  { icon:'👨‍🏫', bg:'rgba(240,92,138,0.1)', title:'World-Class Instructors',      sub:'Real industry experts, not just teachers' },
];

export default function Signup() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]     = useState({ firstName:'', lastName:'', email:'', password:'' });
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const pwStrength = () => {
    const p = form.password;
    if (!p) return { w:0, label:'', color:'transparent' };
    if (p.length < 6)  return { w:25, label:'Too short', color:'var(--pink)' };
    if (p.length < 8)  return { w:50, label:'Weak', color:'var(--orange)' };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { w:100, label:'Strong 💪', color:'var(--lime)' };
    return { w:75, label:'Good', color:'var(--cyan)' };
  };
  const { w, label, color } = pwStrength();

  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) return setError('Please fill all fields');
    if (!agreed) return setError('Please agree to the terms');
    setLoading(true); setError('');
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrap}>
      {/* Left */}
      <div className={styles.left}>
        <div className={styles.leftBefore} />
        <div className={styles.leftAfter} />
        <div className={styles.leftContent}>
          <div className={styles.chip}><span className={styles.chipDot} />Join 36,000+ Learners</div>
          <h1 className={styles.leftTitle}>Start Your<br /><em>Learning Journey</em></h1>
          <p className={styles.leftSub}>Create your free account today and get instant access to hundreds of expert-led courses across every discipline.</p>

          <div className={styles.featList}>
            {FEATURES.map(f => (
              <div key={f.title} className={styles.featItem}>
                <div className={styles.featIcon} style={{ background: f.bg }}>{f.icon}</div>
                <div><div className={styles.featTitle}>{f.title}</div><div className={styles.featSub}>{f.sub}</div></div>
              </div>
            ))}
          </div>

          <div className={styles.trustRow}>
            <div className={styles.trustAvatars}>
              {[['W','var(--lime)'],['J','var(--violet2)'],['G','var(--cyan)'],['R','var(--pink)']].map(([l,bg])=>(
                <div key={l} className={styles.trustAv} style={{background:bg}}>{l}</div>
              ))}
            </div>
            <div className={styles.trustText}>Join <strong style={{color:'var(--text)'}}>36,000+</strong> students worldwide</div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className={styles.right}>
        <div className={styles.formBox}>
          <h2 className={styles.formTitle}>Create <em>Account</em></h2>
          <p className={styles.formSub}>Start your learning journey today. It's free forever — no credit card required.</p>

          <button className={styles.socialBtn}>G &nbsp; Sign up with Google</button>
          <button className={styles.socialBtn}>f &nbsp; Sign up with Facebook</button>

          <div className={styles.divider}><div className={styles.divLine}/><span className={styles.divText}>or</span><div className={styles.divLine}/></div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formRow2}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-input" type="text" placeholder="John" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-input" type="text" placeholder="Doe" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className={styles.pwWrap}>
              <input className="form-input" style={{paddingRight:44}} type={showPw?'text':'password'} placeholder="Create a strong password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
              <span className={styles.pwToggle} onClick={()=>setShowPw(!showPw)}>{showPw?'🙈':'👁'}</span>
            </div>
            {form.password && (
              <div className={styles.strengthBar}>
                <div className={styles.strengthTrack}><div className={styles.strengthFill} style={{width:`${w}%`,background:color}} /></div>
                <div className={styles.strengthLabel}>{label}</div>
              </div>
            )}
          </div>

          <div className={styles.termsRow}>
            <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} />
            <span>I agree to the <button>Terms of Service</button> and <button>Privacy Policy</button></span>
          </div>

          <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account ↗'}
          </button>

          <div className={styles.formFooter}>Already have an account? <Link to="/login">Log In</Link></div>
        </div>
      </div>
    </div>
  );
}


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../utils/api';
import { useReveal } from '../hooks/useReveal';
import CourseCard from '../components/CourseCard';
import styles from './Home.module.css';

const CATEGORIES = [
  { icon:'fas fa-palette', name:'Art & Design',    count:8  },
  { icon:'fas fa-briefcase', name:'Business',        count:12 },
  { icon:'fas fa-chart-bar', name:'Data Science',    count:7  },
  { icon:'fas fa-laptop-code', name:'Development',     count:10 },
  { icon:'fas fa-dollar-sign', name:'Finance',         count:8  },
  { icon:'fas fa-dumbbell', name:'Health & Fitness',count:8  },
  { icon:'fas fa-leaf', name:'Lifestyle',       count:9  },
  { icon:'fas fa-bullhorn', name:'Marketing',       count:11 },
];

const MARQUEE_ITEMS = ['Web Development','UI / UX Design','Data Science','Digital Marketing','Finance & Investing','Machine Learning','Graphic Design','Business Strategy'];

const TESTIMONIALS = [
  { quote:'SkillGro completely redefined how I think about learning. The courses are brilliantly structured and the instructors genuinely care about your progress.', name:'Wade Warren', role:'Frontend Developer', av:'W', color:'var(--lime)' },
  { quote:'I earned my first real certificate in 3 weeks. Flexible schedule, world-class content — everything I needed to level up while working full time.', name:'Jenny Wilson', role:'UX Designer', av:'J', color:'var(--violet2)' },
  { quote:'From zero JavaScript to landing my first dev job in just four months. The instructors here are actual industry experts, not just teachers.', name:'Guy Hawkins', role:'Full-Stack Developer', av:'G', color:'var(--cyan)' },
];

export default function Home() {
  const [courses, setCourses]     = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const featureRef   = useReveal();
  const catsRef      = useReveal();
  const coursesRef   = useReveal();
  const instrRef     = useReveal();
  const testiRef     = useReveal();
  const ctaRef       = useReveal();

  useEffect(() => {
    getCourses({ limit: 6 }).then(r => setCourses(r.data.courses)).catch(() => {});
  }, []);

  const tabs = ['All','Design','Development','Marketing','Finance'];

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={`${styles.orb} ${styles.orb1}`} />
          <div className={`${styles.orb} ${styles.orb2}`} />
          <div className={`${styles.orb} ${styles.orb3}`} />
          <div className={styles.gridLines} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>36,000+ Students Already Enrolled</div>
          <h1 className={styles.heroH1}>
            <span className={styles.line1}>Shape Your</span>
            <span className={styles.line2}>Future</span>
            <span className={styles.line3}>Today.</span>
            <span className={styles.lineSub}>Access thousands of expert-led courses across design, development, marketing & more. Learn at your pace, on your terms — and earn certificates that matter.</span>
          </h1>
          <div className={styles.heroBottom}>
            <div className={styles.heroActions}>
              <Link to="/courses" className="btn btn-lime">Explore Courses ↗</Link>
              <button className="btn btn-ghost">▶ Watch Demo</button>
            </div>
            <div className={styles.heroDivider} />
            <div className={styles.heroStats}>
              {[['36K+','Students'],['99%','Graduation'],['450+','Courses']].map(([n,l])=>(
                <div key={l} className={styles.hstat}>
                  <div className={styles.hstatNum}>{n}</div>
                  <div className={styles.hstatLabel}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Floating cards */}
        <div className={styles.heroFloats}>
          {[
            { icon:'fas fa-bolt', name:'JavaScript Mastery',    author:'David Millar', price:'$29', badge:'Hot!', bg:'rgba(123,92,240,0.2)' },
            { icon:'fas fa-palette', name:'UI/UX Design Pro',      author:'Robert Fox',   price:'$18', badge:'New',  bg:'rgba(0,212,255,0.15)' },
            { icon:'fas fa-chart-bar', name:'Data Science Bootcamp', author:'Jenny Wilson', price:'$15', badge:'Sale', bg:'rgba(240,92,138,0.15)'},
          ].map(c => (
            <div key={c.name} className={styles.floatCard}>
              <div className={styles.fcTop}>
                <div className={styles.fcIcon} style={{ background: c.bg }}><i className={c.icon}></i></div>
                <div><div className={styles.fcName}>{c.name}</div><div className={styles.fcAuthor}>{c.author}</div></div>
              </div>
              <div className={styles.fcBottom}>
                <div className={styles.fcPrice}>{c.price}</div>
                <span className={`cc-badge ${c.badge==='Hot!'?'badge-hot':c.badge==='New'?'badge-new':'badge-sale'}`}>{c.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeInner}>
          {[...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item,i) => (
            <div key={i} className={styles.mi}>
              <span className={styles.miSep} />
              <span className={styles.miText}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURE BAND ── */}
      <div className={`${styles.featureBand} reveal`} ref={featureRef}>
        {[['36K','Enrolled Students'],['450+','Expert Courses'],['99%','Graduation Rate'],['25K','Certificates Awarded']].map(([n,l],i,arr) => (
          <>
            <div key={l} className={styles.fbItem}>
              <div className={styles.fbNum}>{n}</div>
              <div className={styles.fbLabel}>{l}</div>
            </div>
            {i < arr.length-1 && <div key={`d${i}`} className={styles.fbDiv} />}
          </>
        ))}
      </div>

      {/* ── CATEGORIES ── */}
      <section className={`${styles.categories} reveal`} ref={catsRef}>
        <div className="sec-header">
          <div>
            <div className="sec-chip"><em><i className="fas fa-sparkles"></i></em> Browse by Topic</div>
            <h2 className="sec-title">Top Categories<br />We Have</h2>
          </div>
          <button className="btn btn-ghost">All Categories →</button>
        </div>
        <div className={styles.cats}>
          {CATEGORIES.map(cat => (
            <Link key={cat.name} to={`/courses?category=${cat.name}`} className={styles.cat}>
              <span className={styles.catEmoji}><i className={cat.icon}></i></span>
              <div className={styles.catName}>{cat.name}</div>
              <div className={styles.catCount}>{cat.count} courses</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className={`${styles.coursesSection} reveal`} ref={coursesRef}>
        <div className="sec-header">
          <div>
            <div className="sec-chip"><em><i className="fas fa-sparkles"></i></em> What We Offer</div>
            <h2 className="sec-title">Explore Our World's<br />Best Courses</h2>
          </div>
          <Link to="/courses" className="btn btn-ghost">View All Courses →</Link>
        </div>
        <div className={styles.coursesTabs}>
          {tabs.map(t => (
            <button key={t} className={`${styles.ctab} ${activeTab===t?styles.ctabActive:''}`} onClick={()=>setActiveTab(t)}>{t}</button>
          ))}
        </div>
        <div className={styles.cg}>
          {courses.length > 0
            ? courses.map((c,i) => <CourseCard key={c._id} course={c} index={i} />)
            : Array.from({length:6},(_,i) => <FallbackCourseCard key={i} index={i} />)
          }
        </div>
      </section>

      {/* ── INSTRUCTORS PREVIEW ── */}
      <section className={`${styles.instructors} reveal`} ref={instrRef}>
        <div className={styles.instrBg} />
        <div className="sec-header">
          <div>
            <div className="sec-chip"><em><i className="fas fa-sparkles"></i></em> Our Team</div>
            <h2 className="sec-title">Top Class & Expert<br />Instructors</h2>
            <p className="sec-sub" style={{marginTop:12}}>Learn directly from world-class educators with proven results and real experience.</p>
          </div>
          <Link to="/instructors" className="btn btn-ghost">See All →</Link>
        </div>
        <div className={styles.ig}>
          {[
            { initials:'RF', name:'Robert Fox',   role:'UX Design Lead',    rating:'4.8', students:'2.1K', courses:12, bg:'linear-gradient(135deg,var(--violet2),#c0a0ff)'},
            { initials:'DM', name:'David Millar', role:'Web Development',   rating:'4.9', students:'3.5K', courses:18, bg:'linear-gradient(135deg,var(--cyan),#80eeff)'},
            { initials:'JW', name:'Jenny Wilson', role:'Graphic Design',    rating:'4.7', students:'1.8K', courses:9,  bg:'linear-gradient(135deg,var(--lime),#e0ff80)'},
            { initials:'WW', name:'Wade Warren',  role:'Digital Marketing', rating:'4.5', students:'2.6K', courses:14, bg:'linear-gradient(135deg,var(--pink),#f090b0)'},
          ].map(instr => (
            <div key={instr.initials} className={styles.ic}>
              <div className={styles.icAv} style={{ background: instr.bg }}>{instr.initials}</div>
              <div className={styles.icName}>{instr.name}</div>
              <div className={styles.icRole}>{instr.role}</div>
              <div className={styles.icRow}>
                {[[instr.rating,'Rating'],[instr.students,'Students'],[instr.courses,'Courses']].map(([n,l])=>(
                  <div key={l} className={styles.icS}><div className={styles.icSn}>{n}</div><div className={styles.icSl}>{l}</div></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className={`${styles.testimonials} reveal`} ref={testiRef}>
        <div className="sec-header">
          <div>
            <div className="sec-chip"><em><i className="fas fa-sparkles"></i></em> Student Reviews</div>
            <h2 className="sec-title">What Students Say<br />About SkillGro</h2>
          </div>
        </div>
        <div className={styles.tg}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className={styles.tc}>
              <p className={styles.tcQuote}>{t.quote}</p>
              <div className={styles.tcFooter}>
                <div className={styles.tcAv} style={{ background: t.color }}>{t.av}</div>
                <div><div className={styles.tcName}>{t.name}</div><div className={styles.tcRole}>{t.role}</div></div>
                <div className={styles.tcStars}>★★★★★</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div className={`${styles.ctaBand} reveal`} ref={ctaRef}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Start Your Learning<br /><em>Journey</em> Today</h2>
          <p className={styles.ctaSub}>Join thousands of learners who've transformed their careers with SkillGro's expert-led courses.</p>
        </div>
        <div className={styles.ctaRight}>
          <div className={styles.nlRow}>
            <input className={styles.nlIn} type="email" placeholder="Enter your email…" />
            <button className="btn btn-lime">Subscribe →</button>
          </div>
          <div className={styles.nlNote}>No spam, ever. Unsubscribe anytime.</div>
        </div>
      </div>
    </>
  );
}

/* Static fallback cards when API data isn't loaded */
const FALLBACK = [
  { emoji:'⚡', category:'Development', badge:'Hot!', title:'Learning JavaScript With Imagination', author:'David Millar', av:'D', rating:4.8, lessons:12, duration:'11h 20m', price:29, originalPrice:49 },
  { emoji:'🎨', category:'Design',      badge:'New',  title:'The Complete Graphic Design for Beginners', author:'Jenny Wilson', av:'J', rating:4.5, lessons:22, duration:'70h 45m', price:19, originalPrice:39 },
  { emoji:'📣', category:'Marketing',   badge:'Sale', title:'Learning Digital Marketing on Facebook', author:'Wade Warren', av:'W', rating:4.3, lessons:18, duration:'18h 20m', price:15, originalPrice:29 },
  { emoji:'💰', category:'Finance',     badge:'',    title:'Financial Analyst Training & Investing', author:'Robert Fox', av:'R', rating:4.8, lessons:60, duration:'18h 20m', price:24, originalPrice:null },
  { emoji:'📐', category:'Design',      badge:'Hot!', title:'Get Started With UI Design & Tips', author:'Guy Hawkins', av:'G', rating:5.0, lessons:8, duration:'11h 20m', price:19, originalPrice:32 },
  { emoji:'🧮', category:'Mathematics', badge:'',    title:'Master the Fundamentals of Math', author:'Sawpawlo Mark', av:'S', rating:4.7, lessons:22, duration:'70h 45m', price:12, originalPrice:null },
];
const thumbCls = ['ct1','ct2','ct3','ct4','ct5','ct6'];
const avCls    = ['av1','av2','av3','av4','av5','av6'];

function FallbackCourseCard({ index }) {
  const c = FALLBACK[index];
  const badgeClass = c.badge==='Hot!'?'badge-hot':c.badge==='Sale'?'badge-sale':c.badge==='New'?'badge-new':'';
  return (
    <div className="cc">
      <div className={`cc-thumb ${thumbCls[index]}`}>
        <span style={{position:'relative',zIndex:1}}>{c.emoji}</span>
        <span className="cc-tag">{c.category}</span>
        {c.badge && <span className={`cc-badge ${badgeClass}`}>{c.badge}</span>}
      </div>
      <div className="cc-body">
        <div className="cc-author-row">
          <div className={`av ${avCls[index]}`}>{c.av}</div>
          <span className="cc-author-name">{c.author}</span>
        </div>
        <div className="cc-title">{c.title}</div>
        <div className="cc-meta">
          <span><span className="cc-stars">★★★★★</span> {c.rating}</span>
          <span>📖 {c.lessons} lessons</span>
          <span>⏱ {c.duration}</span>
        </div>
        <div className="cc-footer">
          <div>
            <span className="cc-price">${c.price}</span>
            {c.originalPrice && <span className="cc-price-old">${c.originalPrice}</span>}
          </div>
          <span className="cc-cta">Enroll Now</span>
        </div>
      </div>
    </div>
  );
}


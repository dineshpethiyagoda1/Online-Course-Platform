import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';
import styles from './About.module.css';

const TEAM = [
  { initials:'RF', name:'Robert Fox',    role:'UX Design Lead',     bg:'linear-gradient(135deg,var(--violet2),#c0a0ff)' },
  { initials:'DM', name:'David Millar',  role:'Web Development',    bg:'linear-gradient(135deg,var(--cyan),#80eeff)' },
  { initials:'JW', name:'Jenny Wilson',  role:'Graphic Design',     bg:'linear-gradient(135deg,var(--lime),#e0ff80)' },
  { initials:'WW', name:'Wade Warren',   role:'Digital Marketing',  bg:'linear-gradient(135deg,var(--pink),#f090b0)' },
];

const VALUES = [
  { icon:'fas fa-bullseye', title:'Mission-Driven',   desc:'Everything we build is focused on one goal: helping people unlock their full potential through education.' },
  { icon:'fas fa-globe', title:'Globally Inclusive',desc:'We build for learners everywhere — providing world-class education regardless of geography or background.' },
  { icon:'fas fa-lightbulb', title:'Always Innovating', desc:'We stay ahead of the curve, continuously updating our platform and curriculum with the latest industry knowledge.' },
  { icon:'fas fa-handshake', title:'Community First',   desc:'Learning is better together. We foster a community where students, instructors, and mentors grow side by side.' },
  { icon:'fas fa-trophy', title:'Quality Obsessed',  desc:'Every course is rigorously reviewed before publishing. We hold our content to the highest professional standards.' },
  { icon:'fas fa-infinity', title:'Lifelong Learning', desc:'Education doesn\'t stop at graduation. We\'re with our learners at every stage of their career and personal growth.' },
];

const MILESTONES = [
  { year:'2010', title:'SkillGro Founded', desc:'Started with just 10 courses and a vision to democratize high-quality education.' },
  { year:'2013', title:'10,000 Students',  desc:'Hit a major milestone — our platform proved people wanted flexible, expert-led learning.' },
  { year:'2016', title:'Global Expansion', desc:'Expanded to 40+ countries and launched full multi-language support.' },
  { year:'2019', title:'Mobile App Launch',desc:'Released iOS and Android apps, enabling truly on-the-go learning for millions.' },
  { year:'2022', title:'AI-Powered Tools', desc:'Integrated AI-assisted learning paths, smart quizzes, and personalised recommendations.' },
  { year:'2024', title:'36,000+ Learners', desc:'Today, over 36,000 students trust SkillGro to help them shape their future.' },
];

const PARTNERS = ['Google','Microsoft','Adobe','Figma','Notion','Stripe','Vercel','GitHub'];

export default function About() {
  const missionRef    = useReveal();
  const valuesRef     = useReveal();
  const timelineRef   = useReveal();
  const teamRef       = useReveal();
  const partnersRef   = useReveal();
  const ctaRef        = useReveal();

  return (
    <>
      {/* ── PAGE HERO ── */}
      <div className={styles.hero}>
        <div className={styles.heroOrb1} /><div className={styles.heroOrb2} />
        <div className={styles.heroGrid} />
        <div className={styles.heroContent}>
          <div className="breadcrumb" style={{position:'relative',zIndex:2}}>
            <Link to="/">Home</Link> › <span className="current">About</span>
          </div>
          <div className={styles.heroChip}><span className={styles.chipDot} />Our Story</div>
          <h1 className={styles.heroTitle}>
            We're on a Mission to<br /><em>Empower Every Learner</em>
          </h1>
          <p className={styles.heroSub}>
            Founded in 2010, SkillGro has grown from a small online library into a globally trusted platform
            serving 36,000+ students across 40+ countries — with no signs of slowing down.
          </p>
          <div className={styles.heroStats}>
            {[['36K+','Students Worldwide'],['450+','Expert Courses'],['40+','Countries'],['99%','Graduation Rate']].map(([n,l])=>(
              <div key={l} className={styles.heroStat}>
                <div className={styles.heroStatNum}>{n}</div>
                <div className={styles.heroStatLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MISSION ── */}
      <section className={`${styles.missionSection} reveal`} ref={missionRef}>
        <div className={styles.missionGrid}>
          <div className={styles.missionLeft}>
            <div className="sec-chip"><em>✦</em> Who We Are</div>
            <h2 className="sec-title">Learning That<br /><em style={{fontStyle:'italic',color:'var(--lime)'}}>Actually Works</em></h2>
            <p className={styles.missionText}>
              SkillGro was built on a simple belief: that quality education should be accessible to everyone,
              everywhere. We partner with the world's best instructors to create structured, practical courses
              that produce real, career-changing outcomes.
            </p>
            <p className={styles.missionText}>
              Unlike other platforms, we don't just upload content and hope for the best. Every course goes
              through a rigorous editorial process. Every instructor is vetted. Every lesson is designed with
              the learner's outcome in mind.
            </p>
            <div className={styles.missionActions}>
              <Link to="/courses" className="btn btn-lime">Explore Courses ↗</Link>
              <Link to="/contact" className="btn btn-ghost">Get In Touch</Link>
            </div>
          </div>
          <div className={styles.missionRight}>
            <div className={styles.missionCard}>
              <div className={styles.missionCardIcon}>🎓</div>
              <div className={styles.missionCardTitle}>Our Vision</div>
              <p className={styles.missionCardText}>To become the world's most trusted learning platform — where every person has the tools, support, and community to achieve mastery.</p>
            </div>
            <div className={styles.missionCard} style={{borderColor:'rgba(200,255,0,0.2)'}}>
              <div className={styles.missionCardIcon}>🚀</div>
              <div className={styles.missionCardTitle}>Our Mission</div>
              <p className={styles.missionCardText}>To connect ambitious learners with world-class instructors and create an environment where skills become careers and curiosity becomes expertise.</p>
            </div>
            <div className={styles.missionFloatBadge}>
              <span style={{fontSize:24}}>⭐</span>
              <div>
                <div style={{fontFamily:'Fraunces,serif',fontWeight:700,fontSize:18,color:'var(--text)'}}>4.9 / 5.0</div>
                <div style={{fontSize:11,color:'var(--muted)'}}>Average Course Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className={`${styles.valuesSection} reveal`} ref={valuesRef}>
        <div className={styles.valuesHeader}>
          <div className="sec-chip"><em><i className="fas fa-sparkles"></i></em> What Drives Us</div>
          <h2 className="sec-title">Our Core <em style={{fontStyle:'italic',color:'var(--lime)'}}>Values</em></h2>
          <p className="sec-sub">The principles that guide every decision we make — from product design to instructor selection.</p>
        </div>
        <div className={styles.valuesGrid}>
          {VALUES.map((v,i) => (
            <div key={v.title} className={styles.valueCard}>
              <div className={styles.valueIcon}><i className={v.icon}></i></div>
              <div className={styles.valueTitle}>{v.title}</div>
              <p className={styles.valueDesc}>{v.desc}</p>
              <div className={styles.valueNum}>{String(i+1).padStart(2,'0')}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className={`${styles.timelineSection} reveal`} ref={timelineRef}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <div className="sec-chip" style={{display:'inline-flex'}}><em><i className="fas fa-sparkles"></i></em> Our Journey</div>
          <h2 className="sec-title">14 Years of <em style={{fontStyle:'italic',color:'var(--lime)'}}>Growth</em></h2>
        </div>
        <div className={styles.timeline}>
          {MILESTONES.map((m,i) => (
            <div key={m.year} className={`${styles.timelineItem} ${i%2===0?styles.timelineLeft:styles.timelineRight}`}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineYear}>{m.year}</div>
                <div className={styles.timelineTitle}>{m.title}</div>
                <p className={styles.timelineDesc}>{m.desc}</p>
              </div>
              <div className={styles.timelineDot} />
            </div>
          ))}
          <div className={styles.timelineLine} />
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className={`${styles.teamSection} reveal`} ref={teamRef}>
        <div className="sec-header">
          <div>
            <div className="sec-chip"><em>✦</em> The People</div>
            <h2 className="sec-title">Meet the Team<br />Behind <em style={{fontStyle:'italic',color:'var(--lime)'}}>SkillGro</em></h2>
          </div>
          <Link to="/instructors" className="btn btn-ghost">All Instructors →</Link>
        </div>
        <div className={styles.teamGrid}>
          {TEAM.map(p => (
            <div key={p.name} className={styles.teamCard}>
              <div className={styles.teamAv} style={{background:p.bg}}>{p.initials}</div>
              <div className={styles.teamName}>{p.name}</div>
              <div className={styles.teamRole}>{p.role}</div>
              <div className={styles.teamSocials}>
                <button className={styles.socialIcon}>𝕏</button>
                <button className={styles.socialIcon}>in</button>
                <button className={styles.socialIcon}>🌐</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className={`${styles.partnersSection} reveal`} ref={partnersRef}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <div className="sec-chip" style={{display:'inline-flex'}}><em>✦</em> Trusted By</div>
          <h2 className="sec-title" style={{fontSize:'clamp(28px,3vw,40px)'}}>Partners & Integrations</h2>
        </div>
        <div className={styles.partnersRow}>
          {PARTNERS.map(p => (
            <div key={p} className={styles.partnerChip}>{p}</div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div className={`${styles.ctaBand} reveal`} ref={ctaRef}>
        <div className={styles.ctaBefore} />
        <div style={{position:'relative',zIndex:1}}>
          <div className="sec-chip" style={{display:'inline-flex',marginBottom:20}}><em>✦</em> Join Us</div>
          <h2 className={styles.ctaTitle}>Ready to <em>Shape Your Future?</em></h2>
          <p className={styles.ctaSub}>Join 36,000+ learners who chose SkillGro to level up their skills, switch careers, and build something they're proud of.</p>
          <div className={styles.ctaActions}>
            <Link to="/signup" className="btn btn-lime">Get Started Free ↗</Link>
            <Link to="/courses" className="btn btn-ghost">Browse Courses</Link>
          </div>
        </div>
      </div>
    </>
  );
}


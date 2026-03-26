import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getInstructor, getCourses } from '../utils/api';
import CourseCard from '../components/CourseCard';
import styles from './InstructorDetail.module.css';

/* ─── Fallback data (used when API/DB is unavailable) ─────────────────────── */
const FALLBACK_INSTRUCTORS = {
  'robert-fox': {
    initials: 'RF', name: 'Robert Fox', role: 'UX Design Lead', rating: 4.8,
    studentCount: 2100, courseCount: 12,
    avatarColor: 'linear-gradient(135deg,var(--violet2),#c0a0ff)',
    bio: 'Robert is a world-class UX designer with over a decade of experience working with Fortune 500 companies and leading startups alike. He\'s passionate about bridging the gap between beautiful design and functional interfaces that users love.\n\nBefore joining SkillGro as a lead instructor, Robert led design teams at several high-growth tech companies and won multiple industry awards for his product work. He holds a Master\'s degree in Human-Computer Interaction and has spoken at conferences worldwide.',
    expertise: ['User Research', 'Interaction Design', 'Figma', 'Design Systems', 'Prototyping', 'Accessibility'],
    social: { twitter: '@robertfox', linkedin: 'robertfox', website: 'robertfox.design' },
  },
  'david-millar': {
    initials: 'DM', name: 'David Millar', role: 'Web Development', rating: 4.9,
    studentCount: 3500, courseCount: 18,
    avatarColor: 'linear-gradient(135deg,var(--cyan),#80eeff)',
    bio: 'David is a full-stack developer and dedicated educator who has been building for the web for over 12 years. He\'s worked at leading tech companies and consulted for hundreds of businesses — from scrappy startups to enterprise teams.\n\nHis teaching philosophy is simple: learn by building real things. Every one of his courses is project-based, so students graduate with a portfolio they\'re proud of.',
    expertise: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'TypeScript', 'System Design'],
    social: { twitter: '@davidmillar', linkedin: 'davidmillar', website: 'davidmillar.dev' },
  },
  'jenny-wilson': {
    initials: 'JW', name: 'Jenny Wilson', role: 'Graphic Design', rating: 4.7,
    studentCount: 1800, courseCount: 9,
    avatarColor: 'linear-gradient(135deg,var(--lime),#e0ff80)',
    bio: 'Jenny is an award-winning graphic designer, brand strategist, and creative director with 8+ years in the industry. She has helped over 200 brands develop their visual identity, from early-stage startups to household names.\n\nHer courses focus on building a strong creative foundation — from typography and colour theory to full brand system design.',
    expertise: ['Brand Identity', 'Typography', 'Adobe Suite', 'Illustration', 'Color Theory', 'Print Design'],
    social: { twitter: '@jennywilson', linkedin: 'jennywilson', website: 'jennywilson.co' },
  },
  'wade-warren': {
    initials: 'WW', name: 'Wade Warren', role: 'Digital Marketing', rating: 4.5,
    studentCount: 2600, courseCount: 14,
    avatarColor: 'linear-gradient(135deg,var(--pink),#f090b0)',
    bio: 'Wade is a digital marketing strategist who has driven growth for dozens of DTC brands and SaaS companies. He specialises in paid social, SEO, and conversion optimisation — and is obsessed with data-driven decision making.\n\nWith SkillGro, Wade brings his real-world campaign experience directly into the classroom, sharing the exact frameworks and playbooks he uses with his agency clients.',
    expertise: ['Facebook Ads', 'SEO', 'Email Marketing', 'Analytics', 'CRO', 'Growth Hacking'],
    social: { twitter: '@wadewarren', linkedin: 'wadewarren', website: 'wadewarren.co' },
  },
  'guy-hawkins': {
    initials: 'GH', name: 'Guy Hawkins', role: 'UI Design', rating: 5.0,
    studentCount: 1400, courseCount: 7,
    avatarColor: 'linear-gradient(135deg,var(--orange),#ffb07d)',
    bio: 'Guy is a UI perfectionist with 7 years of experience crafting pixel-perfect, user-friendly interfaces for mobile and web. He has shipped products used by millions and believes that great UI is invisible — it just works.\n\nHis courses are packed with real-world examples, component libraries, and design system thinking that companies actually use.',
    expertise: ['UI Design', 'Design Tokens', 'Tailwind CSS', 'Component Libraries', 'Mobile Design', 'Figma'],
    social: { twitter: '@guyhawkins', linkedin: 'guyhawkins', website: 'guyhawkins.io' },
  },
  'eleanor-pena': {
    initials: 'EP', name: 'Eleanor Pena', role: 'Finance & Investing', rating: 4.6,
    studentCount: 3100, courseCount: 11,
    avatarColor: 'linear-gradient(135deg,var(--violet),var(--violet2))',
    bio: 'Eleanor is a certified financial planner with 15 years of Wall Street experience turned educator. She has managed portfolios worth hundreds of millions and now brings that knowledge directly to everyday learners.\n\nHer mission is to demystify personal finance and investing so that anyone — regardless of background — can build long-term wealth.',
    expertise: ['Personal Finance', 'Stock Market', 'Portfolio Management', 'ETFs', 'Budgeting', 'Retirement Planning'],
    social: { twitter: '@eleanorpena', linkedin: 'eleanorpena', website: 'eleanorpena.finance' },
  },
  'cameron-k': {
    initials: 'CK', name: 'Cameron K.', role: 'Data Science', rating: 4.8,
    studentCount: 2400, courseCount: 8,
    avatarColor: 'linear-gradient(135deg,var(--cyan),var(--violet2))',
    bio: 'Cameron is a data scientist and ML engineer with experience at top tech firms and research labs. He has published papers on machine learning and built models deployed at scale across several industries.\n\nCameron\'s courses are known for being rigorous yet practical — students leave with real skills, not just theory.',
    expertise: ['Python', 'Machine Learning', 'Deep Learning', 'SQL', 'Data Visualization', 'Statistics'],
    social: { twitter: '@cameronk', linkedin: 'cameronk', website: 'cameronk.dev' },
  },
};

const REVIEWS = [
  { av: 'S', color: 'var(--lime)',    name: 'Sarah T.',   role: 'Frontend Dev',    rating: 5, text: 'Absolutely the best instructor I\'ve encountered online. Clear, thorough, and genuinely cares about your progress.' },
  { av: 'M', color: 'var(--cyan)',    name: 'Marcus L.',  role: 'UX Designer',     rating: 5, text: 'The way this content is structured makes even complex concepts feel effortless. Highly recommend.' },
  { av: 'P', color: 'var(--violet2)', name: 'Priya K.',   role: 'Product Manager', rating: 5, text: 'I completed 3 courses and each one was better than the last. Instantly applicable to my day job.' },
];

export default function InstructorDetail() {
  const { slug } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [activeTab, setActiveTab]   = useState('about');

  useEffect(() => {
    let cancelled = false;
    const fallback = FALLBACK_INSTRUCTORS[slug] || Object.values(FALLBACK_INSTRUCTORS)[0];

    setLoading(true);
    setCourses([]);

    getInstructor(slug)
      .then(r => {
        if (cancelled) return;
        const data = r.data.instructor;
        // If DB expertise is missing or empty, use fallback expertise
        const expertise = (data.expertise && data.expertise.length > 0)
          ? data.expertise
          : (fallback.expertise || []);
        const social = (data.social && Object.values(data.social).some(Boolean))
          ? data.social
          : (fallback.social || {});
        setInstructor({ ...fallback, ...data, expertise, social });
      })
      .catch(() => {
        if (cancelled) return;
        setInstructor(fallback);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    getCourses({ instructor: slug, limit: 3 })
      .then(r => {
        if (!cancelled) setCourses(r.data.courses || []);
      })
      .catch(() => {
        if (!cancelled) setCourses([]);
      });

    return () => { cancelled = true; };
  }, [slug]);

  if (loading)     return <div className={styles.loading}>Loading instructor…</div>;
  if (!instructor) return <div className={styles.loading}>Instructor not found.</div>;

  // Split bio on blank lines for multi-paragraph display
  const bioParas = instructor.bio
    ? instructor.bio.split('\n\n').filter(Boolean)
    : ['No bio available.'];

  return (
    <>
      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className={styles.heroGrid} />
        <div className={styles.heroInner}>

          <div className="breadcrumb" style={{ position: 'relative', zIndex: 2 }}>
            <Link to="/">Home</Link> › <Link to="/instructors">Instructors</Link> › <span className="current">{instructor.name}</span>
          </div>

          <div className={styles.heroContent}>
            {/* Avatar */}
            <div className={styles.heroLeft}>
              {instructor.avatar ? (
                <img src={instructor.avatar} alt={instructor.name} className={styles.av} />
              ) : (
                <div className={styles.av} style={{ background: instructor.avatarColor || '#c8ff00' }}>
                  {instructor.initials || instructor.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Info */}
            <div className={styles.heroRight}>
              {instructor.role && <div className={styles.roleChip}>{instructor.role}</div>}
              <h1 className={styles.name}>{instructor.name}</h1>
              <div className={styles.heroBio}>{bioParas[0]}</div>

              {/* Stats */}
              <div className={styles.heroStats}>
                {[
                  ['⭐', instructor.rating  || '—',  'Instructor Rating'],
                  ['👥', (instructor.studentCount || 0).toLocaleString(), 'Students Enrolled'],
                  ['📚', instructor.courseCount || 0, 'Courses Created'],
                  ['🏆', '99%',                        'Completion Rate'],
                ].map(([icon, val, label]) => (
                  <div key={label} className={styles.heroStat}>
                    <div className={styles.heroStatTop}><span>{icon}</span><strong>{val}</strong></div>
                    <div className={styles.heroStatLabel}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              {instructor.social && (Object.values(instructor.social).some(Boolean)) && (
                <div className={styles.socialRow}>
                  {instructor.social.twitter  && <a href={`https://twitter.com/${instructor.social.twitter.replace('@','')}`} target="_blank" rel="noreferrer" className={styles.socialBtn}>𝕏 Twitter</a>}
                  {instructor.social.linkedin && <a href={`https://linkedin.com/in/${instructor.social.linkedin}`}            target="_blank" rel="noreferrer" className={styles.socialBtn}>in LinkedIn</a>}
                  {instructor.social.website  && <a href={`https://${instructor.social.website.replace(/^https?:\/\//,'')}`}  target="_blank" rel="noreferrer" className={styles.socialBtn}>🌐 Website</a>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className={styles.tabs}>
        {['about', 'courses', 'reviews'].map(t => (
          <button
            key={t}
            className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

{/* ── BODY ── */}
      <div className={styles.body}>

        {/* ── About tab ── */}
        {activeTab === 'about' && (
          <div className={styles.aboutGrid}>
            <div>
              {/* Bio */}
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>About {instructor.name}</h3>
                {bioParas.map((p, i) => (
                  <p key={i} className={styles.bioText}>{p}</p>
                ))}
              </div>

              {/* Expertise tags — only shown when data exists */}
              {instructor.expertise?.length > 0 && (
                <div className={styles.card} style={{ marginTop: 20 }}>
                  <h3 className={styles.cardTitle}>Areas of Expertise</h3>
                  <div className={styles.tagCloud}>
                    {instructor.expertise.map(e => (
                      <span key={e} className={styles.tag}>{e}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick facts sidebar */}
            <div className={styles.sideCard}>
              <h4 className={styles.sideTitle}>Quick Facts</h4>
              {[
                ['🌐', 'Language',       'English'],
                ['📍', 'Location',       'United States'],
                ['🎓', 'Courses Taught', instructor.courseCount  || 0],
                ['👥', 'Total Students', (instructor.studentCount || 0).toLocaleString()],
                ['⭐', 'Average Rating', instructor.rating       || '—'],
              ].map(([icon, label, val]) => (
                <div key={label} className={styles.factRow}>
                  <span className={styles.factIcon}>{icon}</span>
                  <span className={styles.factLabel}>{label}</span>
                  <span className={styles.factVal}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Courses tab ── */}
        {activeTab === 'courses' && (
          <div className={styles.coursesGrid}>
            {courses.length === 0 ? (
              <p>No courses found for this instructor.</p>
            ) : (
              courses.map(c => (
                <CourseCard key={c._id} course={c} />
              ))
            )}
          </div>
        )}

        {/* ── Reviews tab ── */}
        {activeTab === 'reviews' && (
          <div>
            <h3 className={styles.cardTitle} style={{ marginBottom: 28 }}>Student Reviews</h3>
            <div className={styles.reviewsGrid}>
              {REVIEWS.map(r => (
                <div key={r.name} className={styles.reviewCard}>
                  <div className={styles.reviewStars}>{'★'.repeat(r.rating)}</div>
                  <p className={styles.reviewText}>{r.text}</p>
                  <div className={styles.reviewFooter}>
                    <div className={styles.reviewAv} style={{ background: r.color }}>{r.av}</div>
                    <div>
                      <div className={styles.reviewName}>{r.name}</div>
                      <div className={styles.reviewRole}>{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}


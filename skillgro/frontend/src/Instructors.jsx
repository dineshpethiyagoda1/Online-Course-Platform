import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInstructors } from '../utils/api';
import { useReveal } from '../hooks/useReveal';
import styles from './Instructors.module.css';

const FALLBACK = [
  {
    _id: '1', initials: 'RF', name: 'Robert Fox',    slug: 'robert-fox',
    role: 'UX Design Lead',    rating: 4.8, studentCount: 2100, courseCount: 12,
    avatarColor: 'linear-gradient(135deg,var(--violet2),#c0a0ff)',
    bio: 'Expert UX designer with 10+ years crafting digital experiences at top tech companies.',
  },
  {
    _id: '2', initials: 'DM', name: 'David Millar',  slug: 'david-millar',
    role: 'Web Development',   rating: 4.9, studentCount: 3500, courseCount: 18,
    avatarColor: 'linear-gradient(135deg,var(--cyan),#80eeff)',
    bio: 'Full-stack developer and educator passionate about making complex concepts approachable.',
  },
  {
    _id: '3', initials: 'JW', name: 'Jenny Wilson',  slug: 'jenny-wilson',
    role: 'Graphic Design',    rating: 4.7, studentCount: 1800, courseCount: 9,
    avatarColor: 'linear-gradient(135deg,var(--lime),#e0ff80)',
    bio: 'Award-winning graphic designer helping students master visual storytelling.',
  },
  {
    _id: '4', initials: 'WW', name: 'Wade Warren',   slug: 'wade-warren',
    role: 'Digital Marketing', rating: 4.5, studentCount: 2600, courseCount: 14,
    avatarColor: 'linear-gradient(135deg,var(--pink),#f090b0)',
    bio: 'Digital marketing strategist who has grown brands from zero to millions.',
  },
  {
    _id: '5', initials: 'GH', name: 'Guy Hawkins',   slug: 'guy-hawkins',
    role: 'UI Design',         rating: 5.0, studentCount: 1400, courseCount: 7,
    avatarColor: 'linear-gradient(135deg,var(--orange),#ffb07d)',
    bio: 'UI perfectionist obsessed with pixel-perfect, user-friendly interfaces.',
  },
  {
    _id: '6', initials: 'EP', name: 'Eleanor Pena',  slug: 'eleanor-pena',
    role: 'Finance & Investing', rating: 4.6, studentCount: 3100, courseCount: 11,
    avatarColor: 'linear-gradient(135deg,var(--violet),var(--violet2))',
    bio: 'Certified financial planner with Wall Street experience turned educator.',
  },
  {
    _id: '7', initials: 'CK', name: 'Cameron K.',    slug: 'cameron-k',
    role: 'Data Science',      rating: 4.8, studentCount: 2400, courseCount: 8,
    avatarColor: 'linear-gradient(135deg,var(--cyan),var(--violet2))',
    bio: 'Data scientist and ML engineer helping students break into the field.',
  },
];

/* Build a slug from a name as a last resort */
const toSlug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const bodyRef = useReveal();

  useEffect(() => {
    getInstructors()
      .then(r => setInstructors(r.data.instructors?.length ? r.data.instructors : FALLBACK))
      .catch(() => setInstructors(FALLBACK));
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb">
          <Link to="/">Home</Link> › <span className="current">Instructors</span>
        </div>
        <h1 className="page-title">Meet Our <em>Expert</em><br />Instructors</h1>
        <p className="page-sub">
          Learn from world-class educators with proven real-world experience and a passion for teaching.
        </p>
      </div>

      <section className={`${styles.section} reveal`} ref={bodyRef}>
        <div className={styles.grid}>
          {instructors.map(instr => {
            const slug = instr.slug || toSlug(instr.name);
            return (
              <div key={instr._id || slug} className={styles.card}>
                {instr.avatar ? (
                  <img src={instr.avatar} alt={instr.name} className={styles.av} />
                ) : (
                  <div className={styles.av} style={{ background: instr.avatarColor || '#c8ff00' }}>
                    {instr.initials || instr.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className={styles.name}>{instr.name}</div>
                <div className={styles.role}>{instr.role}</div>
                <p className={styles.bio}>{instr.bio}</p>
                <div className={styles.stats}>
                  {[
                    [instr.rating,                       'Rating'],
                    [instr.studentCount?.toLocaleString(),'Students'],
                    [instr.courseCount,                   'Courses'],
                  ].map(([n, l]) => (
                    <div key={l} className={styles.stat}>
                      <div className={styles.statN}>{n ?? '—'}</div>
                      <div className={styles.statL}>{l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link to={`/instructors/${slug}`} className={styles.viewBtn}>
                    View Profile →
                  </Link>
                  <Link
                    to={`/courses?instructor=${slug}`}
                    className={styles.viewBtn}
                    style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--muted)' }}
                  >
                    Courses
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

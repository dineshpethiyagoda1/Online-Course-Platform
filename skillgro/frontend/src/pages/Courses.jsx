import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getCourses } from '../utils/api';
import CourseCard from '../components/CourseCard';
import { useReveal } from '../hooks/useReveal';
import styles from './Courses.module.css';

const CATEGORIES = ['Art & Design','Business','Data Science','Development','Finance','Health & Fitness','Lifestyle','Marketing'];
const LEVELS     = ['Beginner','Intermediate','Advanced','All Levels'];

export default function Courses() {
  const [courses, setCourses]   = useState([]);
  const [total, setTotal]       = useState(0);
  const [loading, setLoading]   = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const bodyRef = useReveal();

  const category = searchParams.get('category') || '';
  const level    = searchParams.get('level') || '';
  const search   = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    getCourses({ category, level, search })
      .then(r => { setCourses(r.data.courses); setTotal(r.data.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, level, search]);

  const setFilter = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, val); else p.delete(key);
    setSearchParams(p);
  };

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link> › <span className="current">Courses</span></div>
        <h1 className="page-title">All <em>Courses</em></h1>
        <p className="page-sub">Explore our full library of expert-led courses across every discipline and skill level.</p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sbSearch}>
            <input
              className="form-input"
              placeholder="🔍 Search courses…"
              defaultValue={search}
              onKeyDown={e => e.key==='Enter' && setFilter('search', e.target.value)}
            />
          </div>

          <div className={styles.sbSection}>
            <div className={styles.sbTitle}>Category</div>
            {CATEGORIES.map(c => (
              <label key={c} className={styles.sbCheck}>
                <input type="checkbox" checked={category===c} onChange={() => setFilter('category', category===c ? '' : c)} />
                <span>{c}</span>
              </label>
            ))}
          </div>

          <div className={styles.sbSection}>
            <div className={styles.sbTitle}>Level</div>
            {LEVELS.map(l => (
              <label key={l} className={styles.sbCheck}>
                <input type="radio" name="level" checked={level===l} onChange={() => setFilter('level', level===l ? '' : l)} />
                <span>{l}</span>
              </label>
            ))}
          </div>

          <button className="btn btn-ghost" style={{width:'100%',marginTop:8}} onClick={() => setSearchParams({})}>
            Clear Filters
          </button>
        </aside>

        {/* Main */}
        <main className={`${styles.main} reveal`} ref={bodyRef}>
          <div className={styles.mainHeader}>
            <span className={styles.count}>{loading ? '…' : `${total} courses`}</span>
            <select className={styles.sortSel} onChange={e => setFilter('sort', e.target.value)}>
              <option value="-createdAt">Newest First</option>
              <option value="-rating">Highest Rated</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <div className={styles.loading}>Loading courses…</div>
          ) : courses.length === 0 ? (
            <div className={styles.empty}>No courses found. Try adjusting your filters.</div>
          ) : (
            <div className={styles.grid}>
              {courses.map((c, i) => <CourseCard key={c._id} course={c} index={i} />)}
            </div>
          )}
        </main>
      </div>
    </>
  );
}


import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourse, enrollCourse } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import styles from './CourseDetail.module.css';

export default function CourseDetail() {
  const { slug } = useParams();
  const { user }  = useAuth();
  const [course, setCourse]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    getCourse(slug)
      .then(r => setCourse(r.data.course))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const handleEnroll = async () => {
    if (!user) return alert('Please log in to enroll');
    try {
      await enrollCourse({ courseId: course._id, amountPaid: course.price });
      setEnrolled(true);
    } catch (err) {
      if (err.response?.data?.message === 'Already enrolled') setEnrolled(true);
    }
  };

  if (loading) return <div className={styles.loading}>Loading course…</div>;
  if (!course) return <div className={styles.loading}>Course not found.</div>;

  const thumbBg = 'linear-gradient(135deg, #0d0d2b 0%, #1a1040 100%)';

  return (
    <>
      {/* Hero */}
      <div className={styles.hero} style={{ background: thumbBg }}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className="breadcrumb" style={{ position:'relative', zIndex:2 }}>
            <Link to="/" style={{color:'rgba(240,238,252,0.5)'}}>Home</Link> ›{' '}
            <Link to="/courses" style={{color:'rgba(240,238,252,0.5)'}}>Courses</Link> ›{' '}
            <span style={{color:'var(--lime)'}}>{course.title}</span>
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <div className={styles.catBadge}>{course.category}</div>
              <h1 className={styles.heroTitle}>{course.title}</h1>
              <p className={styles.heroSub}>{course.shortDesc || course.description?.slice(0,180)}</p>
              <div className={styles.heroMeta}>
                <span>⭐ {course.rating || '4.8'} ({course.reviewCount || 0} reviews)</span>
                <span>👥 {course.enrolledCount || 0} students</span>
                <span>📚 {course.lessons?.length || 0} lessons</span>
                {course.duration && <span>⏱ {course.duration}</span>}
                <span>🌐 {course.language || 'English'}</span>
              </div>
              <div className={styles.instructorRow}>
                <div className={styles.instrAv}>{course.instructor?.initials?.[0] || '?'}</div>
                <span style={{color:'var(--muted)',fontSize:14}}>Created by <strong style={{color:'var(--text)'}}>{course.instructor?.name}</strong></span>
              </div>
            </div>
            {/* Sticky card */}
            <div className={styles.enrollCard}>
              <div className={styles.enrollEmoji}>{course.emoji || '📚'}</div>
              <div className={styles.enrollPrice}>
                ${course.price}
                {course.originalPrice && <span className={styles.enrollOldPrice}>${course.originalPrice}</span>}
              </div>
              {course.originalPrice && (
                <div className={styles.discount}>
                  {Math.round((1 - course.price/course.originalPrice)*100)}% OFF
                </div>
              )}
              <button className={`btn btn-lime ${styles.enrollBtn}`} onClick={handleEnroll}>
                {enrolled ? '✓ Enrolled!' : 'Enroll Now ↗'}
              </button>
              <button className={`btn btn-ghost ${styles.enrollBtn}`}>Add to Wishlist</button>
              <div className={styles.enrollIncludes}>
                <div className={styles.enrollItem}>📖 {course.lessons?.length || 0} lessons</div>
                {course.duration && <div className={styles.enrollItem}>⏱ {course.duration} of content</div>}
                <div className={styles.enrollItem}>📱 Access on mobile & desktop</div>
                <div className={styles.enrollItem}>🏆 Certificate of completion</div>
                <div className={styles.enrollItem}>♾️ Full lifetime access</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {['overview','curriculum','instructor','reviews'].map(t => (
          <button key={t} className={`${styles.tab} ${activeTab===t?styles.tabActive:''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.body}>
        {activeTab === 'overview' && (
          <div className={styles.section}>
            {course.whatYouLearn?.length > 0 && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>What You'll Learn</h3>
                <div className={styles.learnGrid}>
                  {course.whatYouLearn.map((item,i) => (
                    <div key={i} className={styles.learnItem}><span className={styles.learnCheck}>✓</span>{item}</div>
                  ))}
                </div>
              </div>
            )}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Course Description</h3>
              <p className={styles.description}>{course.description}</p>
            </div>
            {course.requirements?.length > 0 && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Requirements</h3>
                <ul className={styles.reqList}>{course.requirements.map((r,i) => <li key={i}>{r}</li>)}</ul>
              </div>
            )}
          </div>
        )}
        {activeTab === 'curriculum' && (
          <div className={styles.section}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Course Curriculum</h3>
              {course.lessons?.length > 0 ? course.lessons.map((l, i) => (
                <div key={i} className={styles.lesson}>
                  <span className={styles.lessonNum}>{i+1}</span>
                  <span className={styles.lessonTitle}>{l.title}</span>
                  <span className={styles.lessonMeta}>
                    {l.isFree && <span className={styles.freeBadge}>Free Preview</span>}
                    {l.duration && <span>{l.duration}</span>}
                  </span>
                </div>
              )) : <p style={{color:'var(--muted)'}}>Curriculum coming soon.</p>}
            </div>
          </div>
        )}
        {activeTab === 'instructor' && (
          <div className={styles.section}>
            <div className={styles.card}>
              <div className={styles.instrCard}>
                <div className={styles.instrAvLg}>{course.instructor?.initials}</div>
                <div>
                  <div className={styles.instrName}>{course.instructor?.name}</div>
                  <div className={styles.instrRole}>{course.instructor?.role}</div>
                  <div className={styles.instrStats}>
                    <span>⭐ {course.instructor?.rating} Rating</span>
                    <span>👥 {course.instructor?.studentCount?.toLocaleString()} Students</span>
                    <span>📚 {course.instructor?.courseCount} Courses</span>
                  </div>
                  <p style={{color:'var(--muted)',fontSize:14,lineHeight:1.7}}>{course.instructor?.bio || 'Expert instructor with years of real-world experience.'}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}


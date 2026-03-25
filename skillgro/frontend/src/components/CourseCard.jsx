
import { Link } from 'react-router-dom';

const thumbClasses = ['ct1','ct2','ct3','ct4','ct5','ct6'];
const avClasses    = ['av1','av2','av3','av4','av5','av6'];

export default function CourseCard({ course, index = 0 }) {
  const thumb = thumbClasses[index % 6];
  const av    = avClasses[index % 6];
  const badgeClass = course.badge === 'Hot!' ? 'badge-hot' : course.badge === 'Sale' ? 'badge-sale' : 'badge-new';

  return (
    <Link to={`/courses/${course.slug}`} className="cc">
      <div className={`cc-thumb ${thumb}`}>
        <span style={{ position:'relative', zIndex:1 }}>{course.emoji || '📚'}</span>
        {course.category && <span className="cc-tag">{course.category}</span>}
        {course.badge && <span className={`cc-badge ${badgeClass}`}>{course.badge}</span>}
      </div>
      <div className="cc-body">
        <div className="cc-author-row">
          <div className={`av ${av}`}>{course.instructor?.initials?.[0] || '?'}</div>
          <span className="cc-author-name">{course.instructor?.name || 'Instructor'}</span>
        </div>
        <div className="cc-title">{course.title}</div>
        <div className="cc-meta">
          <span><span className="cc-stars">★★★★★</span> {course.rating?.toFixed(1) || '4.8'}</span>
          <span>📖 {course.lessons?.length || 0} lessons</span>
          {course.duration && <span>⏱ {course.duration}</span>}
        </div>
        <div className="cc-footer">
          <div>
            <span className="cc-price">${course.price}</span>
            {course.originalPrice && <span className="cc-price-old">${course.originalPrice}</span>}
          </div>
          <span className="cc-cta">Enroll Now</span>
        </div>
      </div>
    </Link>
  );
}

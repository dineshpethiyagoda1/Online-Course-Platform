
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../utils/api';
import { useReveal } from '../hooks/useReveal';
import styles from './Blog.module.css';

const FALLBACK = [
  { _id:'1', slug:'top-web-dev-trends-2024',        emoji:'💻', category:'Development',   title:'Top Web Development Trends to Watch in 2024',          excerpt:'From AI-assisted coding to edge-first architecture, here\'s what every developer needs to know this year.',     author:{initials:'DM',color:'var(--cyan)'},    readTime:'5 min', createdAt:'2024-08-10' },
  { _id:'2', slug:'ux-design-principles',           emoji:'🎨', category:'Design',        title:'7 UX Design Principles Every Designer Must Know',       excerpt:'Great design isn\'t just about aesthetics—it\'s about creating experiences that feel effortless and intuitive.',   author:{initials:'RF',color:'var(--violet2)'}, readTime:'4 min', createdAt:'2024-08-05' },
  { _id:'3', slug:'digital-marketing-beginners',    emoji:'📣', category:'Marketing',     title:'The Complete Beginner\'s Guide to Digital Marketing',    excerpt:'Master SEO, social media, email campaigns and paid ads with this comprehensive step-by-step guide.',                author:{initials:'WW',color:'var(--lime)'},    readTime:'8 min', createdAt:'2024-07-28' },
  { _id:'4', slug:'python-data-science',            emoji:'📊', category:'Data Science',  title:'Why Python is Still King of Data Science in 2024',       excerpt:'Despite new challengers, Python\'s ecosystem of libraries and community support keeps it at the top.',              author:{initials:'CK',color:'var(--orange)'}, readTime:'6 min', createdAt:'2024-07-20' },
  { _id:'5', slug:'investing-your-20s',             emoji:'💰', category:'Finance',       title:'How to Start Investing in Your 20s (Step-by-Step)',      excerpt:'Time is your greatest asset. Here\'s how to make the most of compound interest and index funds starting today.',    author:{initials:'EP',color:'var(--pink)'},   readTime:'7 min', createdAt:'2024-07-12' },
  { _id:'6', slug:'freelance-designer-tips',        emoji:'✨', category:'Design',        title:'10 Tips to Land Your First Freelance Design Client',     excerpt:'From building your portfolio to writing cold outreach that actually gets replies — a practical playbook.',          author:{initials:'JW',color:'var(--lime)'},    readTime:'5 min', createdAt:'2024-07-05' },
];

const CATEGORIES = ['All','Development','Design','Marketing','Data Science','Finance'];

export default function Blog() {
  const [posts, setPosts]     = useState([]);
  const [category, setCategory] = useState('All');
  const bodyRef = useReveal();

  useEffect(() => {
    getBlogPosts({ category: category === 'All' ? '' : category })
      .then(r => setPosts(r.data.posts?.length ? r.data.posts : FALLBACK))
      .catch(() => setPosts(FALLBACK));
  }, [category]);

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link> › <span className="current">Blog</span></div>
        <h1 className="page-title">Our <em>Blog</em> &<br />Articles</h1>
        <p className="page-sub">Expert insights, tips, and tutorials to keep you ahead in your learning journey.</p>
      </div>

      <section className={`${styles.section} reveal`} ref={bodyRef}>
        <div className={styles.filters}>
          {CATEGORIES.map(c => (
            <button key={c} className={`${styles.filterBtn} ${category===c?styles.filterActive:''}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        <div className={styles.grid}>
          {posts.map((post, i) => (
            <Link key={post._id} to={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.thumb} style={{background:`linear-gradient(135deg, ${['#0d0d2b','#0d1f2b','#1f0d2b','#2b0d10','#0d2b1a','#1a1a0d'][i%6]} 0%, ${['#1a1040','#0a3040','#3a1040','#401a18','#104028','#2b2810'][i%6]} 100%)`}}>
                <span className={styles.thumbEmoji}>{post.emoji}</span>
                <span className={styles.catBadge}>{post.category}</span>
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <div className={styles.authorAv} style={{background:post.author?.color||'var(--lime)'}}>{post.author?.initials||'?'}</div>
                  <span className={styles.readTime}>{post.readTime} read</span>
                  <span className={styles.date}>{new Date(post.createdAt).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                </div>
                <div className={styles.title}>{post.title}</div>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div className={styles.readMore}>Read Article →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

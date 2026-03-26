import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPost } from '../utils/api';
import styles from './BlogDetail.module.css';

const FALLBACK_POSTS = {
  'top-web-dev-trends-2024': {
    _id:'1', title:'Top Web Development Trends to Watch in 2024', category:'Development', readTime:'5 min read', date:'August 10, 2024',
    author:{ name:'David Millar', initials:'DM', role:'Web Development Lead', avatarColor:'linear-gradient(135deg,var(--cyan),#80eeff)' },
    excerpt:'From AI-assisted coding to edge-first architecture, here\'s what every developer needs to know this year.',
    content:[
      { type:'h2', text:'AI-Assisted Development' },
      { type:'p',  text:'AI tools are revolutionizing how we write code. From GitHub Copilot to ChatGPT, developers now have intelligent assistants that can generate boilerplate, suggest optimizations, and even debug issues.' },
      { type:'p',  text:'The key is learning to work with AI as a partner rather than a replacement. Understanding prompts, reviewing generated code, and maintaining code quality are essential skills.' },
      { type:'h2', text:'Edge Computing' },
      { type:'p',  text:'Edge-first architecture is becoming mainstream. By processing data closer to users, applications can deliver faster response times and better user experiences.' },
      { type:'p',  text:'Frameworks like Next.js and Vercel are making edge deployment accessible to developers of all levels.' },
    ],
    tags:['Web Development','AI','Edge Computing','JavaScript','React'],
    relatedPosts:[
      { slug:'ux-design-principles', title:'7 UX Design Principles Every Designer Must Know', category:'Design', readTime:'4 min read' },
      { slug:'python-data-science', title:'Why Python is Still King of Data Science in 2024', category:'Data Science', readTime:'6 min read' },
    ],
  },
  'ux-design-principles': {
    _id:'2', title:'7 UX Design Principles Every Designer Must Know', category:'Design', readTime:'4 min read', date:'August 5, 2024',
    author:{ name:'Robert Fox', initials:'RF', role:'UX Design Lead', avatarColor:'linear-gradient(135deg,var(--violet2),#c0a0ff)' },
    excerpt:'Great design isn\'t just about aesthetics—it\'s about creating experiences that feel effortless and intuitive.',
    content:[
      { type:'h2', text:'1. Hierarchy' },
      { type:'p',  text:'Visual hierarchy guides users through your interface. Use size, color, and spacing to establish clear information architecture.' },
      { type:'h2', text:'2. Consistency' },
      { type:'p',  text:'Consistent patterns help users build mental models. Stick to established conventions and your own design system.' },
      { type:'h2', text:'3. Accessibility' },
      { type:'p',  text:'Design for everyone. Consider color contrast, keyboard navigation, and screen reader compatibility from the start.' },
      { type:'h2', text:'4. Feedback' },
      { type:'p',  text:'Users need to know their actions have been registered. Provide clear, immediate feedback for all interactions.' },
      { type:'h2', text:'5. Simplicity' },
      { type:'p',  text:'Remove unnecessary elements. Focus on what matters most to your users.' },
      { type:'h2', text:'6. Context' },
      { type:'p',  text:'Design solutions that fit the user\'s environment, device, and situation.' },
      { type:'h2', text:'7. Testing' },
      { type:'p',  text:'Validate your designs with real users. User testing reveals insights you can\'t get from assumptions alone.' },
    ],
    tags:['UX Design','Design Principles','User Experience','Interface Design'],
    relatedPosts:[
      { slug:'top-web-dev-trends-2024', title:'Top Web Development Trends to Watch in 2024', category:'Development', readTime:'5 min read' },
      { slug:'freelance-designer-tips', title:'10 Tips to Land Your First Freelance Design Client', category:'Design', readTime:'5 min read' },
    ],
  },
  'digital-marketing-beginners': {
    _id:'3', title:'The Complete Beginner\'s Guide to Digital Marketing', category:'Marketing', readTime:'8 min read', date:'July 28, 2024',
    author:{ name:'Wade Warren', initials:'WW', role:'Digital Marketing Lead', avatarColor:'linear-gradient(135deg,var(--pink),#f090b0)' },
    excerpt:'Master SEO, social media, email campaigns and paid ads with this comprehensive step-by-step guide.',
    content:[
      { type:'h2', text:'Understanding Digital Marketing' },
      { type:'p',  text:'Digital marketing encompasses all marketing efforts that use electronic devices or the internet. It\'s about reaching customers where they spend their time online.' },
      { type:'h2', text:'SEO Fundamentals' },
      { type:'p',  text:'Search Engine Optimization is about making your website more visible in search results. Focus on relevant keywords, quality content, and technical optimization.' },
      { type:'h2', text:'Social Media Marketing' },
      { type:'p',  text:'Build community and engagement on platforms like Instagram, TikTok, and LinkedIn. Create valuable content and interact authentically with your audience.' },
      { type:'h2', text:'Email Marketing' },
      { type:'p',  text:'Email remains one of the most effective marketing channels. Build segmented lists and send personalized, valuable content to your subscribers.' },
      { type:'h2', text:'Paid Advertising' },
      { type:'p',  text:'Platforms like Google Ads and Facebook Ads allow you to reach specific audiences. Start small, test different approaches, and optimize based on data.' },
      { type:'h2', text:'Analytics and Measurement' },
      { type:'p',  text:'Track your performance with tools like Google Analytics. Focus on metrics that matter: conversions, engagement, and ROI.' },
    ],
    tags:['Digital Marketing','SEO','Social Media','Email Marketing','PPC'],
    relatedPosts:[
      { slug:'investing-your-20s', title:'How to Start Investing in Your 20s (Step-by-Step)', category:'Finance', readTime:'7 min read' },
      { slug:'python-data-science', title:'Why Python is Still King of Data Science in 2024', category:'Data Science', readTime:'6 min read' },
    ],
  },
  'python-data-science': {
    _id:'4', title:'Why Python is Still King of Data Science in 2024', category:'Data Science', readTime:'6 min read', date:'July 20, 2024',
    author:{ name:'Cameron K.', initials:'CK', role:'Data Science Lead', avatarColor:'linear-gradient(135deg,var(--cyan),var(--violet2))' },
    excerpt:'Despite new challengers, Python\'s ecosystem of libraries and community support keeps it at the top.',
    content:[
      { type:'h2', text:'The Python Ecosystem' },
      { type:'p',  text:'Python\'s data science stack is unparalleled. Libraries like pandas, NumPy, scikit-learn, and TensorFlow provide everything you need for data analysis and machine learning.' },
      { type:'h2', text:'Community and Support' },
      { type:'p',  text:'The Python community is vast and supportive. Stack Overflow, GitHub, and countless tutorials make it easy to find help and learn.' },
      { type:'h2', text:'Versatility' },
      { type:'p',  text:'Python isn\'t just for data science. You can build web applications, automate tasks, and even create games with the same language.' },
      { type:'h2', text:'Industry Adoption' },
      { type:'p',  text:'Companies like Google, Netflix, and Spotify use Python extensively. Learning Python opens doors to many career opportunities.' },
      { type:'h2', text:'Future-Proof' },
      { type:'p',  text:'Python continues to evolve. New libraries and frameworks are regularly released, keeping it at the forefront of data science innovation.' },
    ],
    tags:['Python','Data Science','Machine Learning','Programming','Analytics'],
    relatedPosts:[
      { slug:'top-web-dev-trends-2024', title:'Top Web Development Trends to Watch in 2024', category:'Development', readTime:'5 min read' },
      { slug:'digital-marketing-beginners', title:'The Complete Beginner\'s Guide to Digital Marketing', category:'Marketing', readTime:'8 min read' },
    ],
  },
  'investing-your-20s': {
    _id:'5', title:'How to Start Investing in Your 20s (Step-by-Step)', category:'Finance', readTime:'7 min read', date:'July 12, 2024',
    author:{ name:'Eleanor Pena', initials:'EP', role:'Finance Lead', avatarColor:'linear-gradient(135deg,var(--violet),var(--violet2))' },
    excerpt:'Time is your greatest asset. Here\'s how to make the most of compound interest and index funds starting today.',
    content:[
      { type:'h2', text:'The Power of Compound Interest' },
      { type:'p',  text:'Starting early gives you the advantage of compound interest. Even small amounts invested regularly can grow significantly over time.' },
      { type:'h2', text:'Emergency Fund First' },
      { type:'p',  text:'Before investing, build an emergency fund covering 3-6 months of expenses. This protects you from having to sell investments during market downturns.' },
      { type:'h2', text:'Understand Risk' },
      { type:'p',  text:'In your 20s, you have time to recover from market volatility. Focus on long-term growth rather than short-term fluctuations.' },
      { type:'h2', text:'Index Funds and ETFs' },
      { type:'p',  text:'For beginners, low-cost index funds and ETFs are excellent starting points. They provide diversification and have historically outperformed most actively managed funds.' },
      { type:'h2', text:'401(k) and IRA' },
      { type:'p',  text:'Take advantage of tax-advantaged retirement accounts. If your employer offers a 401(k) match, that\'s free money.' },
      { type:'h2', text:'Education and Patience' },
      { type:'p',  text:'Keep learning about investing, but avoid frequent trading. Long-term, buy-and-hold strategies typically win.' },
    ],
    tags:['Investing','Finance','Personal Finance','Index Funds','Retirement'],
    relatedPosts:[
      { slug:'digital-marketing-beginners', title:'The Complete Beginner\'s Guide to Digital Marketing', category:'Marketing', readTime:'8 min read' },
      { slug:'freelance-designer-tips', title:'10 Tips to Land Your First Freelance Design Client', category:'Design', readTime:'5 min read' },
    ],
  },
  'freelance-designer-tips': {
    _id:'6', title:'10 Tips to Land Your First Freelance Design Client', category:'Design', readTime:'5 min read', date:'July 5, 2024',
    author:{ name:'Jenny Wilson', initials:'JW', role:'Graphic Design Lead', avatarColor:'linear-gradient(135deg,var(--lime),#e0ff80)' },
    excerpt:'From building your portfolio to writing cold outreach that actually gets replies — a practical playbook.',
    content:[
      { type:'h2', text:'1. Build a Strong Portfolio' },
      { type:'p',  text:'Your portfolio is your most important marketing tool. Showcase your best work and tell the story behind each project.' },
      { type:'h2', text:'2. Define Your Niche' },
      { type:'p',  text:'Specialize in a specific type of design work. This makes you more attractive to clients in that space.' },
      { type:'h2', text:'3. Set Up Professional Systems' },
      { type:'p',  text:'Use professional email, have contracts ready, and set up proper invoicing. This shows clients you\'re serious.' },
      { type:'h2', text:'4. Network Actively' },
      { type:'p',  text:'Attend design meetups, join online communities, and connect with other designers on LinkedIn.' },
      { type:'h2', text:'5. Create Content' },
      { type:'p',  text:'Start a blog, YouTube channel, or social media presence. This establishes you as an expert and attracts potential clients.' },
      { type:'h2', text:'6. Price Your Services' },
      { type:'p',  text:'Research what similar designers charge. Consider your experience level and the value you provide.' },
      { type:'h2', text:'7. Write Better Proposals' },
      { type:'p',  text:'Proposals should focus on the client\'s needs, not just your skills. Show that you understand their business.' },
      { type:'h2', text:'8. Deliver Exceptional Work' },
      { type:'p',  text:'Go above and beyond on your first projects. Word-of-mouth referrals are your best source of new clients.' },
      { type:'h2', text:'9. Manage Your Time' },
      { type:'p',  text:'Use tools like time tracking and project management software to stay organized and meet deadlines.' },
      { type:'h2', text:'10. Keep Learning' },
      { type:'p',  text:'Stay current with design trends and new tools. Continuous learning keeps your work fresh and competitive.' },
    ],
    tags:['Freelance','Design','Business','Portfolio','Networking'],
    relatedPosts:[
      { slug:'ux-design-principles', title:'7 UX Design Principles Every Designer Must Know', category:'Design', readTime:'4 min read' },
      { slug:'investing-your-20s', title:'How to Start Investing in Your 20s (Step-by-Step)', category:'Finance', readTime:'7 min read' },
    ],
  },
  'the-future-of-online-learning': {
    _id:'7', title:'The Future of Online Learning: What 2025 Looks Like', category:'Education', readTime:'8 min read', date:'October 12, 2024',
    author:{ name:'David Millar', initials:'DM', role:'Web Development Lead', avatarColor:'linear-gradient(135deg,var(--cyan),#80eeff)' },
    excerpt:'Online education has evolved dramatically over the past decade. But the biggest shifts are yet to come. Here\'s what the next generation of digital learning will look like.',
    content:[
      { type:'h2', text:'A Decade of Transformation' },
      { type:'p',  text:'When online courses first emerged, they were little more than recorded lectures uploaded to clunky platforms. Completion rates were dismal. Engagement was an afterthought. The promise of democratising education felt more like a marketing slogan than a lived reality.' },
      { type:'p',  text:'Fast-forward to today, and the landscape looks entirely different. Millions of people have retrained, upskilled, and switched careers using online platforms. The COVID-19 pandemic accelerated what was already inevitable: remote, flexible, self-directed learning is now the default for a huge segment of the global workforce.' },
      { type:'h2', text:'The Rise of AI-Personalised Learning' },
      { type:'p',  text:'The most significant shift coming in 2025 isn\'t a new type of content or a flashier interface. It\'s personalisation at a scale that was previously impossible. AI now enables platforms to understand how individual students learn — their pace, their weaknesses, their preferred formats — and adapt course content in real time.' },
      { type:'p',  text:'Imagine a curriculum that restructures itself based on your quiz performance, surfaces additional resources exactly when you\'re struggling, and skips sections you\'ve already mastered through prior experience. That\'s not science fiction — it\'s being deployed right now.' },
      { type:'blockquote', text:'The best teachers have always taught to the individual. AI finally lets us do that at scale.' },
      { type:'h2', text:'Community and Cohort Learning' },
      { type:'p',  text:'One persistent criticism of online education has been its isolation. You watch videos alone. You do quizzes alone. The social element that makes in-person education so powerful — the debate, the collaboration, the accidental insight from a classmate — has traditionally been missing.' },
      { type:'p',  text:'This is changing rapidly. Cohort-based courses, where a group of students move through material together with live sessions and peer accountability, have seen explosive growth. Completion rates for cohort courses are typically 5–10x higher than self-paced alternatives.' },
      { type:'h2', text:'The Credential Question' },
      { type:'p',  text:'Employers are increasingly recognising online credentials — not just from prestigious universities, but from specialist platforms with strong industry reputations. The old assumption that only a traditional degree signals competence is eroding quickly, especially in tech, design, and marketing.' },
      { type:'p',  text:'What matters now is demonstrable skill. Portfolio-based hiring, take-home projects, and skills assessments are all gaining ground over degree-first filtering. Online education is well-positioned to meet this shift.' },
      { type:'h2', text:'What This Means for Learners' },
      { type:'p',  text:'If you\'re a learner in 2025, you\'ve never had more power. The quality gap between top online courses and traditional education is narrowing fast. The key is knowing how to choose well: look for courses with strong community components, project-based learning, and instructors with real-world experience — not just academic credentials.' },
    ],
    tags:['Online Learning','EdTech','AI','Future of Work','Education'],
    relatedPosts:[
      { slug:'10-skills-for-2025', title:'10 Skills Every Professional Needs in 2025', category:'Career', readTime:'6 min read' },
      { slug:'how-to-learn-faster', title:'How to Learn Anything Faster With Spaced Repetition', category:'Productivity', readTime:'5 min read' },
      { slug:'ui-design-trends', title:'UI Design Trends That Will Dominate 2025', category:'Design', readTime:'7 min read' },
    ],
  },
};

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPost(slug)
      .then(r => setPost(r.data.post))
      .catch(() => setPost(FALLBACK_POSTS[slug] || Object.values(FALLBACK_POSTS)[0]))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className={styles.loading}>Loading post…</div>;
  if (!post)   return <div className={styles.loading}>Post not found.</div>;

  return (
    <>
      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className={styles.heroOrb1} /><div className={styles.heroOrb2} />
        <div className={styles.heroGrid} />
        <div className={styles.heroInner}>
          <div className="breadcrumb" style={{position:'relative',zIndex:2}}>
            <Link to="/">Home</Link> › <Link to="/blog">Blog</Link> › <span className="current">{post.category}</span>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroCat}>{post.category}</div>
            <h1 className={styles.heroTitle}>{post.title}</h1>
            <p className={styles.heroExcerpt}>{post.excerpt}</p>
            <div className={styles.heroMeta}>
              <div className={styles.authorRow}>
                <div className={styles.authorAv} style={{background:post.author.avatarColor}}>{post.author.initials}</div>
                <div>
                  <div className={styles.authorName}>{post.author.name}</div>
                  <div className={styles.authorRole}>{post.author.role}</div>
                </div>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaItem}><span>📅</span>{post.date}</div>
              <div className={styles.metaItem}><span>⏱️</span>{post.readTime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className={styles.body}>
        <div className={styles.bodyGrid}>

          {/* Article */}
          <article className={styles.article}>
            {Array.isArray(post.content) ? (
              post.content.map((block, i) => {
                if (block.type === 'h2') return <h2 key={i} className={styles.ah2}>{block.text}</h2>;
                if (block.type === 'blockquote') return <blockquote key={i} className={styles.blockquote}>{block.text}</blockquote>;
                return <p key={i} className={styles.ap}>{block.text}</p>;
              })
            ) : (
              post.content?.split('\n\n').map((para, i) => <p key={i} className={styles.ap}>{para}</p>)
            )}

            {/* Tags */}
            <div className={styles.tagRow}>
              {post.tags?.map(t => <Link key={t} to={`/blog?tag=${t}`} className={styles.tag}>{t}</Link>)}
            </div>

            {/* Share */}
            <div className={styles.shareRow}>
              <span className={styles.shareLabel}>Share this post:</span>
              <div className={styles.shareButtons}>
                {['𝕏 Twitter', 'in LinkedIn', 'f Facebook', '🔗 Copy Link'].map(s => (
                  <button key={s} className={styles.shareBtn}>{s}</button>
                ))}
              </div>
            </div>

            {/* Author card */}
            <div className={styles.authorCard}>
              <div className={styles.authorCardAv} style={{background:post.author.avatarColor}}>{post.author.initials}</div>
              <div>
                <div className={styles.authorCardName}>{post.author.name}</div>
                <div className={styles.authorCardRole}>{post.author.role}</div>
                <p className={styles.authorCardBio}>Expert educator and content creator at SkillGro. Passionate about making complex topics approachable for everyone, everywhere.</p>
                <Link to="/instructors" className={styles.authorLink}>View all posts →</Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h4 className={styles.sideTitle}>Table of Contents</h4>
              <div className={styles.toc}>
                {Array.isArray(post.content) ? post.content.filter(b => b.type === 'h2').map((b, i) => (
                  <div key={i} className={styles.tocItem}><span className={styles.tocNum}>{String(i+1).padStart(2,'0')}</span>{b.text}</div>
                )) : null}
              </div>
            </div>

            <div className={styles.sideCard}>
              <h4 className={styles.sideTitle}>About the Author</h4>
              <div className={styles.sideAuthor}>
                <div className={styles.sideAuthorAv} style={{background:post.author.avatarColor}}>{post.author.initials}</div>
                <div className={styles.sideAuthorName}>{post.author.name}</div>
                <div className={styles.sideAuthorRole}>{post.author.role}</div>
              </div>
              <Link to="/instructors" className={styles.viewAllBtn}>View Profile →</Link>
            </div>

            <div className={styles.sideCard}>
              <h4 className={styles.sideTitle}>Tags</h4>
              <div className={styles.tagCloud}>
                {post.tags?.map(t => <Link key={t} to={`/blog?tag=${t}`} className={styles.sideTag}>{t}</Link>)}
              </div>
            </div>

            <div className={styles.ctaBanner}>
              <div style={{fontSize:32,marginBottom:12}}>🎓</div>
              <div className={styles.ctaBannerTitle}>Ready to Learn?</div>
              <p className={styles.ctaBannerText}>Join 36,000+ students on SkillGro.</p>
              <Link to="/courses" className={styles.ctaBannerBtn}>Browse Courses ↗</Link>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {post.relatedPosts?.length > 0 && (
          <div className={styles.related}>
            <h3 className={styles.relatedTitle}>Related Articles</h3>
            <div className={styles.relatedGrid}>
              {post.relatedPosts.map(rp => (
                <Link key={rp.slug} to={`/blog/${rp.slug}`} className={styles.relatedCard}>
                  <div className={styles.relatedCat}>{rp.category}</div>
                  <div className={styles.relatedPostTitle}>{rp.title}</div>
                  <div className={styles.relatedMeta}>{rp.readTime}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}


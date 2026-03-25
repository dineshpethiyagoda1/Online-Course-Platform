import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../utils/api';
import { useReveal } from '../hooks/useReveal';
import styles from './Shop.module.css';

const FALLBACK = [
  { _id:'1', name:'Complete Web Dev Bundle',        emoji:'💻', price:49,  originalPrice:120, badge:'Best Value', rating:4.9, reviewCount:342, category:'Bundles' },
  { _id:'2', name:'Design System Template Kit',     emoji:'🎨', price:29,  originalPrice:60,  badge:'New',        rating:4.7, reviewCount:128, category:'Templates' },
  { _id:'3', name:'Python & Data Science Pack',     emoji:'📊', price:39,  originalPrice:89,  badge:'Hot',        rating:4.8, reviewCount:217, category:'Bundles' },
  { _id:'4', name:'Marketing Playbook PDF',         emoji:'📣', price:19,  originalPrice:39,  badge:'',           rating:4.5, reviewCount:88,  category:'eBooks' },
  { _id:'5', name:'UI Component Library',           emoji:'⚡', price:59,  originalPrice:99,  badge:'Sale',       rating:4.9, reviewCount:456, category:'Templates' },
  { _id:'6', name:'Finance & Investing Workbook',   emoji:'💰', price:14,  originalPrice:29,  badge:'',           rating:4.6, reviewCount:74,  category:'eBooks' },
  { _id:'7', name:'Photography Preset Pack',        emoji:'📸', price:24,  originalPrice:49,  badge:'New',        rating:4.7, reviewCount:163, category:'Resources' },
  { _id:'8', name:'Full-Stack Starter Project',     emoji:'🚀', price:79,  originalPrice:149, badge:'Premium',    rating:5.0, reviewCount:92,  category:'Templates' },
];
const CATEGORIES = ['All','Bundles','Templates','eBooks','Resources'];
const thumbBgs = ['ct1','ct2','ct3','ct4','ct5','ct6','ct1','ct2'];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const bodyRef = useReveal();

  useEffect(() => {
    getProducts({ category: category === 'All' ? '' : category })
      .then(r => setProducts(r.data.products?.length ? r.data.products : FALLBACK))
      .catch(() => setProducts(FALLBACK));
  }, [category]);

  const addToCart = (id) => setCart(prev => prev.includes(id) ? prev : [...prev, id]);

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link> › <span className="current">Shop</span></div>
        <h1 className="page-title">Learning <em>Resources</em><br />& Bundles</h1>
        <p className="page-sub">Premium templates, eBooks, course bundles, and resources to supercharge your skills.</p>
      </div>

      <section className={`${styles.section} reveal`} ref={bodyRef}>
        <div className={styles.topBar}>
          <div className={styles.filters}>
            {CATEGORIES.map(c => (
              <button key={c} className={`${styles.filterBtn} ${category===c?styles.filterActive:''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          {cart.length > 0 && <div className={styles.cartBadge}>🛒 {cart.length} item{cart.length!==1?'s':''} in cart</div>}
        </div>

        <div className={styles.grid}>
          {products.map((p, i) => (
            <div key={p._id} className={styles.card}>
              <div className={`cc-thumb ${thumbBgs[i%6]}`} style={{height:180}}>
                <span style={{fontSize:48,position:'relative',zIndex:1}}>{p.emoji}</span>
                {p.category && <span className="cc-tag">{p.category}</span>}
                {p.badge && <span className={`cc-badge ${p.badge==='Hot'?'badge-hot':p.badge==='Sale'?'badge-sale':p.badge==='New'?'badge-new':'badge-new'}`}>{p.badge}</span>}
              </div>
              <div className={styles.body}>
                <div className={styles.prodName}>{p.name}</div>
                <div className={styles.prodMeta}>
                  <span className="cc-stars">★★★★★</span> {p.rating} ({p.reviewCount} reviews)
                </div>
                <div className={styles.priceRow}>
                  <span className="cc-price">${p.price}</span>
                  {p.originalPrice && <span className="cc-price-old">${p.originalPrice}</span>}
                </div>
                <div style={{display:'flex',gap:8}}>
                  <Link to={`/shop/${p.slug||p.name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} style={{flex:1,textAlign:'center',padding:'10px',border:'1px solid var(--border2)',borderRadius:'10px',fontSize:13,color:'var(--muted)',textDecoration:'none',transition:'all 0.2s'}}>Details</Link>
                  <button
                    className={`${styles.addBtn} ${cart.includes(p._id)?styles.addBtnDone:''}`}
                    onClick={() => addToCart(p._id)}
                    style={{flex:2}}
                  >
                    {cart.includes(p._id) ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}


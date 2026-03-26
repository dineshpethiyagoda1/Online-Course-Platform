import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../utils/api';
import { useReveal } from '../hooks/useReveal';
import styles from './ShopDetail.module.css';

const FALLBACK_PRODUCTS = {
  'ui-design-masterclass-bundle': { _id:'1', title:'UI Design Masterclass Bundle', description:'The ultimate all-in-one bundle for aspiring and mid-level UI designers. Includes everything you need to go from understanding visual principles to shipping production-grade design systems.\n\nThis bundle packs over 40 hours of structured video content, Figma file templates, UI kit components, real-world project prompts, and lifetime access to our private design community. Whether you\'re switching careers or levelling up, this is the most complete resource available.', price:129, originalPrice:249, category:'Design', emoji:'🎨', isDigital:true, rating:4.9, reviewCount:847, badge:'Best Seller',
    includes:['40+ hours of video content','Full Figma component library','20+ real project templates','Private Discord community access','Certificate of completion','Lifetime access + updates'],
    specs:[['Format','Digital Download'],['File Types','MP4, FIG, PDF'],['Skill Level','Beginner → Advanced'],['Access','Lifetime'],['Language','English'],['Last Updated','October 2024']],
    reviews:[
      { av:'S', color:'var(--lime)',    name:'Sarah T.',   rating:5, text:'This bundle completely changed my design career. I went from knowing Figma basics to landing a senior UI role in 6 months.' },
      { av:'M', color:'var(--cyan)',    name:'Marcus L.',  rating:5, text:'The Figma component library alone is worth the price. Extremely well organised and professional.' },
      { av:'P', color:'var(--violet2)', name:'Priya K.',   rating:5, text:'I\'ve bought many design courses. This is the only one I\'ve actually finished — because every lesson feels worth watching.' },
    ],
  },
  'web-dev-toolkit': { _id:'2', title:'Web Dev Pro Toolkit', description:'A comprehensive toolkit for professional front-end and full-stack web developers. Built to solve real problems you face every day on the job — from boilerplate fatigue to component architecture decisions.\n\nIncludes a production-ready Next.js starter, 80+ React components, TypeScript utilities, API integration helpers, and detailed documentation for every module.', price:89, originalPrice:179, category:'Development', emoji:'🛠️', isDigital:true, rating:4.8, reviewCount:612, badge:'Popular',
    includes:['Next.js 14 production starter','80+ typed React components','TypeScript utility library','API integration helpers','Storybook documentation','6 months of updates'],
    specs:[['Format','Digital Download'],['File Types','ZIP, TSX, MD'],['Framework','Next.js 14 + React 18'],['Language','TypeScript'],['License','Commercial use'],['Last Updated','November 2024']],
    reviews:[
      { av:'A', color:'var(--orange)', name:'Alex R.',  rating:5, text:'Saved me literally days of boilerplate setup. The component library is clean, well-typed, and easy to customise.' },
      { av:'J', color:'var(--pink)',   name:'James K.', rating:5, text:'Best dev toolkit I\'ve purchased. The Next.js starter alone is worth triple the price.' },
    ],
  },
};

export default function ShopDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty]         = useState(1);
  const [added, setAdded]     = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const bodyRef = useReveal();

  useEffect(() => {
    getProduct(slug)
      .then(r => setProduct(r.data.product))
      .catch(() => setProduct(FALLBACK_PRODUCTS[slug] || Object.values(FALLBACK_PRODUCTS)[0]))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleAddToCart = () => { setAdded(true); setTimeout(() => setAdded(false), 2500); };
  const discount = product ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const descParas = product?.description?.split('\n\n') || [];

  if (loading) return <div className={styles.loading}>Loading product…</div>;
  if (!product) return <div className={styles.loading}>Product not found.</div>;

  return (
    <>
      {/* ── HERO ── */}
      <div className={styles.hero}>
        <div className={styles.heroOrb} />
        <div className={styles.heroInner}>
          <div className="breadcrumb" style={{position:'relative',zIndex:2}}>
            <Link to="/">Home</Link> › <Link to="/shop">Shop</Link> › <span className="current">{product.title}</span>
          </div>
          <div className={styles.heroContent}>
            {/* Left: product visual */}
            <div className={styles.productVisual}>
              <div className={styles.productEmoji}>{product.emoji}</div>
              {product.badge && <div className={styles.heroBadge}>{product.badge}</div>}
              {product.isDigital && <div className={styles.digitalTag}>⚡ Digital Product</div>}
            </div>

            {/* Right: info */}
            <div className={styles.heroInfo}>
              <div className={styles.heroCat}>{product.category}</div>
              <h1 className={styles.heroTitle}>{product.title}</h1>
              <p className={styles.heroDesc}>{descParas[0]}</p>

              <div className={styles.ratingRow}>
                <span className={styles.stars}>{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5-Math.round(product.rating))}</span>
                <span className={styles.ratingNum}>{product.rating}</span>
                <span className={styles.reviewCount}>({product.reviewCount?.toLocaleString()} reviews)</span>
              </div>

              <div className={styles.priceRow}>
                <span className={styles.price}>${product.price}</span>
                {product.originalPrice && <><span className={styles.origPrice}>${product.originalPrice}</span><span className={styles.discBadge}>-{discount}%</span></>}
              </div>

              <div className={styles.ctaRow}>
                {!product.isDigital && (
                  <div className={styles.qtyControl}>
                    <button onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(q => q+1)}>+</button>
                  </div>
                )}
                <button className={`${styles.addBtn} ${added?styles.addBtnDone:''}`} onClick={handleAddToCart}>
                  {added ? '✓ Added to Cart!' : (product.isDigital ? '⚡ Buy Now ↗' : '🛒 Add to Cart')}
                </button>
              </div>
              <button className={styles.wishBtn}>♡ Add to Wishlist</button>

              {/* Quick includes */}
              <div className={styles.quickIncludes}>
                {(product.includes||[]).slice(0,4).map(inc => (
                  <div key={inc} className={styles.qiItem}><span className={styles.qiCheck}>✓</span>{inc}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className={styles.tabs}>
        {['description','includes','specs','reviews'].map(t => (
          <button key={t} className={`${styles.tab} ${activeTab===t?styles.tabActive:''}`} onClick={()=>setActiveTab(t)}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>

      {/* ── BODY ── */}
      <div className={`${styles.body} reveal`} ref={bodyRef}>
        <div className={styles.bodyGrid}>
          <div>
            {activeTab === 'description' && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>About This Product</h3>
                {descParas.map((p,i) => <p key={i} className={styles.bodyText}>{p}</p>)}
              </div>
            )}

            {activeTab === 'includes' && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>What's Included</h3>
                <div className={styles.includesList}>
                  {(product.includes||[]).map((inc,i) => (
                    <div key={i} className={styles.includeItem}>
                      <div className={styles.includeIcon}>✓</div>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Product Details</h3>
                <div className={styles.specsTable}>
                  {(product.specs||[]).map(([label,val]) => (
                    <div key={label} className={styles.specRow}>
                      <span className={styles.specLabel}>{label}</span>
                      <span className={styles.specVal}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>Customer Reviews</h3>
                <div className={styles.overallRating}>
                  <div className={styles.bigRating}>{product.rating}</div>
                  <div>
                    <div className={styles.bigStars}>{'★'.repeat(Math.round(product.rating))}</div>
                    <div style={{fontSize:12,color:'var(--muted)'}}>{product.reviewCount?.toLocaleString()} reviews</div>
                  </div>
                </div>
                <div className={styles.reviewsList}>
                  {(product.reviews||[]).map(r => (
                    <div key={r.name} className={styles.reviewItem}>
                      <div className={styles.reviewAv} style={{background:r.color}}>{r.av}</div>
                      <div>
                        <div className={styles.reviewTop}>
                          <span className={styles.reviewName}>{r.name}</span>
                          <span className={styles.reviewStars}>{'★'.repeat(r.rating)}</span>
                        </div>
                        <p className={styles.reviewText}>{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky side card */}
          <div className={styles.sideCard}>
            <div className={styles.sidePrice}>${product.price}</div>
            {product.originalPrice && <div className={styles.sideOrig}>${product.originalPrice} <span className={styles.sideDisc}>-{discount}%</span></div>}
            <button className={`${styles.sideBuy} ${added?styles.addBtnDone:''}`} onClick={handleAddToCart}>
              {added ? '✓ Added!' : 'Buy Now ↗'}
            </button>
            <div className={styles.sideIncludes}>
              {(product.includes||[]).map(inc => (
                <div key={inc} className={styles.sideIncItem}><span>✓</span>{inc}</div>
              ))}
            </div>
            <div className={styles.guarantee}>
              <span style={{fontSize:22}}>🔒</span>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:2}}>Secure Purchase</div>
                <div style={{fontSize:11,color:'var(--muted)'}}>30-day money back guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


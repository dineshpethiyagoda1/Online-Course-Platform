import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/api';
import { useReveal } from '../hooks/useReveal';
import styles from './Events.module.css';

const FALLBACK_EVENTS = [
  { _id:'1', title:'Web Dev Conference 2024', description:'Join 500+ developers for a full day of talks, workshops, and networking.', date:new Date('2024-09-15'), time:'9:00 AM – 6:00 PM', location:'New York, USA', isOnline:false, isFree:false, price:49, seats:500, seatsLeft:134, emoji:'💻', category:'Development', badge:'Featured' },
  { _id:'2', title:'UI/UX Design Masterclass', description:'A hands-on 3-hour online masterclass covering modern design systems.', date:new Date('2024-09-20'), time:'2:00 PM – 5:00 PM EST', location:'Online', isOnline:true, isFree:true, price:0, seats:200, seatsLeft:87, emoji:'🎨', category:'Design', badge:'Free' },
  { _id:'3', title:'Digital Marketing Summit', description:'Two days of insights from top marketing leaders and growth hackers.', date:new Date('2024-10-05'), time:'10:00 AM – 4:00 PM', location:'Los Angeles, USA', isOnline:false, isFree:false, price:79, seats:300, seatsLeft:45, emoji:'📣', category:'Marketing', badge:'Selling Fast' },
  { _id:'4', title:'Data Science Bootcamp', description:'Intensive 2-day bootcamp covering Python, ML fundamentals, and data viz.', date:new Date('2024-10-12'), time:'9:00 AM – 5:00 PM', location:'Online', isOnline:true, isFree:false, price:99, seats:150, seatsLeft:62, emoji:'📊', category:'Data Science', badge:'' },
  { _id:'5', title:'Financial Freedom Workshop', description:'Learn to invest, budget, and build wealth with certified financial planners.', date:new Date('2024-10-18'), time:'1:00 PM – 4:00 PM EST', location:'Online', isOnline:true, isFree:true, price:0, seats:400, seatsLeft:213, emoji:'💰', category:'Finance', badge:'Free' },
  { _id:'6', title:'Photography Intensive', description:'A weekend workshop on composition, lighting, and post-processing.', date:new Date('2024-11-02'), time:'10:00 AM – 6:00 PM', location:'Chicago, USA', isOnline:false, isFree:false, price:129, seats:40, seatsLeft:12, emoji:'📸', category:'Photography', badge:'Almost Full' },
];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');
  const bodyRef = useReveal();

  useEffect(() => {
    getEvents()
      .then(r => setEvents(r.data.events?.length ? r.data.events : FALLBACK_EVENTS))
      .catch(() => setEvents(FALLBACK_EVENTS));
  }, []);

  const categories = ['All', ...new Set(FALLBACK_EVENTS.map(e => e.category))];
  const filtered = filter === 'All' ? events : events.filter(e => e.category === filter);

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link> › <span className="current">Events</span></div>
        <h1 className="page-title">Upcoming <em>Events</em></h1>
        <p className="page-sub">Join live workshops, conferences, and masterclasses with world-class educators and industry leaders.</p>
      </div>

      <section className={`${styles.section} reveal`} ref={bodyRef}>
        <div className={styles.filters}>
          {categories.map(c => (
            <button key={c} className={`${styles.filterBtn} ${filter===c?styles.filterActive:''}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div className={styles.grid}>
          {filtered.map(ev => (
            <EventCard key={ev._id} event={ev} />
          ))}
        </div>
      </section>
    </>
  );
}

function EventCard({ event: ev }) {
  const date = new Date(ev.date);
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day   = date.getDate();
  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        <div className={styles.dateBadge}><span className={styles.dateMonth}>{month}</span><span className={styles.dateDay}>{day}</span></div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <span className={styles.emoji}>{ev.emoji}</span>
          <span className={styles.category}>{ev.category}</span>
          {ev.badge && <span className={styles.badge}>{ev.badge}</span>}
        </div>
        <div className={styles.title}>{ev.title}</div>
        <p className={styles.desc}>{ev.description}</p>
        <div className={styles.meta}>
          <span>🕐 {ev.time}</span>
          <span>{ev.isOnline ? '🌐 Online' : `📍 ${ev.location}`}</span>
          {ev.seatsLeft != null && <span>🪑 {ev.seatsLeft} seats left</span>}
        </div>
      </div>
      <div className={styles.cardRight}>
        <div className={styles.price}>{ev.isFree ? <span className={styles.freeTag}>Free</span> : `$${ev.price}`}</div>
        <div style={{display:'flex',gap:8}}>
          <Link to={`/events/${ev._id}`} className={`btn btn-ghost`} style={{padding:'10px 18px',fontSize:13}}>View Details</Link>
          <button className={`btn btn-lime ${styles.regBtn}`}>Register ↗</button>
        </div>
      </div>
    </div>
  );
}

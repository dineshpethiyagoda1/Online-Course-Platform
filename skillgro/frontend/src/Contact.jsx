import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendContact } from '../utils/api';
import { useReveal } from '../hooks/useReveal';
import styles from './Contact.module.css';

const SUBJECTS = ['General Inquiry','Course Support','Billing','Partnership','Other'];

const INFO = [
  { icon:'📍', bg:'rgba(200,255,0,0.1)',  label:'Our Office',  value:'463 7th Ave, NY 10018',     sub:'New York, United States' },
  { icon:'✉️', bg:'rgba(0,212,255,0.1)',  label:'Email Us',    value:'hello@skillgro.com',        sub:'We reply within 24 hours' },
  { icon:'📞', bg:'rgba(123,92,240,0.1)', label:'Call Us',     value:'+123 88 9900 456',           sub:'Mon–Fri, 9am to 6pm EST' },
  { icon:'💬', bg:'rgba(240,92,138,0.1)', label:'Live Chat',   value:'Available Now',             sub:'Avg. response time: 3 min' },
];

const FAQS = [
  { q:'How do I enroll in a course?', a:'Simply browse our course catalogue, click on any course, and hit "Enroll Now". You\'ll gain instant access.' },
  { q:'Can I get a refund if I\'m not satisfied?', a:'Yes! We offer a 30-day money-back guarantee on all purchases. Contact support and we\'ll process it promptly.' },
  { q:'Are the certificates recognized?', a:'Our certificates are industry-recognized and shareable directly to LinkedIn.' },
  { q:'Can I access courses on mobile?', a:'Absolutely. All courses are fully responsive. You can also download lessons for offline viewing.' },
  { q:'How do I become an instructor?', a:'Click "Become a Teacher" in our footer, fill out the application, and we\'ll review your profile within 5 business days.' },
  { q:'Do you offer team or enterprise plans?', a:'Yes! We offer custom enterprise solutions for teams of 5+. Contact us directly for a tailored plan.' },
];

export default function Contact() {
  const [subject, setSubject] = useState('General Inquiry');
  const [form, setForm]   = useState({ firstName:'', lastName:'', email:'', phone:'', message:'' });
  const [sent, setSent]   = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const bodyRef = useReveal();
  const faqRef  = useReveal();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await sendContact({ ...form, subject });
      setSent(true);
    } catch {}
    setLoading(false);
  };

  return (
    <>
      <div className="page-hero">
        <div className="breadcrumb"><Link to="/">Home</Link> › <span className="current">Contact</span></div>
        <h1 className="page-title">Get In <em>Touch</em></h1>
        <p className="page-sub">Have a question, feedback, or just want to say hello? Our team responds within 24 hours.</p>
      </div>

      <section className={`${styles.section} reveal`} ref={bodyRef}>
        <div className={styles.grid}>
          {/* Info col */}
          <div className={styles.infoCol}>
            {INFO.map(info => (
              <div key={info.label} className={styles.infoCard}>
                <div className={styles.infoIcon} style={{ background: info.bg }}>{info.icon}</div>
                <div className={styles.infoLabel}>{info.label}</div>
                <div className={styles.infoValue}>{info.value}</div>
                <div className={styles.infoSub}>{info.sub}</div>
              </div>
            ))}
            <div className={styles.mapCard}>
              <div className={styles.mapGrid} />
              <div className={styles.mapPin}>📍</div>
              <div className={styles.mapAddr}>463 7th Ave, New York, NY 10018</div>
            </div>
          </div>

          {/* Form col */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <div className={styles.formCardTitle}>Send a <em>Message</em></div>
              <p className={styles.formCardSub}>Fill out the form below and we'll get back to you as soon as possible.</p>

              {sent ? (
                <div className={styles.successMsg}>✅ Message sent! We'll get back to you within 24 hours.</div>
              ) : (
                <>
                  <div className={styles.formGroup}>
                    <div className="form-label">Subject</div>
                    <div className={styles.pillRow}>
                      {SUBJECTS.map(s => (
                        <span key={s} className={`${styles.pill} ${subject===s?styles.pillActive:''}`} onClick={()=>setSubject(s)}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.row2}>
                    <div className="form-group"><label className="form-label">First Name</label><input className="form-input" placeholder="John" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} /></div>
                    <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" placeholder="Doe" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} /></div>
                  </div>
                  <div className={styles.row2}>
                    <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
                    <div className="form-group"><label className="form-label">Phone</label><input className="form-input" type="tel" placeholder="+1 (800) 000 0000" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" placeholder="Tell us how we can help you…" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} /></div>
                  <button className={styles.submitBtn} onClick={handleSubmit} disabled={loading}>{loading?'Sending…':'Send Message ↗'}</button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${styles.faqSection} reveal`} ref={faqRef}>
        <div className="sec-chip"><em>✦</em> Quick Answers</div>
        <h2 className="sec-title">Frequently Asked<br />Questions</h2>
        <div className={styles.faqGrid}>
          {FAQS.map((faq, i) => (
            <div key={i} className={`${styles.faqItem} ${openFaq===i?styles.faqOpen:''}`}>
              <div className={styles.faqQ} onClick={() => setOpenFaq(openFaq===i?null:i)}>
                <span className={styles.faqQText}>{faq.q}</span>
                <span className={styles.faqToggle}>{openFaq===i?'×':'+'}</span>
              </div>
              {openFaq===i && <div className={styles.faqA}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

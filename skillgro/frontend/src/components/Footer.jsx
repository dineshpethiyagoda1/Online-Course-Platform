import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="f-logo">Skill<span>Gro</span> <i className="fas fa-sparkles"></i></div>
          <p className="f-desc">Empowering learners worldwide with top-quality courses crafted by the best instructors in every field.</p>
          <div className="f-contact-info">
            <div>📍 463 7th Ave, NY 10018</div>
            <div><a href="mailto:hello@skillgro.com">hello@skillgro.com</a></div>
            <div><a href="tel:+12388990046">+123 88 9900 456</a></div>
          </div>
        </div>
        <div className="f-col">
          <h4>Useful Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">All Courses</Link></li>
            <li><Link to="/instructors">Instructors</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className="f-col">
          <h4>Our Company</h4>
          <ul>
            <li><button>Our Values</button></li>
            <li><button>Advisory Board</button></li>
            <li><button>Become a Teacher</button></li>
            <li><button>Become a Partner</button></li>
            <li><button>Work at SkillGro</button></li>
          </ul>
        </div>
        <div className="f-col">
          <h4>Get In Touch</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><button>Support Center</button></li>
            <li><button>Free Workshop</button></li>
            <li><button>Community</button></li>
            <li><button>Quizlet Plus</button></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          © 2010–2024 skillgro.com. All rights reserved.
          <button>Terms of Use</button>
          <button>Privacy Policy</button>
        </div>
        <div className="f-social">
          <button aria-label="Facebook"><i className="fab fa-facebook-f"></i></button>
          <button aria-label="X"><i className="fab fa-twitter"></i></button>
          <button aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></button>
          <button aria-label="YouTube"><i className="fab fa-youtube"></i></button>
        </div>
      </div>
    </footer>
  );
}


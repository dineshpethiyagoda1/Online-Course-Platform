import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Cursor   from './components/Cursor';
import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import Home             from './pages/Home';
import About            from './pages/About';
import Courses          from './pages/Courses';
import CourseDetail     from './pages/CourseDetail';
import Instructors      from './pages/Instructors';
import InstructorDetail from './pages/InstructorDetail';
import Events           from './pages/Events';
import EventDetail      from './pages/EventDetail';
import Blog             from './pages/Blog';
import BlogDetail       from './pages/BlogDetail';
import Shop             from './pages/Shop';
import ShopDetail       from './pages/ShopDetail';
import Login            from './pages/Login';
import Signup           from './pages/Signup';
import Contact          from './pages/Contact';
import NotFound         from './pages/NotFound';
import './styles/globals.css';

// Pages that don't use the standard layout (no footer padding)
const AUTH_PATHS = ['/login','/signup'];

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 72 }}>{children}</main>
      <Footer />
    </>
  );
}

function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Cursor />
        <Routes>
          <Route path="/"                       element={<Layout><Home /></Layout>} />
          <Route path="/about"                  element={<Layout><About /></Layout>} />
          <Route path="/courses"                element={<Layout><Courses /></Layout>} />
          <Route path="/courses/:slug"          element={<Layout><CourseDetail /></Layout>} />
          <Route path="/instructors"            element={<Layout><Instructors /></Layout>} />
          <Route path="/instructors/:slug"      element={<Layout><InstructorDetail /></Layout>} />
          <Route path="/events"                 element={<Layout><Events /></Layout>} />
          <Route path="/events/:id"             element={<Layout><EventDetail /></Layout>} />
          <Route path="/blog"                   element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:slug"             element={<Layout><BlogDetail /></Layout>} />
          <Route path="/shop"                   element={<Layout><Shop /></Layout>} />
          <Route path="/shop/:slug"             element={<Layout><ShopDetail /></Layout>} />
          <Route path="/contact"                element={<Layout><Contact /></Layout>} />
          <Route path="/login"                  element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/signup"                 element={<AuthLayout><Signup /></AuthLayout>} />
          <Route path="*"                       element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


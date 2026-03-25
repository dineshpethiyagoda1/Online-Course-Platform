import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Attach JWT if present
API.interceptors.request.use(config => {
  const token = localStorage.getItem('skillgro_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──
export const register  = data => API.post('/auth/register', data);
export const login     = data => API.post('/auth/login', data);
export const getMe     = ()   => API.get('/auth/me');
export const updateProfile = data => API.put('/auth/updateprofile', data);

// ── Courses ──
export const getCourses    = params => API.get('/courses', { params });
export const getCourse     = slug   => API.get(`/courses/${slug}`);
export const createCourse  = data   => API.post('/courses', data);
export const updateCourse  = (id, data) => API.put(`/courses/${id}`, data);
export const deleteCourse  = id     => API.delete(`/courses/${id}`);

// ── Instructors ──
export const getInstructors = () => API.get('/instructors');
export const getInstructor  = slug => API.get(`/instructors/${slug}`);

// ── Events ──
export const getEvents = () => API.get('/events');
export const getEvent  = id => API.get(`/events/${id}`);
export const registerEvent = id => API.post(`/events/${id}/register`);

// ── Blog ──
export const getBlogPosts = params => API.get('/blog', { params });
export const getBlogPost  = slug   => API.get(`/blog/${slug}`);

// ── Shop ──
export const getProducts = params => API.get('/shop', { params });
export const getProduct  = slug   => API.get(`/shop/${slug}`);

// ── Enrollments ──
export const enrollCourse      = data      => API.post('/enrollments', data);
export const getMyEnrollments  = ()        => API.get('/enrollments/my');
export const updateProgress    = (id,data) => API.put(`/enrollments/${id}/progress`, data);

// ── Contact ──
export const sendContact = data => API.post('/contact', data);

export default API;


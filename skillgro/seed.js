/**
 * Seed the database with sample data.
 * Run: node backend/seed.js
 */
require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');
const Instructor = require('./backend/models/Instructor');
const Course     = require('./backend/models/Course');
const Event      = require('./backend/models/Event');
const Blog       = require('./backend/models/Blog');
const Product    = require('./backend/models/Product');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear existing
  await Promise.all([Instructor.deleteMany({}), Course.deleteMany({}), Event.deleteMany({}), Blog.deleteMany({}), Product.deleteMany({})]);

  // ── Instructors ──
  const instructors = await Instructor.insertMany([
    { name:'Robert Fox',    initials:'RF', role:'UX Design Lead',     rating:4.8, studentCount:2100, courseCount:12, avatarColor:'linear-gradient(135deg,#a07cf8,#c0a0ff)', bio:'Expert UX designer with 10+ years crafting digital experiences.' },
    { name:'David Millar',  initials:'DM', role:'Web Development',    rating:4.9, studentCount:3500, courseCount:18, avatarColor:'linear-gradient(135deg,#00d4ff,#80eeff)', bio:'Full-stack developer and educator making complexity approachable.' },
    { name:'Jenny Wilson',  initials:'JW', role:'Graphic Design',     rating:4.7, studentCount:1800, courseCount:9,  avatarColor:'linear-gradient(135deg,#c8ff00,#e0ff80)', bio:'Award-winning graphic designer and visual storyteller.' },
    { name:'Wade Warren',   initials:'WW', role:'Digital Marketing',  rating:4.5, studentCount:2600, courseCount:14, avatarColor:'linear-gradient(135deg,#f05c8a,#f090b0)', bio:'Digital marketing strategist who has grown brands from zero to millions.' },
  ]);
  console.log(`✅ Seeded ${instructors.length} instructors`);

  // ── Courses ──
  const courses = await Course.insertMany([
    { title:'Learning JavaScript With Imagination', shortDesc:'Master modern JS from scratch with creative projects.', description:'A comprehensive JavaScript course covering ES6+, async patterns, DOM manipulation, and real-world projects. Perfect for beginners and those looking to solidify their fundamentals.', emoji:'⚡', category:'Development', level:'Beginner', price:29, originalPrice:49, badge:'Hot!', instructor:instructors[1]._id, duration:'11h 20m', rating:4.8, reviewCount:342, enrolledCount:1240, isPublished:true, lessons:[{title:'Intro to JavaScript',duration:'12:00',isFree:true,order:1},{title:'Variables & Types',duration:'18:30',isFree:true,order:2},{title:'Functions & Scope',duration:'22:00',isFree:false,order:3}], whatYouLearn:['Master ES6+ features','Build real-world projects','Understand async/await','DOM manipulation'], requirements:['Basic HTML/CSS knowledge','A computer with internet access'] },
    { title:'The Complete Graphic Design for Beginners', shortDesc:'From zero to professional designer in 70 hours.', description:'Everything you need to become a professional graphic designer. Covers typography, color theory, layout, branding, and industry tools including Figma and Adobe Creative Suite.', emoji:'🎨', category:'Design', level:'Beginner', price:19, originalPrice:39, badge:'New', instructor:instructors[2]._id, duration:'70h 45m', rating:4.5, reviewCount:128, enrolledCount:875, isPublished:true, lessons:[{title:'Design Fundamentals',duration:'15:00',isFree:true,order:1},{title:'Color Theory',duration:'20:00',isFree:false,order:2}], whatYouLearn:['Typography principles','Color theory & brand design','Layout and composition','Figma from scratch'] },
    { title:'Learning Digital Marketing on Facebook', shortDesc:'Master Facebook Ads and organic growth strategies.', description:'A practical course on Facebook and Instagram marketing. Learn to run profitable ad campaigns, build audiences, and grow your brand organically with proven strategies.', emoji:'📣', category:'Marketing', level:'Intermediate', price:15, originalPrice:29, badge:'Sale', instructor:instructors[3]._id, duration:'18h 20m', rating:4.3, reviewCount:88, enrolledCount:643, isPublished:true },
    { title:'Financial Analyst Training & Investing Course', shortDesc:'Learn to analyze stocks and build an investment portfolio.', description:'From reading financial statements to building a diversified investment portfolio. This course covers fundamental analysis, technical analysis, options, and personal finance planning.', emoji:'💰', category:'Finance', level:'All Levels', price:24, originalPrice:null, badge:'', instructor:instructors[0]._id, duration:'18h 20m', rating:4.8, reviewCount:217, enrolledCount:921, isPublished:true },
    { title:'Get Started With UI Design & Tips To Speed', shortDesc:'Professional UI design workflows in Figma.', description:'A hands-on UI design course focusing on design systems, component libraries, prototyping, and developer handoff using Figma.', emoji:'📐', category:'Design', level:'Intermediate', price:19, originalPrice:32, badge:'Hot!', instructor:instructors[0]._id, duration:'11h 20m', rating:5.0, reviewCount:456, enrolledCount:1823, isPublished:true },
    { title:'Master the Fundamentals of Math', shortDesc:'Build a rock-solid foundation in mathematics.', description:'Algebra, calculus, statistics, and logic — covering the mathematical foundations essential for data science, programming, and everyday problem solving.', emoji:'🧮', category:'Mathematics', level:'Beginner', price:12, originalPrice:null, badge:'', instructor:instructors[1]._id, duration:'70h 45m', rating:4.7, reviewCount:163, enrolledCount:492, isPublished:true },
  ]);
  console.log(`✅ Seeded ${courses.length} courses`);

  // ── Events ──
  await Event.insertMany([
    { title:'Web Dev Conference 2024', description:'Join 500+ developers for a full day of talks and workshops.', date:new Date('2024-09-15'), time:'9:00 AM – 6:00 PM', location:'New York, USA', isOnline:false, isFree:false, price:49, seats:500, seatsLeft:134, emoji:'💻', category:'Development', badge:'Featured', instructor:instructors[1]._id },
    { title:'UI/UX Design Masterclass', description:'A hands-on 3-hour online masterclass covering modern design systems.', date:new Date('2024-09-20'), time:'2:00 PM – 5:00 PM EST', location:'Online', isOnline:true, isFree:true, price:0, seats:200, seatsLeft:87, emoji:'🎨', category:'Design', badge:'Free', instructor:instructors[0]._id },
  ]);
  console.log('✅ Seeded events');

  // ── Blog ──
  await Blog.insertMany([
    { title:'Top Web Development Trends to Watch in 2024', excerpt:'From AI-assisted coding to edge-first architecture, here\'s what every developer needs to know.', content:'Full article content...', emoji:'💻', category:'Development', author:{name:'David Millar',initials:'DM',color:'var(--cyan)'}, readTime:'5 min', isPublished:true },
    { title:'7 UX Design Principles Every Designer Must Know', excerpt:'Great design isn\'t just about aesthetics — it\'s about experiences that feel effortless.', content:'Full article content...', emoji:'🎨', category:'Design', author:{name:'Robert Fox',initials:'RF',color:'var(--violet2)'}, readTime:'4 min', isPublished:true },
  ]);
  console.log('✅ Seeded blog posts');

  // ── Products ──
  await Product.insertMany([
    { name:'Complete Web Dev Bundle', emoji:'💻', price:49, originalPrice:120, badge:'Best Value', rating:4.9, reviewCount:342, category:'Bundles', isDigital:true },
    { name:'Design System Template Kit', emoji:'🎨', price:29, originalPrice:60, badge:'New', rating:4.7, reviewCount:128, category:'Templates', isDigital:true },
    { name:'Marketing Playbook PDF', emoji:'📣', price:19, originalPrice:39, badge:'', rating:4.5, reviewCount:88, category:'eBooks', isDigital:true },
  ]);
  console.log('✅ Seeded products');

  await mongoose.disconnect();
  console.log('\n🎉 Database seeded successfully!');
};

seed().catch(err => { console.error(err); process.exit(1); });


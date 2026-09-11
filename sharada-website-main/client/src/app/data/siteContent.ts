import type { ElementType } from "react";
import {
  Award,
  Brain,
  Camera,
  Clock,
  Film,
  Globe,
  Mail,
  MapPin,
  Music2,
  Phone,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

export type Service = {
  id: number;
  Icon: ElementType;
  title: string;
  short: string;
  detail: string;
};

export const SERVICES: Service[] = [
  {
    id: 1,
    Icon: Users,
    title: "Artist Management",
    short: "Strategic career development and audience growth for artists and performers.",
    detail:
      "Strategic career development, digital presence management, audience growth, collaboration opportunities, publicity support, and professional branding for artists and performers.",
  },
  {
    id: 2,
    Icon: Film,
    title: "Film Promotion",
    short: "Marketing campaigns and audience engagement for films and visual media.",
    detail:
      "Marketing campaigns, audience engagement strategies, digital promotions, event support, publicity planning, and campaign execution for films and visual media projects.",
  },
  {
    id: 3,
    Icon: Music2,
    title: "Music Promotion",
    short: "Music launch campaigns, playlist outreach, and fan engagement strategies.",
    detail:
      "Music launch campaigns, playlist outreach, audience development, digital marketing, social media promotion, and fan engagement strategies.",
  },
  {
    id: 4,
    Icon: TrendingUp,
    title: "Digital Marketing",
    short: "Social media management, content strategy, and brand growth initiatives.",
    detail:
      "Social media management, content strategy, campaign management, performance tracking, audience targeting, and brand growth initiatives.",
  },
  {
    id: 5,
    Icon: Globe,
    title: "Website Development",
    short: "Professional websites with modern design and responsive experiences.",
    detail:
      "Professional websites for authors, artists, filmmakers, businesses, startups, and organizations with modern design and responsive experiences.",
  },
  {
    id: 6,
    Icon: Smartphone,
    title: "App Development",
    short: "Custom web applications for scalable audience engagement and growth.",
    detail:
      "Custom web applications and digital platforms designed to support business operations, audience engagement, and scalable growth.",
  },
  {
    id: 7,
    Icon: Brain,
    title: "AI Solutions & Automation",
    short: "AI-powered tools, workflow automation, and intelligent business solutions.",
    detail:
      "Implementation of AI-powered tools, workflow automation, content assistance systems, analytics dashboards, and intelligent business solutions.",
  },
  {
    id: 8,
    Icon: Camera,
    title: "Content Production",
    short: "Creative content for campaigns, presentations, and branded media assets.",
    detail:
      "Development and coordination of creative content including promotional materials, digital campaigns, presentations, and branded media assets.",
  },
  {
    id: 9,
    Icon: Award,
    title: "Brand Building",
    short: "Strong, recognizable public identities for individuals and organizations.",
    detail:
      "Helping individuals and organizations establish strong, recognizable, and authentic public identities through strategic positioning and visual storytelling.",
  },
];

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Presence", to: "/presence" },
];

export const CONTACT = {
  email: "sharadaofficial26@gmail.com",
  phoneLabel: "+91 94034 67083",
  phoneHref: "tel:+919403467083",
  whatsapp: "https://wa.me/919403467083",
  linkedin: "https://www.linkedin.com/in/sharada-681070427",
  maps:
    "https://www.google.com/maps/search/?api=1&query=Mauli%20Residency%20Sargam%20Society%20Warje%20Jakat%20Naka%20Karvenagar%20Pune",
};

export const STATS = [
  { value: 5, suffix: "+", label: "Years Experience", detail: "Across media, branding, and technology" },
  { value: 120, suffix: "+", label: "Happy Clients", detail: "Creators, founders, and growing businesses" },
  { value: 180, suffix: "+", label: "Projects Completed", detail: "Campaigns, websites, launches, and content" },
  { value: 98, suffix: "%", label: "Client Satisfaction", detail: "Built through consistent execution" },
];

export const LOCATIONS = [
  {
    city: "Nanded",
    state: "Maharashtra",
    label: "Regional Presence",
    address: "Nanded, Maharashtra",
    phone: CONTACT.phoneLabel,
    hours: "By appointment",
    desc: "Our founding home in the cultural heartland of Maharashtra, where creativity meets tradition.",
  },
  {
    city: "Pune",
    state: "Maharashtra",
    label: "Current Working Office",
    address: "Mauli Residency, Sargam Society, Warje, Jakat Naka, Karvenagar, Pune",
    phone: CONTACT.phoneLabel,
    hours: "Mon - Sat, 10:00 AM - 7:00 PM",
    desc: "The active Pune base for creative planning, brand work, interviews, technology collaboration, and client conversations.",
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    label: "Regional Presence",
    address: "Hyderabad, Telangana",
    phone: CONTACT.phoneLabel,
    hours: "By appointment",
    desc: "A growing footprint connecting southern creative talent, media opportunities, and startup markets.",
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    label: "Regional Presence",
    address: "Mumbai, Maharashtra",
    phone: CONTACT.phoneLabel,
    hours: "By appointment",
    desc: "A working presence for media, entertainment, brand partnerships, and campaign coordination.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Aarav Kulkarni",
    position: "Independent Filmmaker",
    review:
      "Sharada brought clarity, polish, and momentum to our campaign. The team understood the story and shaped every detail for the audience.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=70",
  },
  {
    name: "Meera Joshi",
    position: "Music Artist",
    review:
      "The launch felt premium from day one. Strategy, content, outreach, and follow-up were handled with rare patience and taste.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=70",
  },
  {
    name: "Rahul Deshmukh",
    position: "Founder, Digital Brand",
    review:
      "Their mix of creative direction and technology thinking helped us build a brand presence that finally matched our ambition.",
    rating: 5,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=70",
  },
];

export const FAQS = [
  {
    question: "Which types of projects does Sharada work on?",
    answer:
      "We support artists, authors, filmmakers, musicians, startups, businesses, and organizations with promotion, branding, content, websites, apps, and AI-enabled workflows.",
  },
  {
    question: "Can Sharada handle both creative and technical work?",
    answer:
      "Yes. The team works across media strategy, visual storytelling, digital marketing, website development, app development, and automation.",
  },
  {
    question: "How do we start a project?",
    answer:
      "Use the Connect button, share your project goals, and the team will follow up with the best next steps for scope, timeline, and collaboration.",
  },
  {
    question: "Do you offer custom packages?",
    answer:
      "Yes. Work is shaped around project needs, audience, timelines, and deliverables rather than one-size-fits-all packages.",
  },
];

export const CONTACT_POINTS = [
  { Icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { Icon: Phone, label: "Phone", value: CONTACT.phoneLabel, href: CONTACT.phoneHref },
  { Icon: MapPin, label: "Office", value: "Currently working in Pune", href: CONTACT.maps },
  { Icon: Clock, label: "Hours", value: "Mon - Sat, 10:00 AM - 7:00 PM", href: null },
];

export const STARTUP_FEATURES = [
  { Icon: Sparkles, label: "Premium creative direction" },
  { Icon: TrendingUp, label: "Growth-focused campaign planning" },
  { Icon: Brain, label: "Technology and AI execution" },
];

import React, { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ChevronDown,
  Clock3,
  Copy,
  Eye,
  Facebook,
  HeartPulse,
  Image,
  IndianRupee,
  Instagram,
  LayoutDashboard,
  Link2,
  MapPin,
  Menu,
  MessageCircle,
  Microscope,
  Palette,
  Phone,
  Plus,
  Save,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  TimerReset,
  Trash2,
  Upload,
  UserRoundCheck,
  X,
  Zap
} from 'lucide-react';

const STORAGE_KEY = 'master-dental-clinics-v1';
const CLINICS_API_PATH = '/api/clinics';

const navItems = [
  ['Experience', '#experience'],
  ['Services', '#services'],
  ['Results', '#results'],
  ['Doctors', '#doctors'],
  ['Contact', '#booking']
];

const iconPool = [Stethoscope, Sparkles, ShieldCheck, Activity, Zap, HeartPulse, Microscope, BadgeCheck];

const themes = {
  lagoon: {
    name: 'Lagoon Premium',
    ink: '#102033',
    teal: '#006d77',
    tealDark: '#033f47',
    mint: '#7acda5',
    coral: '#ef7b45',
    soft: '#eef8f6'
  },
  royal: {
    name: 'Royal Sapphire',
    ink: '#111827',
    teal: '#1d4ed8',
    tealDark: '#172554',
    mint: '#93c5fd',
    coral: '#c59d31',
    soft: '#eff6ff'
  },
  blossom: {
    name: 'Smile Blossom',
    ink: '#231827',
    teal: '#9d174d',
    tealDark: '#4a1028',
    mint: '#f9a8d4',
    coral: '#f97316',
    soft: '#fff1f7'
  },
  graphite: {
    name: 'Graphite Luxe',
    ink: '#111827',
    teal: '#334155',
    tealDark: '#0f172a',
    mint: '#94a3b8',
    coral: '#14b8a6',
    soft: '#f1f5f9'
  }
};

const themeKeys = Object.keys(themes);

const defaultSiteMeta = {
  title: 'Dental Clinic | Modern Dental Care',
  description:
    'Dental Clinic is a modern dental care website for smile design, implants, preventive care, family dentistry, and premium patient experience.',
  image: '/assets/images/hero_premium.png'
};

const genericImportedDefaults = {
  subBrand: 'Modern Dental Care Clinic',
  heroImage: '/assets/images/hero_premium.png',
  backgroundImage: '/assets/images/hero.png',
  clinicImage: '/assets/images/dental-consultation.png',
  highlights: ['Smile consultations', 'Family dentistry', 'Comfort-first visits'],
  stats: [
    { value: '6 Days', label: 'Appointments through the week' },
    { value: 'All Ages', label: 'Family-friendly dental care' },
    { value: 'Digital', label: 'Modern diagnostics and planning' },
    { value: 'Support', label: 'Guided treatment follow-up' }
  ],
  services: [
    {
      title: 'General Dentistry',
      text: 'Consultations, fillings, preventive checkups, scaling, and everyday dental care for all age groups.',
      image: '/assets/images/Teeth-Filling.webp',
      tags: ['Checkups', 'Fillings', 'Preventive']
    },
    {
      title: 'Smile Design and Cosmetic Care',
      text: 'Whitening, bonding, smile corrections, and aesthetic planning for a cleaner and brighter smile.',
      image: '/assets/images/Smile-Designing.webp',
      tags: ['Whitening', 'Aesthetics', 'Smile plan']
    },
    {
      title: 'Implants and Restorative Dentistry',
      text: 'Crowns, bridges, implants, and tooth replacement planning with comfort-focused restorative care.',
      image: '/assets/images/Full-mouth-Rehabilitation-vellore.webp',
      tags: ['Implants', 'Crowns', 'Restorative']
    }
  ],
  doctors: [
    {
      name: 'Clinic Specialist Team',
      role: 'Dental Care Team',
      image: '/assets/images/doctor.jpg',
      bio: 'A modern dental team focused on preventive care, restorative treatment, smile planning, and patient comfort.'
    }
  ],
  gallery: [
    '/assets/images/service-1-premium.png',
    '/assets/images/service-2-premium.png',
    '/assets/images/service-3-premium.png',
    '/assets/images/gallery-1.png'
  ]
};

const seedClinics = [
  {
    id: 'olivian',
    slug: 'olivian-dental-care',
    name: 'Olivian Dental Care',
    subBrand: 'Premium Dental Studio',
    tagline: 'World-class dentistry in Lucknow',
    heroTitle: 'Calm dental care, designed around your smile.',
    heroDescription:
      'A premium multi-speciality clinic for painless treatment, digital smile design, implants, aligners, preventive family care, and emergency dental support.',
    address: 'Akash Enclave Rd, Babhnan Basti, Vrindavan Colony, Lucknow, Uttar Pradesh 226002',
    cityLine: 'Akash Enclave, Vrindavan Colony, Lucknow',
    phone: '08429997388',
    whatsapp: '918429997388',
    email: 'hello@oliviandental.example',
    mapUrl: 'https://www.google.com/maps/search/Olivian+Dental+Care,+Akash+Enclave,+Lucknow',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Olivian+Dental+Care,+Akash+Enclave,+Lucknow&t=&z=15&ie=UTF8&iwloc=&output=embed',
    themeKey: 'lagoon',
    theme: themes.lagoon,
    heroImage: '/assets/images/hero_premium.png',
    backgroundImage: '/assets/images/hero.png',
    clinicImage: '/assets/images/dental-consultation.png',
    logoText: 'OD',
    highlights: ['Sterile clinic', 'Same-day consults', 'Smile previews'],
    stats: [
      { value: '12+', label: 'Years of clinical expertise' },
      { value: '2500+', label: 'Advanced procedures completed' },
      { value: '1.5k+', label: 'Smiles cared for' },
      { value: '24/7', label: 'Emergency guidance' }
    ],
    services: [
      {
        title: 'Painless Root Canal',
        text:
          'Single-sitting and multi-visit RCT options with apex locator precision, rotary endodontics, and comfort-first anesthesia.',
        image: '/assets/images/Root-Canal-Treatment.webp',
        tags: ['Microscope assisted', 'Tooth saving', 'Pain relief']
      },
      {
        title: 'Smile Designing',
        text:
          'Digital smile previews, veneers, whitening, bonding, contouring, and shade planning for a natural premium finish.',
        image: '/assets/images/Smile-Designing.webp',
        tags: ['Digital preview', 'Veneers', 'Whitening']
      },
      {
        title: 'Dental Implants',
        text: 'Implant planning for missing teeth, full-mouth rehabilitation, fixed teeth solutions, and bite restoration.',
        image: '/assets/images/Full-mouth-Rehabilitation-vellore.webp',
        tags: ['Fixed teeth', '3D planning', 'Long-term']
      },
      {
        title: 'Teeth Cleaning & Gum Care',
        text: 'Ultrasonic scaling, polishing, stain removal, gum therapy, and preventive maintenance for fresh healthy smiles.',
        image: '/assets/images/Teeth-Cleaning.webp',
        tags: ['Deep cleaning', 'Gum health', 'Fresh breath']
      },
      {
        title: 'Clear Aligners',
        text: 'Transparent orthodontics for teens and adults with scan-led planning, removable trays, and progress monitoring.',
        image: '/assets/images/Clear-Aligners_Invisalign.webp',
        tags: ['Invisible', 'Removable', 'Comfort fit']
      },
      {
        title: 'Family & Emergency Dentistry',
        text: 'Tooth pain, cavities, chipped teeth, kids dentistry, preventive checkups, and same-day urgent consultations.',
        image: '/assets/images/Teeth-Filling.webp',
        tags: ['Kids friendly', 'Same day', 'Preventive']
      }
    ],
    doctors: [
      {
        name: 'Dr. Shashank Asthana',
        role: 'Lead Dental Surgeon',
        image: '/assets/images/doctor.jpg',
        bio: 'Specialist-led dentistry with a comfort-first approach and modern clinical workflow.'
      },
      {
        name: 'Olivian Specialist Team',
        role: 'Cosmetic, Implant and Family Care',
        image: '/assets/images/dr shashank ashthana.jpg',
        bio: 'A coordinated team for smile design, orthodontics, gum care, restorative dentistry, and follow-ups.'
      }
    ],
    gallery: [
      '/assets/images/service-1-premium.png',
      '/assets/images/service-2-premium.png',
      '/assets/images/service-3-premium.png',
      '/assets/images/gallery-1.png'
    ],
    hours: [
      { day: 'Monday', time: '9:00 AM - 9:00 PM' },
      { day: 'Tuesday', time: '9:00 AM - 9:00 PM' },
      { day: 'Wednesday', time: '9:00 AM - 9:00 PM' },
      { day: 'Thursday', time: '9:00 AM - 9:00 PM' },
      { day: 'Friday', time: '9:00 AM - 9:00 PM' },
      { day: 'Saturday', time: '9:00 AM - 9:00 PM' },
      { day: 'Sunday', time: 'Closed' }
    ],
    social: {
      facebook: '',
      instagram: '',
      youtube: '',
      website: ''
    }
  },
  {
    id: 'true-dental',
    slug: 'true-dental-studio',
    name: 'True Dental Studio',
    subBrand: 'Digital Smile and Implant Centre',
    tagline: 'Precision smiles for modern families',
    heroTitle: 'Digital dentistry with a warm human touch.',
    heroDescription:
      'A boutique dental experience for aligners, implants, whitening, pediatric dentistry, and long-term preventive care.',
    address: 'Gomti Nagar, Lucknow, Uttar Pradesh',
    cityLine: 'Gomti Nagar, Lucknow',
    phone: '09876543210',
    whatsapp: '919876543210',
    email: 'care@truedental.example',
    mapUrl: 'https://www.google.com/maps/search/dental+clinic+Gomti+Nagar+Lucknow',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=dental+clinic+Gomti+Nagar+Lucknow&t=&z=14&ie=UTF8&iwloc=&output=embed',
    themeKey: 'royal',
    theme: themes.royal,
    heroImage: '/assets/images/true dental care i2.png',
    backgroundImage: '/assets/images/service-2.png',
    clinicImage: '/assets/images/process_premium.png',
    logoText: 'TD',
    highlights: ['3D smile planning', 'Implant care', 'Family clinic'],
    stats: [
      { value: '8+', label: 'Years transforming smiles' },
      { value: '900+', label: 'Aligner and cosmetic cases' },
      { value: '4.8', label: 'Patient satisfaction score' },
      { value: '6', label: 'Dedicated treatment rooms' }
    ],
    services: [
      {
        title: 'Digital Smile Design',
        text: 'Face-led planning for whitening, veneers, bonding, and natural-looking cosmetic corrections.',
        image: '/assets/images/Smile-Designing.webp',
        tags: ['Preview', 'Veneers', 'Whitening']
      },
      {
        title: 'Implants and Crowns',
        text: 'Fixed replacement options for missing teeth with careful bite planning and premium ceramic work.',
        image: '/assets/images/Full-mouth-Rehabilitation-vellore.webp',
        tags: ['Fixed teeth', 'Ceramic', 'Bite planning']
      },
      {
        title: 'Kids Dentistry',
        text: 'Gentle cavity care, preventive checkups, habit counseling, fluoride protection, and parent guidance.',
        image: '/assets/images/dental-consultation.png',
        tags: ['Gentle', 'Preventive', 'Parents']
      }
    ],
    doctors: [
      {
        name: 'Dr. Meera Kapoor',
        role: 'Cosmetic Dentist',
        image: '/assets/images/doctor_premium.png',
        bio: 'Focused on digital smile design, patient communication, and aesthetic restorative care.'
      }
    ],
    gallery: ['/assets/images/true dental care i2.png', '/assets/images/blog-1.png', '/assets/images/gallery-2.png'],
    hours: [
      { day: 'Monday - Saturday', time: '10:00 AM - 8:00 PM' },
      { day: 'Sunday', time: 'By appointment' }
    ],
    social: {
      facebook: '',
      instagram: '',
      youtube: '',
      website: ''
    }
  }
];

const experience = [
  {
    icon: CalendarCheck,
    title: 'Book without friction',
    text: 'Call, WhatsApp, or request an appointment with the treatment you need. The clinic team can guide you to the right slot.'
  },
  {
    icon: Microscope,
    title: 'Diagnose with clarity',
    text: 'Digital scans, X-rays, chairside explanation, and transparent treatment options before any procedure begins.'
  },
  {
    icon: Stethoscope,
    title: 'Treat with comfort',
    text: 'Pain-managed anesthesia, sterile protocols, gentle communication, and modern instruments keep the visit calm.'
  },
  {
    icon: BadgeCheck,
    title: 'Follow up properly',
    text: 'Aftercare guidance, review visits, hygiene coaching, and long-term maintenance plans protect the results.'
  }
];

const technology = [
  ['Digital treatment planning', 'Predictable outcomes with imaging-led decisions.'],
  ['Sterilization workflow', 'Modern hygiene protocols for every visit.'],
  ['Comfort anesthesia', 'Pain-managed procedures with calmer chair time.'],
  ['Smile analysis', 'Aesthetic planning for face, teeth, bite, and shade.']
];

const testimonials = [
  {
    name: 'Aditi Sharma',
    treatment: 'Smile design patient',
    quote: 'The team explained every step and the final smile looks natural, not artificial. The clinic feels calm and premium.'
  },
  {
    name: 'Rohit Verma',
    treatment: 'Root canal patient',
    quote: 'I was nervous about pain, but the procedure was smooth. The follow-up care was also very professional.'
  },
  {
    name: 'Nisha Khan',
    treatment: 'Clear aligner patient',
    quote: 'The digital plan made it easy to understand my progress. Appointments were punctual and the staff was kind.'
  }
];

const faqs = [
  ['Is root canal treatment painful?', 'Modern anesthesia and rotary technology make root canals far more comfortable than most patients expect.'],
  ['Do you provide clear aligners?', 'Yes. The clinic evaluates bite, crowding, spacing, and lifestyle before recommending aligners or braces.'],
  ['Can I visit for emergency tooth pain?', 'Yes. Call or WhatsApp the clinic so the team can guide you to the earliest available slot.'],
  ['Do you treat children?', 'Yes. Preventive care, cavities, habit counseling, fluoride support, and family-friendly visits can be managed.'],
  ['How often should I get cleaning done?', 'Most patients benefit from cleaning every six months, but gum condition and lifestyle can change that schedule.']
];

const plans = [
  ['Essential Care', 'Checkup, cleaning, cavity care, gum screening, and preventive guidance.'],
  ['Signature Smile', 'Whitening, bonding, veneers, reshaping, smile design, and aesthetic planning.'],
  ['Rebuild & Restore', 'Implants, crowns, bridges, full-mouth rehabilitation, and bite correction.']
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sameData(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function isAutoGeneratedClinic(clinic) {
  if (clinic.importSource === 'csv-bulk') return true;
  const heroTitle = String(clinic.heroTitle || '').trim();
  const heroDescription = String(clinic.heroDescription || '').trim();

  return (
    heroTitle === `Modern smile care at ${clinic.name}.` &&
    heroDescription ===
      `Book consultations, preventive care, smile design, restorative treatment, and family dentistry with ${clinic.name}.`
  );
}

function removeTemplateBleed(clinic) {
  const next = { ...clinic };
  const generated = isAutoGeneratedClinic(next);
  if (!generated) return next;

  for (const template of seedClinics) {
    if (next.name === template.name) continue;

    if (next.subBrand === template.subBrand) next.subBrand = genericImportedDefaults.subBrand;
    if (next.logoText === template.logoText) next.logoText = buildLogoText(next.name);
    if (next.heroImage === template.heroImage) next.heroImage = genericImportedDefaults.heroImage;
    if (next.backgroundImage === template.backgroundImage) next.backgroundImage = genericImportedDefaults.backgroundImage;
    if (next.clinicImage === template.clinicImage || next.clinicImage === template.heroImage) {
      next.clinicImage = genericImportedDefaults.clinicImage;
    }
    if (sameData(next.highlights, template.highlights)) next.highlights = genericImportedDefaults.highlights;
    if (sameData(next.stats, template.stats)) next.stats = genericImportedDefaults.stats;
    if (sameData(next.services, template.services)) next.services = genericImportedDefaults.services;
    if (sameData(next.doctors, template.doctors)) next.doctors = genericImportedDefaults.doctors;
    if (sameData(next.gallery, template.gallery)) next.gallery = genericImportedDefaults.gallery;
  }

  return next;
}

function normalizeClinic(clinic) {
  const preparedClinic = removeTemplateBleed(clinic);
  const theme = preparedClinic.theme || themes[preparedClinic.themeKey] || themes.lagoon;
  const slug = slugify(preparedClinic.slug || preparedClinic.name || `clinic-${Date.now()}`) || `clinic-${Date.now()}`;

  return {
    ...preparedClinic,
    id: preparedClinic.id || crypto.randomUUID(),
    slug,
    logoText: preparedClinic.logoText || (preparedClinic.name || 'DC').slice(0, 2).toUpperCase(),
    themeKey: preparedClinic.themeKey || 'lagoon',
    theme,
    stats: preparedClinic.stats?.length ? preparedClinic.stats : seedClinics[0].stats,
    services: preparedClinic.services?.length ? preparedClinic.services : seedClinics[0].services,
    doctors: preparedClinic.doctors?.length ? preparedClinic.doctors : seedClinics[0].doctors,
    gallery: preparedClinic.gallery?.length ? preparedClinic.gallery : seedClinics[0].gallery,
    hours: preparedClinic.hours?.length ? preparedClinic.hours : seedClinics[0].hours,
    social: preparedClinic.social || {}
  };
}

const defaultClinic = normalizeClinic({
  ...seedClinics[0],
  id: 'default-dental-clinic',
  slug: 'dental-clinic',
  name: 'Dental Clinic',
  subBrand: 'Modern Dental Care',
  tagline: 'Modern dental care for confident smiles',
  heroTitle: 'Modern dental care, designed around every smile.',
  heroDescription:
    'A premium dental website experience for smile design, implants, preventive care, family dentistry, and trusted consultations.',
  address: 'Clinic address available on request',
  cityLine: 'City, Area',
  phone: '0000000000',
  whatsapp: '910000000000',
  email: 'care@dentalclinic.example',
  mapUrl: 'https://www.google.com/maps/search/dental+clinic',
  mapEmbedUrl: 'https://maps.google.com/maps?q=dental+clinic&t=&z=14&ie=UTF8&iwloc=&output=embed',
  logoText: 'DC',
  highlights: ['Comfort-first care', 'Smile planning', 'Family dentistry'],
  doctors: [
    {
      name: 'Clinic Specialist Team',
      role: 'Dental Care Team',
      image: '/assets/images/doctor.jpg',
      bio: 'A modern dental team focused on comfort, preventive care, smile planning, and guided treatment journeys.'
    }
  ],
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    website: ''
  }
});

function loadClinics() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return seedClinics.map(normalizeClinic);
    const parsed = JSON.parse(saved);
    return parsed.map(normalizeClinic);
  } catch {
    return seedClinics.map(normalizeClinic);
  }
}

function saveClinics(clinics) {
  const normalized = clinics.map(normalizeClinic);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  void saveClinicsToApi(normalized);
}

async function fetchClinicsFromApi() {
  try {
    const response = await fetch(CLINICS_API_PATH, {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) return null;
    const payload = await response.json();
    if (!Array.isArray(payload?.clinics) || !payload.clinics.length) return null;
    return payload.clinics.map(normalizeClinic);
  } catch {
    return null;
  }
}

async function saveClinicsToApi(clinics) {
  try {
    await fetch(CLINICS_API_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ clinics })
    });
  } catch (error) {
    console.error('Unable to persist clinic data to local project storage.', error);
  }
}

function getPublicClinicUrl(slug) {
  const url = new URL(window.location.href);
  url.pathname = `/clinic/${slug}`;
  url.search = '';
  url.hash = '';
  return url.toString();
}

function getAdminUrl() {
  const url = new URL(window.location.href);
  url.pathname = '/';
  url.search = '';
  url.hash = '';
  url.searchParams.set('admin', '1');
  return url.toString();
}

function getClinicSlugFromLocation(locationLike) {
  const pathname = locationLike.pathname || '/';
  const pathMatch = pathname.match(/^\/clinic\/([^/]+)$/);
  if (pathMatch?.[1]) return decodeURIComponent(pathMatch[1]);

  const params = new URLSearchParams(locationLike.search || '');
  return params.get('clinic');
}

function toAbsoluteAssetUrl(value) {
  if (!value) return '';
  try {
    return new URL(value, window.location.origin).toString();
  } catch {
    return value;
  }
}

function buildClinicMeta(clinic) {
  if (!clinic || clinic.name === defaultClinic.name) {
    return {
      title: defaultSiteMeta.title,
      description: defaultSiteMeta.description,
      image: toAbsoluteAssetUrl(defaultSiteMeta.image),
      url: window.location.origin + window.location.pathname
    };
  }

  const titleParts = [clinic.name, clinic.tagline || clinic.subBrand || 'Dental Clinic'].filter(Boolean);
  const title = titleParts.join(' | ');
  const description =
    clinic.heroDescription ||
    `${clinic.name} offers smile design, implants, preventive dentistry, family dental care, and patient-first consultations.`;

  return {
    title,
    description,
    image: toAbsoluteAssetUrl(clinic.heroImage || clinic.clinicImage || defaultSiteMeta.image),
    url: window.location.href
  };
}

function setMetaContent(selector, content) {
  const element = document.querySelector(selector);
  if (!element || !content) return;
  element.setAttribute('content', content);
}

function applyClinicMeta(clinic, isAdmin) {
  if (isAdmin) {
    document.title = 'Master Dental Admin | Clinic Website Manager';
    setMetaContent('meta[name="description"]', 'Manage multiple dental clinic websites, themes, links, and CSV imports.');
    return;
  }

  const meta = buildClinicMeta(clinic);
  document.title = meta.title;
  setMetaContent('meta[name="description"]', meta.description);
  setMetaContent('meta[property="og:title"]', meta.title);
  setMetaContent('meta[property="og:description"]', meta.description);
  setMetaContent('meta[property="og:url"]', meta.url);
  setMetaContent('meta[property="og:image"]', meta.image);
  setMetaContent('meta[name="twitter:title"]', meta.title);
  setMetaContent('meta[name="twitter:description"]', meta.description);
  setMetaContent('meta[name="twitter:image"]', meta.image);
}

function themeStyle(clinic) {
  const theme = clinic.theme || themes[clinic.themeKey] || themes.lagoon;
  return {
    '--ink': theme.ink,
    '--teal': theme.teal,
    '--teal-dark': theme.tealDark,
    '--mint': theme.mint,
    '--coral': theme.coral,
    '--soft': theme.soft,
    '--line': `${theme.teal}24`,
    '--line-strong': `${theme.teal}44`
  };
}

function makeMapEmbed(clinic) {
  if (clinic.mapEmbedUrl) return clinic.mapEmbedUrl;
  const query = encodeURIComponent(clinic.address || clinic.name);
  return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

function MotionSection({ id, className = '', children, ...props }) {
  return (
    <motion.section
      id={id}
      className={className}
      {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  );
}

function SectionIntro({ eyebrow, title, text, align = 'center' }) {
  return (
    <div className={`section-intro ${align === 'left' ? 'section-intro-left' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Header({ clinic }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 24, restDelta: 0.001 });

  return (
    <>
      <div className="progress-wrap">
        <motion.div className="progress-bar" style={{ scaleX }} />
      </div>

      <div className="top-strip">
        <div className="container top-strip-inner">
          <a href={clinic.mapUrl || '#booking'} target="_blank" rel="noreferrer">
            <MapPin size={16} />
            <span>{clinic.cityLine || clinic.address}</span>
          </a>
          <div className="top-actions">
            <a href={`tel:${clinic.phone}`} aria-label="Call clinic">
              <Phone size={16} />
            </a>
            <a href={`https://wa.me/${clinic.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp clinic">
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <nav className="container nav">
          <a className="brand" href="#home" onClick={() => setOpen(false)}>
            <span className="brand-mark">{clinic.logoText}</span>
            <span>
              <strong>{clinic.name}</strong>
              <small>{clinic.subBrand}</small>
            </span>
          </a>

          <div className={`nav-links ${open ? 'open' : ''}`}>
            {navItems.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </div>

          <a className="nav-cta" href="#booking">
            Book Visit
          </a>

          <button className="menu-button" type="button" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>
      </header>
    </>
  );
}

function Hero({ clinic }) {
  return (
    <section className="hero" id="home" style={{ backgroundImage: `linear-gradient(90deg, rgba(251,255,254,.96) 0%, rgba(251,255,254,.72) 48%, rgba(251,255,254,.2) 100%), url("${clinic.backgroundImage || clinic.heroImage}")` }}>
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="eyebrow hero-eyebrow">{clinic.tagline}</span>
          <h1>{clinic.heroTitle}</h1>
          <p>{clinic.heroDescription}</p>

          <div className="hero-actions">
            <a className="button primary" href="#booking">
              Book appointment <ArrowRight size={18} />
            </a>
            <a className="button secondary" href={`tel:${clinic.phone}`}>
              <Phone size={18} />
              Call clinic
            </a>
          </div>

          <div className="hero-assurance" aria-label="Clinic assurance">
            {(clinic.highlights || []).map((item, index) => {
              const Icon = [ShieldCheck, TimerReset, Sparkles][index % 3];
              return (
                <span key={item}>
                  <Icon size={17} />
                  {item}
                </span>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="hero-media"
          initial={{ opacity: 0, x: 38 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <img src={clinic.heroImage || clinic.clinicImage} alt={`${clinic.name} clinic`} />
          <motion.div
            className="floating-panel rating-panel"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Star size={18} fill="currentColor" />
            <div>
              <strong>4.9 patient rating</strong>
              <span>Trusted by local families</span>
            </div>
          </motion.div>
          <motion.div
            className="floating-panel time-panel"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Clock3 size={18} />
            <div>
              <strong>{clinic.hours?.[0]?.time || 'Open today'}</strong>
              <span>{clinic.hours?.[0]?.day || 'Clinic hours'}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="container stat-ribbon">
        {(clinic.stats || []).map(({ value, label }) => (
          <motion.div key={label} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }}>
            <strong>{value}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <MotionSection id="experience" className="experience-section">
      <div className="container split-layout">
        <div>
          <SectionIntro
            align="left"
            eyebrow="Clinic Experience"
            title="A dental visit that feels planned, gentle, and transparent."
            text="Every generated clinic page keeps the premium patient journey, while the admin dashboard changes the brand, content, services, doctors, links, and theme."
          />
          <div className="signature-list">
            {technology.map(([title, text]) => (
              <div key={title}>
                <BadgeCheck size={20} />
                <span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="journey-grid">
          {experience.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="journey-card"
                variants={fadeUp}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <span className="step-count">0{index + 1}</span>
                <Icon size={28} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function Services({ clinic }) {
  return (
    <MotionSection id="services" className="services-section">
      <div className="container">
        <SectionIntro
          eyebrow="Complete Dental Services"
          title={`Treatments available at ${clinic.name}`}
          text="The services below are controlled from the admin dashboard, so each clinic can have its own treatment mix, images, and messaging."
        />

        <div className="services-grid">
          {clinic.services.map((service, index) => {
            const Icon = iconPool[index % iconPool.length];
            return (
              <motion.article
                className="service-card"
                key={`${service.title}-${index}`}
                variants={fadeUp}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10 }}
              >
                <img src={service.image || clinic.clinicImage} alt={service.title} />
                <div className="service-body">
                  <div className="service-title-row">
                    <span className="icon-tile">
                      <Icon size={22} />
                    </span>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.text}</p>
                  <div className="tag-row">
                    {(service.tags || []).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function Results({ clinic }) {
  const [scaling, setScaling] = useState(52);
  const [braces, setBraces] = useState(50);
  const gallery = clinic.gallery?.length ? clinic.gallery : seedClinics[0].gallery;

  return (
    <MotionSection id="results" className="results-section">
      <div className="container">
        <SectionIntro
          eyebrow="Smile Results"
          title="Showcase results, clinic interiors, and patient confidence."
          text="Each clinic page can show its own gallery images while keeping the interactive modern experience."
        />

        <div className="result-grid">
          <ComparisonCard
            title="Scaling and stain removal"
            text="A cleaner, healthier smile after professional ultrasonic scaling and polishing."
            before="/assets/images/before-scaling.png"
            after="/assets/images/after.png"
            value={scaling}
            onChange={setScaling}
          />
          <ComparisonCard
            title="Orthodontic alignment"
            text="Improved alignment and a more balanced smile with planned orthodontic care."
            before="/assets/images/before-braces.png"
            after="/assets/images/after.png"
            value={braces}
            onChange={setBraces}
          />
        </div>

        <div className="gallery-strip">
          {gallery.map((src, index) => (
            <motion.figure key={`${src}-${index}`} whileHover={{ y: -8 }}>
              <img src={src} alt={`${clinic.name} gallery ${index + 1}`} />
              <figcaption>{['Clinic experience', 'Smile result', 'Treatment room', 'Patient care'][index % 4]}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function ComparisonCard({ title, text, before, after, value, onChange }) {
  return (
    <article className="comparison-card">
      <div className="comparison-copy">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="comparison-frame">
        <img src={after} alt={`${title} after`} />
        <div className="before-layer" style={{ width: `${value}%`, backgroundImage: `url(${before})` }} />
        <div className="slider-line" style={{ left: `${value}%` }}>
          <span />
        </div>
        <span className="before-badge">Before</span>
        <span className="after-badge">After</span>
        <input
          aria-label={`${title} before and after slider`}
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </article>
  );
}

function Doctors({ clinic }) {
  const leadDoctor = clinic.doctors?.[0] || seedClinics[0].doctors[0];

  return (
    <MotionSection id="doctors" className="doctors-section">
      <div className="container doctor-layout">
        <div className="doctor-media">
          <img src={leadDoctor.image || clinic.clinicImage} alt={leadDoctor.name} />
          <div className="doctor-card">
            <strong>{leadDoctor.name}</strong>
            <span>{leadDoctor.role}</span>
          </div>
        </div>

        <div>
          <SectionIntro
            align="left"
            eyebrow="Doctor Team"
            title={`${clinic.name} is built around specialist-led care.`}
            text="The admin dashboard can manage doctor names, roles, bios, and images for every clinic website you generate."
          />
          <div className="doctor-points">
            {(clinic.doctors || []).map((doctor, index) => {
              const Icon = [UserRoundCheck, Microscope, IndianRupee][index % 3];
              return (
                <div key={`${doctor.name}-${index}`}>
                  <Icon size={24} />
                  <strong>{doctor.name}</strong>
                  <p>{doctor.bio || doctor.role}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

function Plans({ clinic }) {
  return (
    <MotionSection className="plans-section" style={{ backgroundImage: `linear-gradient(135deg, rgba(3, 63, 71, 0.96), rgba(0, 109, 119, 0.93)), url("${clinic.clinicImage}")` }}>
      <div className="container">
        <SectionIntro
          eyebrow="Treatment Pathways"
          title="Choose the care track that fits your smile goal."
          text="The public page feels like a complete website for every clinic, not only a listing page."
        />

        <div className="plans-grid">
          {plans.map(([title, text], index) => (
            <motion.article key={title} whileHover={{ y: -8 }} className={index === 1 ? 'featured-plan' : ''}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#booking">
                Start consultation <ArrowRight size={17} />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Testimonials() {
  return (
    <MotionSection className="testimonials-section">
      <div className="container">
        <SectionIntro
          eyebrow="Patient Confidence"
          title="A clinic experience patients remember for the right reasons."
          text="Warm communication, visible hygiene, and comfortable treatment turn nervous visitors into long-term patients."
        />

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <motion.article key={item.name} whileHover={{ y: -8 }}>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <p>{item.quote}</p>
              <div>
                <strong>{item.name}</strong>
                <span>{item.treatment}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function Booking({ clinic }) {
  const [service, setService] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get('name');
    const phone = form.get('phone');
    const selected = form.get('service');
    const message = [
      `Hello ${clinic.name}, I want to book an appointment.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${selected}`
    ].join('\n');
    window.open(`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    event.currentTarget.reset();
    setService('');
  }

  return (
    <MotionSection id="booking" className="booking-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(251,255,254,.94), rgba(251,255,254,.76)), url("${clinic.clinicImage}")` }}>
      <div className="container booking-grid">
        <div className="booking-copy">
          <span className="eyebrow">Book Your Visit</span>
          <h2>Ready for a healthier, brighter smile?</h2>
          <p>
            Share details and continue the appointment request on WhatsApp. For urgent tooth pain, call directly for the
            fastest response.
          </p>

          <div className="contact-stack">
            <a href={`tel:${clinic.phone}`}>
              <Phone size={20} />
              <span>
                <strong>Call clinic</strong>
                <small>{clinic.phone}</small>
              </span>
            </a>
            <a href={`https://wa.me/${clinic.whatsapp}`} target="_blank" rel="noreferrer">
              <MessageCircle size={20} />
              <span>
                <strong>WhatsApp support</strong>
                <small>{clinic.whatsapp}</small>
              </span>
            </a>
            <a href={clinic.mapUrl || '#'} target="_blank" rel="noreferrer">
              <MapPin size={20} />
              <span>
                <strong>Visit clinic</strong>
                <small>{clinic.cityLine || clinic.address}</small>
              </span>
            </a>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Your name
            <input name="name" type="text" placeholder="Enter full name" required />
          </label>
          <label>
            Phone number
            <input name="phone" type="tel" placeholder="Enter mobile number" required />
          </label>
          <label>
            Treatment interest
            <select name="service" value={service} onChange={(event) => setService(event.target.value)} required>
              <option value="" disabled>
                Select a service
              </option>
              {clinic.services.map((item) => (
                <option key={item.title}>{item.title}</option>
              ))}
            </select>
          </label>
          <button className="button primary" type="submit">
            Continue on WhatsApp <ArrowRight size={18} />
          </button>
          <small>{clinic.hours?.map((item) => `${item.day}: ${item.time}`).slice(0, 2).join(' | ')}</small>
        </form>
      </div>
    </MotionSection>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <MotionSection className="faq-section">
      <div className="container faq-grid">
        <SectionIntro
          align="left"
          eyebrow="Patient FAQ"
          title="Answers that remove uncertainty before the visit."
          text="Keep every generated clinic page useful for people comparing clinics, preparing for treatment, or searching during tooth pain."
        />

        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <button
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
              type="button"
              key={question}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              <span>
                <strong>{question}</strong>
                {openIndex === index && <small>{answer}</small>}
              </span>
              <ChevronDown size={20} />
            </button>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function MapAndHours({ clinic }) {
  return (
    <MotionSection className="map-section">
      <div className="container map-grid">
        <div className="hours-panel">
          <span className="eyebrow">Clinic Hours</span>
          <h2>Designed for busy families and working professionals.</h2>
          <div className="hours-list">
            {clinic.hours.map((item) => (
              <div key={`${item.day}-${item.time}`}>
                <span>{item.day}</span>
                <strong>{item.time}</strong>
              </div>
            ))}
          </div>
        </div>
        <iframe title={`${clinic.name} map`} src={makeMapEmbed(clinic)} loading="lazy" allowFullScreen />
      </div>
    </MotionSection>
  );
}

function Footer({ clinic }) {
  const social = clinic.social || {};
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark">{clinic.logoText}</span>
            <span>
              <strong>{clinic.name}</strong>
              <small>{clinic.subBrand}</small>
            </span>
          </a>
          <p>{clinic.heroDescription}</p>
        </div>
        <div>
          <h3>Explore</h3>
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>
        <div>
          <h3>Treatments</h3>
          {clinic.services.slice(0, 5).map((service) => (
            <a key={service.title} href="#services">
              {service.title}
            </a>
          ))}
        </div>
        <div>
          <h3>Contact</h3>
          <p>{clinic.address}</p>
          <a href={`tel:${clinic.phone}`}>Phone: {clinic.phone}</a>
          <div className="social-row">
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
            )}
            {social.youtube && (
              <a href={social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <Link2 size={18} />
              </a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noreferrer" aria-label="Website">
                <Link2 size={18} />
              </a>
            )}
            <a href={`https://wa.me/${clinic.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">Copyright 2026 {clinic.name}. All rights reserved.</div>
    </footer>
  );
}

function MobileActions({ clinic }) {
  return (
    <div className="mobile-actions">
      <a href={`tel:${clinic.phone}`}>
        <Phone size={16} />
        Call
      </a>
      <a href={`https://wa.me/${clinic.whatsapp}`} target="_blank" rel="noreferrer">
        <MessageCircle size={16} />
        WhatsApp
      </a>
      <a href="#booking">
        <CalendarCheck size={16} />
        Book
      </a>
    </div>
  );
}

function ClinicSite({ clinic }) {
  return (
    <div className="clinic-site" style={themeStyle(clinic)}>
      <Header clinic={clinic} />
      <main>
        <Hero clinic={clinic} />
        <Experience clinic={clinic} />
        <Services clinic={clinic} />
        <Results clinic={clinic} />
        <Doctors clinic={clinic} />
        <Plans clinic={clinic} />
        <Testimonials clinic={clinic} />
        <FAQ clinic={clinic} />
        <Booking clinic={clinic} />
        <MapAndHours clinic={clinic} />
      </main>
      <Footer clinic={clinic} />
      <MobileActions clinic={clinic} />
    </div>
  );
}

function toLines(items, formatter) {
  return (items || []).map(formatter).join('\n');
}

function parseServices(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title = '', text = '', image = '', tags = ''] = line.split('|').map((part) => part.trim());
      return { title, text, image, tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) };
    })
    .filter((item) => item.title);
}

function parseDoctors(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name = '', role = '', image = '', bio = ''] = line.split('|').map((part) => part.trim());
      return { name, role, image, bio };
    })
    .filter((item) => item.name);
}

function parseStats(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [value = '', label = ''] = line.split('|').map((part) => part.trim());
      return { value, label };
    })
    .filter((item) => item.value);
}

function parseHours(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [day = '', time = ''] = line.split('|').map((part) => part.trim());
      return { day, time };
    })
    .filter((item) => item.day);
}

function parseImages(value) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

const csvFieldAliases = {
  name: ['name', 'clinic', 'clinic_name', 'clinicname'],
  slug: ['slug', 'clinic_slug', 'clinicslug', 'url_slug', 'urlslug'],
  phone: ['phone', 'phone_number', 'phonenumber', 'contact', 'contact_number', 'mobile', 'number'],
  whatsapp: ['whatsapp', 'whatsapp_number', 'whatsappnumber', 'wa_number', 'wanumber'],
  email: ['email', 'mail'],
  address: ['address', 'full_address', 'fulladdress', 'clinic_address', 'clinicaddress', 'location'],
  cityLine: ['city_line', 'cityline', 'city', 'area', 'locality'],
  subBrand: ['sub_brand', 'subbrand', 'brand_line', 'brandline'],
  tagline: ['tagline', 'subtitle'],
  heroTitle: ['hero_title', 'herotitle', 'heading', 'hero_heading', 'heroheading'],
  heroDescription: ['hero_description', 'herodescription', 'about', 'description'],
  mapUrl: ['map_url', 'mapurl', 'google_map_link', 'googlemaplink', 'google_maps_link', 'googlemapslink'],
  mapEmbedUrl: ['map_embed_url', 'mapembedurl', 'google_map_embed', 'googlemapembed', 'google_map_embed_url', 'googlemapembedurl'],
  themeKey: ['theme', 'theme_key', 'themekey'],
  services: ['services', 'service', 'treatments', 'procedures'],
  doctors: ['doctors', 'doctor', 'doctor_names', 'doctornames', 'doctor_name', 'doctorname'],
  doctorRoles: ['doctor_roles', 'doctorroles', 'doctor_role', 'doctorrole'],
  doctorImages: ['doctor_images', 'doctorimages', 'doctor_image', 'doctorimage'],
  doctorBios: ['doctor_bios', 'doctorbios', 'doctor_bio', 'doctorbio'],
  hours: ['hours', 'opening_times', 'openingtimes', 'opening_hours', 'openinghours', 'timings'],
  stats: ['stats', 'numbers'],
  highlights: ['highlights', 'usp', 'usps'],
  heroImage: ['hero_image', 'heroimage', 'banner_image', 'bannerimage'],
  backgroundImage: ['background_image', 'backgroundimage', 'cover_image', 'coverimage'],
  clinicImage: ['clinic_image', 'clinicimage', 'feature_image', 'featureimage'],
  gallery: ['gallery', 'gallery_images', 'galleryimages', 'clinic_gallery', 'clinicgallery', 'images'],
  facebook: ['facebook', 'facebook_link', 'facebooklink'],
  instagram: ['instagram', 'instagram_link', 'instagramlink'],
  youtube: ['youtube', 'youtube_link', 'youtubelink'],
  website: ['website', 'website_link', 'websitelink', 'site']
};

function normalizeHeaderKey(value) {
  return String(value || '')
    .replace(/^\ufeff/, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function digitsOnly(value) {
  return String(value || '').replace(/\D/g, '');
}

function buildLogoText(name) {
  const words = String(name || '')
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  if (!words.length) return 'DC';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0] || ''}${words[1][0] || ''}`.toUpperCase();
}

function splitListValue(value) {
  const normalized = String(value || '').replace(/\r/g, '').trim();
  if (!normalized) return [];
  const blockSplit = normalized
    .split(/\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (blockSplit.length > 1 || normalized.includes('|')) return blockSplit;

  return normalized
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseCsvMatrix(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inQuotes) {
      if (char === '"') {
        if (text[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === ',') {
      row.push(cell);
      cell = '';
      continue;
    }

    if (char === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    if (char !== '\r') {
      cell += char;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((items) => items.some((item) => String(item || '').trim()));
}

function parseCsvRecords(text) {
  const matrix = parseCsvMatrix(text);
  if (!matrix.length) return { headers: [], rows: [] };

  const rawHeaders = matrix[0].map((header) => String(header || '').replace(/^\ufeff/, '').trim());
  const normalizedHeaders = rawHeaders.map(normalizeHeaderKey);

  const rows = matrix
    .slice(1)
    .map((cells) => {
      return normalizedHeaders.reduce((record, header, index) => {
        if (!header) return record;
        record[header] = String(cells[index] || '').trim();
        return record;
      }, {});
    })
    .filter((record) => Object.values(record).some(Boolean));

  return {
    headers: rawHeaders.filter(Boolean),
    rows
  };
}

function getCsvValue(row, aliases) {
  for (const alias of aliases) {
    const value = row[normalizeHeaderKey(alias)];
    if (String(value || '').trim()) return String(value).trim();
  }
  return '';
}

function createUniqueSlug(baseValue, usedSlugs) {
  const base = slugify(baseValue) || 'dental-clinic';
  let candidate = base;
  let counter = 2;

  while (usedSlugs.has(candidate)) {
    candidate = `${base}-${counter}`;
    counter += 1;
  }

  usedSlugs.add(candidate);
  return candidate;
}

function buildMapUrl(name, address) {
  const query = encodeURIComponent([name, address].filter(Boolean).join(', '));
  return `https://www.google.com/maps/search/${query}`;
}

function buildMapEmbedUrl(name, address) {
  const query = encodeURIComponent([name, address].filter(Boolean).join(', '));
  return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

function buildCityLine(address) {
  const parts = String(address || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (!parts.length) return '';
  return parts.slice(-3).join(', ');
}

function buildHoursFromValue(value) {
  if (!String(value || '').trim()) return [];
  if (value.includes('|')) return parseHours(value.replace(/;/g, '\n'));

  return splitListValue(value)
    .map((item, index) => {
      const colonMatch = item.match(/^([^:]+):\s*(.+)$/);
      if (colonMatch && /[a-z]/i.test(colonMatch[1])) {
        return { day: colonMatch[1].trim(), time: colonMatch[2].trim() };
      }

      const dayTimeMatch = item.match(/^([A-Za-z ,&./-]+?)\s+(\d.+)$/);
      if (dayTimeMatch) {
        return { day: dayTimeMatch[1].trim(), time: dayTimeMatch[2].trim() };
      }

      return { day: index === 0 ? 'Hours' : `Hours ${index + 1}`, time: item };
    })
    .filter((entry) => entry.day && entry.time);
}

function buildStatsFromValue(value) {
  if (!String(value || '').trim()) return [];
  if (value.includes('|')) return parseStats(value.replace(/;/g, '\n'));

  return splitListValue(value)
    .map((item, index) => {
      const [left = '', ...rest] = item.split(':');
      if (rest.length) {
        return { value: left.trim(), label: rest.join(':').trim() };
      }

      return { value: `${index + 1}`, label: item };
    })
    .filter((entry) => entry.label);
}

function buildServicesFromValue(value, fallbackServices) {
  if (!String(value || '').trim()) return [];
  if (value.includes('|')) return parseServices(value.replace(/;/g, '\n'));

  const names = splitListValue(value);
  return names.map((title, index) => {
    const fallback = fallbackServices[index % fallbackServices.length];
    return {
      ...fallback,
      title,
      text: `${title} with modern planning, comfort-first treatment, and clear guidance for every visit.`
    };
  });
}

function buildDoctorsFromRow(row, fallbackDoctors, clinicName) {
  const combinedDoctors = getCsvValue(row, csvFieldAliases.doctors);
  if (combinedDoctors && combinedDoctors.includes('|')) {
    return parseDoctors(combinedDoctors.replace(/;/g, '\n'));
  }

  const names = combinedDoctors ? splitListValue(combinedDoctors) : [];
  const roles = splitListValue(getCsvValue(row, csvFieldAliases.doctorRoles));
  const images = splitListValue(getCsvValue(row, csvFieldAliases.doctorImages));
  const bios = splitListValue(getCsvValue(row, csvFieldAliases.doctorBios));

  if (!names.length && !roles.length && !images.length && !bios.length) return [];

  const size = Math.max(names.length, roles.length, images.length, bios.length, 1);
  return Array.from({ length: size }, (_, index) => {
    const fallback = fallbackDoctors[index % fallbackDoctors.length];
    const name = names[index] || `${clinicName} Specialist Team`;
    return {
      ...fallback,
      name,
      role: roles[index] || fallback.role,
      image: images[index] || fallback.image,
      bio: bios[index] || `${name} provides patient-first dental care with modern clinical workflow and guided treatment planning.`
    };
  });
}

function buildGalleryFromRow(row) {
  const heroImage = getCsvValue(row, csvFieldAliases.heroImage);
  const clinicImage = getCsvValue(row, csvFieldAliases.clinicImage);
  const galleryImages = splitListValue(getCsvValue(row, csvFieldAliases.gallery));
  const images = [clinicImage, heroImage, ...galleryImages].filter(Boolean);
  return images.length ? Array.from(new Set(images)) : genericImportedDefaults.gallery;
}

function buildImportedClinicRecord(row, index) {
  const name = getCsvValue(row, csvFieldAliases.name);
  const address = getCsvValue(row, csvFieldAliases.address);
  const phone = getCsvValue(row, csvFieldAliases.phone);

  if (!name && !address && !phone) return null;

  const slug = getCsvValue(row, csvFieldAliases.slug) || name || address || `dental-clinic-${index + 1}`;
  const themeCandidate = slugify(getCsvValue(row, csvFieldAliases.themeKey));
  const themeKey = themes[themeCandidate] ? themeCandidate : themeKeys[index % themeKeys.length];
  const services = buildServicesFromValue(getCsvValue(row, csvFieldAliases.services), genericImportedDefaults.services);
  const doctors = buildDoctorsFromRow(row, genericImportedDefaults.doctors, name || 'Dental Clinic');
  const hours = buildHoursFromValue(getCsvValue(row, csvFieldAliases.hours));
  const stats = buildStatsFromValue(getCsvValue(row, csvFieldAliases.stats));
  const cityLine = getCsvValue(row, csvFieldAliases.cityLine) || buildCityLine(address);
  const whatsapp = digitsOnly(getCsvValue(row, csvFieldAliases.whatsapp)) || (() => {
    const phoneDigits = digitsOnly(phone);
    if (phoneDigits.length === 10) return `91${phoneDigits}`;
    return phoneDigits;
  })();
  const heroImage = getCsvValue(row, csvFieldAliases.heroImage) || genericImportedDefaults.heroImage;
  const clinicImage = getCsvValue(row, csvFieldAliases.clinicImage) || genericImportedDefaults.clinicImage;
  const highlightValues = splitListValue(getCsvValue(row, csvFieldAliases.highlights));
  const topServices = services.length ? services.slice(0, 3).map((service) => service.title) : genericImportedDefaults.highlights;
  const highlightSet = highlightValues.length ? highlightValues : topServices;

  return normalizeClinic({
    importSource: 'csv-bulk',
    id: crypto.randomUUID(),
    slug,
    name: name || `Dental Clinic ${index + 1}`,
    subBrand: getCsvValue(row, csvFieldAliases.subBrand) || genericImportedDefaults.subBrand,
    tagline: getCsvValue(row, csvFieldAliases.tagline) || `Trusted dental care in ${cityLine || 'your city'}`,
    heroTitle: getCsvValue(row, csvFieldAliases.heroTitle) || `Modern smile care at ${name || 'your dental clinic'}.`,
    heroDescription:
      getCsvValue(row, csvFieldAliases.heroDescription) ||
      `Book consultations, preventive care, smile design, restorative treatment, and family dentistry with ${name || 'this clinic'}.`,
    address: address || 'Clinic address here',
    cityLine: cityLine || 'City, Area',
    phone: phone || '0000000000',
    whatsapp: whatsapp || '910000000000',
    email: getCsvValue(row, csvFieldAliases.email) || '',
    mapUrl: getCsvValue(row, csvFieldAliases.mapUrl) || buildMapUrl(name, address),
    mapEmbedUrl: getCsvValue(row, csvFieldAliases.mapEmbedUrl) || buildMapEmbedUrl(name, address),
    themeKey,
    theme: themes[themeKey],
    heroImage,
    backgroundImage: getCsvValue(row, csvFieldAliases.backgroundImage) || genericImportedDefaults.backgroundImage,
    clinicImage,
    logoText: buildLogoText(getCsvValue(row, csvFieldAliases.name) || name),
    highlights: highlightSet.slice(0, 3),
    stats: stats.length ? stats : genericImportedDefaults.stats,
    services: services.length ? services : genericImportedDefaults.services,
    doctors: doctors.length ? doctors : genericImportedDefaults.doctors,
    gallery: buildGalleryFromRow(row),
    hours: hours.length ? hours : seedClinics[0].hours,
    social: {
      facebook: getCsvValue(row, csvFieldAliases.facebook),
      instagram: getCsvValue(row, csvFieldAliases.instagram),
      youtube: getCsvValue(row, csvFieldAliases.youtube),
      website: getCsvValue(row, csvFieldAliases.website)
    }
  });
}

function prepareClinicImports(text) {
  const { headers, rows } = parseCsvRecords(text);
  const importedClinics = rows.map(buildImportedClinicRecord).filter(Boolean);

  return {
    headers,
    rowCount: rows.length,
    importedClinics,
    sampleNames: importedClinics.slice(0, 4).map((clinic) => clinic.name)
  };
}

function mergeImportedClinics(existingClinics, importedClinics) {
  const next = [...existingClinics];
  const usedSlugs = new Set(existingClinics.map((clinic) => clinic.slug));
  const slugIndex = new Map(existingClinics.map((clinic, index) => [clinic.slug, index]));
  let added = 0;
  let updated = 0;
  let firstSelectedId = importedClinics[0]?.id || next[0]?.id;

  importedClinics.forEach((clinic, index) => {
    const baseSlug = slugify(clinic.slug || clinic.name) || `dental-clinic-${index + 1}`;

    if (slugIndex.has(baseSlug)) {
      const existingIndex = slugIndex.get(baseSlug);
      const existingClinic = next[existingIndex];
      const mergedClinic = normalizeClinic({
        ...existingClinic,
        ...clinic,
        id: existingClinic.id,
        slug: baseSlug
      });

      next[existingIndex] = mergedClinic;
      updated += 1;
      if (index === 0) firstSelectedId = mergedClinic.id;
      return;
    }

    const uniqueSlug = createUniqueSlug(baseSlug, usedSlugs);
    const importedClinic = normalizeClinic({ ...clinic, slug: uniqueSlug });
    next.push(importedClinic);
    slugIndex.set(uniqueSlug, next.length - 1);
    added += 1;
    if (index === 0) firstSelectedId = importedClinic.id;
  });

  return { next, added, updated, firstSelectedId };
}

function replaceClinicsWithImport(importedClinics) {
  const usedSlugs = new Set();
  const next = importedClinics.map((clinic, index) => {
    const uniqueSlug = createUniqueSlug(clinic.slug || clinic.name || `dental-clinic-${index + 1}`, usedSlugs);
    return normalizeClinic({ ...clinic, slug: uniqueSlug });
  });

  return {
    next,
    added: next.length,
    updated: 0,
    firstSelectedId: next[0]?.id
  };
}

function createBlankClinic() {
  const id = crypto.randomUUID();
  return normalizeClinic({
    id,
    slug: `new-clinic-${id.slice(0, 4)}`,
    name: 'New Dental Clinic',
    subBrand: 'Premium Dental Website',
    tagline: 'Modern dentistry for confident smiles',
    heroTitle: 'A premium dental experience for every patient.',
    heroDescription:
      'Add this clinic details from the admin dashboard and generate a custom public website link instantly.',
    address: 'Clinic address here',
    cityLine: 'City, Area',
    phone: '0000000000',
    whatsapp: '910000000000',
    email: '',
    mapUrl: '',
    mapEmbedUrl: '',
    themeKey: 'lagoon',
    theme: themes.lagoon,
    heroImage: '/assets/images/hero_premium.png',
    backgroundImage: '/assets/images/hero.png',
    clinicImage: '/assets/images/dental-consultation.png',
    logoText: 'DC',
    highlights: ['Modern care', 'Comfort visit', 'Digital planning'],
    stats: seedClinics[0].stats,
    services: seedClinics[0].services.slice(0, 3),
    doctors: seedClinics[0].doctors.slice(0, 1),
    gallery: seedClinics[0].gallery,
    hours: seedClinics[0].hours,
    social: { facebook: '', instagram: '', youtube: '', website: '' }
  });
}

function AdminDashboard({ clinics, setClinics }) {
  const [selectedId, setSelectedId] = useState(clinics[0]?.id);
  const selectedClinic = clinics.find((clinic) => clinic.id === selectedId) || clinics[0];
  const [draft, setDraft] = useState(selectedClinic);
  const [copied, setCopied] = useState('');
  const [importText, setImportText] = useState('');
  const [importFileName, setImportFileName] = useState('');
  const [importMessage, setImportMessage] = useState('');

  useEffect(() => {
    setDraft(selectedClinic);
  }, [selectedClinic]);

  const publicUrl = draft ? getPublicClinicUrl(draft.slug) : '';
  const importPreview = useMemo(() => {
    if (!importText.trim()) return null;

    try {
      return prepareClinicImports(importText);
    } catch {
      return {
        headers: [],
        rowCount: 0,
        importedClinics: [],
        sampleNames: [],
        error: 'This CSV could not be parsed. Please check the formatting and try again.'
      };
    }
  }, [importText]);

  function updateField(field, value) {
    setDraft((current) => normalizeClinic({ ...current, [field]: value }));
  }

  function updateSocial(field, value) {
    setDraft((current) => normalizeClinic({ ...current, social: { ...current.social, [field]: value } }));
  }

  function updateThemePreset(themeKey) {
    setDraft((current) => normalizeClinic({ ...current, themeKey, theme: themes[themeKey] }));
  }

  function updateThemeColor(field, value) {
    setDraft((current) => normalizeClinic({ ...current, theme: { ...current.theme, [field]: value } }));
  }

  function saveDraft() {
    const normalized = normalizeClinic(draft);
    const next = clinics.map((clinic) => (clinic.id === normalized.id ? normalized : clinic));
    setClinics(next);
    saveClinics(next);
    setSelectedId(normalized.id);
    setDraft(normalized);
    setCopied('Saved');
    setTimeout(() => setCopied(''), 1600);
  }

  function addClinic() {
    const clinic = createBlankClinic();
    const next = [...clinics, clinic];
    setClinics(next);
    saveClinics(next);
    setSelectedId(clinic.id);
  }

  function duplicateClinic() {
    const clone = normalizeClinic({
      ...draft,
      id: crypto.randomUUID(),
      name: `${draft.name} Copy`,
      slug: `${draft.slug}-copy`
    });
    const next = [...clinics, clone];
    setClinics(next);
    saveClinics(next);
    setSelectedId(clone.id);
  }

  function deleteClinic() {
    if (clinics.length <= 1) return;
    const ok = window.confirm(`Delete ${draft.name} from this browser admin dashboard?`);
    if (!ok) return;
    const next = clinics.filter((clinic) => clinic.id !== draft.id);
    setClinics(next);
    saveClinics(next);
    setSelectedId(next[0]?.id);
  }

  function resetSeed() {
    const ok = window.confirm('Reset all local clinic records to the starter demo data?');
    if (!ok) return;
    const next = seedClinics.map(normalizeClinic);
    setClinics(next);
    saveClinics(next);
    setSelectedId(next[0].id);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(publicUrl);
    setCopied('Copied');
    setTimeout(() => setCopied(''), 1600);
  }

  async function handleImportFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setImportText(text);
      setImportFileName(file.name);
      setImportMessage(`Loaded ${file.name}. Review the preview and import when ready.`);
    } catch {
      setImportMessage('That file could not be read. Please try again with a CSV export.');
    }

    event.target.value = '';
  }

  function clearImportDraft() {
    setImportText('');
    setImportFileName('');
    setImportMessage('');
  }

  function runClinicImport(mode) {
    if (!importText.trim()) {
      setImportMessage('Add a CSV file or paste your CSV first.');
      return;
    }

    let prepared;

    try {
      prepared = prepareClinicImports(importText);
    } catch {
      setImportMessage('Import failed because the CSV could not be parsed.');
      return;
    }

    if (!prepared.importedClinics.length) {
      setImportMessage('No clinic rows were found. Make sure the file includes at least a clinic name or address.');
      return;
    }

    if (mode === 'replace') {
      const ok = window.confirm('Replace all current clinic records in this browser with the imported CSV data?');
      if (!ok) return;
    }

    const result =
      mode === 'replace'
        ? replaceClinicsWithImport(prepared.importedClinics)
        : mergeImportedClinics(clinics, prepared.importedClinics);

    setClinics(result.next);
    saveClinics(result.next);
    setSelectedId(result.firstSelectedId || result.next[0]?.id);
    setImportMessage(
      mode === 'replace'
        ? `${result.added} clinic websites created from ${prepared.rowCount} CSV rows.`
        : `${result.added} clinics added and ${result.updated} updated from ${prepared.rowCount} CSV rows.`
    );
  }

  if (!draft) return null;

  return (
    <div className="admin-shell" style={themeStyle(draft)}>
      <aside className="admin-sidebar">
        <a className="brand admin-brand" href={getPublicClinicUrl(draft.slug)}>
          <span className="brand-mark">MD</span>
          <span>
            <strong>Master Dental</strong>
            <small>Clinic Website Manager</small>
          </span>
        </a>

        <button className="admin-add" type="button" onClick={addClinic}>
          <Plus size={18} />
          Add clinic
        </button>

        <div className="clinic-list">
          {clinics.map((clinic) => (
            <button
              type="button"
              key={clinic.id}
              className={clinic.id === draft.id ? 'active' : ''}
              onClick={() => setSelectedId(clinic.id)}
            >
              <strong>{clinic.name}</strong>
              <span>{getPublicClinicUrl(clinic.slug)}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">
              <LayoutDashboard size={15} />
              Admin Dashboard
            </span>
            <h1>Manage multi-clinic websites</h1>
            <p>Create one record per dental clinic, choose a theme, and share the generated public page link.</p>
          </div>
          <div className="admin-top-actions">
            <a className="button secondary" href={publicUrl} target="_blank" rel="noreferrer">
              <Eye size={18} />
              Preview
            </a>
            <button className="button primary" type="button" onClick={saveDraft}>
              <Save size={18} />
              Save
            </button>
          </div>
        </div>

        <section className="admin-card link-card">
          <div>
            <h2>Generated website link</h2>
            <p>Share this URL to render the same premium website with this clinic details and theme.</p>
          </div>
          <div className="generated-link">
            <Link2 size={18} />
            <input value={publicUrl} readOnly />
            <button type="button" onClick={copyLink}>
              <Copy size={17} />
              {copied || 'Copy'}
            </button>
          </div>
        </section>

        <section className="admin-card import-card">
          <div className="import-card-head">
            <div>
              <h2>
                <Upload size={19} />
                Bulk CSV import
              </h2>
              <p>
                Import multiple clinic records in one go and create a dedicated website page for each one. Minimum
                columns: <code>name</code>, <code>phone</code>, <code>address</code>.
              </p>
            </div>
          </div>

          <div className="import-grid">
            <div className="import-inputs">
              <label className="file-picker">
                <span>Choose CSV file</span>
                <input type="file" accept=".csv,text/csv" onChange={handleImportFile} />
              </label>

              <label>
                Paste CSV content
                <textarea
                  className="admin-codearea import-textarea"
                  value={importText}
                  onChange={(event) => {
                    setImportText(event.target.value);
                    if (!importFileName) setImportFileName('Pasted CSV');
                  }}
                  placeholder={'name,phone,address\nClinic One,9876543210,"Area, City, State"\nClinic Two,9123456789,"Area, City, State"'}
                />
              </label>
            </div>

            <div className="import-preview">
              {importPreview?.error ? (
                <p>{importPreview.error}</p>
              ) : importPreview ? (
                <>
                  <div className="import-meta">
                    <strong>{importPreview.importedClinics.length} clinic pages ready</strong>
                    <span>{importFileName || 'Imported CSV'}</span>
                  </div>

                  <div className="import-pills">
                    {importPreview.headers.slice(0, 10).map((header) => (
                      <span key={header}>{header}</span>
                    ))}
                  </div>

                  <ul className="import-list">
                    {importPreview.sampleNames.map((name, index) => (
                      <li key={`${name}-${index}`}>{name}</li>
                    ))}
                  </ul>

                  <p className="admin-help">
                    Optional columns like <code>whatsapp</code>, <code>email</code>, <code>hours</code>, <code>theme</code>,{' '}
                    <code>services</code>, <code>doctors</code>, <code>heroImage</code>, <code>clinicImage</code>,{' '}
                    <code>facebook</code>, and <code>instagram</code> are auto-mapped when present.
                  </p>
                </>
              ) : (
                <p>
                  Load a CSV or paste rows here. Each row becomes its own clinic website entry, with a generated slug,
                  theme, contact setup, and public page link.
                </p>
              )}

              <div className="import-actions">
                <button className="button secondary" type="button" onClick={() => runClinicImport('merge')}>
                  Import and merge
                </button>
                <button className="button primary" type="button" onClick={() => runClinicImport('replace')}>
                  Replace all with import
                </button>
                <button className="button secondary" type="button" onClick={clearImportDraft}>
                  Clear
                </button>
              </div>

              {importMessage ? <p className="import-message">{importMessage}</p> : null}
            </div>
          </div>
        </section>

        <div className="admin-grid">
          <section className="admin-card">
            <h2>Clinic identity</h2>
            <div className="admin-form-grid">
              <label>
                Clinic name
                <input value={draft.name} onChange={(event) => updateField('name', event.target.value)} />
              </label>
              <label>
                URL slug
                <input value={draft.slug} onChange={(event) => updateField('slug', slugify(event.target.value))} />
              </label>
              <label>
                Logo letters
                <input value={draft.logoText} onChange={(event) => updateField('logoText', event.target.value.toUpperCase().slice(0, 3))} />
              </label>
              <label>
                Sub brand
                <input value={draft.subBrand} onChange={(event) => updateField('subBrand', event.target.value)} />
              </label>
              <label className="wide">
                Tagline
                <input value={draft.tagline} onChange={(event) => updateField('tagline', event.target.value)} />
              </label>
              <label className="wide">
                Hero heading
                <input value={draft.heroTitle} onChange={(event) => updateField('heroTitle', event.target.value)} />
              </label>
              <label className="wide">
                Hero paragraph
                <textarea value={draft.heroDescription} onChange={(event) => updateField('heroDescription', event.target.value)} />
              </label>
            </div>
          </section>

          <section className="admin-card">
            <h2>Contact and links</h2>
            <div className="admin-form-grid">
              <label>
                Phone number
                <input value={draft.phone} onChange={(event) => updateField('phone', event.target.value)} />
              </label>
              <label>
                WhatsApp number
                <input value={draft.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} />
              </label>
              <label>
                City line
                <input value={draft.cityLine} onChange={(event) => updateField('cityLine', event.target.value)} />
              </label>
              <label>
                Email
                <input value={draft.email || ''} onChange={(event) => updateField('email', event.target.value)} />
              </label>
              <label className="wide">
                Full address
                <textarea value={draft.address} onChange={(event) => updateField('address', event.target.value)} />
              </label>
              <label className="wide">
                Google map link
                <input value={draft.mapUrl || ''} onChange={(event) => updateField('mapUrl', event.target.value)} />
              </label>
              <label className="wide">
                Google map embed URL
                <input value={draft.mapEmbedUrl || ''} onChange={(event) => updateField('mapEmbedUrl', event.target.value)} />
              </label>
            </div>
          </section>

          <section className="admin-card">
            <h2>
              <Palette size={19} />
              Theme
            </h2>
            <div className="theme-options">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  type="button"
                  key={key}
                  className={draft.themeKey === key ? 'active' : ''}
                  onClick={() => updateThemePreset(key)}
                >
                  <span style={{ background: theme.teal }} />
                  {theme.name}
                </button>
              ))}
            </div>
            <div className="color-grid">
              {[
                ['teal', 'Primary'],
                ['tealDark', 'Dark'],
                ['coral', 'Accent'],
                ['mint', 'Soft accent'],
                ['ink', 'Text']
              ].map(([field, label]) => (
                <label key={field}>
                  {label}
                  <input type="color" value={draft.theme[field]} onChange={(event) => updateThemeColor(field, event.target.value)} />
                </label>
              ))}
            </div>
          </section>

          <section className="admin-card">
            <h2>
              <Image size={19} />
              Images
            </h2>
            <div className="admin-form-grid">
              <label className="wide">
                Hero image URL or local path
                <input value={draft.heroImage || ''} onChange={(event) => updateField('heroImage', event.target.value)} />
              </label>
              <label className="wide">
                Background image URL or local path
                <input value={draft.backgroundImage || ''} onChange={(event) => updateField('backgroundImage', event.target.value)} />
              </label>
              <label className="wide">
                Clinic image URL or local path
                <input value={draft.clinicImage || ''} onChange={(event) => updateField('clinicImage', event.target.value)} />
              </label>
              <label className="wide">
                Gallery images, one URL or path per line
                <textarea
                  value={toLines(draft.gallery, (src) => src)}
                  onChange={(event) => updateField('gallery', parseImages(event.target.value))}
                />
              </label>
            </div>
          </section>

          <section className="admin-card wide-card">
            <h2>Services</h2>
            <p className="admin-help">Format: Service title | Description | Image URL/path | tag one, tag two</p>
            <textarea
              className="admin-codearea"
              value={toLines(draft.services, (item) => `${item.title} | ${item.text} | ${item.image || ''} | ${(item.tags || []).join(', ')}`)}
              onChange={(event) => updateField('services', parseServices(event.target.value))}
            />
          </section>

          <section className="admin-card wide-card">
            <h2>Doctors</h2>
            <p className="admin-help">Format: Doctor name | Role | Image URL/path | Short bio</p>
            <textarea
              className="admin-codearea"
              value={toLines(draft.doctors, (item) => `${item.name} | ${item.role} | ${item.image || ''} | ${item.bio || ''}`)}
              onChange={(event) => updateField('doctors', parseDoctors(event.target.value))}
            />
          </section>

          <section className="admin-card">
            <h2>Opening times and stats</h2>
            <p className="admin-help">Hours format: Day | Time</p>
            <textarea
              className="admin-codearea short"
              value={toLines(draft.hours, (item) => `${item.day} | ${item.time}`)}
              onChange={(event) => updateField('hours', parseHours(event.target.value))}
            />
            <p className="admin-help">Stats format: Value | Label</p>
            <textarea
              className="admin-codearea short"
              value={toLines(draft.stats, (item) => `${item.value} | ${item.label}`)}
              onChange={(event) => updateField('stats', parseStats(event.target.value))}
            />
          </section>

          <section className="admin-card">
            <h2>Social media</h2>
            <div className="admin-form-grid">
              <label className="wide">
                Facebook
                <input value={draft.social?.facebook || ''} onChange={(event) => updateSocial('facebook', event.target.value)} />
              </label>
              <label className="wide">
                Instagram
                <input value={draft.social?.instagram || ''} onChange={(event) => updateSocial('instagram', event.target.value)} />
              </label>
              <label className="wide">
                YouTube
                <input value={draft.social?.youtube || ''} onChange={(event) => updateSocial('youtube', event.target.value)} />
              </label>
              <label className="wide">
                Main website
                <input value={draft.social?.website || ''} onChange={(event) => updateSocial('website', event.target.value)} />
              </label>
            </div>
          </section>
        </div>

        <div className="admin-danger">
          <button type="button" onClick={duplicateClinic}>
            <Copy size={17} />
            Duplicate clinic
          </button>
          <button type="button" onClick={deleteClinic} disabled={clinics.length <= 1}>
            <Trash2 size={17} />
            Delete clinic
          </button>
          <button type="button" onClick={resetSeed}>
            Reset demo data
          </button>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [clinics, setClinics] = useState(loadClinics);
  const [routeKey, setRouteKey] = useState(`${window.location.pathname}${window.location.search}`);

  useEffect(() => {
    function syncRoute() {
      setRouteKey(`${window.location.pathname}${window.location.search}`);
    }
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  useEffect(() => {
    let active = true;

    async function hydrateClinics() {
      const storedClinics = await fetchClinicsFromApi();
      if (!active) return;

      if (storedClinics?.length) {
        setClinics(storedClinics);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedClinics));
        await saveClinicsToApi(storedClinics);
        return;
      }

      await saveClinicsToApi(loadClinics());
    }

    hydrateClinics();

    return () => {
      active = false;
    };
  }, []);

  const routeUrl = useMemo(() => new URL(routeKey, window.location.origin), [routeKey]);
  const params = routeUrl.searchParams;
  const isAdmin = params.get('admin') === '1';
  const requestedSlug = getClinicSlugFromLocation(routeUrl);
  const selectedClinic = useMemo(() => {
    if (!requestedSlug) return defaultClinic;
    return clinics.find((clinic) => clinic.slug === requestedSlug) || defaultClinic;
  }, [clinics, requestedSlug]);

  useEffect(() => {
    applyClinicMeta(selectedClinic, isAdmin);
  }, [selectedClinic, isAdmin]);

  if (isAdmin) {
    return <AdminDashboard clinics={clinics} setClinics={setClinics} />;
  }

  return <ClinicSite clinic={selectedClinic} />;
}

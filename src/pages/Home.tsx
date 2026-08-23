import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  GraduationCap,
  Globe,
  Stethoscope,
  Cpu,
  Briefcase,
  Rocket,
  Ban,
  AlertTriangle,
  TrendingDown,
  Clock,
  DollarSign,
  XCircle,
  AlertOctagon,
  CheckCircle2,
  Building2,
  Microscope,
  FlaskConical,
  Award,
  MapPin,
  Bot,
  Map as MapIcon,
  UserCircle,
  Quote,
  Mail,
  Linkedin,
  ExternalLink,
  Sparkles,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

import heroVideo from "@/assets/video/hero-doctors.mp4";
import medicalVideo from "@/assets/video/medical-lab.mp4";
import engineeringVideo from "@/assets/video/engineering.mp4";
import heroPoster from "@/assets/images/hero-doctors-poster.webp";
import medicalPoster from "@/assets/images/medical-lab-poster.webp";
import engineeringPoster from "@/assets/images/engineering-poster.webp";

import rajProfile from "@/assets/images/raj-profile.webp";
import microscopeImg from "@/assets/images/microscope.webp";
import crisisCanada from "@/assets/images/crisis-canada.webp";
import crisisUsa from "@/assets/images/crisis-usa.webp";
import crisisUk from "@/assets/images/crisis-uk.webp";
import crisisAustralia from "@/assets/images/crisis-australia.webp";
import storyRejection from "@/assets/images/story-rejection.webp";
import storyHall from "@/assets/images/story-hall.webp";
import storyExpiry from "@/assets/images/story-expiry.webp";
import storyStruggle from "@/assets/images/story-struggle.webp";
import pathMedicine from "@/assets/images/path-medicine.webp";
import pathEngineering from "@/assets/images/path-engineering.webp";
import pathCareer from "@/assets/images/path-career.webp";
import pathMba from "@/assets/images/path-mba.webp";
import pathStartup from "@/assets/images/path-startup.webp";
import vetDog from "@/assets/images/vet-dog.webp";
import vetCat from "@/assets/images/vet-cat.webp";
import diplomas from "@/assets/images/diplomas.webp";
import studyDesk from "@/assets/images/study-desk.webp";
import roboticsLab from "@/assets/images/robotics-lab.webp";
import aiResearch from "@/assets/images/ai-research.webp";
import careerPlanning from "@/assets/images/career-planning.webp";
import profileBuilding from "@/assets/images/profile-building.webp";

const BOOKING_FORM = "https://forms.gle/FjFZ1nFMvuFY1MyB9";
const CONTACT_EMAIL = "ai.vet.ml@gmail.com";

/*
 * Success stories stay hidden until real mentee quotes are in.
 * To publish: replace the sample quotes with real ones and set
 * SHOW_TESTIMONIALS to true. To preview on the live site, open
 * the page with ?demo-testimonials appended to the URL.
 */
const SHOW_TESTIMONIALS = false;

const TESTIMONIALS = [
  { quote: "Sample quote — replace with a real mentee's words. Raj mapped out my entire MBBS application to Europe: which countries, which entrance exams, what it would really cost. I'm in my first year now.", name: "Mentee name", detail: "Medicine · Poland", accent: "from-blue-500 to-cyan-400" },
  { quote: "Sample quote — replace with a real mentee's words. After two US visa rejections I almost gave up. The Europe route Raj showed me got me into a TU9 master's with no tuition fees.", name: "Mentee name", detail: "Engineering · Germany", accent: "from-amber-500 to-orange-400" },
  { quote: "Sample quote — replace with a real mentee's words. The CV and LinkedIn overhaul alone was worth it. I signed my first EU job offer three months after graduating.", name: "Mentee name", detail: "Career Roadmap · Netherlands", accent: "from-emerald-500 to-teal-400" },
];
const LINKEDIN = "https://www.linkedin.com/in/nagaraj21/";

/* ---------- helpers ---------- */

function Counter({ to, suffix = "", prefix = "", duration = 1.8 }: { to: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

function BookButton({ label = "Book FREE Consultation", className = "", glow = false, testid = "button-book" }: { label?: string; className?: string; glow?: boolean; testid?: string }) {
  return (
    <a href={BOOKING_FORM} target="_blank" rel="noopener noreferrer">
      <Button size="lg" className={`rounded-full px-8 py-6 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl group ${glow ? "animate-pulse-glow" : ""} ${className}`} data-testid={testid}>
        {label}
        <ArrowUpRight size={18} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Button>
    </a>
  );
}

/* ---------- contact form (FormSubmit -> CONTACT_EMAIL) ---------- */

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          _subject: `[Career Co-Pilot 360] ${data.get("title")}`,
          message: data.get("message"),
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="bg-white rounded-3xl p-10 text-center shadow-2xl" data-testid="form-success">
        <Sparkles size={34} className="mx-auto mb-4 text-accent" />
        <h3 className="font-heading text-2xl font-bold mb-2 text-midnight">Message sent!</h3>
        <p className="text-muted-foreground">Thanks for reaching out. Raj usually replies within a day or two.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white text-zinc-900 rounded-3xl p-8 shadow-2xl space-y-4" data-testid="form-contact">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">Your name <span className="text-red-500" aria-hidden="true">*</span></label>
          <input id="cf-name" name="name" required maxLength={100} className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary transition-colors" placeholder="Aisha Khan" data-testid="input-name" />
        </div>
        <div>
          <label htmlFor="cf-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">Your email <span className="text-red-500" aria-hidden="true">*</span></label>
          <input id="cf-email" name="email" type="email" required maxLength={150} className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary transition-colors" placeholder="you@example.com" data-testid="input-email" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">Subject <span className="text-red-500" aria-hidden="true">*</span></label>
        <input id="cf-title" name="title" required maxLength={150} className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary transition-colors" placeholder="Medicine in Poland, MS in Germany, MBA options..." data-testid="input-title" />
      </div>
      <div>
        <label htmlFor="cf-message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1.5">Message <span className="text-red-500" aria-hidden="true">*</span></label>
        <textarea id="cf-message" name="message" required maxLength={4000} rows={4} className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary transition-colors resize-y" placeholder="Tell me about your background and your goal..." data-testid="input-message"></textarea>
      </div>
      <p className="text-[11px] text-zinc-500"><span className="text-red-500">*</span> All fields are required</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Button type="submit" disabled={status === "sending"} className="rounded-full px-8 py-6 font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60" data-testid="button-form-send">
          {status === "sending" ? "Sending..." : "Send Message"}
          {status !== "sending" && <ArrowUpRight size={16} className="ml-1" />}
        </Button>
        {status === "error" && (
          <span className="text-sm text-red-600" data-testid="text-form-error">
            Something went wrong. Email directly: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </span>
        )}
      </div>
    </form>
  );
}

/* ---------- hero orbit system ---------- */

function OrbitSystem() {
  const ringItems = [
    { ring: 1, icon: Stethoscope, label: "Medicine", color: "from-blue-500 to-cyan-400" },
    { ring: 2, icon: Cpu, label: "Engineering", color: "from-amber-500 to-orange-400" },
    { ring: 3, icon: Briefcase, label: "MBA", color: "from-purple-500 to-fuchsia-400" },
    { ring: 3, icon: Rocket, label: "Startup", color: "from-emerald-500 to-teal-400", offset: true },
  ];

  return (
    <div className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px] xl:w-[560px] xl:h-[560px] mx-auto select-none" aria-hidden="true">
      {/* Dashed SVG rings */}
      <svg viewBox="0 0 460 460" className="absolute inset-0 w-full h-full">
        <circle cx="230" cy="230" r="105" fill="none" stroke="hsl(190 95% 55% / 0.25)" strokeWidth="1" strokeDasharray="4 10" className="animate-ring-dash" />
        <circle cx="230" cy="230" r="160" fill="none" stroke="hsl(230 90% 62% / 0.25)" strokeWidth="1" strokeDasharray="2 8" className="animate-ring-dash" style={{ animationDuration: "12s" }} />
        <circle cx="230" cy="230" r="215" fill="none" stroke="hsl(38 95% 55% / 0.22)" strokeWidth="1" strokeDasharray="6 12" className="animate-ring-dash" style={{ animationDuration: "16s" }} />
      </svg>

      {/* Core halo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 md:w-64 md:h-64 rounded-full bg-cyan-400/10 blur-2xl animate-breathe-core" aria-hidden="true"></div>
      {/* Core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 md:w-52 md:h-52 rounded-full beam-wrap">
        <div className="beam-inner w-[calc(100%-3px)] h-[calc(100%-3px)] rounded-full bg-midnight-light border border-white/10 flex flex-col items-center justify-center gap-1 shadow-[0_0_60px_hsl(190_95%_55%/0.35)]">
          <Sparkles size={26} className="text-accent" />
          <div className="font-heading font-extrabold text-3xl md:text-5xl text-gradient-live leading-none">360°</div>
          <div className="text-[10px] md:text-xs uppercase tracking-[0.34em] text-white/60 mt-1">co-pilot</div>
        </div>
      </div>

      {/* Orbiting chips */}
      {ringItems.map((item, i) => {
        const ringCls = item.ring === 1 ? "inset-[27%] animate-orbit-1" : item.ring === 2 ? "inset-[15%] animate-orbit-2" : "inset-[3%] animate-orbit-3";
        const counterCls = item.ring === 1 ? "animate-counter-1" : item.ring === 2 ? "animate-counter-2" : "animate-counter-3";
        return (
          <div key={i} className={`absolute ${ringCls}`} style={item.offset ? { animationDelay: "-24s" } : undefined}>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
              <div className={counterCls} style={item.offset ? { animationDelay: "-24s" } : undefined}>
                <div className="flex items-center gap-2 glass rounded-full pl-1.5 pr-3.5 py-1.5 shadow-lg">
                  <span className={`w-7 h-7 rounded-full bg-gradient-to-tr ${item.color} flex items-center justify-center text-white`}>
                    <item.icon size={14} />
                  </span>
                  <span className="text-xs font-bold text-white whitespace-nowrap">{item.label}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating fact chips */}
      <div className="absolute -left-2 md:-left-8 top-[18%] glass rounded-2xl px-4 py-2.5 text-xs font-bold text-white animate-float shadow-xl flex items-center gap-2">
        <CheckCircle2 size={14} className="text-emerald-400" /> €0-tuition options
      </div>
      <div className="absolute -right-2 md:-right-8 bottom-[22%] glass rounded-2xl px-4 py-2.5 text-xs font-bold text-white animate-float shadow-xl flex items-center gap-2" style={{ animationDelay: "1.4s" }}>
        <CheckCircle2 size={14} className="text-cyan-400" /> Visa-friendly routes
      </div>
      <div className="absolute left-[30%] -bottom-3 glass rounded-2xl px-4 py-2.5 text-xs font-bold text-white animate-float shadow-xl flex items-center gap-2" style={{ animationDelay: "2.4s" }}>
        <CheckCircle2 size={14} className="text-accent" /> 1-on-1 mentorship
      </div>
    </div>
  );
}

/* ---------- news ticker ---------- */

function NewsTicker() {
  const items = [
    "CANADA: Student permits slashed 35%, further cuts announced",
    "USA: Proposed 4-year visa limits & campus quotas",
    "UK: Dependent visas restricted, fees skyrocketing",
    "AUSTRALIA: Visa rejection rates at historic highs",
    "MEANWHILE IN EUROPE: English-taught programs, tuition from €0",
  ];
  const row = [...items, ...items];
  return (
    <div className="bg-red-950 border-y border-red-500/30 py-2.5 overflow-hidden relative" aria-hidden="true">
      <div className="flex whitespace-nowrap animate-ticker-fast w-max">
        {[...row, ...row].map((item, i) => (
          <span key={i} className={`mx-6 text-xs font-bold tracking-wider uppercase flex items-center gap-2 ${item.startsWith("MEANWHILE") ? "text-emerald-400" : "text-red-200"}`}>
            <span className={`relative flex h-2 w-2 ${item.startsWith("MEANWHILE") ? "" : ""}`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${item.startsWith("MEANWHILE") ? "bg-emerald-400" : "bg-red-500"}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${item.startsWith("MEANWHILE") ? "bg-emerald-400" : "bg-red-500"}`}></span>
            </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- back to top ---------- */

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.25 }}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-cyan-400 text-white shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform"
      data-testid="button-back-to-top"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}

/* ---------- main ---------- */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [heroWord, setHeroWord] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  const heroWords = ["a Doctor", "an Engineer", "a Founder", "a Leader"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroWord((w) => (w + 1) % heroWords.length), 2600);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const newsItems = [
    { country: "Canada", headline: "Student Visa Cap Hit: Permits Slashed by 35%", subtext: "Further 10% reduction announced. Master's & PhDs now included in caps.", icon: Ban, iconColor: "text-red-500", image: crisisCanada },
    { country: "USA", headline: "Proposed 4-Year Visa Limits & Campus Quotas", subtext: "New policies threaten indefinite stay options. H-1B lottery fiercely competitive.", icon: AlertTriangle, iconColor: "text-amber-500", image: crisisUsa },
    { country: "UK", headline: "Dependent Visas Restricted & Fees Skyrocketing", subtext: "Strict bans on bringing family. Post-study work rights under review.", icon: TrendingDown, iconColor: "text-orange-500", image: crisisUk },
    { country: "Australia", headline: "Visa Rejection Rates at Historic Highs", subtext: "Migration overhaul targets international students to cut net migration.", icon: AlertTriangle, iconColor: "text-red-600", image: crisisAustralia },
  ];

  const stories = [
    { image: storyRejection, icon: AlertOctagon, tag: "Crisis Report", color: "text-red-400", headline: "\"I Sold My Family's Land for This Dream, and It's Gone.\"", text: "Thousands face deportation or rejection after investing life savings. New laws in Canada and Australia are leaving families in debt." },
    { image: storyHall, icon: XCircle, tag: "Policy Impact", color: "text-orange-400", headline: "The End of the \"Easy Route\"", text: "Political shifts in the US and UK created a hostile environment. Caps are real, fees are rising, post-study promises are vanishing." },
    { image: storyExpiry, icon: Clock, tag: "Urgent Warning", color: "text-red-500", headline: "Deportation Fears Rise", text: "Students receive 'Leave the Country' notices days after graduation. Grace periods are shrinking; campus stress is at record levels." },
    { image: storyStruggle, icon: DollarSign, tag: "Financial Ruin", color: "text-amber-400", headline: "Hidden Costs of the West", text: "Rent crises push students into cramped, unsafe housing and illegal work hours just to survive. The ROI is no longer guaranteed." },
  ];

  const pathways = [
    { title: "Medicine Admissions", icon: Stethoscope, description: "MBBS / MD in Europe", badge: "English Taught", image: pathMedicine, bar: "from-blue-500 to-cyan-400", features: ["No Donation / Low Fees", "Entrance Exam Prep", "Clinical Rotation Planning", "EU Licensing Support"] },
    { title: "Engineering Masters", icon: Cpu, description: "MS in AI, Robotics & Tech", badge: "Top Ranked", image: pathEngineering, bar: "from-amber-500 to-orange-400", features: ["TU9 Universities Strategy", "Portfolio & GitHub Review", "Research Proposal Editing", "Blocked Account Setup"] },
    { title: "Career Roadmap", icon: GraduationCap, description: "From Student to Professional", badge: "Job Ready", image: pathCareer, bar: "from-emerald-500 to-teal-400", features: ["CV Optimization for EU ATS", "LinkedIn Branding", "Visa & Blue Card Guidance", "Salary Negotiation"] },
    { title: "World-Class MBAs", icon: Briefcase, description: "Top Business Schools in Europe", badge: "Affordable", image: pathMba, bar: "from-purple-500 to-fuchsia-400", features: ["Hidden Scholarship Options", "Part-time Job Guidance", "English-Taught Programs", "Application Strategy"] },
    { title: "Start Your Venture", icon: Rocket, description: "Build the Next Unicorn", badge: "Startup Visa", image: pathStartup, bar: "from-cyan-500 to-blue-400", features: ["Startup Visa Pathways", "Government Grants & Funding", "Incubator Connections", "EU Market Access"] },
  ];

  const universities = [
    { name: "TU Berlin", location: "Germany", desc: "M.Sc. Robotics & AI", border: "border-l-red-500", icon: Building2 },
    { name: "KTH Royal Institute", location: "Sweden", desc: "M.Sc. Autonomous Systems", border: "border-l-blue-500", icon: Building2 },
    { name: "UPWR Wroclaw", location: "Poland", desc: "Veterinary Medicine (DVM)", border: "border-l-emerald-500", icon: Microscope },
    { name: "Aalto University", location: "Finland", desc: "Entrepreneurship Program", border: "border-l-amber-500", icon: Award },
    { name: "IIT Madras & Delhi", location: "India", desc: "Research Scholar", border: "border-l-orange-500", icon: FlaskConical },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">

      {/* Scroll progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-accent origin-left z-[60]" style={{ scaleX: progress }} />

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-midnight/95 backdrop-blur-md shadow-xl py-3" : "bg-transparent py-5"}`}>
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          <button onClick={() => scrollTo("hero")} className="font-heading font-bold text-lg md:text-xl text-white tracking-tight flex items-center gap-2" data-testid="link-logo">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center text-white font-extrabold text-sm">C</span>
            Career Co-Pilot <span className="text-gradient-warm">360</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("crisis")} className="text-sm text-white/80 hover:text-accent transition-colors" data-testid="link-nav-why">Why Europe</button>
            <button onClick={() => scrollTo("pathways")} className="text-sm text-white/80 hover:text-accent transition-colors" data-testid="link-nav-pathways">Pathways</button>
            <button onClick={() => scrollTo("mentor")} className="text-sm text-white/80 hover:text-accent transition-colors" data-testid="link-nav-mentor">Your Mentor</button>
            <button onClick={() => scrollTo("contact")} className="text-sm text-white/80 hover:text-accent transition-colors" data-testid="link-nav-contact">Contact</button>
            <a href={BOOKING_FORM} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full px-6 font-bold bg-accent text-accent-foreground hover:bg-accent/90" data-testid="button-nav-book">
                Free Consultation
              </Button>
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-testid="button-mobile-menu">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-midnight text-white pt-24 px-8 flex flex-col space-y-6 md:hidden">
          <button onClick={() => scrollTo("crisis")} className="text-2xl font-heading text-left" data-testid="link-mobile-why">Why Europe</button>
          <button onClick={() => scrollTo("pathways")} className="text-2xl font-heading text-left" data-testid="link-mobile-pathways">Pathways</button>
          <button onClick={() => scrollTo("mentor")} className="text-2xl font-heading text-left" data-testid="link-mobile-mentor">Your Mentor</button>
          <button onClick={() => scrollTo("contact")} className="text-2xl font-heading text-left" data-testid="link-mobile-contact">Contact</button>
          <a href={BOOKING_FORM} target="_blank" rel="noopener noreferrer" className="pt-2">
            <Button className="rounded-full w-full py-6 text-lg font-bold bg-accent text-accent-foreground" data-testid="button-mobile-book">
              Book FREE Consultation
            </Button>
          </a>
        </div>
      )}

      {/* 1. HERO */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-midnight text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <video autoPlay loop muted playsInline poster={heroPoster} className="w-full h-full object-cover opacity-75">
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/75 to-midnight/25"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/40"></div>
          <div className="absolute inset-0 bg-grid opacity-40"></div>
          <div className="absolute inset-0 bg-stars"></div>
        </div>

        <div className="absolute top-[15%] right-[10%] w-96 h-96 rounded-full bg-primary/25 blur-3xl animate-orb" aria-hidden="true"></div>
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl animate-orb-slow" aria-hidden="true"></div>

        <div className="container mx-auto px-6 md:px-10 relative z-10 pt-28 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-sm font-medium text-cyan-200 mb-8"
              >
                <Sparkles size={14} className="text-accent" />
                Your co-pilot to a European degree
              </motion.div>

              <h1 className="font-heading font-extrabold text-5xl md:text-6xl xl:text-7xl leading-[1.08] mb-6">
                Become
                <span className="block h-[1.15em] overflow-visible">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={heroWord}
                      initial={{ opacity: 0, y: 24, rotateX: 60 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: -24, rotateX: -60 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="text-gradient-warm-live inline-block whitespace-nowrap"
                    >
                      {heroWords[heroWord]}.
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-gradient-live">In Europe.</span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100/85 mb-10 leading-relaxed font-light max-w-xl">
                Hi, I'm Raj. I made this journey myself, from AI labs to medical school, and now I help students like you get into elite, English-taught European programs without breaking the bank. Your dream is closer than you think, and you don't have to figure it out alone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <BookButton glow testid="button-hero-book" />
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo("crisis")}
                  className="rounded-full px-8 py-6 text-base bg-white/5 border-white/25 text-white hover:bg-white/15 hover:text-white"
                  data-testid="button-hero-why"
                >
                  Why Europe, Why Now
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap items-center gap-8 text-white/85"
              >
                {[
                  { icon: GraduationCap, big: <Counter to={100} suffix="%" />, small: "English Taught" },
                  { icon: Globe, big: <Counter to={9} suffix="+" />, small: "Study Destinations" },
                  { icon: Rocket, big: <Counter to={5} />, small: "Career Pathways" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2.5 glass rounded-xl text-accent">
                      <s.icon size={22} />
                    </div>
                    <div>
                      <p className="text-2xl font-heading font-bold text-white leading-none">{s.big}</p>
                      <p className="text-[11px] uppercase tracking-wider text-white/60 mt-1">{s.small}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — orbit system */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <OrbitSystem />
            </motion.div>
          </div>
        </div>

        <motion.button
          onClick={() => scrollTo("crisis")}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 hover:text-accent transition-colors flex flex-col items-center gap-1.5 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
          <span className="w-px h-8 bg-current"></span>
        </motion.button>
      </section>

      {/* Breaking-news ticker */}
      <NewsTicker />

      {/* 2. CRISIS */}
      <section id="crisis" className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div {...reveal} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-5 border border-red-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              Breaking News
            </div>
            <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-zinc-900 mb-5 leading-tight">
              The global education door<br />is <span className="text-red-600 underline decoration-red-300 underline-offset-8">closing.</span>
            </h2>
            <p className="text-lg text-zinc-600">
              Traditional study destinations are tightening their borders. Quotas are shrinking. The "American Dream" is harder to reach than ever.
            </p>
          </motion.div>

          {/* News cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {newsItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotate: index % 2 ? 0.8 : -0.8 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: index * 0.08 }}
                className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg group cursor-default"
              >
                <img src={item.image} alt={item.country} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 flex flex-col justify-end">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-white/80 text-[11px] uppercase tracking-wider bg-black/50 px-2 py-1 rounded backdrop-blur-sm">{item.country}</span>
                    <div className="bg-white rounded-full p-1.5">
                      <item.icon size={20} className={item.iconColor} />
                    </div>
                  </div>
                  <h3 className="font-bold text-white leading-tight mb-1.5">{item.headline}</h3>
                  <p className="text-white/70 text-xs">{item.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Story cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {stories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 200, damping: 22, delay: index * 0.08 }}
                className="relative rounded-2xl overflow-hidden shadow-lg group h-[280px] cursor-default"
              >
                <img src={story.image} alt={story.headline} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 flex flex-col justify-end">
                  <div className={`flex items-center gap-1.5 ${story.color} mb-1.5 font-bold uppercase tracking-wider text-[11px]`}>
                    <story.icon size={15} />
                    <span>{story.tag}</span>
                  </div>
                  <h3 className="text-white font-bold leading-tight mb-1.5 text-[15px]">{story.headline}</h3>
                  <p className="text-zinc-300 text-xs leading-relaxed line-clamp-3">{story.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Transition to solution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative bg-midnight rounded-3xl p-8 md:p-14 overflow-hidden text-center"
          >
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/30 blur-3xl animate-orb" aria-hidden="true"></div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyan-500/20 blur-3xl animate-orb-slow" aria-hidden="true"></div>
            <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true"></div>
            <div className="relative z-10">
              <h3 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-5">
                But don't worry. <span className="text-gradient-live">Europe is ready for you.</span>
              </h3>
              <p className="text-blue-100/75 text-lg max-w-3xl mx-auto mb-9 leading-relaxed">
                While other doors close, Europe stays open: affordable tuition, English-taught programs, and a real need for skilled talent in Engineering and Medicine.
              </p>
              <BookButton glow testid="button-crisis-book" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. PATHWAYS */}
      <section id="pathways" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div {...reveal} className="text-center max-w-3xl mx-auto mb-16">
            <div className="eyebrow text-primary mb-4">Our Services</div>
            <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-zinc-900 mb-5 leading-tight">
              5 ways we help you <span className="text-gradient-live">succeed</span>
            </h2>
            <p className="text-zinc-600 text-lg">
              From medicine and engineering to MBAs and startups: comprehensive guidance for every career path in Europe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {pathways.slice(0, 3).map((p, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 190, damping: 22, delay: index * 0.08 }}
                className="relative h-[520px] rounded-3xl overflow-hidden shadow-xl group"
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${p.bar} z-20`} aria-hidden="true"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/25 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${p.bar} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform`}>
                      <p.icon size={23} />
                    </div>
                    <span className="px-3 py-1 rounded-full glass text-white text-[11px] font-bold uppercase tracking-wide">{p.badge}</span>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <span className="font-heading font-extrabold text-white/25 text-lg">0{index + 1}</span>
                      <h3 className="font-heading text-2xl font-bold text-white">{p.title}</h3>
                      <p className="text-white/75 text-sm">{p.description}</p>
                    </div>
                    <ul className="space-y-2.5 border-t border-white/20 pt-4">
                      {p.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span className="leading-tight">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={BOOKING_FORM} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full rounded-full bg-white text-zinc-900 hover:bg-accent hover:text-accent-foreground font-bold transition-colors" data-testid={`button-apply-${index}`}>
                        Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {pathways.slice(3).map((p, idx) => {
              const index = idx + 3;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: "spring", stiffness: 190, damping: 22, delay: idx * 0.08 }}
                  className="relative h-[520px] rounded-3xl overflow-hidden shadow-xl group"
                >
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${p.bar} z-20`} aria-hidden="true"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/65 to-black/25 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${p.bar} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform`}>
                        <p.icon size={23} />
                      </div>
                      <span className="px-3 py-1 rounded-full glass text-white text-[11px] font-bold uppercase tracking-wide">{p.badge}</span>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <span className="font-heading font-extrabold text-white/25 text-lg">0{index + 1}</span>
                        <h3 className="font-heading text-2xl font-bold text-white">{p.title}</h3>
                        <p className="text-white/75 text-sm">{p.description}</p>
                      </div>
                      <ul className="space-y-2.5 border-t border-white/20 pt-4">
                        {p.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-white/90">
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span className="leading-tight">{f}</span>
                          </li>
                        ))}
                      </ul>
                      <a href={BOOKING_FORM} target="_blank" rel="noopener noreferrer" className="block">
                        <Button className="w-full rounded-full bg-white text-zinc-900 hover:bg-accent hover:text-accent-foreground font-bold transition-colors" data-testid={`button-apply-${index}`}>
                          Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MENTOR (dark) */}
      <section id="mentor" className="py-24 bg-midnight text-white relative overflow-hidden">
        <div className="absolute top-10 right-[-8%] w-[28rem] h-[28rem] rounded-full bg-primary/20 blur-3xl animate-orb" aria-hidden="true"></div>
        <div className="absolute bottom-10 left-[-8%] w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl animate-orb-slow" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-stars opacity-70" aria-hidden="true"></div>

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Profile */}
            <motion.div {...reveal} className="lg:col-span-4 flex justify-center">
              <div className="relative max-w-xs w-full">
                <div className="absolute -inset-3 bg-gradient-to-tr from-primary to-cyan-400 rounded-[2rem] opacity-30 blur-lg animate-float" aria-hidden="true"></div>
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/20">
                  <img src={rajProfile} alt="Nagarajan (Raj)" className="w-full h-auto object-cover" data-testid="img-mentor" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-midnight via-midnight/70 to-transparent p-6 pt-16">
                    <h3 className="font-heading text-xl font-bold text-white">Nagarajan S. <span className="text-gradient-warm">(Raj)</span></h3>
                    <p className="text-cyan-300 text-sm font-medium">AI Engineer & Final Year Veterinary Student</p>
                  </div>
                </div>
                <div className="absolute -right-4 top-6 glass rounded-2xl px-4 py-2.5 text-xs font-bold animate-float flex items-center gap-2" style={{ animationDelay: "1s" }}>
                  <Bot size={15} className="text-accent" /> AI Labs
                </div>
                <div className="absolute -left-5 bottom-24 glass rounded-2xl px-4 py-2.5 text-xs font-bold animate-float flex items-center gap-2" style={{ animationDelay: "2s" }}>
                  <Stethoscope size={15} className="text-accent" /> Operating Theatres
                </div>
              </div>
            </motion.div>

            {/* Copy */}
            <motion.div {...reveal} className="lg:col-span-8">
              <div className="eyebrow text-accent mb-4">Your Mentor</div>
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl mb-6 leading-tight">
                Learned at the best,<br /><span className="text-gradient-live">to guide the best.</span>
              </h2>
              <p className="text-blue-100/80 text-lg leading-relaxed mb-4">
                Hello, I'm <strong className="text-white">Raj</strong>. My journey is unconventional: from high-tech AI labs to veterinary operating theatres. That mix lets me see career paths others miss.
              </p>
              <p className="text-blue-100/80 text-lg leading-relaxed mb-8">
                I help students from <strong className="text-white">Asia and the Middle East</strong> navigate the European admissions landscape. Not just applications: full career strategies aligned with where Medicine and Engineering are actually heading.
              </p>

              {/* Universities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {universities.map((uni, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07, type: "spring", stiffness: 220, damping: 20 }}
                    className={`bg-white/5 border border-white/10 border-l-4 ${uni.border} rounded-xl p-4 backdrop-blur-sm hover:bg-white/10 transition-colors`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <uni.icon size={19} className="text-cyan-300" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 flex items-center gap-1"><MapPin size={10} /> {uni.location}</span>
                    </div>
                    <div className="font-heading font-bold text-sm">{uni.name}</div>
                    <div className="text-xs text-white/60">{uni.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div {...reveal} className="glass rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { big: <>Top <Counter to={50} /></>, small: "Global Rankings" },
                { big: <Counter to={4} />, small: "European Degrees" },
                { big: <Counter to={100} suffix="%" />, small: "Scholarship Success" },
                { big: <Counter to={8} suffix="+" />, small: "Years Abroad" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-heading font-extrabold text-4xl md:text-5xl text-gradient mb-2">{s.big}</div>
                  <div className="text-xs text-white/60 font-bold uppercase tracking-wider">{s.small}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. EUROPE ADVANTAGE */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div {...reveal} className="text-center max-w-3xl mx-auto mb-20">
            <div className="eyebrow text-primary mb-4">The European Advantage</div>
            <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-zinc-900 mb-5 leading-tight">
              World-class education.<br /><span className="text-gradient-live">Unbeatable value.</span>
            </h2>
            <p className="text-zinc-600 text-lg">
              Prestigious universities, rich culture and thriving job markets, at a fraction of US or UK costs.
            </p>
          </motion.div>

          {/* Medicine */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
            <motion.div {...reveal} className="order-2 lg:order-1 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl shadow-lg h-64 overflow-hidden">
                  <video autoPlay loop muted playsInline poster={medicalPoster} className="w-full h-full object-cover">
                    <source src={medicalVideo} type="video/mp4" />
                  </video>
                </div>
                <img src={microscopeImg} alt="Medical research" className="rounded-2xl shadow-lg w-full h-64 object-cover mt-10" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl z-10 animate-float">
                <Microscope className="text-primary w-8 h-8" />
              </div>
            </motion.div>
            <motion.div {...reveal} className="order-1 lg:order-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-4">Medical Admissions</span>
              <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-zinc-900 mb-5">Study Medicine in Europe</h3>
              <p className="text-zinc-600 text-lg mb-6 leading-relaxed">
                English-taught MBBS and MD programs in Poland, Italy and Hungary, without the prohibitive costs of private medical schools.
              </p>
              <ul className="space-y-3.5 mb-8">
                {["Recognized globally (WHO, ECFMG)", "State-of-the-art clinical training facilities", "Affordable tuition (€3k – €12k/year)"].map((li, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    <span className="text-zinc-800 font-medium">{li}</span>
                  </motion.li>
                ))}
              </ul>
              <BookButton testid="button-medicine-book" />
            </motion.div>
          </div>

          {/* Engineering */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...reveal}>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wide mb-4">Engineering & Tech</span>
              <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-zinc-900 mb-5">Master Robotics & AI</h3>
              <p className="text-zinc-600 text-lg mb-6 leading-relaxed">
                Germany, Sweden and the Netherlands are global engineering hubs. Study in innovation capitals at public universities with little to no tuition.
              </p>
              <ul className="space-y-3.5 mb-8">
                {["Leading Technical Universities (TU9, KTH)", "Direct industry connections (Siemens, Volvo)", "18-month post-study work visas"].map((li, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="text-amber-600 w-5 h-5 shrink-0" />
                    <span className="text-zinc-800 font-medium">{li}</span>
                  </motion.li>
                ))}
              </ul>
              <BookButton testid="button-engineering-book" />
            </motion.div>
            <motion.div {...reveal} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl shadow-lg h-64 overflow-hidden mt-10">
                  <video autoPlay loop muted playsInline poster={engineeringPoster} className="w-full h-full object-cover">
                    <source src={engineeringVideo} type="video/mp4" />
                  </video>
                </div>
                <img src={roboticsLab} alt="Robotics lab" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl z-10 animate-float">
                <Cpu className="text-amber-600 w-8 h-8" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. MORE SERVICES */}
      <section className="py-24 bg-zinc-50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 space-y-24">
          {[
            {
              img: aiResearch, imgLabel: "Advanced AI Research Labs", imgIcon: Bot, iconColor: "text-cyan-500",
              badge: "Future Tech", badgeCls: "bg-purple-100 text-purple-700",
              title: "AI & Emerging Technologies",
              body: "Position yourself at the forefront of the technological revolution. Europe is investing billions in AI, Data Science and Green Tech.",
              items: ["Specialized Masters in AI & Data Science", "Access to EU-funded research projects", "Internships at tech giants & startups"],
              check: "text-purple-600", flip: false,
            },
            {
              img: careerPlanning, imgLabel: "Strategic Career Planning", imgIcon: MapIcon, iconColor: "text-emerald-500",
              badge: "Strategic Planning", badgeCls: "bg-emerald-100 text-emerald-700",
              title: "Your Personal Career Roadmap",
              body: "Don't just study. Build a career: a tailored roadmap from your first semester to your first full-time job offer in Europe.",
              items: ["Semester-by-semester skill acquisition", "Networking strategies for introverts & extroverts", "Targeting the right industries and cities"],
              check: "text-emerald-600", flip: true,
            },
            {
              img: profileBuilding, imgLabel: "World-Class Branding", imgIcon: UserCircle, iconColor: "text-amber-500",
              badge: "Global Standards", badgeCls: "bg-amber-100 text-amber-700",
              title: "Upgrade Your Profile",
              body: "To compete globally, you need to look the part. We transform your CV, LinkedIn and portfolio to European and international standards.",
              items: ["ATS-optimized CV rewriting", "LinkedIn personal branding overhaul", "Portfolio creation for tech & creative roles"],
              check: "text-amber-600", flip: false,
            },
          ].map((block, bi) => (
            <div key={bi} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div {...reveal} className={block.flip ? "order-1" : "order-2 lg:order-1"}>
                {block.flip ? (
                  <>
                    <span className={`inline-block px-3 py-1 rounded-full ${block.badgeCls} text-xs font-bold uppercase tracking-wide mb-4`}>{block.badge}</span>
                    <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-zinc-900 mb-5">{block.title}</h3>
                    <p className="text-zinc-600 text-lg mb-6 leading-relaxed">{block.body}</p>
                    <ul className="space-y-3.5 mb-8">
                      {block.items.map((li, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className={`${block.check} w-5 h-5 shrink-0`} />
                          <span className="text-zinc-800 font-medium">{li}</span>
                        </li>
                      ))}
                    </ul>
                    <BookButton testid={`button-service-${bi}`} />
                  </>
                ) : (
                  <div className="relative rounded-3xl shadow-xl overflow-hidden group">
                    <img src={block.img} alt={block.imgLabel} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="glass p-4 rounded-2xl">
                        <p className="text-white font-medium flex items-center gap-2">
                          <block.imgIcon className={block.iconColor} /> {block.imgLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
              <motion.div {...reveal} className={block.flip ? "order-2" : "order-1 lg:order-2"}>
                {block.flip ? (
                  <div className="relative rounded-3xl shadow-xl overflow-hidden group">
                    <img src={block.img} alt={block.imgLabel} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="glass p-4 rounded-2xl">
                        <p className="text-white font-medium flex items-center gap-2">
                          <block.imgIcon className={block.iconColor} /> {block.imgLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className={`inline-block px-3 py-1 rounded-full ${block.badgeCls} text-xs font-bold uppercase tracking-wide mb-4`}>{block.badge}</span>
                    <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-zinc-900 mb-5">{block.title}</h3>
                    <p className="text-zinc-600 text-lg mb-6 leading-relaxed">{block.body}</p>
                    <ul className="space-y-3.5 mb-8">
                      {block.items.map((li, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className={`${block.check} w-5 h-5 shrink-0`} />
                          <span className="text-zinc-800 font-medium">{li}</span>
                        </li>
                      ))}
                    </ul>
                    <BookButton testid={`button-service-${bi}`} />
                  </>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. JOURNEY */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Collage */}
            <motion.div {...reveal} className="relative h-[540px]">
              <motion.div whileHover={{ scale: 1.03, rotate: -1 }} className="absolute left-0 top-0 w-[58%] h-[62%] rounded-3xl overflow-hidden shadow-2xl z-10">
                <img src={vetDog} alt="Veterinarian treating a dog" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, rotate: 1 }} className="absolute right-0 top-[14%] w-[46%] h-[42%] rounded-3xl overflow-hidden shadow-2xl">
                <img src={vetCat} alt="Examining a cat" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, rotate: -1 }} className="absolute left-[12%] bottom-0 w-[46%] h-[34%] rounded-3xl overflow-hidden shadow-2xl">
                <img src={diplomas} alt="Holding diplomas" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.03, rotate: 1 }} className="absolute right-[4%] bottom-[4%] w-[36%] h-[36%] rounded-3xl overflow-hidden shadow-2xl">
                <img src={studyDesk} alt="Study desk" className="w-full h-full object-cover" />
              </motion.div>
              <div className="absolute left-[48%] top-[52%] -translate-x-1/2 -translate-y-1/2 bg-midnight text-white rounded-full w-24 h-24 flex items-center justify-center shadow-2xl z-20 animate-float">
                <Quote size={30} className="text-accent" />
              </div>
            </motion.div>

            {/* Copy */}
            <motion.div {...reveal}>
              <div className="eyebrow text-primary mb-4">The Journey</div>
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-zinc-900 mb-6 leading-tight">
                From engineering labs<br />to <span className="text-gradient-live">operating theatres.</span>
              </h2>
              <p className="text-zinc-600 text-lg leading-relaxed mb-6">
                I transitioned from a 7-year engineering career into medicine, funding my studies by working as an AI engineer at the same time. I know exactly what a bold career change costs, and what it gives back.
              </p>
              <blockquote className="border-l-4 border-accent pl-5 py-1 mb-8">
                <p className="font-heading text-xl italic text-zinc-800 leading-relaxed">
                  "Anything is possible, and it's never too late to pursue a career change on the path to finding true happiness."
                </p>
              </blockquote>
              <div className="flex flex-wrap items-center gap-4">
                <BookButton label="Get FREE 1-on-1 Guidance" testid="button-journey-book" />
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-zinc-700 hover:text-primary font-medium transition-colors" data-testid="link-journey-linkedin">
                  <Linkedin size={20} /> LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7b. SUCCESS STORIES (hidden until real quotes are in — see SHOW_TESTIMONIALS) */}
      {(SHOW_TESTIMONIALS || (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("demo-testimonials"))) && (
        <section id="success-stories" className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-10">
            <motion.div {...reveal} className="text-center max-w-2xl mx-auto mb-14">
              <div className="eyebrow text-primary mb-4">Success Stories</div>
              <h2 className="font-heading font-extrabold text-4xl md:text-5xl leading-tight">
                They made it to <span className="text-gradient">Europe.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {TESTIMONIALS.map((item, i) => (
                <motion.figure
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative bg-white rounded-3xl border border-border p-8 flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all overflow-hidden group"
                  data-testid={`card-testimonial-${i}`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.accent}`} aria-hidden="true"></div>
                  <Quote size={26} className="text-primary/40 mb-5" aria-hidden="true" />
                  <blockquote className="text-zinc-700 leading-relaxed flex-grow text-sm md:text-base">{item.quote}</blockquote>
                  <figcaption className="mt-6 pt-5 border-t border-border">
                    <div className="font-heading font-bold text-zinc-900">{item.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.detail}</div>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CONTACT */}
      <section id="contact" className="py-24 bg-midnight text-white relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/25 blur-3xl animate-orb" aria-hidden="true"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl animate-orb-slow" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-stars opacity-70" aria-hidden="true"></div>

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div {...reveal}>
              <div className="eyebrow text-accent mb-4">Get Started</div>
              <h2 className="font-heading font-extrabold text-4xl md:text-6xl leading-tight mb-6">
                Let's build<br /><span className="text-gradient-live">your future.</span>
              </h2>
              <p className="text-blue-100/75 text-lg mb-9 max-w-lg leading-relaxed">
                Book a <strong className="text-accent">FREE</strong> strategy session for a personalized roadmap to your education and career in Europe. Or send a message; every one is read personally.
              </p>

              <div className="mb-9">
                <BookButton glow label="Book FREE Strategy Session" testid="button-contact-book" />
              </div>

              <div className="space-y-4 text-blue-100/75">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 hover:text-white transition-colors" data-testid="link-contact-email">
                  <span className="w-10 h-10 rounded-full glass flex items-center justify-center text-accent"><Mail size={17} /></span>
                  {CONTACT_EMAIL}
                </a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors" data-testid="link-contact-linkedin">
                  <span className="w-10 h-10 rounded-full glass flex items-center justify-center text-accent"><Linkedin size={17} /></span>
                  Connect on LinkedIn <ExternalLink size={13} className="opacity-50" />
                </a>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full glass flex items-center justify-center text-accent"><Globe size={17} /></span>
                  Global / Remote
                </div>
              </div>
            </motion.div>

            <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight border-t border-white/10 text-white py-12 relative overflow-hidden">
        <span className="absolute -bottom-8 right-4 font-heading font-extrabold text-[7rem] text-white/[0.03] whitespace-nowrap select-none leading-none pointer-events-none" aria-hidden="true">
          CO-PILOT 360
        </span>
        <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6 relative">
          <div className="font-heading font-bold flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-cyan-400 flex items-center justify-center text-white text-xs font-extrabold">C</span>
            Career Co-Pilot <span className="text-gradient-warm">360</span>
          </div>
          <div className="flex items-center gap-5 text-white/60 text-sm">
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors" data-testid="link-footer-email">{CONTACT_EMAIL}</a>
            <span className="w-px h-4 bg-white/20"></span>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5" data-testid="link-footer-linkedin"><Linkedin size={15} /> LinkedIn</a>
          </div>
          <div className="text-sm text-white/40">© {new Date().getFullYear()} Career Co-Pilot 360. All rights reserved.</div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}

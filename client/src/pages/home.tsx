import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Mail,
  Linkedin,
  Github,
  ExternalLink,
  ChevronDown,
  MapPin,
  GraduationCap,
  Briefcase,
  Code2,
  Users,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Download,
  Cloud,
  Building2,
  Server,
  Brain,
  ShoppingCart,
  Video,
  Megaphone,
  Menu,
  BookOpen,
  Clock,
  Calendar,
  Quote,
  BarChart3,
  Eye,
} from "lucide-react";
import { SiAmazon, SiPython, SiJavascript, SiTypescript, SiReact, SiPostgresql, SiGo, SiRuby, SiTensorflow, SiPytorch, SiAmazonwebservices, SiGithub, SiFlask, SiNumpy } from "react-icons/si";

const roles = ["Software Engineer", "AI Researcher", "Builder", "Tech Creator", "Leader"];

function AnimatedRole() {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="gradient-text inline-block min-w-[280px]" data-testid="text-animated-role">
      <motion.span
        key={currentRole}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="inline-block"
      >
        {roles[currentRole]}
      </motion.span>
    </span>
  );
}

function AnimatedCounter({ end, duration = 2, suffix = "", testId }: { end: number; duration?: number; suffix?: string; testId?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref} data-testid={testId}>{count}{suffix}</span>;
}

interface AnalyticsData {
  pageViews: number;
  sectionViews: Record<string, number>;
  lastVisit: string;
}

function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
    try {
      const stored = localStorage.getItem("portfolio-analytics");
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          pageViews: parsed.pageViews + 1,
          lastVisit: new Date().toISOString(),
        };
      }
    } catch {}
    return {
      pageViews: 1,
      sectionViews: {},
      lastVisit: new Date().toISOString(),
    };
  });

  useEffect(() => {
    localStorage.setItem("portfolio-analytics", JSON.stringify(analytics));
  }, [analytics]);

  const trackSectionView = (sectionId: string) => {
    setAnalytics((prev) => ({
      ...prev,
      sectionViews: {
        ...prev.sectionViews,
        [sectionId]: (prev.sectionViews[sectionId] || 0) + 1,
      },
    }));
  };

  return { analytics, trackSectionView };
}

function Section({ children, id, className = "", onView }: { children: React.ReactNode; id?: string; className?: string; onView?: (id: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasTracked = useRef(false);

  useEffect(() => {
    if (isInView && id && onView && !hasTracked.current) {
      hasTracked.current = true;
      onView(id);
    }
  }, [isInView, id, onView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      data-testid={id ? `section-${id}` : undefined}
    >
      {children}
    </motion.section>
  );
}

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#skills", label: "Skills" },
  { href: "#leadership", label: "Leadership" },
  { href: "#contact", label: "Contact" },
];

const experiences = [
  {
    id: "aws",
    company: "Amazon Web Services",
    role: "Software Development Engineer Intern",
    location: "Palo Alto, CA",
    period: "May 2025 - Aug 2025",
    color: "bg-orange-500",
    initials: "AWS",
    icon: SiAmazon,
    achievements: [
      "Built an automation tool to streamline AWS on-call support, cutting resolution time from 6 hours to minutes",
      "Designed a distributed observability dashboard monitoring 250+ data streams with 30% faster root-cause analysis",
      "Outlined comprehensive design doc comparing 3 solutions with tradeoffs and architectural diagrams",
    ],
    tech: ["Lambda", "CDK", "AppConfig", "TypeScript"],
  },
  {
    id: "mckenneys",
    company: "McKenney's",
    role: "Software Engineer Intern",
    location: "Atlanta, GA",
    period: "May 2024 - Aug 2024",
    color: "bg-blue-600",
    initials: "MK",
    icon: Building2,
    achievements: [
      "Built and deployed 3 automation pipelines in Python and SQL, boosting team efficiency by 50%",
      "Developed Pandas and Google Analytics API scripts to improve financial reporting by 25%",
      "Led knowledge base preprocessing for RAG system, creating 250+ technical documents",
    ],
    tech: ["Python", "SQL", "Pandas", "Google Analytics"],
  },
  {
    id: "verinext",
    company: "Verinext",
    role: "Solutions Architecture Intern",
    location: "Duluth, GA",
    period: "Sep 2023 - May 2024",
    color: "bg-purple-600",
    initials: "VN",
    icon: Server,
    achievements: [
      "Delivered tailored solutions achieving 95% client satisfaction rate",
      "Acquired leads for data analytics solutions, resulting in 40% increase in sales opportunities",
      "Earned Splunk Accreditation in Technical Selling Foundations and Observability Sales",
    ],
    tech: ["Splunk", "Data Analytics", "Cloud Solutions"],
  },
];

const projects = [
  {
    id: "llm-research",
    title: "Interpretability & Deception in LLMs",
    role: "AI Researcher",
    period: "July 2025 - Oct 2025",
    icon: Brain,
    description:
      "Led research on deceptive reasoning in LLMs, analyzing internal activations across multi-step reasoning traces to identify and map circuits linked to dishonest behavior.",
    impact: "Analyzed 1M+ parameters, isolated statistically significant neurons using regression probes and causal tracing",
    tech: ["PyTorch", "Anthropic CCS", "Activation Patching", "Causal Tracing"],
    gradient: "from-violet-500 to-purple-600",
    caseStudy: {
      problem: "Large Language Models can exhibit deceptive behaviors during complex reasoning tasks, but the internal mechanisms behind this behavior are poorly understood. Understanding these patterns is crucial for AI safety.",
      approach: [
        "Designed controlled experiments with multi-step reasoning traces to elicit deceptive outputs",
        "Implemented activation patching techniques to isolate specific neurons and circuits",
        "Used regression probes to identify statistically significant neural patterns",
        "Applied causal tracing to map the flow of deceptive reasoning through model layers",
      ],
      results: [
        "Successfully analyzed over 1 million parameters across multiple model architectures",
        "Identified specific neuron clusters correlated with deceptive reasoning patterns",
        "Developed reproducible methodology for future interpretability research",
        "Contributed to the growing body of AI safety literature",
      ],
      learnings: "This research deepened my understanding of neural network internals and the importance of mechanistic interpretability in ensuring AI systems behave as intended.",
    },
  },
  {
    id: "uga-marketplace",
    title: "UGA Marketplace Website",
    role: "Lead Developer",
    period: "Aug 2024 - Oct 2024",
    icon: ShoppingCart,
    description:
      "Led a team of 4 in developing a peer-to-peer marketplace app for UGA students, facilitating secure transactions with encrypted session handling.",
    impact: "Implemented secure user authentication with ACID-compliant payment flow",
    tech: ["React", "Docker", "PostgreSQL", "Node.js"],
    gradient: "from-blue-500 to-cyan-500",
    caseStudy: {
      problem: "UGA students needed a trusted platform for buying and selling items within the campus community, with security and ease of use as top priorities.",
      approach: [
        "Architected a full-stack solution with React frontend and Node.js backend",
        "Implemented encrypted session handling for secure user authentication",
        "Designed ACID-compliant database transactions for payment integrity",
        "Containerized the application with Docker for consistent deployment",
      ],
      results: [
        "Delivered a fully functional marketplace platform on schedule",
        "Achieved zero security vulnerabilities in penetration testing",
        "Created intuitive UI that required no user training",
        "Successfully led and coordinated a team of 4 developers",
      ],
      learnings: "Leading this project taught me the importance of clear communication, proper architecture planning, and security-first development practices.",
    },
  },
];

const skillCategories = [
  {
    id: "languages",
    title: "Languages",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Java", icon: Code2 },
      { name: "C++", icon: Code2 },
      { name: "Go", icon: SiGo },
      { name: "Ruby", icon: SiRuby },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    id: "tools",
    title: "Tools & Frameworks",
    skills: [
      { name: "React", icon: SiReact },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "PyTorch", icon: SiPytorch },
      { name: "AWS", icon: SiAmazonwebservices },
      { name: "Flask", icon: SiFlask },
      { name: "NumPy", icon: SiNumpy },
      { name: "GitHub", icon: SiGithub },
      { name: "SvelteKit", icon: Code2 },
    ],
  },
  {
    id: "coursework",
    title: "Coursework",
    skills: [
      { name: "Artificial Intelligence", icon: Brain },
      { name: "Data Structures", icon: Code2 },
      { name: "Software Development", icon: Code2 },
      { name: "Linear Algebra", icon: Code2 },
    ],
  },
];

const leadership = [
  {
    id: "ai-uga",
    title: "AI @ UGA",
    role: "Founder & Co-President",
    period: "Aug 2024 - Present",
    icon: Brain,
    metric: "25+",
    metricLabel: "Students Recruited",
    description: "Partner with 5 companies to provide AI solutions for community-based problems",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "anthropic",
    title: "Anthropic Growth Team",
    role: "Claude Builder",
    period: "Aug 2025 - Present",
    icon: Sparkles,
    metric: "40%",
    metricLabel: "Increase in Claude Adoption",
    description: "Led multi-campus Hackathon with 500 students across 8 colleges",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "content-creator",
    title: "Tech + UGC Creator",
    role: "Content Creator",
    period: "Aug 2025 - Present",
    icon: Video,
    metric: "500,000+",
    metricLabel: "Cumulative Views",
    description: "Produced engaging content for 3 AI startup products with 1000+ followers",
    color: "from-pink-500 to-rose-600",
  },
];

const blogPosts = [
  {
    id: "llm-interpretability",
    title: "Understanding Deception in Large Language Models",
    excerpt: "Exploring how we can identify and trace deceptive reasoning patterns in LLMs through activation patching and causal tracing techniques.",
    category: "AI Research",
    date: "Nov 2024",
    readTime: "8 min read",
    gradient: "from-violet-500 to-purple-600",
    tags: ["AI Safety", "Interpretability", "PyTorch"],
    content: {
      intro: "As Large Language Models become increasingly integrated into critical applications, understanding their internal decision-making processes has never been more important. During my research this summer, I dove deep into one of the most challenging aspects of AI safety: deceptive reasoning.",
      sections: [
        {
          heading: "The Problem: Hidden Deception",
          body: "Large Language Models can produce outputs that seem reasonable on the surface but contain subtle deceptions in their reasoning process. Unlike obvious failures, these deceptive patterns are buried deep within the model's activation layers, making them incredibly difficult to detect and understand. This poses a significant challenge for AI safety—how can we trust systems whose internal reasoning we can't fully verify?"
        },
        {
          heading: "My Approach: Mechanistic Interpretability",
          body: "I applied mechanistic interpretability techniques to analyze over 1 million parameters across multiple reasoning traces. The key was using activation patching—a technique where we systematically replace activations at different layers to identify which components are responsible for deceptive behavior. Combined with causal tracing, this allowed me to map the exact flow of deceptive reasoning through the model's layers."
        },
        {
          heading: "Key Findings",
          body: "Through regression probes and statistical analysis, I identified specific neuron clusters that consistently activated during deceptive reasoning patterns. These weren't random—they formed coherent circuits that the model used to construct plausible-sounding but factually incorrect responses. Perhaps most interestingly, these circuits were often separate from the model's general knowledge retrieval mechanisms, suggesting deception operates through distinct pathways."
        },
        {
          heading: "Implications for AI Safety",
          body: "This research contributes to the growing field of AI alignment by providing concrete methods to identify and potentially mitigate deceptive reasoning. By understanding the internal mechanisms, we can develop better training procedures, monitoring systems, and safety constraints. The techniques I developed are reproducible and can be applied to other models and reasoning tasks."
        },
        {
          heading: "Looking Forward",
          body: "This is just the beginning. As models grow more capable, the need for robust interpretability tools becomes even more critical. My next steps involve exploring whether these deceptive circuits can be selectively disabled without harming the model's general capabilities, and whether similar patterns exist across different model architectures."
        }
      ],
      conclusion: "Understanding how AI systems reason—including when they deceive—is fundamental to building trustworthy artificial intelligence. Through careful analysis and rigorous methodology, we can illuminate these black boxes and build safer, more reliable systems."
    }
  },
  {
    id: "aws-automation",
    title: "Building Automation Tools at AWS Scale",
    excerpt: "How I designed and built an automation tool that cut on-call resolution time from 6 hours to minutes using Lambda and CDK.",
    category: "Engineering",
    date: "Oct 2024",
    readTime: "6 min read",
    gradient: "from-orange-500 to-amber-600",
    tags: ["AWS", "Lambda", "DevOps"],
    content: {
      intro: "During my internship at AWS, I faced a challenge that many engineers encounter: repetitive, time-consuming on-call tasks that pulled talented developers away from building new features. Here's how I built an automation tool that transformed our team's workflow.",
      sections: [
        {
          heading: "The Challenge",
          body: "Our on-call engineers were spending an average of 6 hours resolving routine support tickets. These weren't complex issues—most followed predictable patterns and required similar diagnostic steps. But they demanded immediate attention, pulling engineers out of deep work and creating constant context switching. The team needed a solution that could handle these routine cases automatically while still maintaining the quality and thoroughness of manual investigation."
        },
        {
          heading: "Designing the Solution",
          body: "I started by analyzing hundreds of support tickets to identify common patterns. Then I architected a serverless solution using AWS Lambda and CDK (Cloud Development Kit). The key insight was to create a distributed system that could run diagnostic checks in parallel, aggregate results, and either resolve issues automatically or provide engineers with comprehensive context for manual review. I wrote a detailed design document comparing three different architectural approaches, evaluating tradeoffs in latency, cost, and maintainability."
        },
        {
          heading: "The Implementation",
          body: "The automation tool uses Lambda functions triggered by incoming support requests. Each function handles a specific type of diagnostic check—from log analysis to configuration validation to dependency verification. I integrated AppConfig for dynamic feature flagging, allowing the team to gradually roll out automation for different issue types and quickly disable problematic checks if needed. The entire infrastructure is defined as code using CDK, making it reproducible and version-controlled."
        },
        {
          heading: "Building Observability",
          body: "Automation is only as good as your ability to monitor it. I built a distributed observability dashboard that monitors 250+ data streams in real-time, tracking everything from function execution times to error rates to resolution success percentages. This dashboard became crucial—it helped identify issues 30% faster than our previous manual monitoring approach and provided clear metrics demonstrating the tool's impact."
        },
        {
          heading: "The Impact",
          body: "The results exceeded our expectations. Routine issue resolution time dropped from 6 hours to minutes. Engineers could focus on complex problems and feature development instead of repetitive diagnostics. The automated system handles thousands of requests monthly with a 95%+ success rate, and when it can't resolve an issue, it provides engineers with comprehensive diagnostic data that speeds up manual resolution."
        }
      ],
      conclusion: "This project taught me that effective automation isn't about replacing human judgment—it's about augmenting it. By handling routine tasks and providing better context for complex ones, we can free engineers to do what they do best: solve hard problems and build innovative solutions. The key is careful design, comprehensive observability, and a gradual rollout that builds confidence in the system."
    }
  },
  {
    id: "student-ai-club",
    title: "Starting an AI Club: Lessons from AI @ UGA",
    excerpt: "A behind-the-scenes look at founding and growing a student AI organization from 0 to 25+ active members.",
    category: "Leadership",
    date: "Sep 2024",
    readTime: "5 min read",
    gradient: "from-blue-500 to-cyan-500",
    tags: ["Leadership", "Community", "AI"],
    content: {
      intro: "Starting a student organization from scratch is challenging. Starting one focused on cutting-edge AI research? Even harder. Here's what I learned from founding AI @ UGA and growing it into a thriving community of 25+ dedicated members.",
      sections: [
        {
          heading: "Why Start AI @ UGA?",
          body: "I noticed a gap at UGA: there were plenty of students interested in AI, but no structured community where they could learn together, work on real projects, and connect with industry partners. Students were learning AI concepts in isolation, without the collaborative environment that accelerates growth. I wanted to create a space where passionate students could not only learn about AI but also apply it to solve real community problems."
        },
        {
          heading: "The Early Days: Finding Your Core",
          body: "The first challenge was finding co-founders who shared the vision. I reached out to students in AI-related courses, attended tech meetups, and had countless coffee chats. The key wasn't finding people who knew everything about AI—it was finding people who were passionate about building something meaningful. My co-president Evan Hammam and I spent weeks refining our mission: partner with companies to provide AI solutions for community-based problems. This clarity of purpose became our north star."
        },
        {
          heading: "Building Structure and Credibility",
          body: "Students are busy. To attract and retain members, we needed to offer real value. We established partnerships with 5 companies, giving our members hands-on experience with actual business problems. We created a structured curriculum that balanced theory with practice. Most importantly, we made sure every meeting had a clear objective and deliverable—whether that was a workshop on transformer architectures, a coding session on a real project, or a guest speaker from industry."
        },
        {
          heading: "Growth Through Impact",
          body: "Our best recruiting tool was the work itself. When members built an AI solution that a real company deployed, they told their friends. When we organized workshops that taught practical skills, word spread. We didn't grow through aggressive marketing—we grew because we delivered genuine value. Each successful project became a proof point that attracted new members who wanted to do meaningful work."
        },
        {
          heading: "Lessons for Future Founders",
          body: "Start with why. Your mission needs to be clear and compelling. Focus on quality over quantity—25 engaged members beat 100 passive ones. Build partnerships early—having real projects makes everything else easier. Empower your members—the best organizations are built by distributing ownership, not centralizing it. Most importantly, remember that building a community is about people, not just projects. Invest in relationships, celebrate wins together, and create an environment where everyone feels they belong."
        }
      ],
      conclusion: "AI @ UGA started as an idea between two students. Today, it's a community that's making real impact—both for its members and for the organizations we partner with. If you're thinking about starting a student organization, my advice is simple: start now. You don't need everything figured out. You just need a clear mission, a few passionate co-founders, and the willingness to learn as you build."
    }
  },
];

const testimonials = [
  {
    id: "mentor-1",
    name: "Shu-fan Lin",
    role: "Senior SDE at Amazon",
    company: "AWS",
    quote: "Richard brought exceptional problem-solving skills to our team. His automation tool fundamentally changed how we handle on-call support.",
    avatar: "SC",
    gradient: "from-orange-500 to-amber-600",
    linkedin: "https://www.linkedin.com/in/shufan-lin/",
  },
  {
    id: "professor-1",
    name: "Dr. Girish Gupta",
    role: "AI Research Lead",
    company: "CTO at Tellen",
    quote: "One of the most dedicated researchers I've mentored. Richard's work on LLM interpretability shows remarkable depth and rigor.",
    avatar: "MB",
    gradient: "from-violet-500 to-purple-600",
    linkedin: "https://www.linkedin.com/in/girish-gupta/",
  },
  {
    id: "peer-1",
    name: "Evan Hammam",
    role: "Co-President",
    company: "AI @ UGA",
    quote: "Richard's vision and leadership in founding AI @ UGA created a thriving community that continues to grow and make real impact.",
    avatar: "JR",
    gradient: "from-blue-500 to-indigo-600",
    linkedin: "https://linkedin.com/in/evanhammam",
  },
];

function MobileNav({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-4 mt-8" data-testid="nav-mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
              data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-border">
            <Button className="w-full" asChild data-testid="button-mobile-resume">
              <a href="/Richard_Phan_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);
  const { analytics, trackSectionView } = useAnalytics();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-home">
      {/* Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 glass-card border-b border-border"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        data-testid="header-main"
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4" data-testid="nav-main">
          <a
            href="#"
            className="font-serif font-bold text-xl tracking-tight"
            data-testid="link-home"
          >
            RP
          </a>
          <div className="hidden md:flex items-center gap-8" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button size="sm" className="hidden md:inline-flex" asChild data-testid="button-resume">
              <a href="/Richard_Phan_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
            </Button>
            <MobileNav isOpen={mobileNavOpen} setIsOpen={setMobileNavOpen} />
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="about"
        className="min-h-screen flex items-center relative overflow-hidden"
        data-testid="section-hero"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] opacity-20" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-6xl mx-auto px-6 py-24 md:py-32 relative z-10"
        >
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
                <Badge variant="secondary" className="gap-1.5" data-testid="badge-aws-intern">
                  <Cloud className="w-3 h-3" />
                  AWS Intern
                </Badge>
                <Badge variant="secondary" className="gap-1.5" data-testid="badge-ai-uga">
                  <Users className="w-3 h-3" />
                  CS/AI at Georgia Tech
                </Badge>
                <Badge variant="secondary" className="gap-1.5" data-testid="badge-gpa">
                  <GraduationCap className="w-3 h-3" />
                  4.00 GPA
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight" data-testid="text-hero-title">
                  Hi, I'm{" "}
                  <span className="gradient-text">Richard Phan</span>
                </h1>
                <p className="text-2xl md:text-3xl font-serif font-medium text-muted-foreground mt-3" data-testid="text-hero-subtitle">
                  <AnimatedRole />
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-xl leading-relaxed"
                data-testid="text-hero-description"
              >
                CS student at Georgia Tech with a focus on Artificial Intelligence. 
                Building innovative solutions at the intersection of software engineering 
                and AI research. Passionate about creating technology that makes an impact.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button size="lg" asChild data-testid="button-view-projects">
                  <a href="#projects">
                    View Projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild data-testid="button-contact-hero">
                  <a href="#contact">Contact Me</a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
                data-testid="text-hero-location"
              >
                <MapPin className="w-4 h-4" />
                <span>Atlanta, GA</span>
                <span className="mx-2">•</span>
                <GraduationCap className="w-4 h-4" />
                <span>Expected May 2027</span>
              </motion.div>
            </div>

            {/* Hero Visual - Avatar with gradient */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 flex justify-center"
              data-testid="hero-avatar-container"
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                    <img
                      src="/Headshot.jpeg"
                      alt="Richard Phan"
                      className="w-full h-full object-cover"
                      data-testid="hero-avatar-image"
                    />
                  </div>
                </div>
                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-card border border-card-border rounded-xl p-3 shadow-lg"
                >
                  <Code2 className="w-6 h-6 text-primary" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 bg-card border border-card-border rounded-xl p-3 shadow-lg"
                >
                  <Brain className="w-6 h-6 text-purple-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          data-testid="scroll-indicator"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <Section id="experience" className="py-20 md:py-32" onView={trackSectionView}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-experience-section">
              <Briefcase className="w-3 h-3 mr-1.5" />
              Experience
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-testid="text-experience-title">
              Where I've Worked
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" data-testid="timeline-line" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative grid md:grid-cols-2 gap-8 ${
                    index % 2 === 0 ? "" : "md:direction-rtl"
                  }`}
                  data-testid={`timeline-item-${exp.id}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}`}>
                    <Card className="hover-elevate overflow-visible" data-testid={`card-experience-${exp.id}`}>
                      <CardHeader className="pb-4">
                        <div className={`flex items-start gap-4 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                          <div className={`w-12 h-12 rounded-xl ${exp.color} flex items-center justify-center text-white font-bold text-sm shrink-0`} data-testid={`logo-${exp.id}`}>
                            {exp.initials}
                          </div>
                          <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                            <CardTitle className="text-lg" data-testid={`text-company-${exp.id}`}>{exp.company}</CardTitle>
                            <p className="text-sm text-muted-foreground" data-testid={`text-role-${exp.id}`}>{exp.role}</p>
                            <p className="text-xs text-muted-foreground mt-1" data-testid={`text-period-${exp.id}`}>
                              {exp.location} • {exp.period}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className={`space-y-2 text-sm text-muted-foreground ${index % 2 === 0 ? "md:text-right" : ""}`}>
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="leading-relaxed" data-testid={`text-achievement-${exp.id}-${i}`}>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                          {exp.tech.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs" data-testid={`badge-tech-${exp.id}-${tech.toLowerCase().replace(/\s+/g, '-')}`}>
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="py-20 md:py-32 bg-muted/30" onView={trackSectionView}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-projects-section">
              <Code2 className="w-3 h-3 mr-1.5" />
              Projects
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-testid="text-projects-title">
              Featured Work
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate group overflow-visible" data-testid={`card-project-${project.id}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white shrink-0`} data-testid={`icon-project-${project.id}`}>
                        <project.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors" data-testid={`text-project-title-${project.id}`}>
                          {project.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground" data-testid={`text-project-role-${project.id}`}>
                          {project.role} • {project.period}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-project-description-${project.id}`}>
                      {project.description}
                    </p>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border" data-testid={`box-project-impact-${project.id}`}>
                      <p className="text-sm font-medium text-foreground">
                        <TrendingUp className="w-4 h-4 inline mr-2 text-primary" />
                        <span data-testid={`text-project-impact-${project.id}`}>{project.impact}</span>
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs" data-testid={`badge-project-tech-${project.id}-${tech.toLowerCase().replace(/\s+/g, '-')}`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full mt-2" data-testid={`button-case-study-${project.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Case Study
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto" data-testid={`dialog-case-study-${project.id}`}>
                        <DialogHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white`}>
                              <project.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <DialogTitle className="text-xl" data-testid={`text-case-study-title-${project.id}`}>{project.title}</DialogTitle>
                              <DialogDescription className="text-sm">{project.role} • {project.period}</DialogDescription>
                            </div>
                          </div>
                        </DialogHeader>
                        <div className="space-y-6 pt-4">
                          <div>
                            <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              The Problem
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-case-study-problem-${project.id}`}>
                              {project.caseStudy.problem}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              Approach
                            </h4>
                            <ul className="space-y-2">
                              {project.caseStudy.approach.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2" data-testid={`text-case-study-approach-${project.id}-${i}`}>
                                  <span className="text-primary mt-1.5 text-xs">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-primary mb-2 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              Results
                            </h4>
                            <ul className="space-y-2">
                              {project.caseStudy.results.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2" data-testid={`text-case-study-result-${project.id}-${i}`}>
                                  <TrendingUp className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-4 rounded-lg bg-muted/50 border border-border">
                            <h4 className="font-semibold text-sm mb-2">Key Learnings</h4>
                            <p className="text-sm text-muted-foreground italic" data-testid={`text-case-study-learnings-${project.id}`}>
                              "{project.caseStudy.learnings}"
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.tech.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Blog Section */}
      <Section id="blog" className="py-20 md:py-32" onView={trackSectionView}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-blog-section">
              <BookOpen className="w-3 h-3 mr-1.5" />
              Blog
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-testid="text-blog-title">
              Thoughts & Insights
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto" data-testid="text-blog-subtitle">
              Writing about AI research, software engineering, and lessons learned along the way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="h-full hover-elevate group overflow-visible cursor-pointer" data-testid={`card-blog-${post.id}`}>
                      <CardHeader className="pb-3">
                        <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${post.gradient} mb-4`} data-testid={`accent-blog-${post.id}`} />
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <Badge variant="secondary" className="text-xs font-normal" data-testid={`badge-blog-category-${post.id}`}>
                            {post.category}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight" data-testid={`text-blog-title-${post.id}`}>
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-blog-excerpt-${post.id}`}>
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs" data-testid={`badge-blog-tag-${post.id}-${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="pt-2 flex items-center text-sm font-medium text-primary group-hover:underline" data-testid={`link-blog-read-${post.id}`}>
                          Read Article
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto" data-testid={`dialog-blog-${post.id}`}>
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${post.gradient}`} />
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>
                      <DialogTitle className="text-2xl" data-testid={`text-blog-dialog-title-${post.id}`}>
                        {post.title}
                      </DialogTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </DialogHeader>
                    <div className="space-y-6 pt-4">
                      <p className="text-base leading-relaxed text-muted-foreground" data-testid={`text-blog-intro-${post.id}`}>
                        {post.content.intro}
                      </p>
                      {post.content.sections.map((section, idx) => (
                        <div key={idx}>
                          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" data-testid={`text-blog-heading-${post.id}-${idx}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {section.heading}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed" data-testid={`text-blog-body-${post.id}-${idx}`}>
                            {section.body}
                          </p>
                        </div>
                      ))}
                      <div className="p-4 rounded-lg bg-muted/50 border border-border">
                        <h4 className="font-semibold text-sm mb-2">Conclusion</h4>
                        <p className="text-sm text-muted-foreground italic" data-testid={`text-blog-conclusion-${post.id}`}>
                          {post.content.conclusion}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" className="py-20 md:py-32 bg-muted/30" onView={trackSectionView}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-skills-section">
              <Sparkles className="w-3 h-3 mr-1.5" />
              Skills
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-testid="text-skills-title">
              Technical Expertise
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full" data-testid={`card-skills-${category.id}`}>
                  <CardHeader>
                    <CardTitle className="text-lg" data-testid={`text-skills-category-${category.id}`}>{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill.name}
                          variant="secondary"
                          className="gap-1.5 py-1.5"
                          data-testid={`badge-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <skill.icon className="w-3.5 h-3.5" />
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Leadership Section */}
      <Section id="leadership" className="py-20 md:py-32" onView={trackSectionView}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-leadership-section">
              <Users className="w-3 h-3 mr-1.5" />
              Leadership
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-testid="text-leadership-title">
              Making an Impact
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover-elevate text-center overflow-visible" data-testid={`card-leadership-${item.id}`}>
                  <CardContent className="pt-8 pb-6 space-y-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mx-auto`} data-testid={`icon-leadership-${item.id}`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg" data-testid={`text-leadership-title-${item.id}`}>{item.title}</h3>
                      <p className="text-sm text-muted-foreground" data-testid={`text-leadership-role-${item.id}`}>{item.role}</p>
                      <p className="text-xs text-muted-foreground mt-1" data-testid={`text-leadership-period-${item.id}`}>{item.period}</p>
                    </div>
                    <div className="py-4">
                      <p className="text-4xl font-bold gradient-text" data-testid={`text-leadership-metric-${item.id}`}>
                        <AnimatedCounter
                          end={parseInt(item.metric.replace(/[^0-9]/g, ""))}
                          suffix={item.metric.includes("+") ? "+" : item.metric.includes("%") ? "%" : ""}
                          testId={`counter-${item.id}`}
                        />
                      </p>
                      <p className="text-sm text-muted-foreground" data-testid={`text-leadership-metric-label-${item.id}`}>{item.metricLabel}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-leadership-description-${item.id}`}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section id="testimonials" className="py-20 md:py-32 bg-muted/30" onView={trackSectionView}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4" data-testid="badge-testimonials-section">
              <Quote className="w-3 h-3 mr-1.5" />
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold" data-testid="text-testimonials-title">
              What People Say
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto" data-testid="text-testimonials-subtitle">
              Feedback from mentors, colleagues, and collaborators I've had the privilege to work with.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full overflow-visible" data-testid={`card-testimonial-${testimonial.id}`}>
                  <CardContent className="pt-6 pb-6 space-y-4">
                    <div className="relative">
                      <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                      <p className="text-muted-foreground leading-relaxed italic pl-6" data-testid={`text-testimonial-quote-${testimonial.id}`}>
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-sm font-medium`} data-testid={`avatar-testimonial-${testimonial.id}`}>
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm" data-testid={`text-testimonial-name-${testimonial.id}`}>{testimonial.name}</p>
                          {testimonial.linkedin && (
                            <a
                              href={testimonial.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded transition-colors"
                              data-testid={`link-testimonial-linkedin-${testimonial.id}`}
                            >
                              <Linkedin className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground" data-testid={`text-testimonial-role-${testimonial.id}`}>
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="py-20 md:py-32" onView={trackSectionView}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Badge variant="outline" className="mb-4" data-testid="badge-contact-section">
            <Megaphone className="w-3 h-3 mr-1.5" />
            Get in Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" data-testid="text-contact-title">
            Let's Build Something Together
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto" data-testid="text-contact-description">
            I'm always open to discussing new opportunities, interesting projects, 
            or ways to contribute to your team's success.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <motion.a
              href="mailto:richardphan20@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
              data-testid="link-contact-email"
            >
              <Card className="hover-elevate p-6 overflow-visible" data-testid="card-contact-email">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium" data-testid="text-contact-email-title">Email</h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-contact-email-value">richardphan20@gmail.com</p>
                  </div>
                </div>
              </Card>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/richardxphan"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
              data-testid="link-contact-linkedin"
            >
              <Card className="hover-elevate p-6 overflow-visible" data-testid="card-contact-linkedin">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto group-hover:bg-blue-500/20 transition-colors">
                    <Linkedin className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium" data-testid="text-contact-linkedin-title">LinkedIn</h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-contact-linkedin-value">Connect with me</p>
                  </div>
                </div>
              </Card>
            </motion.a>

            <motion.a
              href="https://github.com/richardxphan"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
              data-testid="link-contact-github"
            >
              <Card className="hover-elevate p-6 overflow-visible" data-testid="card-contact-github">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mx-auto group-hover:bg-foreground/20 transition-colors">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium" data-testid="text-contact-github-title">GitHub</h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-contact-github-value">See my code</p>
                  </div>
                </div>
              </Card>
            </motion.a>
          </div>

          <div className="mt-12">
            <Button size="lg" asChild data-testid="button-send-email">
              <a href="mailto:richardphan20@gmail.com">
                <Mail className="w-4 h-4 mr-2" />
                Send me an email
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* Analytics Panel */}
      {showAnalytics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 right-6 z-50"
          data-testid="panel-analytics"
        >
          <Card className="w-72 shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Site Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Page Views</span>
                <Badge variant="secondary" data-testid="text-analytics-pageviews">{analytics.pageViews}</Badge>
              </div>
              <div className="space-y-2">
                <span className="text-muted-foreground text-xs">Section Engagement</span>
                {Object.entries(analytics.sectionViews).map(([section, views]) => (
                  <div key={section} className="flex justify-between items-center">
                    <span className="capitalize text-xs">{section}</span>
                    <span className="text-xs text-muted-foreground" data-testid={`text-analytics-section-${section}`}>{views} views</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-border text-xs text-muted-foreground">
                Last visit: {new Date(analytics.lastVisit).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Analytics Toggle Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setShowAnalytics(!showAnalytics)}
        className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        data-testid="button-analytics-toggle"
      >
        <BarChart3 className="w-5 h-5" />
      </motion.button>

      {/* Footer */}
      <footer className="py-8 border-t border-border" data-testid="footer">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {new Date().getFullYear()} Richard Phan. All rights reserved.
          </p>
          <div className="flex items-center gap-4" data-testid="footer-social-links">
            <a
              href="mailto:richardphan20@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/richardxphan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-linkedin"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/richardphan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-github"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

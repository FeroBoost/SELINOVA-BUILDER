import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, Link } from 'wouter';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Server, Shield, Zap, Cpu, Globe, 
  ShoppingCart, LayoutTemplate, Smartphone, 
  Code, Activity, CheckCircle2, ChevronRight, 
  Lock, Database, GitMerge, FileCode2
} from 'lucide-react';

const queryClient = new QueryClient();

// -- COMPONENT: Navbar --
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00e5ff]"></span>
          </div>
          <span className="text-[#00e5ff] text-xs font-mono tracking-widest uppercase opacity-80">
            Sys.Online // v4.1.0
          </span>
        </div>
        
        <div className="text-xl font-bold tracking-tighter text-gradient hidden md:block uppercase">
          Selinova-Tech
        </div>

        <div className="flex items-center gap-4">
          <a href="#marketplace" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Marktplatz
          </a>
          <a href="#tech" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
            Technologie
          </a>
          <button className="bracket-box bg-primary/10 text-primary px-4 py-1.5 text-sm font-bold tracking-wide uppercase hover:bg-primary/20 transition-colors">
            Terminal
          </button>
        </div>
      </div>
    </motion.header>
  );
}

// -- COMPONENT: Hero Section --
function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-30 z-0"></div>
      <div className="absolute inset-0 bg-scanlines z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00e5ff] rounded-full blur-[150px] opacity-10 z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#b300ff] rounded-full blur-[150px] opacity-10 z-0"></div>

      <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-4 py-1.5 rounded-none"
        >
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-mono uppercase tracking-wider">
            DSGVO-Digital Services Act Compliant
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase"
        >
          <span className="text-white">Engineering</span><br />
          <span className="text-gradient text-glow">Excellence</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light mb-10"
        >
          Der österreichische Marktplatz. <br className="hidden md:block"/>
          <strong className="text-white font-medium">Webseiten kaufen & mieten.</strong> E-Commerce, SaaS, Blogs und Apps auf Enterprise-Niveau.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <button className="bracket-box bg-primary text-primary-foreground px-8 py-4 text-lg font-bold tracking-widest uppercase hover:bg-[#00cce6] transition-colors flex items-center justify-center gap-2">
            Jetzt Entdecken <ChevronRight className="w-5 h-5" />
          </button>
          <button className="border border-white/20 bg-white/5 hover:bg-white/10 px-8 py-4 text-lg font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2">
            Mehr erfahren
          </button>
        </motion.div>

        {/* Technical HUD details */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-10 hidden lg:flex flex-col gap-2 font-mono text-xs text-primary/60"
        >
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> LCP &lt; 1.2s</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> p95 Latency &lt; 80ms</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> &gt; 1000 RPS</div>
        </motion.div>
      </div>
    </section>
  );
}

// -- COMPONENT: Marketplace Categories --
const CATEGORIES = [
  { id: 'ecommerce', title: 'E-Commerce', icon: ShoppingCart, desc: 'Hochkonvertierende Shops mit 3D-Secure-2 & Multi-Currency.' },
  { id: 'saas', title: 'SaaS', icon: Code, desc: 'Skalierbare Software-as-a-Service Plattformen mit RBAC & Edge-Caching.' },
  { id: 'blogs', title: 'Blogs', icon: LayoutTemplate, desc: 'SEO-optimierte Content-Maschinen mit Partial Prerendering & Schema.org.' },
  { id: 'apps', title: 'Apps', icon: Smartphone, desc: 'Progressive Web Apps (PWA) mit Offline-Fähigkeit & Vercel KV.' },
];

function Concept() {
  return (
    <section id="marketplace" className="py-24 relative z-10 border-t border-primary/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase text-white">
            Das <span className="text-primary">Ökosystem</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Verifizierte, professionell entwickelte digitale Assets. Bereit zur Übernahme oder Miete. Streng geprüft nach österreichischem Recht.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bracket-box glass-panel p-6 group cursor-pointer hover:bg-card/80 transition-all"
            >
              <cat.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide">{cat.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {cat.desc}
              </p>
              <div className="mt-6 flex items-center text-xs font-mono text-primary/70 group-hover:text-primary transition-colors">
                EXPLORE_MODULE() <ChevronRight className="w-3 h-3 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -- COMPONENT: Differentiators --
function Differentiators() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0a0f16]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMwIDBMMjAgMTcuMzJMMCAxNy4zMkwxMCAzNEwwIDUwLjY4TDIwIDUwLjY4TDMwIDY4TDQwIDUwLjY4TDYwIDUwLjY4TDUwIDM0TDYwIDE3LjMyTDQwIDE3LjMyTDMwIDB6IiBmaWxsPSJyZ2JhKDAsMjI5LDI1NSwwLjAyKSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+')] opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 uppercase text-white">
              <span className="text-gradient">Wissenschaftliche</span><br/>
              Gesamtanalyse
            </h2>
            <div className="space-y-8">
              {[
                { title: 'DSGVO & Austrian Law', desc: '100% rechtskonforme Umsetzung nach europäischem Datenschutzstandard. Consent Management Platform integriert.' },
                { title: 'Performance-First', desc: 'Architektur basierend auf Little\'s Law und Amdahl\'s Law. Sub-lineare O(log n) Suchkomplexität durch HNSW Vektor-Suche.' },
                { title: 'Verifizierte Listings', desc: 'Jedes Projekt durchläuft einen strengen Code- und Security-Audit vor der Aufnahme in den Marktplatz.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="flex gap-4"
                >
                  <div className="mt-1 flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-[#b300ff]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bracket-box glass-panel p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Shield className="w-32 h-32 text-primary" />
              </div>
              <h3 className="text-2xl font-mono text-primary mb-6 border-b border-primary/20 pb-4">
                SYS.SECURITY_PROTOCOLS
              </h3>
              <ul className="space-y-4 font-mono text-sm text-gray-300">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Encryption at Rest</span>
                  <span className="text-white">AES-256</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Transport Security</span>
                  <span className="text-white">TLS 1.3</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Payment Processing</span>
                  <span className="text-white">3D-Secure-2</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Access Control</span>
                  <span className="text-white">RBAC</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>Accessibility</span>
                  <span className="text-white">WCAG 2.2 AA</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -- COMPONENT: Technical Capabilities --
function Performance() {
  const metrics = [
    { label: "Throughput", value: ">1000", unit: "RPS", icon: Zap },
    { label: "Core Web Vitals", value: "<1.2s", unit: "LCP", icon: Activity },
    { label: "Vector Search", value: "O(log n)", unit: "HNSW", icon: Database },
    { label: "Latency", value: "<80ms", unit: "p95", icon: Server },
  ];

  return (
    <section id="tech" className="py-24 relative border-t border-primary/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase text-white">
            Elite <span className="text-primary">Performance</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Keine Kompromisse. Unsere Infrastruktur nutzt Partial Prerendering, Server-Side Rendering und Edge-Caching (Vercel KV) + CDN.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 text-center border-t-2 border-t-primary/50 relative group"
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <m.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-3xl md:text-4xl font-black text-white mb-1 font-mono">{m.value}</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{m.unit}</div>
              <div className="text-sm text-gray-500 mt-2">{m.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -- COMPONENT: Roadmap --
function Roadmap() {
  const roadmapItems = [
    { priority: "P0", title: "DSGVO-Audit & Core Architektur", desc: "Skeleton-UI, Partial Prerendering, Edge Caching, Image Optimization", status: "AKTIV" },
    { priority: "P1", title: "Compliance & Security", desc: "Multi-Provider Payments, Observability Stack, Accessibility Automation", status: "IN PROGRESS" },
    { priority: "P2", title: "Growth & Scale", desc: "Structured SEO Data, Internationalization (DE/EN), CI/CD Canary Deployments", status: "PLANNED" },
  ];

  return (
    <section className="py-24 bg-background relative border-t border-white/5">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12 uppercase text-white border-l-4 border-[#b300ff] pl-6">
          Entwicklungs-<br/>Matrix
        </h2>

        <div className="space-y-4 max-w-4xl">
          {roadmapItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col md:flex-row bg-[#0a0f16] border border-white/10 hover:border-primary/40 transition-colors group"
            >
              <div className="md:w-32 bg-white/5 p-6 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-white/10 group-hover:bg-primary/10 transition-colors">
                <span className="font-mono text-2xl font-bold text-white">{item.priority}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm font-mono">{item.desc}</p>
              </div>
              <div className="p-6 flex items-center justify-end border-t md:border-t-0 md:border-l border-white/10">
                <span className={`px-3 py-1 text-xs font-bold tracking-wider rounded-sm ${
                  item.status === 'AKTIV' ? 'bg-primary/20 text-primary border border-primary/50' : 
                  item.status === 'IN PROGRESS' ? 'bg-[#b300ff]/20 text-[#b300ff] border border-[#b300ff]/50' : 
                  'bg-white/10 text-gray-400 border border-white/20'
                }`}>
                  {item.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -- COMPONENT: How It Works --
function HowItWorks() {
  const steps = [
    { num: "01", title: "Suchen & Evaluieren", desc: "Durchsuchen Sie verifizierte digitale Assets. Analyse von Traffic, Tech-Stack und Metriken." },
    { num: "02", title: "Kaufen oder Mieten", desc: "Flexible Modelle. Einmalzahlung für vollen Source-Code oder monatliche Miete inkl. Hosting & Wartung." },
    { num: "03", title: "Transfer & Skalierung", desc: "Reibungsloser Transfer der Domain, Repositories und Server. Sofort einsatzbereit." }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#063229]/20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase text-white">
            Workflow
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative p-8 border border-primary/20 bg-background/50 backdrop-blur-sm"
            >
              <div className="text-6xl font-black text-primary/10 absolute top-4 right-6 pointer-events-none">
                {step.num}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 mt-8 relative z-10">{step.title}</h3>
              <p className="text-gray-400 relative z-10 leading-relaxed">{step.desc}</p>
              
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-primary/30 z-0"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -- COMPONENT: Footer / CTA / About --
function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-24 pb-12 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <Globe className="w-16 h-16 text-primary mb-6 opacity-80" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 uppercase text-white">
            Bereit für die <br/>
            <span className="text-gradient">Übernahme?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mb-10">
            Erweitern Sie Ihr digitales Portfolio mit hochperformanten Assets. Entwickelt in Österreich, gebaut für die Welt.
          </p>
          <button className="bracket-box bg-white text-black px-10 py-5 text-xl font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
            Marktplatz Öffnen
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-white/10 pt-12 text-sm text-gray-400 font-mono">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold tracking-tighter text-gradient uppercase mb-4 font-sans">
              Selinova-Tech
            </div>
            <p className="max-w-xs mb-4">
              Research & Engineering<br/>
              Wien, Österreich<br/>
              DACH-Region Focus
            </p>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Globe className="w-4 h-4 text-white" />
              </span>
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <FileCode2 className="w-4 h-4 text-white" />
              </span>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider font-sans">System</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">Dokumentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API Referenz</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">System Status</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security Audit</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider font-sans">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary transition-colors">Impressum</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Datenschutz (DSGVO)</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AGB</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie-Richtlinie</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 text-center text-xs text-gray-600 font-mono uppercase">
          &copy; {new Date().getFullYear()} SELINOVA-TECH. ALL SYSTEMS ONLINE. // EST. JULY 2026.
        </div>
      </div>
    </footer>
  );
}

// -- MAIN APP --
function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-white">
      <Navbar />
      <Hero />
      <Concept />
      <Differentiators />
      <Performance />
      <Roadmap />
      <HowItWorks />
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route>
        <div className="min-h-screen flex items-center justify-center bg-background text-primary font-mono text-xl">
          404 // MODULE_NOT_FOUND
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;

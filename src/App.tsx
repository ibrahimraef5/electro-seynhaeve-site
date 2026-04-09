import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Star, 
  ChevronRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Lightbulb, 
  Settings, 
  Wrench, 
  Home, 
  Building2, 
  ArrowRight,
  Mail,
  MapPin,
  MessageSquare
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

// --- Constants ---
const SERVICES: Service[] = [
  {
    id: 'residential',
    title: 'Algemene Elektriciteitswerken',
    description: 'Complete elektrische oplossingen voor woningen, van nieuwbouw tot renovaties.',
    icon: <Home className="w-8 h-8" />,
  },
  {
    id: 'charging',
    title: 'Laadpalen',
    description: 'Installatie van laadstations voor elektrische voertuigen bij u thuis of op de zaak.',
    icon: <Zap className="w-8 h-8" />,
  },
  {
    id: 'maintenance',
    title: 'Depannages & Herstelling',
    description: 'Snelle interventie en herstelling bij alle elektrische storingen en defecten.',
    icon: <Wrench className="w-8 h-8" />,
  },
  {
    id: 'domotica',
    title: 'Domotica & Smart Home',
    description: 'Integratie van moderne technologie voor een slimme en efficiënte woning.',
    icon: <Lightbulb className="w-8 h-8" />,
  },
  {
    id: 'security',
    title: 'Camerabewaking',
    description: 'Professionele beveiligingssystemen en camera-installaties voor uw veiligheid.',
    icon: <ShieldCheck className="w-8 h-8" />,
  },
  {
    id: 'emergency',
    title: 'Nooddienst 24/7',
    description: 'Dag en nacht bereikbaar voor dringende elektrische noodgevallen.',
    icon: <Clock className="w-8 h-8" />,
  },
];

const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sabrina Kezadri',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sabrina',
    rating: 5,
    text: "Zeer tevreden over de aanpak van het bedrijf. Het professionalisme heeft de doorslag gegeven. Top service!",
    date: '4 jaar geleden',
  },
  {
    id: '2',
    author: 'Dominique Debeyne',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dominique',
    rating: 5,
    text: "Professionele elektricien met oog voor detail. Zeer betrouwbaar en kwalitatief werk geleverd.",
    date: '3 jaar geleden',
  },
];

const PROCESS_STEPS = [
  { title: 'Consultatie', desc: 'We bespreken uw behoeften en beoordelen de site.' },
  { title: 'Offerte', desc: 'Transparante prijzen zonder verborgen kosten.' },
  { title: 'Uitvoering', desc: 'Professionele installatie door gecertificeerde experts.' },
  { title: 'Certificering', desc: 'Finale testen en veiligheidscertificering.' },
];

// --- Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).tagName === 'A') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div 
        className="custom-cursor hidden md:block"
        animate={{ 
          x: position.x - 10, 
          y: position.y - 10,
          scale: isHovering ? 2.5 : 1,
          borderColor: isHovering ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 1)'
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div 
        className="custom-cursor-dot hidden md:block"
        animate={{ x: position.x - 2, y: position.y - 2 }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-industrial-black/90 backdrop-blur-md py-3 border-b border-gold/20' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gold p-1.5 rounded-sm">
            <Zap className="text-black w-6 h-6 fill-black" />
          </div>
          <span className="font-display text-2xl tracking-wider text-white">ELECTRO <span className="text-gold">SEYNHAÉVE</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Diensten', 'Over ons', 'Proces', 'Reviews', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-sm font-medium hover:text-gold transition-colors uppercase tracking-widest">
              {item}
            </a>
          ))}
          <a href="tel:+32495832329" className="flex items-center gap-2 bg-gold text-black px-6 py-2 font-bold clip-diagonal hover:bg-gold-light transition-all">
            <Phone size={16} />
            <span>BEL NU</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-industrial-gray border-b border-gold/20 py-8 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 items-center">
              {['Diensten', 'Over ons', 'Proces', 'Reviews', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} onClick={() => setIsOpen(false)} className="text-xl font-display tracking-widest hover:text-gold">
                  {item}
                </a>
              ))}
              <a href="tel:+32495832329" className="w-full flex justify-center items-center gap-2 bg-gold text-black px-6 py-4 font-bold clip-diagonal">
                <Phone size={20} />
                <span>BEL NU</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-industrial-black via-industrial-black/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2069" 
          alt="Elektriciteitswerken" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />)}
            </div>
            <span className="text-sm font-bold tracking-widest uppercase opacity-70">4.5/5 Google Score</span>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl leading-none mb-6 tracking-tight">
            KRACHT VOOR UW <br />
            <span className="text-gold text-glow italic">AMBITIES</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-10 max-w-lg leading-relaxed">
            Premium elektrisch vakmanschap voor high-end residentiële en industriële projecten. 100% gecertificeerd, 24/7 betrouwbaarheid en een traditie van uitmuntendheid.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="bg-gold text-black px-10 py-4 font-bold text-lg clip-diagonal hover:bg-gold-light transition-all flex items-center justify-center gap-2 group">
              GRATIS OFFERTE
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#diensten" className="border border-gold/50 text-gold px-10 py-4 font-bold text-lg clip-diagonal hover:bg-gold/10 transition-all flex items-center justify-center gap-2">
              ONZE DIENSTEN
            </a>
          </div>

          <div className="mt-12 flex gap-8 border-t border-white/10 pt-8">
            <div className="flex flex-col">
              <span className="text-gold font-display text-2xl">100%</span>
              <span className="text-xs uppercase tracking-widest opacity-50">Gecertificeerd</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gold font-display text-2xl">20:00</span>
              <span className="text-xs uppercase tracking-widest opacity-50">Open Tot</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gold font-display text-2xl">15+</span>
              <span className="text-xs uppercase tracking-widest opacity-50">Jaar Erv.</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/50"
      >
        <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gold rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="bg-gold py-4 overflow-hidden whitespace-nowrap border-y-4 border-black">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex gap-12 items-center"
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-black font-display text-2xl tracking-widest">ALGEMENE ELEKTRICITEITSWERKEN</span>
            <Zap className="text-black w-6 h-6 fill-black" />
            <span className="text-black font-display text-2xl tracking-widest">LAADPALEN</span>
            <Zap className="text-black w-6 h-6 fill-black" />
            <span className="text-black font-display text-2xl tracking-widest">DOMOTICA & SMART HOME</span>
            <Zap className="text-black w-6 h-6 fill-black" />
            <span className="text-black font-display text-2xl tracking-widest">CAMERABEWAKING</span>
            <Zap className="text-black w-6 h-6 fill-black" />
            <span className="text-black font-display text-2xl tracking-widest">24/7 DEPANNAGES</span>
            <Zap className="text-black w-6 h-6 fill-black" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Services = () => {
  return (
    <section id="diensten" className="py-24 bg-industrial-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl mb-4">ONZE <span className="text-gold">EXPERTISE</span></h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto">
            Van complexe residentiële verlichting tot massieve industriële stroomnetten, wij leveren precisie in elke verbinding.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-industrial-gray p-10 border border-white/5 hover:border-gold/50 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="font-display text-6xl">0{idx + 1}</span>
              </div>
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              <h3 className="font-display text-2xl mb-4 tracking-wider">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <a href="#contact" className="text-gold text-xs font-bold tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                MEER INFO <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  return (
    <section id="overons" className="py-24 bg-industrial-gray relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-square bg-gold/10 border border-gold/20 p-4">
            <img 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000" 
              alt="Professionele Elektricien" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 bg-gold text-black p-8 max-w-xs shadow-2xl">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="italic text-sm font-medium mb-4">
              "Zeer tevreden over de aanpak van het bedrijf. Het professionalisme heeft de doorslag gegeven. Top service!"
            </p>
            <span className="font-bold text-xs uppercase tracking-widest">— Sabrina Kezadri</span>
          </div>
        </motion.div>

        <div>
          <h2 className="font-display text-5xl md:text-7xl mb-8">WAAROM KIEZEN VOOR <br /><span className="text-gold">SEYNHAÉVE?</span></h2>
          <div className="space-y-8">
            {[
              { title: 'Gecertificeerde Uitmuntendheid', desc: 'Al onze technici zijn volledig gelicenseerd en ondergaan strikte veiligheidstrainingen.', icon: <ShieldCheck className="text-gold" /> },
              { title: 'Punctueel & Professioneel', desc: 'Wij respecteren uw tijd. We komen wanneer we zeggen dat we komen, elke keer opnieuw.', icon: <Clock className="text-gold" /> },
              { title: 'Moderne Oplossingen', desc: 'Wij blijven voorop lopen met de nieuwste smart home en industriële technologie.', icon: <Zap className="text-gold" /> },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-display text-xl tracking-wider mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section id="proces" className="py-24 bg-industrial-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl mb-4">ONS <span className="text-gold">PROCES</span></h2>
          <p className="text-gray-400">Hoe wij perfectie garanderen van begin tot eind.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} className="relative group">
              <div className="bg-industrial-gray p-8 border border-white/5 h-full relative z-10">
                <span className="font-display text-4xl text-gold/20 group-hover:text-gold transition-colors mb-4 block">0{i + 1}</span>
                <h4 className="font-display text-xl mb-4 tracking-widest">{step.title}</h4>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-20 text-gold">
                  <ChevronRight size={32} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-industrial-gray">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-display text-5xl md:text-7xl mb-4">KLANT <span className="text-gold">AAN HET WOORD</span></h2>
            <p className="text-gray-400">Echte feedback van onze tevreden residentiële en commerciële klanten.</p>
          </div>
          <div className="flex items-center gap-4 bg-industrial-black p-4 border border-gold/20">
            <div className="text-right">
              <div className="flex text-gold justify-end mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">4.5 Gemiddelde Score</span>
            </div>
            <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {REVIEWS.map((review) => (
            <motion.div 
              key={review.id}
              whileHover={{ y: -5 }}
              className="bg-industrial-black p-10 border border-white/5 relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full border border-gold/30" />
                  <div>
                    <h4 className="font-bold text-sm tracking-widest uppercase">{review.author}</h4>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
                <div className="flex text-gold">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-gray-300 italic leading-relaxed">"{review.text}"</p>
              <div className="absolute bottom-0 right-0 p-4 opacity-10">
                <MessageSquare size={48} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 bg-industrial-black relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-5xl md:text-7xl mb-8">KLAAR OM <br /><span className="text-gold">TE VERBINDEN?</span></h2>
          <p className="text-gray-400 mb-12 max-w-md">
            Vul het onderstaande formulier in of bel ons direct. Ons team staat klaar om de professionele elektrische ondersteuning te bieden die u verdient.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-industrial-gray border border-white/5 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                <Phone size={24} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 block mb-1">Bel Ons</span>
                <a href="tel:+32495832329" className="text-xl font-display tracking-widest hover:text-gold transition-colors">0495 83 23 29</a>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-industrial-gray border border-white/5 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                <Mail size={24} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 block mb-1">Email Ons</span>
                <a href="mailto:info@electro-seynhaeve.be" className="text-xl font-display tracking-widest hover:text-gold transition-colors">info@electro-seynhaeve.be</a>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-industrial-gray border border-white/5 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                <MapPin size={24} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-500 block mb-1">Locatie</span>
                <span className="text-xl font-display tracking-widest">Izegemseaardeweg 182, 8800 Roeselare</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-industrial-gray p-10 border border-gold/20 relative">
          <AnimatePresence>
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-20 bg-industrial-gray flex flex-col items-center justify-center p-10 text-center"
              >
                <div className="w-20 h-20 bg-gold text-black rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="font-display text-3xl mb-4">BERICHT VERZONDEN!</h3>
                <p className="text-gray-400">Bedankt voor uw bericht. We nemen binnen 24 uur contact met u op.</p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Volledige Naam</label>
                <input required type="text" className="w-full bg-industrial-black border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Telefoonnummer</label>
                <input required type="tel" className="w-full bg-industrial-black border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500">E-mailadres</label>
              <input required type="email" className="w-full bg-industrial-black border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Gewenste Dienst</label>
              <select className="w-full bg-industrial-black border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all appearance-none">
                <option>Residentiële Bekabeling</option>
                <option>Commerciële Systemen</option>
                <option>Onderhoud & Herstelling</option>
                <option>Smart Home Automatisatie</option>
                <option>Nooddienst</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold text-gray-500">Uw Bericht</label>
              <textarea rows={4} className="w-full bg-industrial-black border border-white/10 px-4 py-3 focus:border-gold outline-none transition-all resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-gold text-black font-bold py-4 clip-diagonal hover:bg-gold-light transition-all tracking-widest">
              VERZEND AANVRAAG
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-gold p-1.5 rounded-sm">
            <Zap className="text-black w-6 h-6 fill-black" />
          </div>
          <span className="font-display text-2xl tracking-wider text-white">ELECTRO <span className="text-gold">SEYNHAÉVE</span></span>
        </div>
        
        <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-gray-500">
          <a href="#" className="hover:text-gold transition-colors">Privacybeleid</a>
          <a href="#" className="hover:text-gold transition-colors">Gebruiksvoorwaarden</a>
          <a href="#" className="hover:text-gold transition-colors">Cookiebeleid</a>
        </div>

        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Electro Seynhaeve. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
};

const FloatingCTA = () => {
  return (
    <motion.a
      href="tel:+32495832329"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-40 bg-gold text-black p-4 rounded-full shadow-2xl flex items-center justify-center group"
    >
      <div className="absolute -top-2 -right-2 bg-red-500 w-4 h-4 rounded-full animate-ping" />
      <Phone size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 whitespace-nowrap font-bold text-sm">
        BEL NU
      </span>
    </motion.a>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      <CustomCursor />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gold z-[60] origin-left" style={{ scaleX }} />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <WhyUs />
      <Process />
      <Reviews />
      
      {/* Hard CTA Banner */}
      <section className="bg-gold py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h2 className="font-display text-4xl md:text-6xl text-black leading-none mb-2">NEEM GEEN GENOEGEN MET <br />MIDDELMATIGE BEKABELING.</h2>
            <p className="text-black/70 font-bold uppercase tracking-widest">Kies voor de premium behandeling die uw project verdient.</p>
          </div>
          <a href="#contact" className="bg-black text-gold px-12 py-5 font-bold text-xl clip-diagonal hover:bg-industrial-black transition-all">
            MAAK EEN AFSPRAAK
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
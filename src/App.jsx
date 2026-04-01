import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  ArrowLeft,
  X,
  Send,
  MapPin,
  School,
  Hospital,
  ShoppingBag,
  Clock,
  ChevronRight,
  BarChart3,
  Home,
  User,
  ArrowUpRight,
  Circle,
  Activity,
  PieChart,
  Download,
  TrendingUp,
  BadgeDollarSign,
  Building2,
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth';

const firebaseConfig =
  typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const app = firebaseConfig ? initializeApp(firebaseConfig) : null;
const auth = app ? getAuth(app) : null;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const developers = [
  { name: 'Emaar', reputation: 9.4 },
  { name: 'Nakheel', reputation: 8.9 },
  { name: 'Meraas', reputation: 8.7 },
  { name: 'Damac', reputation: 8.1 },
  { name: 'Sobha', reputation: 9.1 },
  { name: 'Ellington', reputation: 8.6 },
];

const locations = [
  { name: 'Dubai Hills', connectivity: 8.8, infrastructure: 9.1 },
  { name: 'Palm Jumeirah', connectivity: 8.2, infrastructure: 9.3 },
  { name: 'Dubai South', connectivity: 7.7, infrastructure: 7.9 },
  { name: 'Downtown', connectivity: 9.5, infrastructure: 9.4 },
  { name: 'DIP', connectivity: 7.1, infrastructure: 7.3 },
  { name: 'Expo City', connectivity: 8.1, infrastructure: 8.0 },
];

const projectNames = [
  'Grand Polo Club',
  'Equiterra',
  'Palm Beach Towers',
  'The Heights',
  'Dubai Mansions',
  'Rixos Residences',
  'District One Naya',
  'The Acres',
  'Asora Bay',
  'Atélis at d3',
];

const scoreLabel = (score) => {
  if (score >= 8.5) return 'Prime Alpha';
  if (score >= 7.5) return 'High Yield';
  if (score >= 6.5) return 'Balanced';
  return 'Watchlist';
};

const calculateInvestmentScore = ({ yieldPct, growthPct, minsDT, priceNum, developerRep, infraScore }) => {
  const yieldScore = clamp((yieldPct / 9) * 10, 0, 10);
  const growthScore = clamp((growthPct / 12) * 10, 0, 10);
  const connectivityScore = clamp(10 - minsDT / 3.2, 0, 10);
  const affordabilityScore = clamp(10 - (priceNum - 1.5) / 1.1, 0, 10);

  const weighted =
    yieldScore * 0.3 +
    growthScore * 0.25 +
    connectivityScore * 0.15 +
    infraScore * 0.15 +
    developerRep * 0.1 +
    affordabilityScore * 0.05;

  return Number(weighted.toFixed(1));
};

const fetchMasterData = () => {
  return Array.from({ length: 547 }).map((_, i) => {
    const id = i + 1;
    const developer = developers[i % developers.length];
    const location = locations[i % locations.length];
    const yieldPct = Number((Math.random() * 4 + 4.5).toFixed(1));
    const growthPct = Number((Math.random() * 5 + 6).toFixed(1));
    const priceNum = Number((Math.random() * 8 + 1.5).toFixed(1));
    const minsDT = Math.floor(Math.random() * 20 + 5);
    const minsMarina = Math.floor(Math.random() * 15 + 10);

    let size = 'sm';
    if (id % 15 === 0) size = 'lg';
    else if (id % 7 === 0) size = 'wide';

    const score = calculateInvestmentScore({
      yieldPct,
      growthPct,
      minsDT,
      priceNum,
      developerRep: developer.reputation,
      infraScore: location.infrastructure,
    });

    return {
      id,
      name: projectNames[i % projectNames.length] + (id > 10 ? ` Ph. ${Math.ceil(id / 10)}` : ''),
      developer: developer.name,
      developerRep: developer.reputation,
      location: location.name,
      locationConnectivity: location.connectivity,
      infrastructureScore: location.infrastructure,
      yieldPct,
      growthPct,
      yield: `${yieldPct}%`,
      growth: `${growthPct}%`,
      priceNum,
      price: `${priceNum.toFixed(1)}M`,
      minsDT,
      minsMarina,
      size,
      score,
      scoreLabel: scoreLabel(score),
      schools: 'GEMS / Dubai British',
      hospitals: "King's / Mediclinic",
      malls: 'Dubai Hills Mall / Dubai Mall',
      image: `https://picsum.photos/seed/espacios-invest-${id}/900/900`,
    };
  });
};

const formatAED = (value) => `AED ${value}`;

const ProjectCard = ({ project, onSelect, isActive }) => {
  const spanClasses = {
    sm: 'col-span-1 row-span-1',
    wide: 'col-span-2 row-span-1',
    lg: 'col-span-2 row-span-2',
  }[project.size];

  return (
    <div className={`${spanClasses} group transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`}>
      <div
        onClick={() => onSelect(project)}
        className={`relative h-full w-full rounded-[2.5rem] backdrop-blur-3xl border transition-all cursor-pointer p-6 flex flex-col justify-between
          ${
            isActive
              ? 'bg-white/85 border-black/20 shadow-2xl ring-2 ring-black/5'
              : 'bg-white/45 border-white/60 shadow-lg hover:bg-white/65 active:scale-95'
          }`}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-3">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{project.developer}</p>
              <h4 className={`${project.size === 'lg' ? 'text-2xl' : 'text-[17px]'} font-bold text-black leading-tight tracking-tighter`}>
                {project.name}
              </h4>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                {project.score}
              </span>
              <ArrowUpRight size={14} className={`${isActive ? 'text-black' : 'text-gray-300'} group-hover:text-black transition-colors`} />
            </div>
          </div>

          <div className="inline-flex rounded-full bg-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">
            {project.scoreLabel}
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-black/5 pt-4 mt-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-gray-400">
              <MapPin size={10} />
              <p className="text-[11px] font-medium tracking-tight">{project.location}</p>
            </div>
            <p className="text-[12px] font-bold tracking-tight text-black">
              {project.yield} Yield • {project.growth} Growth
            </p>
            <p className="text-[11px] font-medium tracking-tight text-gray-500">From {formatAED(project.price)}</p>
          </div>
          {project.size === 'sm' && <ChevronRight size={14} className="text-gray-400" />}
        </div>
      </div>
    </div>
  );
};

const MetricTile = ({ icon: Icon, label, value, sub }) => (
  <div className="bg-gray-50 p-6 rounded-3xl border border-black/5">
    <div className="flex items-center gap-2 text-gray-400 mb-3">
      <Icon size={16} />
      <p className="text-[10px] font-bold uppercase tracking-widest">{label}</p>
    </div>
    <p className="text-3xl font-bold tracking-tight text-black">{value}</p>
    {sub && <p className="text-xs font-medium text-gray-500 mt-2">{sub}</p>}
  </div>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [assistantActive, setAssistantActive] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [query, setQuery] = useState('');
  const [sortMode, setSortMode] = useState('score');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Espacios Intelligence Core active. Ask for high-yield projects, top scores, or location insights.', sender: 'ai' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const searchInputRef = useRef(null);
  const assistantContainerRef = useRef(null);

  useEffect(() => {
    setData(fetchMasterData());

    if (!auth) return;

    signInAnonymously(auth).catch(() => {});
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (assistantContainerRef.current && !assistantContainerRef.current.contains(event.target)) {
        setAssistantActive(false);
      }
    };
    if (assistantActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [assistantActive]);

  const handleRipple = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples((prev) => [...prev, { x, y, id: Date.now() }]);
    setTimeout(() => setRipples((prev) => prev.slice(1)), 800);

    setAssistantActive((prev) => !prev);
    if (!assistantActive) {
      setTimeout(() => searchInputRef.current?.focus(), 200);
    }
  };

  const filteredData = useMemo(() => {
    let rows = data;

    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.developer.toLowerCase().includes(q) ||
          p.scoreLabel.toLowerCase().includes(q)
      );
    }

    const sorted = [...rows];
    if (sortMode === 'score') sorted.sort((a, b) => b.score - a.score);
    if (sortMode === 'yield') sorted.sort((a, b) => b.yieldPct - a.yieldPct);
    if (sortMode === 'growth') sorted.sort((a, b) => b.growthPct - a.growthPct);
    if (sortMode === 'price-low') sorted.sort((a, b) => a.priceNum - b.priceNum);

    return sorted;
  }, [data, query, sortMode]);

  const stats = useMemo(() => {
    if (!data.length) {
      return { count: 0, avgYield: '0.0%', avgGrowth: '0.0%', avgScore: '0.0' };
    }

    const avgYield = (data.reduce((sum, p) => sum + p.yieldPct, 0) / data.length).toFixed(1);
    const avgGrowth = (data.reduce((sum, p) => sum + p.growthPct, 0) / data.length).toFixed(1);
    const avgScore = (data.reduce((sum, p) => sum + p.score, 0) / data.length).toFixed(1);

    return {
      count: data.length,
      avgYield: `${avgYield}%`,
      avgGrowth: `${avgGrowth}%`,
      avgScore,
    };
  }, [data]);

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const current = chatInput.trim();
    const lower = current.toLowerCase();
    const topScore = [...data].sort((a, b) => b.score - a.score).slice(0, 3);
    const topYield = [...data].sort((a, b) => b.yieldPct - a.yieldPct).slice(0, 3);

    setChatMessages((prev) => [...prev, { id: Date.now(), text: current, sender: 'user' }]);
    setChatInput('');

    setTimeout(() => {
      let response = `I screened ${data.length} projects. Try asking for top yields, Downtown opportunities, or best-value deals.`;

      if (lower.includes('yield')) {
        response = `Top yield leaders: ${topYield.map((p) => `${p.name} (${p.yield})`).join(', ')}.`;
      } else if (lower.includes('score') || lower.includes('best')) {
        response = `Top investment scores: ${topScore.map((p) => `${p.name} (${p.score})`).join(', ')}.`;
      } else if (lower.includes('downtown')) {
        const downtown = data.filter((p) => p.location.toLowerCase().includes('downtown')).slice(0, 3);
        response = downtown.length
          ? `Best Downtown matches: ${downtown.map((p) => `${p.name} (${p.yield} yield, ${p.growth} growth)`).join(', ')}.`
          : 'No Downtown matches found in the current sample.';
      } else if (lower.includes('cheap') || lower.includes('budget') || lower.includes('affordable')) {
        const value = [...data].sort((a, b) => a.priceNum - b.priceNum).slice(0, 3);
        response = `Most accessible entry prices: ${value.map((p) => `${p.name} (${formatAED(p.price)})`).join(', ')}.`;
      }

      setChatMessages((prev) => [...prev, { id: Date.now() + 1, text: response, sender: 'ai' }]);
    }, 600);
  };

  const onProjectClick = (proj) => setSelectedProject(proj);

  const resetAll = () => {
    setSelectedProject(null);
    setActiveTab('home');
    setAssistantActive(false);
    setQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-gray-200 transition-colors duration-700 ${isDarkMode ? 'bg-[#1c1c1e] text-white' : 'bg-[#f2f2f7] text-black'}`}>
      <header className="fixed top-6 left-6 right-6 z-50">
        <div className={`max-w-7xl mx-auto px-8 py-4 rounded-[2rem] border backdrop-blur-2xl flex justify-between items-center shadow-xl transition-all ${isDarkMode ? 'bg-[#1c1c1e]/60 border-white/10' : 'bg-white/60 border-white/40'}`}>
          <div>
            <h1 className="text-2xl font-bold tracking-tighter leading-none">Espacios Intelligence</h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-1">Smart real estate investment page</p>
          </div>
          <button
            onClick={async () => {
              if (!auth) return;
              await signOut(auth).catch(() => {});
              await signInAnonymously(auth).catch(() => {});
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/40 border-black/5 shadow-sm'}`}
          >
            <User size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
        </div>
      </header>

      <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] backdrop-blur-2xl border px-8 py-3.5 rounded-full shadow-2xl flex items-center justify-between gap-10 transition-all min-w-[340px] ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-gray-200/50'}`}>
        <button onClick={resetAll} className="p-2 transition-transform active:scale-90">
          <Home size={22} className={activeTab === 'home' && !assistantActive ? (isDarkMode ? 'text-white' : 'text-black') : 'text-gray-400'} />
        </button>

        <button onClick={() => { setActiveTab('stats'); setAssistantActive(false); }} className="p-2 transition-transform active:scale-90">
          <BarChart3 size={22} className={activeTab === 'stats' && !assistantActive ? (isDarkMode ? 'text-white' : 'text-black') : 'text-gray-400'} />
        </button>

        <div className="relative" ref={assistantContainerRef}>
          {assistantActive && (
            <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 w-[320px] h-[400px] rounded-[3rem] border shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden animate-in zoom-in-90 fade-in duration-500 backdrop-blur-3xl origin-bottom ${isDarkMode ? 'bg-[#1c1c1e]/80 border-white/10' : 'bg-white/80 border-white/60'}`}>
              <div className="p-6 flex items-center justify-between border-b border-black/5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center"><Search size={12} className="text-white" /></div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Core Intelligence</span>
                </div>
                <button onClick={() => setAssistantActive(false)} className="p-2 hover:bg-black/5 rounded-full transition-all"><X size={18} className="text-gray-400" /></button>
              </div>

              <div className="flex-grow overflow-y-auto p-5 space-y-4 scrollbar-hide">
                {chatMessages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-4 py-2.5 rounded-[20px] text-[14px] font-medium leading-snug shadow-sm ${m.sender === 'user' ? 'bg-black text-white' : 'bg-gray-100/80 text-gray-800'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleChatSend} className="p-5 bg-transparent border-t border-black/5">
                <div className="relative flex items-center bg-gray-100/50 rounded-full p-1 border border-black/5">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask for top scores, yield, growth..."
                    className="bg-transparent border-none outline-none w-full px-4 text-[14px] font-semibold text-black placeholder:text-gray-400"
                  />
                  <button type="submit" className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
                    <Send size={14} />
                  </button>
                </div>
              </form>
            </div>
          )}

          <button
            onClick={handleRipple}
            className={`w-14 h-14 rounded-full transition-all active:scale-95 relative overflow-hidden shadow-xl ${assistantActive ? 'scale-110' : ''} bg-gradient-to-br from-white via-gray-100 to-gray-300 border border-white shadow-[inset_-2px_-2px_8px_rgba(0,0,0,0.1),0_8px_20px_rgba(0,0,0,0.15)]`}
          >
            <div className="absolute top-1.5 left-1.5 w-6 h-6 bg-white/50 blur-[5px] rounded-full" />
            {ripples.map((r) => (
              <span key={r.id} className="absolute bg-black/5 rounded-full animate-ping pointer-events-none" style={{ left: r.x - 20, top: r.y - 20, width: 40, height: 40 }} />
            ))}
          </button>
        </div>

        <button onClick={() => { setActiveTab('activity'); setAssistantActive(false); }} className="p-2 transition-transform active:scale-90">
          <Activity size={22} className={activeTab === 'activity' && !assistantActive ? (isDarkMode ? 'text-white' : 'text-black') : 'text-gray-400'} />
        </button>

        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 transition-transform active:scale-90">
          <Circle size={22} className={isDarkMode ? 'text-white fill-white/20' : 'text-gray-400'} />
        </button>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-48">
        <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className={`flex items-center gap-3 px-5 py-4 rounded-[2rem] border backdrop-blur-2xl ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/60 border-white/40'}`}>
            <Search size={16} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, developers, locations, score labels..."
              className={`bg-transparent outline-none min-w-[280px] text-sm font-semibold ${isDarkMode ? 'text-white placeholder:text-gray-500' : 'text-black placeholder:text-gray-400'}`}
            />
          </div>

          <div className="flex items-center gap-3">
            {[
              ['score', 'Top Score'],
              ['yield', 'Top Yield'],
              ['growth', 'Top Growth'],
              ['price-low', 'Low Entry'],
            ].map(([value, label]) => (
              <button
                key={value}
                onClick={() => setSortMode(value)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition ${sortMode === value ? 'bg-black text-white border-black' : 'bg-white/60 text-gray-500 border-white/40'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'stats' ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <MetricTile icon={PieChart} label="Registry" value={stats.count} sub="Projects tracked" />
            <MetricTile icon={TrendingUp} label="Average Yield" value={stats.avgYield} sub="Portfolio-wide sample" />
            <MetricTile icon={BarChart3} label="Average Growth" value={stats.avgGrowth} sub="Projected capital appreciation" />
            <MetricTile icon={BadgeDollarSign} label="Average Score" value={stats.avgScore} sub="Weighted investment score" />
          </div>
        ) : activeTab === 'activity' ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 grid gap-6 md:grid-cols-2">
            <div className="p-8 rounded-[3rem] border backdrop-blur-3xl shadow-sm bg-white/60 border-white/40">
              <h3 className="text-2xl font-bold tracking-tight">Screening Logic</h3>
              <p className="mt-4 text-sm text-gray-600 leading-7">
                Investment ranking blends rental yield, projected growth, location connectivity, infrastructure quality,
                developer reputation, and affordability into a single weighted score.
              </p>
            </div>
            <div className="p-8 rounded-[3rem] border backdrop-blur-3xl shadow-sm bg-white/60 border-white/40">
              <h3 className="text-2xl font-bold tracking-tight">Best Use Case</h3>
              <p className="mt-4 text-sm text-gray-600 leading-7">
                Use this page to shortlist projects fast, compare upside, and identify high-conviction opportunities before a deeper underwriting pass.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 grid-flow-dense animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {filteredData.map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={onProjectClick} isActive={selectedProject?.id === p.id} />
            ))}
          </div>
        )}

        {selectedProject && activeTab === 'home' && (
          <div className="mt-12 p-10 bg-white/85 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex justify-between items-start mb-8 gap-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{selectedProject.developer}</p>
                <h2 className="text-4xl font-bold tracking-tighter">{selectedProject.name}</h2>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest">Score {selectedProject.score}</span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-widest">{selectedProject.scoreLabel}</span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-widest">{selectedProject.location}</span>
                </div>
              </div>
              <button onClick={() => setSelectedProject(null)} className="p-3 bg-gray-100 rounded-full"><X size={20} className="text-gray-500" /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              <MetricTile icon={TrendingUp} label="Target Yield" value={selectedProject.yield} sub="Estimated rental return" />
              <MetricTile icon={BarChart3} label="Capital Growth" value={selectedProject.growth} sub="Projected upside" />
              <MetricTile icon={Clock} label="Downtown Access" value={`${selectedProject.minsDT}m`} sub="Approx. drive time" />
              <MetricTile icon={BadgeDollarSign} label="Entry Price" value={formatAED(selectedProject.price)} sub="Starting point" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricTile icon={School} label="Education" value={selectedProject.schools} sub="Nearby schools" />
              <MetricTile icon={Hospital} label="Healthcare" value={selectedProject.hospitals} sub="Nearby hospitals" />
              <MetricTile icon={ShoppingBag} label="Retail" value={selectedProject.malls} sub="Nearby retail and malls" />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-3xl border border-black/5">
                <div className="flex items-center gap-2 text-gray-400 mb-3">
                  <Building2 size={16} />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Investment Thesis</p>
                </div>
                <p className="text-sm leading-7 text-gray-700">
                  {selectedProject.name} ranks as a {selectedProject.scoreLabel.toLowerCase()} opportunity driven by {selectedProject.yield} rental yield,
                  {` ${selectedProject.growth} `}projected growth, and strong positioning in {selectedProject.location}.
                </p>
              </div>
              <button className="bg-black text-white rounded-3xl font-bold px-8 active:scale-95 transition-transform flex items-center justify-center gap-2 min-h-[120px]">
                <Download size={20} /> Export Investment Factsheet
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

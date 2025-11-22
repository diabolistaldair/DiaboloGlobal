
import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ViewState, Language, Category, Trick, User, Difficulty, UserRole } from './types';
import { TrickCard } from './components/TrickCard';
import { AICoach } from './components/AICoach';
import { Forum } from './components/Forum';
import { Auth } from './components/Auth';
import { Profile } from './components/Profile';
import { Check, Crown, ArrowRight, Star, Instagram, Video, User as UserIcon, LogOut, PlayCircle, TrendingUp, Lock, Play, Layers, GraduationCap, Disc, Users, MessageSquare, PlusCircle, Search, Filter, Info, Globe, Heart } from 'lucide-react';
import { TRANSLATIONS, getTricks } from './translations';

export default function App() {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);
  const [lang, setLang] = useState<Language>(Language.ES);
  
  // Session Persistence Logic
  const [user, setUser] = useState<User | null>(() => {
      try {
          const savedUser = localStorage.getItem('diabolo_user');
          if (savedUser) {
              const parsedUser = JSON.parse(savedUser);
              // Restore Date object from string
              return {
                  ...parsedUser,
                  joinedDate: new Date(parsedUser.joinedDate)
              };
          }
      } catch (e) {
          console.error("Failed to load user session", e);
      }
      return null;
  });

  // State to trigger post modal immediately when navigating to Forum
  const [autoOpenPostModal, setAutoOpenPostModal] = useState(false);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('ALL');
  const [filterCountry, setFilterCountry] = useState<string>('ALL');

  // Get content based on current language
  const t = TRANSLATIONS[lang];
  const tricks = useMemo(() => getTricks(lang), [lang]);

  // Compute unique countries from tricks for the filter dropdown
  const uniqueCountries = useMemo(() => {
    return Array.from(new Set(tricks.map(t => t.userCountry))).sort();
  }, [tricks]);

  const handleLogin = (loggedInUser: User) => {
    // Assign Roles: Aldair is Super Admin, others are Users
    const userWithRole = { ...loggedInUser };
    if (loggedInUser.username.toLowerCase() === 'aldairdiabolist' || loggedInUser.username.toLowerCase() === 'admin') {
        userWithRole.role = UserRole.SUPER_ADMIN;
    } else {
        userWithRole.role = UserRole.USER;
    }
    
    setUser(userWithRole);
    localStorage.setItem('diabolo_user', JSON.stringify(userWithRole));
    setView(ViewState.PROFILE);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('diabolo_user');
    setView(ViewState.HOME);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('diabolo_user', JSON.stringify(updatedUser));
  };

  const orderedCategories: Category[] = [
    '1 DIABOLO',
    'INTRODUCCION A 2 DIABOLOS LOW',
    'PRIMEROS TRUCOS DE 2 DIABOLOS',
    'INTRODUCCION A 3 DIABOLOS LOW',
    'PRIMEROS TRUCOS DE 3 DIABOLOS',
    'VERTAX',
    'SITEWAP NOTATION BASICS',
    'INTEGRALES 1 DIABOLO',
    'CORPORALES'
  ];

  // Filtered Tricks Logic
  const filteredTricks = useMemo(() => {
    return tricks.filter(trick => {
        // Text Search (Title, Description, Username)
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
            trick.title.toLowerCase().includes(searchLower) ||
            trick.description.toLowerCase().includes(searchLower) ||
            trick.username.toLowerCase().includes(searchLower);
        
        // Category Filter
        const matchesCategory = filterCategory === 'ALL' || trick.category === filterCategory;
        
        // Difficulty Filter
        const matchesDifficulty = filterDifficulty === 'ALL' || trick.difficulty === filterDifficulty;
        
        // Country Filter
        const matchesCountry = filterCountry === 'ALL' || trick.userCountry === filterCountry;

        return matchesSearch && matchesCategory && matchesDifficulty && matchesCountry;
    });
  }, [tricks, searchTerm, filterCategory, filterDifficulty, filterCountry]);

  // Group filtered tricks by category for display
  const tricksByCategory = useMemo(() => {
      const groups: Record<string, Trick[]> = {};
      
      // If a specific category is selected, only initialize that group. Otherwise initialize all.
      const categoriesToProcess = filterCategory === 'ALL' ? orderedCategories : [filterCategory as Category];
      
      categoriesToProcess.forEach(key => { groups[key] = [] });

      filteredTricks.forEach(trick => {
          if (groups[trick.category] !== undefined) {
             groups[trick.category].push(trick);
          }
      });
      return groups;
  }, [filteredTricks, filterCategory]);

  const Hero = () => (
    <div className="relative overflow-hidden bg-slate-950 py-24 sm:py-32">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-900/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl opacity-50"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center z-10">
        
        <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl mb-6 uppercase">
          {t.hero.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-400 max-w-2xl mx-auto font-light">
          {t.hero.desc}
        </p>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => setView(ViewState.FORUM)}
            className="rounded-full bg-brand-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/20 hover:bg-brand-500 hover:shadow-brand-500/40 transition-all transform hover:-translate-y-1"
          >
            {t.hero.cta_primary}
          </button>
          
          <button 
            onClick={() => {
                if(user) {
                    // Open Forum and trigger modal
                    setView(ViewState.FORUM);
                    setAutoOpenPostModal(true);
                } else {
                    setView(ViewState.AUTH);
                }
            }}
            className="rounded-full bg-slate-800 px-8 py-3.5 text-sm font-bold text-white border border-slate-700 hover:border-brand-500/50 transition-all flex items-center"
          >
             <PlusCircle size={16} className="mr-2" /> {t.hero.new_publication}
          </button>
        </div>
      </div>
    </div>
  );

  const CreatorSection = () => (
    <div className="bg-slate-900/50 border-t border-slate-800 py-12 relative mt-24">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
                <div className="relative mb-8 md:mb-0 group">
                    <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-brand-500 to-purple-500">
                        <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden">
                             <img src="https://picsum.photos/200/200?grayscale" alt="Aldair Diabolist" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-slate-950 text-brand-400 p-2 rounded-full border-4 border-slate-900">
                         <Crown size={16} fill="currentColor" />
                    </div>
                </div>
                <div className="text-center md:text-left max-w-2xl">
                     <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center md:justify-start">
                        @aldairdiabolist
                        <span className="ml-2 text-xs bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-md border border-brand-500/30 uppercase">
                             {t.learn.creator_title}
                        </span>
                     </h3>
                     <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {t.learn.creator_bio}
                     </p>
                     <div className="flex space-x-4 justify-center md:justify-start">
                         <a href="#" className="text-slate-500 hover:text-pink-500 transition-colors"><Instagram size={20}/></a>
                         <a href="#" className="text-slate-500 hover:text-white transition-colors"><Video size={20}/></a>
                     </div>
                </div>
            </div>
        </div>
    </div>
  );

  const AboutSection = () => (
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-6 animate-fade-in">
          <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-white mb-4">{t.about.title}</h2>
              <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="bg-brand-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      <Globe className="text-brand-400" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t.about.mission_title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                      {t.about.mission_desc}
                  </p>
              </div>
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
                   <div className="bg-pink-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      <Heart className="text-pink-400" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{t.about.vision_title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                      {t.about.vision_desc}
                  </p>
              </div>
          </div>

          <div className="bg-gradient-to-br from-brand-900/20 to-slate-900 p-8 rounded-2xl border border-brand-500/20 text-center">
              <p className="text-brand-200 font-medium mb-4">Created by @aldairdiabolist</p>
              <p className="text-slate-500 text-sm">© 2025 Diabolo Global. All rights reserved.</p>
          </div>
      </div>
  );

  const HomeSections = () => (
     <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
         {/* Trends */}
         <section>
            <div className="flex items-center mb-6">
                 <TrendingUp className="text-neon-cyan mr-3" size={24} />
                 <div>
                     <h2 className="text-2xl font-bold text-white">{t.home_sections.trends_title}</h2>
                     <p className="text-sm text-slate-500">{t.home_sections.trends_subtitle}</p>
                 </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[1,2,3].map(i => (
                     <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-brand-500/30 transition cursor-pointer group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded">DIABOLO GLOBAL</span>
                            <span className="text-xs text-slate-500">2h ago</span>
                        </div>
                        <h3 className="text-white font-bold mb-2 group-hover:text-brand-400 transition">Best string length for Vertax?</h3>
                        <p className="text-slate-400 text-sm line-clamp-2">I've been experimenting with Henrys strings but can't find the sweet spot...</p>
                     </div>
                 ))}
            </div>
         </section>

         {/* Videos */}
         <section>
             <div className="flex items-center mb-6">
                 <PlayCircle className="text-neon-pink mr-3" size={24} />
                 <div>
                     <h2 className="text-2xl font-bold text-white">{t.home_sections.videos_title}</h2>
                     <p className="text-sm text-slate-500">{t.home_sections.videos_subtitle}</p>
                 </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4].map(i => (
                    <div key={i} className="aspect-[9/16] bg-slate-900 rounded-xl relative overflow-hidden group cursor-pointer border border-slate-800 hover:border-brand-500/50">
                         <img src={`https://picsum.photos/300/500?random=${i+10}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500" />
                         <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
                                  <Play fill="white" className="text-white" size={20} />
                              </div>
                         </div>
                         <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                              <p className="text-white text-xs font-bold truncate">Amazing combo by User{i}</p>
                         </div>
                    </div>
                ))}
            </div>
         </section>

         {/* Premium Tutorials */}
         <section>
             <div className="flex items-center mb-6">
                 <Lock className="text-yellow-500 mr-3" size={24} />
                 <div>
                     <h2 className="text-2xl font-bold text-white">{t.home_sections.premium_title}</h2>
                     <p className="text-sm text-slate-500">{t.home_sections.premium_subtitle}</p>
                 </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {tricks.filter(t => t.isPremium).slice(0,2).map(trick => (
                     <TrickCard key={trick.id} trick={trick} />
                 ))}
            </div>
            <div className="mt-8 text-center">
                 <button onClick={() => setView(ViewState.LEARN)} className="text-brand-400 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center mx-auto">
                    View All Tutorials <ArrowRight size={16} className="ml-2" />
                 </button>
            </div>
         </section>
     </div>
  );

  // Bottom Navigation Icons configuration
  // ORDER: Learn, Forum, Home (Center), Coach, Profile
  const bottomNavItems = [
    { view: ViewState.LEARN, icon: GraduationCap, label: t.nav.learn },
    { view: ViewState.FORUM, icon: Users, label: t.nav.forum },
    { view: ViewState.HOME, icon: Disc, label: t.nav.home },
    { view: ViewState.COACH, icon: MessageSquare, label: t.nav.coach },
    { view: ViewState.PROFILE, icon: UserIcon, label: t.nav.profile },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-brand-500/30">
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        currentLang={lang}
        setLang={setLang}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="pb-24 md:pb-0">
        {currentView === ViewState.HOME && (
          <div className="animate-fade-in">
            <Hero />
            <HomeSections />
            {/* Footer like area for credits */}
            <div className="py-12 text-center text-slate-600 text-xs border-t border-slate-900">
                <p>DIABOLO GLOBAL © 2025. Community Driven.</p>
            </div>
          </div>
        )}

        {currentView === ViewState.LEARN && (
          <div className="animate-fade-in pt-20 max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">{t.learn.title}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{t.learn.intro_text}</p>
            </div>
            
            {/* SEARCH & FILTER BAR */}
            <div className="mb-12 sticky top-20 z-40 bg-slate-950/90 backdrop-blur-md py-4 border-b border-slate-800/50 -mx-4 px-4 md:mx-0 md:px-0 md:rounded-xl md:border md:bg-slate-900/80 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
                        <input 
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={t.learn.search_placeholder}
                            className="w-full bg-slate-950 border border-slate-700 text-white pl-12 pr-4 py-3 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder-slate-600"
                        />
                    </div>

                    {/* Filters Container */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {/* Category Filter */}
                        <div className="relative min-w-[140px]">
                             <Filter className="absolute left-3 top-3.5 text-slate-500" size={16} />
                             <select 
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 text-slate-300 text-sm pl-10 pr-8 py-3 rounded-xl appearance-none focus:border-brand-500 outline-none"
                             >
                                <option value="ALL">{t.learn.filter_all} ({t.learn.filter_category})</option>
                                {orderedCategories.map(c => (
                                    <option key={c} value={c}>{t.categories[c] || c}</option>
                                ))}
                             </select>
                        </div>

                        {/* Difficulty Filter */}
                        <div className="relative min-w-[140px]">
                             <select 
                                value={filterDifficulty}
                                onChange={(e) => setFilterDifficulty(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 text-slate-300 text-sm px-4 py-3 rounded-xl appearance-none focus:border-brand-500 outline-none"
                             >
                                <option value="ALL">{t.learn.filter_all} ({t.learn.filter_difficulty})</option>
                                {Object.values(Difficulty).map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                             </select>
                        </div>

                        {/* Country Filter */}
                        <div className="relative min-w-[140px]">
                             <select 
                                value={filterCountry}
                                onChange={(e) => setFilterCountry(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 text-slate-300 text-sm px-4 py-3 rounded-xl appearance-none focus:border-brand-500 outline-none"
                             >
                                <option value="ALL">{t.learn.filter_all} ({t.learn.filter_country})</option>
                                {uniqueCountries.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                             </select>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Results Content */}
            <div className="space-y-16 pb-16 min-h-[400px]">
                {filteredTricks.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 border-dashed">
                        <Search className="mx-auto h-12 w-12 text-slate-600 mb-4" />
                        <p className="text-slate-400 text-lg font-medium">{t.learn.no_results}</p>
                        <button 
                            onClick={() => {setSearchTerm(''); setFilterCategory('ALL'); setFilterDifficulty('ALL'); setFilterCountry('ALL');}}
                            className="mt-4 text-brand-400 hover:text-white underline"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    (filterCategory === 'ALL' ? orderedCategories : [filterCategory]).map((cat) => {
                        const tricksInCat = tricksByCategory[cat as string];
                        if (!tricksInCat || tricksInCat.length === 0) return null;
                        
                        return (
                            <div key={cat} id={cat.replace(/\s+/g, '-')} className="scroll-mt-24 animate-fade-in">
                                <div className="flex items-center mb-6">
                                    <div className="h-8 w-1 bg-brand-500 mr-4 rounded-full"></div>
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-wide">{t.categories[cat as Category] || cat}</h3>
                                    <span className="ml-4 text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded-full border border-slate-800">
                                        {tricksInCat.length}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {tricksInCat.map((trick) => (
                                        <TrickCard key={trick.id} trick={trick} />
                                    ))}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
            
            {/* Creator Section moved to bottom of Learn */}
            <CreatorSection />
          </div>
        )}

        {currentView === ViewState.COACH && (
          <div className="animate-fade-in pt-24 px-4">
             <AICoach lang={lang} />
          </div>
        )}

        {currentView === ViewState.FORUM && (
            <div className="animate-fade-in">
                <Forum 
                    user={user} 
                    lang={lang} 
                    goToLogin={() => setView(ViewState.AUTH)}
                    autoOpenPost={autoOpenPostModal}
                    onModalOpened={() => setAutoOpenPostModal(false)}
                />
            </div>
        )}

        {currentView === ViewState.AUTH && (
            <div className="animate-fade-in">
                <Auth onLogin={handleLogin} lang={lang} />
            </div>
        )}

        {currentView === ViewState.PROFILE && (
            <div className="animate-fade-in">
                <Profile user={user} lang={lang} onUpdateUser={handleUpdateUser} />
            </div>
        )}

        {currentView === ViewState.ABOUT && (
            <AboutSection />
        )}
      </main>

      {/* Persistent Bottom Navigation Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-md border-t border-slate-800 md:hidden z-50 pb-safe">
         <div className="grid grid-cols-5 h-16 items-center px-2">
             {bottomNavItems.map((item) => {
                 const Icon = item.icon;
                 const isActive = currentView === item.view;
                 
                 // If user clicks profile but not logged in, go to AUTH
                 const handleClick = () => {
                     if (item.view === ViewState.PROFILE && !user) {
                         setView(ViewState.AUTH);
                     } else {
                         setView(item.view);
                     }
                 };

                 return (
                     <button 
                        key={item.view}
                        onClick={handleClick}
                        className="flex flex-col items-center justify-center space-y-1 w-full h-full"
                     >
                        <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-brand-500/20 text-brand-400' : 'text-slate-500'}`}>
                             <Icon size={isActive ? 24 : 20} />
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-wide ${isActive ? 'text-brand-400' : 'text-slate-600'}`}>
                            {item.label}
                        </span>
                     </button>
                 );
             })}
         </div>
         <div className="h-[env(safe-area-inset-bottom)] w-full bg-slate-950/90"></div>
      </div>
    </div>
  );
}

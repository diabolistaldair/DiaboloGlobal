
import React, { useState } from 'react';
import { ViewState, Language, User } from '../types';
import { Disc, GraduationCap, MessageSquare, Users, User as UserIcon, LogIn, Menu, X, LogOut, Info } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  currentLang: Language;
  setLang: (lang: Language) => void;
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, currentLang, setLang, user, onLogout }) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang].nav;

  // Flags mapping - Expanded for continents, ES is Mexico
  const FLAGS: Record<Language, string> = {
    [Language.ES]: '🇲🇽',
    [Language.EN]: '🇺🇸',
    [Language.FR]: '🇫🇷',
    [Language.DE]: '🇩🇪',
    [Language.ZH]: '🇨🇳',
    [Language.JA]: '🇯🇵',
    [Language.PT]: '🇧🇷',
    [Language.IT]: '🇮🇹',
    [Language.RU]: '🇷🇺',
    [Language.AR]: '🇸🇦',
    [Language.HI]: '🇮🇳',
    [Language.KO]: '🇰🇷',
  };

  // Navigation Items configuration
  const navItems = [
    { view: ViewState.HOME, label: t.home, icon: <Disc size={20} /> },
    { view: ViewState.FORUM, label: t.forum, icon: <Users size={20} /> },
  ];

  const NavButton = ({ item, active, onClick, className }: any) => (
    <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
            active
            ? 'text-white bg-brand-500/20 border border-brand-500/50 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
        } ${className}`}
    >
        <span className="mr-2">{item.icon}</span>
        <span>{item.label}</span>
    </button>
  );

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* LEFT: Title + Learn (Aprender) */}
        <div className="flex items-center gap-6">
             <span className="font-black text-xl tracking-tighter text-white cursor-pointer flex items-center" onClick={() => setView(ViewState.HOME)}>
                DIABOLO <span className="text-brand-500 ml-1">GLOBAL</span>
             </span>
             <div className="hidden md:block">
                <NavButton 
                    item={{ label: t.learn, icon: <GraduationCap size={20} /> }}
                    active={currentView === ViewState.LEARN}
                    onClick={() => setView(ViewState.LEARN)}
                />
             </div>
        </div>

        {/* CENTER: Home & Forum */}
        <div className="hidden md:flex flex-1 justify-center space-x-2">
            {navItems.map((item) => (
                <NavButton 
                    key={item.view}
                    item={item}
                    active={currentView === item.view}
                    onClick={() => setView(item.view)}
                />
            ))}
        </div>

        {/* RIGHT: DiaboloMentor + Auth */}
        <div className="hidden md:flex items-center space-x-3">
             <NavButton 
                item={{ label: t.coach, icon: <MessageSquare size={20} /> }}
                active={currentView === ViewState.COACH}
                onClick={() => setView(ViewState.COACH)}
                className="mr-4"
             />

            {/* Language */}
            <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-2 text-slate-400 hover:text-white p-2 rounded-md hover:bg-slate-800 transition-colors"
                >
                    <span className="text-lg leading-none">{FLAGS[currentLang]}</span>
                    <span className="text-xs font-bold">{currentLang}</span>
                </button>
                
                {isLangMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 max-h-80 overflow-y-auto bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50 scrollbar-hide">
                        {Object.values(Language).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => {
                                    setLang(lang);
                                    setIsLangMenuOpen(false);
                                }}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-800 flex items-center ${currentLang === lang ? 'text-brand-500 font-bold bg-slate-800/50' : 'text-slate-300'}`}
                            >
                                <span className="mr-3 text-lg leading-none">{FLAGS[lang]}</span>
                                {lang}
                            </button>
                        ))}
                    </div>
                )}
             </div>

             {/* Auth Icon / User Dropdown */}
             <div className="relative">
                 <button 
                    onClick={() => {
                        if (user) {
                            setIsUserMenuOpen(!isUserMenuOpen);
                        } else {
                            setView(ViewState.AUTH);
                        }
                    }}
                    className={`p-2 rounded-full transition-all border ${
                        user 
                        ? 'bg-brand-600 text-white border-brand-400' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white hover:border-brand-500'
                    }`}
                    title={user ? user.username : t.login}
                 >
                    {user ? (
                        user.avatarUrl ? <img src={user.avatarUrl} className="w-5 h-5 rounded-full" /> : <UserIcon size={20} />
                    ) : (
                        <LogIn size={20} />
                    )}
                 </button>

                 {/* User Dropdown */}
                 {user && isUserMenuOpen && (
                     <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
                        <button 
                            onClick={() => {
                                setView(ViewState.PROFILE);
                                setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 border-b border-slate-800 flex items-center"
                        >
                            <UserIcon size={16} className="mr-2" /> {t.profile}
                        </button>
                        <button 
                            onClick={() => {
                                setView(ViewState.ABOUT);
                                setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 border-b border-slate-800 flex items-center"
                        >
                            <Info size={16} className="mr-2" /> {t.about}
                        </button>
                        <button 
                            onClick={() => {
                                onLogout();
                                setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 flex items-center"
                        >
                            <LogOut size={16} className="mr-2" /> {t.logout}
                        </button>
                     </div>
                 )}
             </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="flex md:hidden w-full justify-end items-center">
             {/* Title is now handled in the LEFT section which is visible on mobile via generic flex props */}
             
             <div className="flex items-center space-x-2 ml-auto">
                <button onClick={() => setView(user ? ViewState.PROFILE : ViewState.AUTH)} className="p-2">
                    {user ? <UserIcon size={20} className="text-brand-500"/> : <LogIn size={20} className="text-slate-400"/>}
                </button>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-300">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
             </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 absolute w-full z-40 px-4 py-4 flex flex-col space-y-3 shadow-2xl">
            <button onClick={() => {setView(ViewState.LEARN); setIsMobileMenuOpen(false)}} className="text-left text-slate-300 py-3 border-b border-slate-800 font-medium">{t.learn}</button>
            <button onClick={() => {setView(ViewState.HOME); setIsMobileMenuOpen(false)}} className="text-left text-slate-300 py-3 border-b border-slate-800 font-medium">{t.home}</button>
            <button onClick={() => {setView(ViewState.FORUM); setIsMobileMenuOpen(false)}} className="text-left text-slate-300 py-3 border-b border-slate-800 font-medium">{t.forum}</button>
            <button onClick={() => {setView(ViewState.COACH); setIsMobileMenuOpen(false)}} className="text-left text-brand-400 font-bold py-3 flex items-center"><MessageSquare size={16} className="mr-2"/> {t.coach}</button>
             <button onClick={() => {setView(ViewState.ABOUT); setIsMobileMenuOpen(false)}} className="text-left text-slate-300 py-3 border-b border-slate-800 font-medium">{t.about}</button>
            
            <div className="pt-4 pb-2">
                 <p className="text-xs text-slate-500 uppercase font-bold mb-2">Language</p>
                 <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {Object.values(Language).map((lang) => (
                        <button 
                            key={lang} 
                            onClick={() => setLang(lang)} 
                            className={`px-3 py-2 rounded-lg border text-sm flex items-center flex-shrink-0 ${currentLang === lang ? 'border-brand-500 text-brand-500 bg-brand-500/10' : 'border-slate-700 text-slate-400'}`}
                        >
                            <span className="mr-2 text-lg leading-none">{FLAGS[lang]}</span>
                            {lang}
                        </button>
                    ))}
                 </div>
            </div>
            
            {user && (
                 <button onClick={() => {onLogout(); setIsMobileMenuOpen(false)}} className="text-left text-red-400 py-3 mt-2 border-t border-slate-800 flex items-center font-medium">
                    <LogOut size={18} className="mr-2" /> {t.logout}
                 </button>
            )}
        </div>
      )}
    </nav>
  );
};

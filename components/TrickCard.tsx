
import React, { useState } from 'react';
import { Trick, Difficulty, Language } from '../types';
import { Play, Heart, MessageCircle, Share2, Flag, User, MoreVertical, AlertTriangle, Check } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

interface TrickCardProps {
  trick: Trick;
  lang?: Language;
}

export const TrickCard: React.FC<TrickCardProps> = ({ trick, lang = Language.ES }) => {
  const t = TRANSLATIONS[lang].learn || { report: 'Reportar', reported: 'Reportado', delete_request: 'Solicitud de eliminación enviada' };
  const [isReported, setIsReported] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);

  const handleReport = () => {
    if (confirm("¿Estás seguro de que deseas reportar este contenido para su eliminación? / Are you sure you want to report this content for deletion?")) {
        setIsReported(true);
        setShowReportMenu(false);
    }
  };

  const getDifficultyColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.BEGINNER: return 'text-green-400';
      case Difficulty.INTERMEDIATE: return 'text-yellow-400';
      case Difficulty.ADVANCED: return 'text-red-400';
      case Difficulty.EXPERT: return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-brand-500/30 transition-all duration-300 flex flex-col relative group">
      
      {/* Header: User Info */}
      <div className="p-3 flex justify-between items-center border-b border-slate-800/50 bg-slate-900/50">
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-slate-600">
                {trick.userAvatar ? (
                    <img src={trick.userAvatar} alt={trick.username} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-slate-400"><User size={14}/></div>
                )}
            </div>
            <div>
                <div className="flex items-center">
                    <span className="text-sm font-bold text-white mr-2 hover:underline cursor-pointer">{trick.username}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-brand-500/10 text-brand-400 rounded border border-brand-500/20 uppercase font-bold">
                        {trick.userCountry}
                    </span>
                </div>
                <span className="text-[10px] text-slate-500 block">
                    {trick.timestamp.toLocaleDateString()} • {trick.timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                </span>
            </div>
        </div>

        <div className="relative">
             <button 
                onClick={() => setShowReportMenu(!showReportMenu)}
                className="text-slate-500 hover:text-white p-1 rounded-full transition-colors"
             >
                 <MoreVertical size={16} />
             </button>
             
             {showReportMenu && !isReported && (
                 <div className="absolute right-0 top-6 w-32 bg-slate-900 border border-slate-700 rounded shadow-xl z-20 overflow-hidden">
                     <button 
                        onClick={handleReport}
                        className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-slate-800 flex items-center"
                     >
                         <Flag size={12} className="mr-2" /> {t.report}
                     </button>
                 </div>
             )}
        </div>
      </div>

      {/* Video/Image Thumbnail */}
      <div className="relative aspect-[4/5] bg-black overflow-hidden group-card">
        <img 
          src={trick.imageUrl} 
          alt={trick.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
             <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
                 <Play fill="white" className="text-white ml-1" size={20} />
             </div>
        </div>

        {/* Difficulty Tag */}
        <div className="absolute top-2 right-2">
             <span className={`text-[10px] font-bold px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 ${getDifficultyColor(trick.difficulty)}`}>
                 {trick.difficulty}
             </span>
        </div>

        {/* Report Overlay */}
        {isReported && (
             <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center text-center p-4 z-10">
                 <AlertTriangle className="text-red-500 mb-2" size={32} />
                 <p className="text-white font-bold text-sm mb-1">{t.reported}</p>
                 <p className="text-slate-400 text-xs">{t.delete_request}</p>
                 <button 
                    onClick={() => setIsReported(false)} 
                    className="mt-4 text-xs text-brand-400 underline hover:text-white"
                 >
                     Deshacer / Undo
                 </button>
             </div>
        )}
      </div>

      {/* Content Footer */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Actions */}
        <div className="flex items-center space-x-4 mb-3">
             <button className="flex items-center space-x-1 text-slate-400 hover:text-pink-500 transition-colors group-btn">
                 <Heart size={20} className="group-btn-hover:fill-pink-500" />
                 <span className="text-xs font-bold">{trick.likes}</span>
             </button>
             <button className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors">
                 <MessageCircle size={20} />
                 <span className="text-xs font-bold">{trick.comments}</span>
             </button>
             <button className="ml-auto text-slate-400 hover:text-brand-400 transition-colors">
                 <Share2 size={20} />
             </button>
        </div>

        <h3 className="text-sm font-bold text-white mb-1">{trick.title}</h3>
        <p className="text-slate-400 text-xs line-clamp-2 mb-2">{trick.description}</p>
        
        {/* Category Link */}
        <div className="mt-auto pt-2 border-t border-slate-800/50">
             <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                 {trick.category}
             </span>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useRef } from 'react';
import { User, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { User as UserIcon, Camera, Edit2, Image as ImageIcon, Upload, Facebook, Instagram, Video, X } from 'lucide-react';

interface ProfileProps {
  user: User | null;
  lang: Language;
  onUpdateUser: (updatedUser: User) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, lang, onUpdateUser }) => {
  if (!user) return null;

  const t = TRANSLATIONS[lang].profile;
  const tAuth = TRANSLATIONS[lang].auth;

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === 'avatar') {
        onUpdateUser({ ...user, avatarUrl: imageUrl });
        setIsAvatarModalOpen(false);
      } else {
        onUpdateUser({ ...user, coverUrl: imageUrl });
      }
    }
  };

  const handleSocialImport = (provider: 'facebook' | 'google' | 'instagram') => {
    // Simulate import with specific seed or placeholder
    let newAvatar = user.avatarUrl;
    if (provider === 'facebook') newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}fb`;
    if (provider === 'google') newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}gl`;
    if (provider === 'instagram') newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}ig`;
    
    onUpdateUser({ ...user, avatarUrl: newAvatar });
    setIsAvatarModalOpen(false);
  };

  return (
    <div className="pt-24 pb-24 px-4 max-w-3xl mx-auto min-h-screen relative">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative group">
            
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-brand-900 to-slate-900 relative">
                 {user.coverUrl && (
                     <img src={user.coverUrl} className="w-full h-full object-cover absolute inset-0" alt="Cover" />
                 )}
                 
                 {/* Edit Cover Button */}
                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => coverInputRef.current?.click()}
                        className="bg-black/50 hover:bg-black/70 text-white px-3 py-1.5 rounded-full backdrop-blur-sm text-xs font-bold flex items-center border border-white/20"
                      >
                          <Camera size={14} className="mr-2" /> {t.edit_cover}
                      </button>
                      <input 
                        type="file" 
                        ref={coverInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'cover')}
                      />
                 </div>

                 <div className="absolute -bottom-12 left-8 z-10">
                     <div className="relative group/avatar">
                         <div className="w-24 h-24 rounded-full bg-slate-950 p-1 cursor-pointer">
                             {user.avatarUrl ? (
                                 <img src={user.avatarUrl} className="w-full h-full rounded-full bg-slate-800 object-cover" />
                             ) : (
                                 <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                                     <UserIcon size={32} />
                                 </div>
                             )}
                         </div>
                         {/* Edit Avatar Button Overlay */}
                         <button 
                            onClick={() => setIsAvatarModalOpen(true)}
                            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity"
                         >
                             <Camera size={24} className="text-white" />
                         </button>
                     </div>
                 </div>
            </div>

            <div className="pt-14 px-8 pb-8">
                 <div className="flex justify-between items-start">
                     <div>
                         <h2 className="text-2xl font-bold text-white flex items-center">
                             {user.fullName || user.username}
                             {user.country && <span className="ml-3 text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700 text-slate-400">{user.country}</span>}
                         </h2>
                         <p className="text-brand-400 text-sm">@{user.username}</p>
                     </div>
                     {/* Additional profile actions could go here */}
                 </div>

                 <div className="mt-6 grid grid-cols-3 gap-4 text-center border-t border-slate-800 border-b py-6">
                     <div>
                         <div className="text-xl font-bold text-white">0</div>
                         <div className="text-xs text-slate-500 uppercase tracking-wider">{t.posts}</div>
                     </div>
                     <div>
                         <div className="text-xl font-bold text-white">0</div>
                         <div className="text-xs text-slate-500 uppercase tracking-wider">{t.followers}</div>
                     </div>
                     <div>
                         <div className="text-xl font-bold text-white">0</div>
                         <div className="text-xs text-slate-500 uppercase tracking-wider">{t.following}</div>
                     </div>
                 </div>

                 <div className="mt-6 space-y-4">
                     <div>
                         <h3 className="text-sm font-bold text-slate-300 uppercase mb-2">{tAuth.bio}</h3>
                         <p className="text-slate-400 text-sm italic">{user.bio}</p>
                     </div>
                     {user.playStyle && (
                         <div>
                             <h3 className="text-sm font-bold text-slate-300 uppercase mb-2">{tAuth.play_style}</h3>
                             <div className="flex gap-2">
                                 <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs">{user.playStyle}</span>
                             </div>
                         </div>
                     )}
                     {user.socials && (
                        <div className="flex gap-4 pt-2">
                            {user.socials.instagram && <a href={`https://instagram.com/${user.socials.instagram.replace('@','')}`} target="_blank" className="text-pink-500 hover:text-pink-400"><Instagram size={20}/></a>}
                            {user.socials.tiktok && <a href={`https://tiktok.com/${user.socials.tiktok}`} target="_blank" className="text-white hover:text-slate-300"><Video size={20}/></a>}
                        </div>
                     )}
                 </div>
            </div>
        </div>

        {/* Avatar Edit Modal */}
        {isAvatarModalOpen && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm relative shadow-2xl">
                    <button 
                        onClick={() => setIsAvatarModalOpen(false)} 
                        className="absolute top-4 right-4 text-slate-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                    
                    <h3 className="text-xl font-bold text-white mb-6 text-center">{t.edit_avatar}</h3>
                    
                    <div className="space-y-3">
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-xl flex items-center transition-colors border border-slate-700"
                        >
                            <div className="bg-brand-500/20 p-2 rounded-full mr-4">
                                <Upload size={20} className="text-brand-400" />
                            </div>
                            <span className="font-medium">{t.upload_photo}</span>
                        </button>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, 'avatar')}
                        />

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-slate-800"></div>
                            <span className="flex-shrink-0 mx-4 text-slate-500 text-xs uppercase">{t.import_social}</span>
                            <div className="flex-grow border-t border-slate-800"></div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <button onClick={() => handleSocialImport('facebook')} className="bg-[#1877F2]/20 hover:bg-[#1877F2]/30 border border-[#1877F2]/50 p-3 rounded-xl flex justify-center items-center transition-colors">
                                <Facebook className="text-[#1877F2]" />
                            </button>
                            <button onClick={() => handleSocialImport('google')} className="bg-white/10 hover:bg-white/20 border border-slate-600 p-3 rounded-xl flex justify-center items-center transition-colors">
                                <span className="font-bold text-white">G</span>
                            </button>
                            <button onClick={() => handleSocialImport('instagram')} className="bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/50 p-3 rounded-xl flex justify-center items-center transition-colors">
                                <Instagram className="text-pink-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { User, Language, ForumChannel, ForumPost, MediaType, UserRole, Category } from '../types';
import { TRANSLATIONS } from '../translations';
import { MessageSquare, ThumbsUp, Send, Globe, MapPin, Lock, Image as ImageIcon, Video, Link as LinkIcon, Upload, User as UserIcon, Trash2, PlusCircle, X, FileVideo } from 'lucide-react';

interface ForumProps {
  user: User | null;
  lang: Language;
  goToLogin: () => void;
  autoOpenPost?: boolean;
  onModalOpened?: () => void;
}

export const Forum: React.FC<ForumProps> = ({ user, lang, goToLogin, autoOpenPost = false, onModalOpened }) => {
  const t = TRANSLATIONS[lang].forum;
  const tHero = TRANSLATIONS[lang].hero; 
  const tCats = TRANSLATIONS[lang].categories;

  const [currentChannel, setCurrentChannel] = useState<ForumChannel>(ForumChannel.GLOBAL);
  const [newPostContent, setNewPostContent] = useState('');
  
  // Modals State
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);

  // Handle Auto Open
  useEffect(() => {
      if (autoOpenPost && user) {
          setIsPostModalOpen(true);
          if (onModalOpened) onModalOpened();
      }
  }, [autoOpenPost, user, onModalOpened]);

  // Tutorial Form State
  const [tutTitle, setTutTitle] = useState('');
  const [tutDesc, setTutDesc] = useState('');
  const [tutCategory, setTutCategory] = useState('');
  const [tutFile, setTutFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Dummy data for initial render
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      userId: 'user1',
      username: 'DiaboloKing',
      userCountry: 'México',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DiaboloKing',
      channel: ForumChannel.GLOBAL,
      content: 'Check out this new combo I landed today! / Miren este combo que logré hoy!',
      mediaType: 'text',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      likes: 15,
      comments: 3
    },
    {
      id: '2',
      userId: 'user2',
      username: 'VertaxMaster',
      userCountry: 'France',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VertaxMaster',
      channel: ForumChannel.EUROPA,
      content: 'EJC 2025 registration is now open. Who is going?',
      mediaType: 'link',
      mediaUrl: 'http://example.com',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      likes: 42,
      comments: 12
    }
  ]);

  const handlePost = () => {
    if (!user) {
        goToLogin();
        return;
    }
    if (!newPostContent.trim()) return;

    const post: ForumPost = {
      id: Date.now().toString(),
      userId: user.username,
      username: user.username,
      userCountry: user.country || 'Global',
      avatarUrl: user.avatarUrl,
      channel: currentChannel,
      content: newPostContent,
      mediaType: 'text',
      timestamp: new Date(),
      likes: 0,
      comments: 0
    };

    setPosts([post, ...posts]);
    setNewPostContent('');
    setIsPostModalOpen(false); // Close modal
    alert(t.post_published);
  };

  const handleTutorialSubmit = () => {
      if (!user) {
          goToLogin();
          return;
      }
      if (!tutTitle || !tutFile) return;

      setIsUploading(true);
      // Simulate Upload Delay
      setTimeout(() => {
          setIsUploading(false);
          setIsTutorialModalOpen(false);
          setTutTitle('');
          setTutDesc('');
          setTutFile(null);
          alert(t.tutorial_submitted);
      }, 1500);
  }

  const handleDeletePost = (postId: string) => {
      if(confirm('Are you sure you want to delete this post? (Admin Action)')) {
          setPosts(posts.filter(p => p.id !== postId));
      }
  }

  const filteredPosts = posts.filter(p => p.channel === currentChannel);
  const isAdmin = user && (user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pt-24 min-h-screen flex flex-col md:flex-row gap-6 relative">
      
      {/* Sidebar / Channel Selector */}
      <div className="w-full md:w-64 bg-slate-900/80 border border-slate-800 rounded-xl p-4 h-fit md:sticky md:top-24 backdrop-blur-sm">
        <div className="mb-6">
            {/* New Publication Button */}
            <button 
                className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center justify-center text-sm transition-all mb-3"
                onClick={() => user ? setIsPostModalOpen(true) : goToLogin()}
            >
                <PlusCircle size={16} className="mr-2" /> {tHero.new_publication}
            </button>

            {/* New Tutorial Button */}
            <button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center justify-center text-sm hover:opacity-90 transition-opacity"
                onClick={() => user ? setIsTutorialModalOpen(true) : goToLogin()}
            >
                <Upload size={16} className="mr-2" /> {t.new_tutorial_btn}
            </button>
        </div>

        <h3 className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-wider flex items-center">
            <Globe size={14} className="mr-2" /> {t.select_channel}
        </h3>
        <div className="space-y-1">
          {Object.values(ForumChannel).map((channel) => (
            <button
              key={channel}
              onClick={() => setCurrentChannel(channel)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center ${
                currentChannel === channel
                  ? 'bg-slate-800 text-white border border-brand-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0 ${currentChannel === channel ? 'bg-brand-500' : 'bg-slate-600'}`}></span>
              <span className="truncate">{t.channels[channel]}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-8 border-t border-slate-800 pt-4">
             <div className="text-xs text-slate-500 mb-2 uppercase font-bold">Stats</div>
             <div className="flex justify-between text-xs text-slate-300 mb-1">
                 <span>Online</span>
                 <span className="text-neon-cyan font-mono">1,204</span>
             </div>
             <div className="flex justify-between text-xs text-slate-300">
                 <span>Posts</span>
                 <span className="font-mono">{posts.length}</span>
             </div>
        </div>
      </div>

      {/* Main Feed */}
      <div className="flex-1 flex flex-col bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden backdrop-blur-sm">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex justify-between items-center">
           <div>
                <h2 className="text-lg font-bold text-white flex items-center">
                    <MapPin size={18} className="mr-2 text-brand-400" />
                    {t.channels[currentChannel]}
                </h2>
                <p className="text-xs text-slate-400">{t.subtitle}</p>
           </div>
        </div>

        {/* Quick Post Input (Inline) */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 hidden md:block">
          {user ? (
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-500 to-neon-cyan flex-shrink-0 overflow-hidden">
                     {user.avatarUrl && <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1">
                    <div className="relative cursor-pointer" onClick={() => setIsPostModalOpen(true)}>
                        <div className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-500 text-sm hover:bg-slate-800 transition-colors">
                            {t.post_placeholder}
                        </div>
                    </div>
                </div>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-slate-800/30 p-6 rounded-xl border border-slate-700 border-dashed">
                <div className="flex items-center text-slate-400">
                    <Lock size={20} className="mr-3 text-brand-500" />
                    <span className="text-sm font-medium">{t.login_to_post}</span>
                </div>
                <button onClick={goToLogin} className="text-brand-400 text-sm font-bold hover:text-white transition-colors">
                    {TRANSLATIONS[lang].auth.cta_login}
                </button>
            </div>
          )}
        </div>

        {/* Posts List */}
        <div className="flex-1 min-h-[400px] p-4 space-y-4 bg-slate-950/30">
            {filteredPosts.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p>No posts yet in this channel. Be the first!</p>
                </div>
            ) : (
                filteredPosts.map((post) => (
                    <div key={post.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-slate-700 transition-colors group relative">
                        {isAdmin && (
                            <button onClick={() => handleDeletePost(post.id)} className="absolute top-4 right-4 text-slate-600 hover:text-red-500 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={16} />
                            </button>
                        )}
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden mr-3 flex-shrink-0">
                                {post.avatarUrl ? (
                                    <img src={post.avatarUrl} alt={post.username} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-500"><UserIcon size={20} /></div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold text-white text-sm hover:underline cursor-pointer">{post.username}</span>
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-500/10 text-brand-400 border border-brand-500/20">{post.userCountry}</span>
                                </div>
                                <span className="text-xs text-slate-600 block mt-0.5">{post.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                        </div>
                        <div className="pl-13 ml-13">
                            <p className="text-slate-300 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
                            <div className="flex items-center space-x-6 border-t border-slate-800/50 pt-3">
                                <button className="flex items-center space-x-1.5 text-xs font-medium text-slate-500 hover:text-brand-400 transition-colors">
                                    <ThumbsUp size={14} /><span>{post.likes}</span>
                                </button>
                                <button className="flex items-center space-x-1.5 text-xs font-medium text-slate-500 hover:text-white transition-colors">
                                    <MessageSquare size={14} /><span>{post.comments} Comments</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
      </div>

      {/* POST MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl animate-fade-in">
                <button onClick={() => setIsPostModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={24} /></button>
                <h3 className="text-xl font-bold text-white mb-4">{t.create_post_title}</h3>
                <textarea 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder={t.post_placeholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white h-40 focus:border-brand-500 outline-none resize-none mb-4"
                    autoFocus
                />
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                        <button className="p-2 hover:bg-slate-800 rounded-full text-brand-400 transition-colors"><ImageIcon size={20} /></button>
                        <button className="p-2 hover:bg-slate-800 rounded-full text-blue-400 transition-colors"><Video size={20} /></button>
                        <button className="p-2 hover:bg-slate-800 rounded-full text-pink-400 transition-colors"><LinkIcon size={20} /></button>
                    </div>
                    <button onClick={handlePost} disabled={!newPostContent.trim()} className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2 rounded-xl font-bold transition-colors">
                        {t.post_btn}
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* TUTORIAL MODAL */}
      {isTutorialModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl p-6 relative shadow-2xl animate-fade-in">
                  <button onClick={() => setIsTutorialModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X size={24} /></button>
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                      <Upload size={24} className="mr-2 text-purple-500" /> {t.upload_tutorial_title}
                  </h3>

                  <div className="space-y-4">
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-1">{t.tut_title_label}</label>
                          <input 
                            type="text" 
                            value={tutTitle} 
                            onChange={(e) => setTutTitle(e.target.value)} 
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-brand-500 outline-none" 
                          />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-1">{t.tut_desc_label}</label>
                          <textarea 
                            value={tutDesc} 
                            onChange={(e) => setTutDesc(e.target.value)} 
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-brand-500 outline-none resize-none h-20" 
                          />
                      </div>
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-1">{t.tut_cat_label}</label>
                          <select 
                            value={tutCategory} 
                            onChange={(e) => setTutCategory(e.target.value)} 
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:border-brand-500 outline-none appearance-none"
                          >
                              <option value="">Select Category</option>
                              {Object.keys(tCats).map(cat => <option key={cat} value={cat}>{tCats[cat as Category]}</option>)}
                          </select>
                      </div>
                      
                      {/* File Upload Area */}
                      <div>
                          <label className="text-xs font-bold text-slate-500 uppercase block mb-1">{t.tut_file_label}</label>
                          <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-slate-700 hover:border-brand-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/50"
                          >
                              {tutFile ? (
                                  <>
                                    <FileVideo size={32} className="text-green-400 mb-2" />
                                    <p className="text-green-400 font-bold text-sm">{tutFile.name}</p>
                                    <p className="text-slate-500 text-xs">{(tutFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                  </>
                              ) : (
                                  <>
                                    <Upload size={32} className="text-slate-500 mb-2" />
                                    <p className="text-slate-400 text-sm font-medium">{t.drag_drop}</p>
                                  </>
                              )}
                              <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="video/*"
                                onChange={(e) => setTutFile(e.target.files?.[0] || null)}
                              />
                          </div>
                      </div>
                  </div>

                  <button 
                    onClick={handleTutorialSubmit}
                    disabled={!tutTitle || !tutFile || isUploading}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                      {isUploading ? t.uploading : t.submit}
                  </button>
              </div>
          </div>
      )}

    </div>
  );
};


import { Language, Trick, Difficulty, Category, ForumChannel } from './types';

const baseEnglish = {
    app_title: 'DIABOLO GLOBAL',
    nav: {
      home: 'Home',
      learn: 'Learn',
      coach: 'DiaboloMentor',
      forum: 'Forum',
      subscribe: 'Premium',
      login: 'Login',
      profile: 'Profile',
      about: 'About',
      logout: 'Log Out'
    },
    hero: {
      badge: '',
      title: 'DIABOLO GLOBAL',
      desc: 'Connect with the global community, discover trends, and master the stage.',
      cta_primary: 'Go to Forum',
      cta_secondary: 'Watch Tutorials',
      new_publication: 'New Publication'
    },
    home_sections: {
      trends_title: 'Forum Trends',
      trends_subtitle: 'Top community discussions',
      videos_title: 'Trending Videos',
      videos_subtitle: 'Viral clips of the week',
      premium_title: 'Trending Tutorials',
      premium_subtitle: 'Unlock your full potential'
    },
    learn: {
      title: 'Tutorial Library',
      intro_text: 'Tutorials made by and for the community. Share your knowledge, learn from others, and report inappropriate content to keep the space safe.',
      creator_title: 'About the Creator',
      creator_bio: 'Founded by @aldairdiabolist with the mission of keeping the global diabolo community united. A neutral space to connect cultures through art.',
      report: 'Report',
      reported: 'Reported',
      delete_request: 'Deletion request sent',
      search_placeholder: 'Search tutorials, tricks, or users...',
      filter_all: 'All',
      filter_category: 'Category',
      filter_difficulty: 'Difficulty',
      filter_country: 'Country',
      no_results: 'No results found for your search.'
    },
    auth: {
      login_title: 'Welcome to Diabolo Global',
      register_title: 'Join the Community',
      username: 'Username',
      fullname: 'Full Name',
      country_origin: 'Country of Origin (Public)',
      residence: 'City/Country of Residence (Private)',
      age: 'Age',
      play_style: 'Favorite Play Style',
      password: 'Password',
      bio: 'Bio',
      bio_placeholder: 'Tell us about yourself...',
      socials_label: 'Social Media (Optional)',
      cta_login: 'Log In',
      cta_register: 'Create Profile',
      switch_register: 'No account? Sign up',
      switch_login: 'Have an account? Login',
      social_login: 'Or login with',
      logout: 'Log Out'
    },
    profile: {
        edit_cover: 'Change Cover',
        edit_avatar: 'Change Photo',
        upload_photo: 'Upload File',
        import_social: 'Import from',
        save: 'Save',
        cancel: 'Cancel',
        posts: 'Posts',
        followers: 'Followers',
        following: 'Following'
    },
    forum: {
      title: 'Diabolo Global Forum',
      subtitle: 'International Community',
      select_channel: 'Channels',
      new_post: 'Share something...',
      post_placeholder: 'What are you practicing today?',
      post_btn: 'Post',
      new_tutorial_btn: 'Upload New Tutorial',
      tutorial_submitted: 'Tutorial submitted! It will be visible after Administrator approval.',
      post_published: 'Published successfully.',
      login_to_post: 'Log in to join',
      create_post_title: 'Create Publication',
      upload_tutorial_title: 'Upload Tutorial',
      tut_title_label: 'Trick Title',
      tut_desc_label: 'Description',
      tut_cat_label: 'Category',
      tut_file_label: 'Video File',
      drag_drop: 'Drag and drop or click to select',
      uploading: 'Uploading...',
      submit: 'Submit',
      channels: {
        [ForumChannel.GLOBAL]: 'Diabolo Global 🌍',
        [ForumChannel.AMERICA]: 'Diabolo Americas 🌎',
        [ForumChannel.EUROPA]: 'Diabolo Europe 🌍',
        [ForumChannel.ASIA]: 'Diabolo Asia 🌏',
        [ForumChannel.AFRICA]: 'Diabolo Africa 🌍',
        [ForumChannel.OCEANIA]: 'Diabolo Oceania 🌏',
      }
    },
    coach: {
      title: 'DiaboloMentor',
      subtitle: 'Your AI Coach',
      desc: 'Solve technical doubts instantly.',
      placeholder: 'Ask about technique, knots, or gear...',
      loading: 'Analyzing...',
      prompts: {
        beginner: { title: 'Basic', text: 'How to start?' },
        maintenance: { title: 'Gear', text: 'Best diabolos' },
        advanced: { title: 'Pro', text: 'Vertax secrets' }
      }
    },
    about: {
      title: 'About Diabolo Global',
      mission_title: 'Our Mission',
      mission_desc: 'To unite the world through the art of the diabolo, breaking language and border barriers.',
      vision_title: 'Vision',
      vision_desc: 'A centralized, neutral, and high-quality platform where every diabolo player, from beginner to expert, has a voice and a place to learn.',
      contact: 'Contact'
    },
    subscribe: {
      title: 'Advanced Tutorials',
      subtitle: 'Exclusive material to take your level to the extreme.',
      free_tier: 'Basic',
      free_price: 'Free',
      pro_tier: 'Global Pro',
      pro_price: '$9.99/mo',
      features: {
        basic: 'Forum Access',
        community: 'Basic Tutorials',
        ai_limit: 'Limited Queries',
        unlimited: 'Advanced Tutorials',
        ai_unlimited: 'DiaboloMentor Pro',
        analysis: 'Video Feedback',
        events: 'Global Giveaways'
      },
      cta_free: 'Current Plan',
      cta_sub: 'Unlock All',
      subscribed: 'You are Premium'
    },
    categories: {
        '1 DIABOLO': '1 Diabolo',
        'INTRODUCCION A 2 DIABOLOS LOW': 'Intro 2 Diabolos Low',
        'PRIMEROS TRUCOS DE 2 DIABOLOS': 'First Tricks 2 Diabolos',
        'INTRODUCCION A 3 DIABOLOS LOW': 'Intro 3 Diabolos Low',
        'PRIMEROS TRUCOS DE 3 DIABOLOS': 'First Tricks 3 Diabolos',
        'VERTAX': 'Vertax',
        'SITEWAP NOTATION BASICS': 'Siteswap Basics',
        'INTEGRALES 1 DIABOLO': 'Integrals',
        'CORPORALES': 'Body Moves'
    },
    countries: [
        'Mexico', 'Argentina', 'Spain', 'USA', 'France', 'Germany', 'Japan', 'Taiwan', 'Malaysia', 'Other'
    ]
};

export const TRANSLATIONS = {
  [Language.ES]: {
    app_title: 'DIABOLO GLOBAL',
    nav: {
      home: 'Inicio',
      learn: 'Aprender',
      coach: 'DiaboloMentor',
      forum: 'Foro',
      subscribe: 'Premium',
      login: 'Acceder',
      profile: 'Perfil',
      about: 'Acerca de',
      logout: 'Cerrar Sesión'
    },
    hero: {
      badge: '',
      title: 'DIABOLO GLOBAL',
      desc: 'Conecta con la comunidad mundial, descubre tendencias y domina la pista.',
      cta_primary: 'Ir al Foro',
      cta_secondary: 'Ver Tutoriales',
      new_publication: 'Nueva Publicación'
    },
    home_sections: {
      trends_title: 'Tendencias del Foro',
      trends_subtitle: 'Lo más relevante de la comunidad',
      videos_title: 'Videos en Tendencia',
      videos_subtitle: 'Los clips más virales de la semana',
      premium_title: 'Tutoriales en Tendencia',
      premium_subtitle: 'Desbloquea tu máximo potencial'
    },
    learn: {
      title: 'Biblioteca de Tutoriales',
      intro_text: 'Tutoriales hechos por y para la comunidad. Comparte tu conocimiento, aprende de otros y reporta contenido inapropiado para mantener el espacio seguro.',
      creator_title: 'Sobre el Creador',
      creator_bio: 'Fundada por @aldairdiabolist con la misión de mantener la unión del diábolo mundial. Un espacio neutral para conectar culturas a través del arte.',
      report: 'Reportar',
      reported: 'Reportado',
      delete_request: 'Solicitud de eliminación enviada',
      search_placeholder: 'Buscar tutoriales, trucos o usuarios...',
      filter_all: 'Todos',
      filter_category: 'Categoría',
      filter_difficulty: 'Dificultad',
      filter_country: 'País',
      no_results: 'No se encontraron resultados para tu búsqueda.'
    },
    auth: {
      login_title: 'Bienvenido a Diabolo Global',
      register_title: 'Únete a la Comunidad',
      username: 'Usuario',
      fullname: 'Nombre Completo',
      country_origin: 'País de Origen (Público)',
      residence: 'Ciudad/País de Residencia (Privado)',
      age: 'Edad',
      play_style: 'Estilo de Juego Favorito',
      password: 'Contraseña',
      bio: 'Sobre mí',
      bio_placeholder: 'Cuéntanos quién eres...',
      socials_label: 'Redes Sociales (Opcional)',
      cta_login: 'Iniciar Sesión',
      cta_register: 'Crear Perfil',
      switch_register: '¿No tienes cuenta? Regístrate',
      switch_login: '¿Ya tienes cuenta? Entrar',
      social_login: 'O inicia sesión con',
      logout: 'Cerrar Sesión'
    },
    profile: {
        edit_cover: 'Cambiar Portada',
        edit_avatar: 'Cambiar Foto',
        upload_photo: 'Subir Archivo',
        import_social: 'Importar de',
        save: 'Guardar',
        cancel: 'Cancelar',
        posts: 'Publicaciones',
        followers: 'Seguidores',
        following: 'Siguiendo'
    },
    forum: {
      title: 'Foro Diabolo Global',
      subtitle: 'Comunidad Internacional',
      select_channel: 'Canales',
      new_post: 'Comparte algo...',
      post_placeholder: '¿Qué estás practicando hoy?',
      post_btn: 'Publicar',
      new_tutorial_btn: 'Subir Nuevo Tutorial',
      tutorial_submitted: '¡Tutorial enviado! Será visible tras la aprobación del Administrador.',
      post_published: 'Publicado exitosamente.',
      login_to_post: 'Inicia sesión para participar',
      create_post_title: 'Crear Publicación',
      upload_tutorial_title: 'Subir Tutorial',
      tut_title_label: 'Título del Truco',
      tut_desc_label: 'Descripción',
      tut_cat_label: 'Categoría',
      tut_file_label: 'Archivo de Video',
      drag_drop: 'Arrastra o click para seleccionar',
      uploading: 'Subiendo...',
      submit: 'Enviar',
      channels: {
        [ForumChannel.GLOBAL]: 'Diabolo Global 🌍',
        [ForumChannel.AMERICA]: 'Diabolo América 🌎',
        [ForumChannel.EUROPA]: 'Diabolo Europa 🌍',
        [ForumChannel.ASIA]: 'Diabolo Asia 🌏',
        [ForumChannel.AFRICA]: 'Diabolo África 🌍',
        [ForumChannel.OCEANIA]: 'Diabolo Oceanía 🌏',
      }
    },
    coach: {
      title: 'DiaboloMentor',
      subtitle: 'Tu Entrenador IA',
      desc: 'Resuelve dudas técnicas al instante.',
      placeholder: 'Pregunta sobre técnica, nudos o equipo...',
      loading: 'Analizando...',
      prompts: {
        beginner: { title: 'Básico', text: '¿Cómo empiezo?' },
        maintenance: { title: 'Equipo', text: 'Mejores diábolos' },
        advanced: { title: 'Pro', text: 'Secretos del Vertax' }
      }
    },
    about: {
      title: 'Acerca de Diabolo Global',
      mission_title: 'Nuestra Misión',
      mission_desc: 'Unir al mundo a través del arte del diábolo, rompiendo barreras de idioma y fronteras.',
      vision_title: 'Visión',
      vision_desc: 'Una plataforma centralizada, neutral y de calidad donde todo diabolista, desde principiante hasta experto, tenga voz y lugar para aprender.',
      contact: 'Contacto'
    },
    subscribe: {
      title: 'Tutoriales Avanzados',
      subtitle: 'Material exclusivo para llevar tu nivel al extremo.',
      free_tier: 'Básico',
      free_price: 'Gratis',
      pro_tier: 'Pro Global',
      pro_price: '$9.99/mes',
      features: {
        basic: 'Acceso al Foro',
        community: 'Tutoriales Básicos',
        ai_limit: 'Consultas Limitadas',
        unlimited: 'Tutoriales Avanzados',
        ai_unlimited: 'DiaboloMentor Pro',
        analysis: 'Feedback de Video',
        events: 'Sorteos Globales'
      },
      cta_free: 'Plan Actual',
      cta_sub: 'Desbloquear Todo',
      subscribed: 'Eres Premium'
    },
    categories: {
        '1 DIABOLO': '1 Diábolo',
        'INTRODUCCION A 2 DIABOLOS LOW': 'Intro 2 Diábolos Low',
        'PRIMEROS TRUCOS DE 2 DIABOLOS': 'Trucos 2 Diábolos',
        'INTRODUCCION A 3 DIABOLOS LOW': 'Intro 3 Diábolos Low',
        'PRIMEROS TRUCOS DE 3 DIABOLOS': 'Trucos 3 Diábolos',
        'VERTAX': 'Vertax',
        'SITEWAP NOTATION BASICS': 'Siteswap Básico',
        'INTEGRALES 1 DIABOLO': 'Integrales',
        'CORPORALES': 'Corporales'
    },
    countries: [
        'México', 'Argentina', 'España', 'USA', 'France', 'Germany', 'Japan', 'Taiwan', 'Malaysia', 'Other'
    ]
  },
  [Language.EN]: baseEnglish,
  [Language.FR]: {
     ...baseEnglish,
     nav: { home: 'Accueil', learn: 'Apprendre', coach: 'DiaboloMentor', forum: 'Forum', subscribe: 'Premium', login: 'Connexion', profile: 'Profil', about: 'À propos', logout: 'Déconnexion' },
     countries: ['France', 'Other']
  },
  [Language.DE]: {
     ...baseEnglish,
     nav: { home: 'Start', learn: 'Lernen', coach: 'DiaboloMentor', forum: 'Forum', subscribe: 'Premium', login: 'Login', profile: 'Profil', about: 'Über uns', logout: 'Abmelden' },
     countries: ['Germany', 'Other']
  },
  [Language.ZH]: {
     ...baseEnglish,
     nav: { home: '主页', learn: '学习', coach: 'DiaboloMentor', forum: '论坛', subscribe: '会员', login: '登录', profile: '资料', about: '关于', logout: '退出' },
     countries: ['China', 'Other']
  },
  [Language.JA]: {
     ...baseEnglish,
     nav: { home: 'ホーム', learn: '学ぶ', coach: 'DiaboloMentor', forum: '掲示板', subscribe: 'プレミアム', login: 'ログイン', profile: 'プロフ', about: '概要', logout: 'ログアウト' },
     countries: ['Japan', 'Other']
  },
  // NEW LANGUAGES (Using Base English + Specific Overrides where needed for demo)
  [Language.PT]: {
     ...baseEnglish,
     nav: { home: 'Início', learn: 'Aprender', coach: 'DiaboloMentor', forum: 'Fórum', subscribe: 'Premium', login: 'Entrar', profile: 'Perfil', about: 'Sobre', logout: 'Sair' },
  },
  [Language.IT]: {
     ...baseEnglish,
     nav: { home: 'Home', learn: 'Imparare', coach: 'DiaboloMentor', forum: 'Forum', subscribe: 'Premium', login: 'Accedi', profile: 'Profilo', about: 'Info', logout: 'Esci' },
  },
  [Language.RU]: {
     ...baseEnglish,
     nav: { home: 'Главная', learn: 'Учиться', coach: 'DiaboloMentor', forum: 'Форум', subscribe: 'Премиум', login: 'Войти', profile: 'Профиль', about: 'О нас', logout: 'Выйти' },
  },
  [Language.AR]: {
     ...baseEnglish,
     nav: { home: 'الرئيسية', learn: 'تعلم', coach: 'DiaboloMentor', forum: 'المنتدى', subscribe: 'مميز', login: 'دخول', profile: 'الملف الشخصي', about: 'حول', logout: 'خروج' },
  },
  [Language.HI]: {
     ...baseEnglish,
     nav: { home: 'होम', learn: 'सीखें', coach: 'DiaboloMentor', forum: 'फोरम', subscribe: 'प्रीमियम', login: 'लॉग इन', profile: 'प्रोफ़ाइल', about: 'के बारे में', logout: 'लॉग आउट' },
  },
  [Language.KO]: {
     ...baseEnglish,
     nav: { home: '홈', learn: '배우기', coach: 'DiaboloMentor', forum: '포럼', subscribe: '프리미엄', login: '로그인', profile: '프로필', about: '정보', logout: '로그아웃' },
  }
};

export const getTricks = (lang: Language): Trick[] => {
  const tricks: Trick[] = [
    {
      id: '1',
      title: lang === Language.ES ? 'El Ascensor' : 'The Elevator',
      description: lang === Language.ES ? 'Truco clásico de subida.' : 'Classic climbing trick.',
      difficulty: Difficulty.BEGINNER,
      category: '1 DIABOLO',
      imageUrl: 'https://picsum.photos/400/300?random=1',
      likes: 1240,
      username: 'DiaboloMaster',
      userCountry: 'México',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DiaboloMaster',
      timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
      comments: 45
    },
    {
      id: '2',
      title: lang === Language.ES ? 'Soles Infinitos' : 'Infinite Suns',
      description: lang === Language.ES ? 'Movimiento circular continuo.' : 'Continuous circular movement.',
      difficulty: Difficulty.INTERMEDIATE,
      category: '1 DIABOLO',
      imageUrl: 'https://picsum.photos/400/300?random=2',
      likes: 856,
      username: 'CircusJane',
      userCountry: 'USA',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CircusJane',
      timestamp: new Date(Date.now() - 86400000 * 5),
      comments: 22
    },
    {
      id: '3',
      title: lang === Language.ES ? 'Arranque 2 Diábolos' : '2 Diabolo Start',
      description: lang === Language.ES ? 'La base para dominar dos diábolos.' : 'The foundation for mastering two diabolos.',
      difficulty: Difficulty.INTERMEDIATE,
      category: 'INTRODUCCION A 2 DIABOLOS LOW',
      imageUrl: 'https://picsum.photos/400/300?random=3',
      likes: 543,
      username: 'PierreJuggle',
      userCountry: 'France',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PierreJuggle',
      timestamp: new Date(Date.now() - 3600000 * 4), // 4 hours ago
      comments: 12
    },
    {
      id: '4',
      title: lang === Language.ES ? 'Excalibur (Vertax)' : 'Excalibur (Vertax)',
      description: lang === Language.ES ? 'Eje vertical básico.' : 'Basic vertical axle.',
      difficulty: Difficulty.ADVANCED,
      category: 'VERTAX',
      imageUrl: 'https://picsum.photos/400/300?random=4',
      likes: 2100,
      username: 'VertaxGod',
      userCountry: 'Japan',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VertaxGod',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      comments: 89
    },
    {
      id: '5',
      title: 'Mini Genocidio',
      description: lang === Language.ES ? 'Suelta un palo y atrápalo.' : 'Release a stick and catch it.',
      difficulty: Difficulty.EXPERT,
      category: 'INTEGRALES 1 DIABOLO',
      imageUrl: 'https://picsum.photos/400/300?random=5',
      likes: 3042,
      username: 'AldairDiabolist',
      userCountry: 'México',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aldair',
      timestamp: new Date(Date.now() - 86400000 * 10),
      comments: 150
    },
    {
      id: '6',
      title: lang === Language.ES ? 'Carousel 3D' : '3D Carousel',
      description: lang === Language.ES ? 'Mantener 3 diábolos en movimiento.' : 'Keep 3 diabolos moving.',
      difficulty: Difficulty.EXPERT,
      category: 'INTRODUCCION A 3 DIABOLOS LOW',
      imageUrl: 'https://picsum.photos/400/300?random=6',
      likes: 920,
      username: 'TaiwanDiabolo',
      userCountry: 'Taiwan',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taiwan',
      timestamp: new Date(Date.now() - 86400000),
      comments: 34
    },
    {
      id: '7',
      title: lang === Language.ES ? 'Siteswap 531' : 'Siteswap 531',
      description: lang === Language.ES ? 'Teoría básica de números.' : 'Basic number theory.',
      difficulty: Difficulty.ADVANCED,
      category: 'SITEWAP NOTATION BASICS',
      imageUrl: 'https://picsum.photos/400/300?random=7',
      likes: 450,
      username: 'MathJuggler',
      userCountry: 'Germany',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Math',
      timestamp: new Date(Date.now() - 86400000 * 20),
      comments: 8
    },
    {
      id: '8',
      title: lang === Language.ES ? 'El Cuello' : 'The Neck',
      description: lang === Language.ES ? 'Truco corporal clásico.' : 'Classic body trick.',
      difficulty: Difficulty.BEGINNER,
      category: 'CORPORALES',
      imageUrl: 'https://picsum.photos/400/300?random=8',
      likes: 1100,
      username: 'BodyMover',
      userCountry: 'Spain',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Body',
      timestamp: new Date(Date.now() - 3600000),
      comments: 56
    }
  ];
  return tricks;
};

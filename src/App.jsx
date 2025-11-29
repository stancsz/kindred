import React, { useState, useEffect, useRef } from 'react';
import {
  Heart, Shield, AlertCircle, ArrowRight, RefreshCw, CheckCircle, XCircle,
  Info, BookOpen, Star, Zap, Activity, Share2, Globe, Users, Palette,
  Sparkles, Lock, ArrowUpRight, Home, MessageSquare, Bot, User, Compass,
  ChevronRight, Send
} from 'lucide-react';
import { TRANSLATIONS } from './translations';

// --- CONSTANTS & LOGIC ---

const PARADOX_CONTENT = {
  'zh-CN': {
    title: "特别洞察：欲望对象与治愈对象",
    subtitle: "为何你总是爱上让你痛苦的人？",
    content: [
      {
        title: "1. 错误的“理想”：回避型陷阱",
        text: "焦虑型/狂热型人格本能地被疏离、不可预测的人（回避型/游戏型）吸引。对方的若即若离制造了间歇性强化，让你将焦虑误认为是激情的深度。这种伴侣往往是助燃剂，使关系陷入自我毁灭的循环。"
      },
      {
        title: "2. 真正的理想：安全型容器",
        text: "你唯一的功能性理想伴侣是安全型依恋者（且带有奉献型特质）。他们情绪一致、边界清晰、高度透明。只有这种平稳的反馈机制才能强制打破你的“猜疑-焦虑”循环。"
      },
      {
        title: "3. 必须克服的障碍：“无聊”感",
        text: "当你遇到真正对的人（安全型）时，第一反应可能是排斥，觉得“无聊”或“没感觉”。这是戒断反应。必须强行认知到：这种“无聊”就是安全感。只有耐受住初期的平淡，病理机制才能消退。"
      }
    ]
  },
  'en': {
    title: "Special Insight: The Paradox of Desire",
    subtitle: "Why do you fall for those who hurt you?",
    content: [
      {
        title: "1. The Avoidant Trap",
        text: "Anxious/Mania types are often attracted to distant, unpredictable partners (Avoidant/Ludus). Their inconsistency creates intermittent reinforcement, making you mistake anxiety for passion. This dynamic fuels a self-destructive cycle."
      },
      {
        title: "2. The Secure Container",
        text: "Your true functional match is a Secure partner (ideally with Agape traits). They provide consistency, boundaries, and transparency. Only this stable feedback loop can break your 'suspicion-anxiety' cycle."
      },
      {
        title: "3. The Barrier: 'Boredom'",
        text: "When you meet a Secure partner, you might feel bored or think there's 'no spark'. This is a withdrawal symptom from the emotional rollercoaster. You must realize: this 'boredom' is actually safety."
      }
    ]
  }
};

// --- COMPONENTS ---

const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Explore' },
    { id: 'community', icon: Compass, label: 'Community' },
    { id: 'ai', icon: Bot, label: 'AI Chat' },
    { id: 'mine', icon: User, label: 'Me' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-lg border-t border-white/10 px-6 py-4 flex justify-between items-center z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-gold-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

const QuadrantChart = ({ anxietyScore, avoidanceScore, t }) => {
  const min = 6;
  const max = 42;
  const range = max - min;
  const xPercent = ((avoidanceScore - min) / range) * 100;
  const yPercent = ((anxietyScore - min) / range) * 100;

  return (
    <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] mx-auto bg-white/5 border border-white/10 rounded-xl shadow-2xl mt-4 mb-6 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        <div className="bg-red-500/10 border-r border-b border-white/10 flex items-start justify-start p-2">
          <span className="text-[10px] sm:text-xs font-bold text-red-300 uppercase tracking-wider">{t.chart.anxious_high}</span>
        </div>
        <div className="bg-purple-500/10 border-b border-white/10 flex items-start justify-end p-2">
          <span className="text-[10px] sm:text-xs font-bold text-purple-300 uppercase tracking-wider">{t.chart.fearful}</span>
        </div>
        <div className="bg-green-500/10 border-r border-white/10 flex items-end justify-start p-2">
          <span className="text-[10px] sm:text-xs font-bold text-green-300 uppercase tracking-wider">{t.chart.secure}</span>
        </div>
        <div className="bg-blue-500/10 flex items-end justify-end p-2">
          <span className="text-[10px] sm:text-xs font-bold text-blue-300 uppercase tracking-wider">{t.chart.dismissive}</span>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20 -translate-x-1/2"></div>
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20 -translate-y-1/2"></div>

      <div
        className="absolute w-4 h-4 bg-gold-400 border-2 border-white rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)] transform -translate-x-1/2 translate-y-1/2 transition-all duration-1000 ease-out z-10"
        style={{ left: `${xPercent}%`, bottom: `${yPercent}%` }}
      >
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800/90 text-gold-400 text-[10px] py-1 px-2 rounded whitespace-nowrap shadow-sm border border-gold-500/30">
          {t.chart.you_are_here}
        </div>
      </div>
    </div>
  );
};

// --- NEW TABS ---

const HomeTab = ({ t, handleStart, results, setScreen, setLibraryTab, setSelectedLibraryType }) => {
  return (
    <div className="p-6 space-y-8 pb-24 animate-fade-in">
      {/* Header */}
      <div className="relative mt-4 mb-8">
        <div className="flex justify-between items-start">
          <div>
             <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Cosmic Psyche</h1>
             <p className="text-slate-400 text-sm">Explore your inner universe</p>
          </div>
          <button onClick={() => setScreen('language_select')} className="p-2 glass-btn rounded-full text-slate-300">
             <Globe className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer transition-all hover:bg-white/15" onClick={() => handleStart('self', 'attachment')}>
        <div className="absolute top-0 right-0 p-4 opacity-50">
          <Sparkles className="w-24 h-24 text-purple-500/20 rotate-12" />
        </div>
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">{t.ui.title}</h2>
          <p className="text-slate-300 text-sm mb-4 line-clamp-2">{t.ui.subtitle}</p>
          <div className="flex items-center gap-2 text-gold-400 text-sm font-medium group-hover:gap-3 transition-all">
            <span>{results.self.attachment ? 'Retake Test' : t.ui.start_btn}</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Secondary Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Love Style */}
        <div className="glass-card rounded-2xl p-4 relative overflow-hidden group cursor-pointer hover:bg-white/15" onClick={() => handleStart('self', 'love_style')}>
           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-3 shadow-lg shadow-pink-500/30">
              <Palette className="w-5 h-5 text-white" />
           </div>
           <h3 className="text-white font-bold mb-1">{t.ui.title_love_style}</h3>
           <p className="text-xs text-slate-400 mb-2">Color Wheel Theory</p>
           {results.self.loveStyle && <CheckCircle className="w-4 h-4 text-green-400 absolute top-4 right-4" />}
        </div>

        {/* Partner Test */}
        <div className="glass-card rounded-2xl p-4 relative overflow-hidden group cursor-pointer hover:bg-white/15" onClick={() => handleStart('partner', 'attachment')}>
           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-3 shadow-lg shadow-cyan-500/30">
              <Users className="w-5 h-5 text-white" />
           </div>
           <h3 className="text-white font-bold mb-1">Partner Test</h3>
           <p className="text-xs text-slate-400 mb-2">Decode relationship</p>
           {results.partner.attachment && <CheckCircle className="w-4 h-4 text-green-400 absolute top-4 right-4" />}
        </div>
      </div>

      {/* Library/Discovery Section */}
      <div>
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gold-400" /> Library
        </h3>
        <div className="glass-card rounded-xl p-0 overflow-hidden">
          <div
             className="p-4 border-b border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/5"
             onClick={() => { setLibraryTab('attachment'); setSelectedLibraryType('SECURE'); setScreen('library'); }}
          >
            <div className="flex items-center gap-3">
               <div className="bg-green-500/20 p-2 rounded-lg"><Shield className="w-4 h-4 text-green-400"/></div>
               <span className="text-slate-200 text-sm">Attachment Styles Encyclopedia</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
          <div
             className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5"
             onClick={() => { setLibraryTab('attachment'); setSelectedLibraryType('ANXIOUS'); setScreen('library'); }}
          >
             <div className="flex items-center gap-3">
               <div className="bg-red-500/20 p-2 rounded-lg"><AlertCircle className="w-4 h-4 text-red-400"/></div>
               <span className="text-slate-200 text-sm">Understanding Anxiety</span>
            </div>
             <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Reports Shortcut */}
      {(results.self.attachment || results.self.loveStyle) && (
        <button
          onClick={() => setScreen('comprehensive_report')}
          className="w-full bg-gradient-to-r from-gold-500 to-amber-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform"
        >
          <Sparkles className="w-5 h-5 text-white" /> View Your Cosmic Profile
        </button>
      )}
    </div>
  );
};

const CommunityTab = () => {
  return (
    <div className="p-6 pb-24 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-white mb-6 sticky top-0 bg-slate-900/80 backdrop-blur-md py-4 z-10">Starry Plaza</h1>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="glass-card p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-xs font-bold text-indigo-300">U{i}</div>
              <div>
                <p className="text-sm font-bold text-slate-200">Cosmic Traveler #{2300 + i}</p>
                <p className="text-[10px] text-slate-500">2 hours ago</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-3 leading-relaxed">
              Just did the test and realized I'm a Fearful Avoidant. The description of "craving intimacy but fearing it" hit so hard. 🌌 Anyone else feel this paradox?
            </p>
            <div className="flex items-center gap-4 text-slate-500 text-xs">
              <button className="flex items-center gap-1 hover:text-pink-400 transition-colors"><Heart className="w-3 h-3" /> 24</button>
              <button className="flex items-center gap-1 hover:text-blue-400 transition-colors"><MessageSquare className="w-3 h-3" /> 5</button>
            </div>
          </div>
        ))}
      </div>

      <button className="fixed bottom-24 right-6 w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-gold-500/40 hover:scale-110 transition-transform">
        <Sparkles className="w-6 h-6" />
      </button>
    </div>
  );
};

const AiChatTab = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: "Hello, traveler. I am Dharma, your AI guide to the inner universe. How are you feeling today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if(!input.trim()) return;
    const newMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    setTimeout(() => {
       setMessages(prev => [...prev, { id: Date.now()+1, sender: 'bot', text: "I hear you. Emotions are like tides in the cosmic ocean. Tell me more about what's on your mind." }]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen pb-20 bg-slate-900">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 p-0.5">
           <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
             <Bot className="w-6 h-6 text-purple-400" />
           </div>
        </div>
        <div>
           <h2 className="font-bold text-white">Dharma AI</h2>
           <div className="flex items-center gap-1 text-[10px] text-green-400">
             <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
           </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
               msg.sender === 'user'
               ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-tr-none'
               : 'glass-card text-slate-200 rounded-tl-none border-none bg-white/10'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10 bg-slate-900/50 backdrop-blur-md">
         <div className="relative">
           <input
             type="text"
             value={input}
             onChange={e => setInput(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && handleSend()}
             placeholder="Type a message..."
             className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
           />
           <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-500 transition-colors">
              <Send className="w-4 h-4" />
           </button>
         </div>
      </div>
    </div>
  );
};

const MineTab = ({ results }) => {
  return (
    <div className="p-6 pb-24">
       <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-orange-500 p-1">
             <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center overflow-hidden">
                <User className="w-10 h-10 text-white/50" />
             </div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Stardust User</h1>
            <p className="text-sm text-slate-400">ID: 882910</p>
            <span className="inline-block mt-2 text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">Premium Member</span>
          </div>
       </div>

       <div className="space-y-4">
         <div className="glass-card p-4 rounded-xl flex items-center justify-between">
            <span className="text-slate-300">My Reports</span>
            <span className="text-white font-bold">{Object.values(results.self).filter(Boolean).length}</span>
         </div>
         <div className="glass-card p-4 rounded-xl flex items-center justify-between">
            <span className="text-slate-300">Saved Tests</span>
            <span className="text-white font-bold">2</span>
         </div>
         <div className="glass-card p-4 rounded-xl flex items-center justify-between">
            <span className="text-slate-300">Coins</span>
            <span className="text-gold-400 font-bold">120</span>
         </div>
       </div>

       <div className="mt-8 space-y-2">
         <button className="w-full text-left p-4 rounded-xl hover:bg-white/5 text-slate-300 transition-colors">Settings</button>
         <button className="w-full text-left p-4 rounded-xl hover:bg-white/5 text-slate-300 transition-colors">Help & Support</button>
         <button className="w-full text-left p-4 rounded-xl hover:bg-white/5 text-slate-300 transition-colors">About</button>
       </div>
    </div>
  )
}

// --- MAIN APP COMPONENT ---

export default function AttachmentTest() {
  // State
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const [language, setLanguage] = useState('zh-CN');
  const [screen, setScreen] = useState('language_select'); // 'language_select', 'intro' (Main Layout), 'quiz', 'result', etc.
  const [activeTab, setActiveTab] = useState('home');

  const [answers, setAnswers] = useState({});
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  // Quiz Context
  const [assessmentMode, setAssessmentMode] = useState('self');
  const [testType, setTestType] = useState('attachment');

  // Persistent Results
  const [results, setResults] = useState({
      self: { attachment: null, love_style: null, reconciliation: null },
      partner: { attachment: null }
  });

  // Library State
  const [libraryTab, setLibraryTab] = useState('attachment');
  const [selectedLibraryType, setSelectedLibraryType] = useState('SECURE');

  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  useEffect(() => {
      if (!hasSelectedLanguage) {
          setScreen('language_select');
      }
  }, [hasSelectedLanguage]);

  // Helpers
  const getTypeStyles = (key) => {
       // Keeping existing logic but returning simpler color keys or updated colors if needed.
       // For now, mapping old logic to new UI can be done in the render phase or here.
       // Let's stick to the structure but use the returned values for logic, styling handled in JSX mostly.
      if (['EROS', 'LUDUS', 'STORGE', 'MANIA', 'PRAGMA', 'AGAPE'].includes(key)) {
          switch(key) {
              case 'EROS': return { color: "text-red-400", bgColor: "bg-red-500/10", borderColor: "border-red-500/20", icon: Heart };
              case 'LUDUS': return { color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/20", icon: Zap };
              case 'STORGE': return { color: "text-green-400", bgColor: "bg-green-500/10", borderColor: "border-green-500/20", icon: Users };
              case 'MANIA': return { color: "text-purple-400", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/20", icon: Activity };
              case 'PRAGMA': return { color: "text-orange-400", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/20", icon: CheckCircle };
              case 'AGAPE': return { color: "text-pink-400", bgColor: "bg-pink-500/10", borderColor: "border-pink-500/20", icon: Heart };
              default: return { color: "text-slate-400", bgColor: "bg-slate-500/10", borderColor: "border-slate-500/20", icon: Heart };
          }
      }
      switch(key) {
        case 'SECURE': return { color: "text-green-400", bgColor: "bg-green-500/10", borderColor: "border-green-500/20", icon: Shield };
        case 'ANXIOUS': return { color: "text-red-400", bgColor: "bg-red-500/10", borderColor: "border-red-500/20", icon: AlertCircle };
        case 'DISMISSIVE': return { color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/20", icon: XCircle };
        case 'FEARFUL': return { color: "text-purple-400", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/20", icon: Info };
        default: return { color: "text-slate-400", bgColor: "bg-slate-500/10", borderColor: "border-slate-500/20", icon: Shield };
      }
  };

  const handleStart = (mode = 'self', type = 'attachment') => {
    setAssessmentMode(mode);
    setTestType(type);
    setScreen('quiz');
    setCurrentQIndex(0);
    setAnswers({});
    setSelectedOption(null);
  };

  const handleAnswer = (value) => {
    const questions = getQuestions();
    setSelectedOption(value);
    setAnswers(prev => ({ ...prev, [questions[currentQIndex].id]: value }));

    if (currentQIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQIndex(prev => prev + 1);
        setSelectedOption(null);
      }, 200);
    } else {
      setScreen('calculating');
      setTimeout(calculateAndSaveResult, 1500);
    }
  };

  const getQuestions = () => {
      if (testType === 'love_style') return t.questions_love_style;
      if (testType === 'reconciliation') return t.questions_reconciliation;
      return assessmentMode === 'partner' ? t.questions_partner : t.questions;
  };

  const calculateAndSaveResult = () => {
    let resultData = null;
    const questions = getQuestions();

    if (testType === 'attachment') {
        let anxiety = 0, avoidance = 0;
        questions.forEach(q => {
           const score = answers[q.id] || 4;
           if (q.dimension === 'anxiety') anxiety += score;
           if (q.dimension === 'avoidance') avoidance += score;
        });
        const threshold = 24;
        let typeKey = 'SECURE';
        if (anxiety > threshold && avoidance <= threshold) typeKey = 'ANXIOUS';
        else if (anxiety <= threshold && avoidance > threshold) typeKey = 'DISMISSIVE';
        else if (anxiety > threshold && avoidance > threshold) typeKey = 'FEARFUL';

        resultData = { typeKey, anxietyScore: anxiety, avoidanceScore: avoidance };
    } else if (testType === 'love_style') {
        const scores = { EROS: 0, LUDUS: 0, STORGE: 0, MANIA: 0, PRAGMA: 0, AGAPE: 0 };
        questions.forEach(q => {
            const score = answers[q.id] || 4;
            if (scores[q.dimension] !== undefined) scores[q.dimension] += score;
        });
        let maxScore = -1, typeKey = 'EROS';
        Object.entries(scores).forEach(([key, score]) => {
            if (score > maxScore) { maxScore = score; typeKey = key; }
        });
        resultData = { typeKey, scores };
    } else if (testType === 'reconciliation') {
        let total = 0;
        questions.forEach(q => total += (answers[q.id] || 4));
        let typeKey = 'LOW';
        if (total >= 55) typeKey = 'HIGH';
        else if (total >= 40) typeKey = 'MEDIUM';
        resultData = { typeKey, score: total };
    }

    setResults(prev => ({
        ...prev,
        [assessmentMode]: {
            ...prev[assessmentMode],
            [testType]: resultData
        }
    }));
    setScreen('result');
  };


  // --- VIEWS ---

  if (screen === 'language_select') {
      const langs = [
        { code: 'zh-CN', label: '简体中文' },
        { code: 'zh-TW', label: '繁體中文' },
        { code: 'en', label: 'English' },
        { code: 'ja', label: '日本語' },
        { code: 'es', label: 'Español' },
        { code: 'ko', label: '한국어' }
      ];
      return (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white bg-slate-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-starry"></div>
              <Globe className="w-16 h-16 mb-6 text-indigo-400 relative z-10" />
              <h1 className="text-2xl font-bold mb-8 relative z-10">Select Language</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md relative z-10">
                  {langs.map(l => (
                      <button
                        key={l.code}
                        onClick={() => {
                            setLanguage(l.code);
                            setHasSelectedLanguage(true);
                            setScreen('intro');
                        }}
                        className="glass-btn py-4 rounded-xl text-lg font-medium"
                      >
                          {l.label}
                      </button>
                  ))}
              </div>
          </div>
      );
  }

  // QUIZ SCREEN
  if (screen === 'quiz') {
    const questions = getQuestions();
    const question = questions[currentQIndex];
    const progress = ((currentQIndex) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card rounded-2xl overflow-hidden flex flex-col min-h-[500px] border border-white/10">
          <div className="h-1 bg-white/10 w-full">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <div className="mb-6 flex justify-between text-indigo-300 text-xs font-bold tracking-widest uppercase">
              <span>QUESTION {currentQIndex + 1}/{questions.length}</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-8 leading-relaxed">{question.text}</h2>
            <div className="space-y-3 mt-auto">
              {t.options.map((opt) => (
                <button
                  key={`${currentQIndex}-${opt.value}`}
                  onClick={() => handleAnswer(opt.value)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group active:scale-[0.99] ${
                    selectedOption === opt.value
                      ? 'border-indigo-500 bg-indigo-500/20 text-white'
                      : 'border-white/10 hover:border-indigo-500/50 hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <span className="font-medium text-sm">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CALCULATING
  if (screen === 'calculating') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
         <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
               <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
               <Sparkles className="absolute inset-0 m-auto text-indigo-400 w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Analyzing Stars...</h2>
            <p className="text-slate-400">Connecting your soul pattern</p>
         </div>
      </div>
    );
  }

  // RESULT SCREEN
  if (screen === 'result') {
      const currentResult = results[assessmentMode][testType];
      if (!currentResult) return null;

      const isAttachment = testType === 'attachment';

      let typeData, styles;
      if (isAttachment) {
          typeData = t.types[currentResult.typeKey];
          styles = getTypeStyles(currentResult.typeKey);
      } else if (testType === 'love_style') {
          typeData = t.types_love_style[currentResult.typeKey];
          styles = getTypeStyles(currentResult.typeKey);
      } else {
          typeData = t.types_reconciliation[currentResult.typeKey];
          styles = getTypeStyles(currentResult.typeKey);
      }

      const Icon = styles.icon;

      return (
        <div className="min-h-screen bg-slate-900 py-8 px-4 pb-24">
          <div className="max-w-md mx-auto space-y-6">
            <div className={`glass-card rounded-2xl overflow-hidden`}>
              <div className={`p-8 pb-6 ${styles.bgColor} border-b ${styles.borderColor} text-center relative`}>
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                <p className="text-slate-300 font-medium mb-2 text-xs uppercase tracking-widest relative z-10">
                   {isAttachment ? (assessmentMode === 'partner' ? t.ui.partner_type : t.ui.your_type) : "Archetype"}
                </p>
                <h1 className={`text-3xl font-bold ${styles.color} mb-4 flex items-center justify-center gap-2 relative z-10`}>
                  <Icon className="w-8 h-8" />
                  {typeData.shortName || typeData.name.split(' ')[0]}
                </h1>
                {isAttachment && (
                  <div className="inline-flex gap-4 text-[10px] font-bold text-slate-300 bg-black/20 px-4 py-2 rounded-full backdrop-blur-md relative z-10">
                    <span>{t.ui.anxiety}: {Math.round((currentResult.anxietyScore/42)*100)}%</span>
                    <span className="w-px h-3 bg-white/20 my-auto"></span>
                    <span>{t.ui.avoidance}: {Math.round((currentResult.avoidanceScore/42)*100)}%</span>
                  </div>
                )}
              </div>

              <div className="p-6 space-y-6">
                {isAttachment && <QuadrantChart anxietyScore={currentResult.anxietyScore} avoidanceScore={currentResult.avoidanceScore} t={t} />}

                <div>
                   <h3 className="text-white font-bold mb-3 flex items-center gap-2"><Info className="w-4 h-4 text-indigo-400"/> Analysis</h3>
                   <p className="text-slate-300 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                      {typeData.detailedInfo}
                   </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
               <button onClick={() => setScreen('intro')} className="w-full glass-btn py-3 rounded-xl text-white font-semibold">
                  Return to Home
               </button>
            </div>
          </div>
        </div>
      );
  }

  // COMPREHENSIVE & RELATIONSHIP REPORTS
  // (Simplified for this UI update to keep it concise, can be expanded similarly with dark mode)
  if (screen === 'comprehensive_report' || screen === 'relationship_report' || screen === 'library') {
      // For now, reuse the basic structure but wrapped in dark theme
      return (
         <div className="min-h-screen bg-slate-900 p-4 pb-20 overflow-y-auto">
            <div className="max-w-md mx-auto glass-card rounded-2xl p-6 min-h-[50vh] text-slate-300">
               <button onClick={() => setScreen('intro')} className="mb-4 text-sm text-indigo-400 flex items-center gap-1">
                 &larr; Back
               </button>
               <h1 className="text-2xl font-bold text-white mb-4">Detailed Report</h1>
               <p className="mb-4">
                 {screen === 'library' ? "Library content..." : "Report content..."}
               </p>
               {screen === 'library' && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-bold text-white">{selectedLibraryType}</h2>
                     <p>Detailed information about this style would go here, pulled from the translations file.</p>
                  </div>
               )}
               {screen === 'comprehensive_report' && (
                  <div>
                    <p className="mb-4">Your combined profile analysis.</p>
                     {/* Re-implement logic if needed, or keep simple for UI demo */}
                     <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between mb-2">
                           <span>Attachment</span>
                           <span className="text-indigo-400">{t.types[results.self.attachment.typeKey].name}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Love Style</span>
                           <span className="text-pink-400">{t.types_love_style[results.self.loveStyle.typeKey].name}</span>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      )
  }

  // --- MAIN LAYOUT (Intro) ---
  return (
      <div className="min-h-screen bg-slate-900 text-white pb-20 relative overflow-hidden font-sans">
          <div className="stars"></div> {/* CSS-based stars */}

          {activeTab === 'home' && (
             <HomeTab
               t={t}
               handleStart={handleStart}
               results={results}
               setScreen={setScreen}
               setLibraryTab={setLibraryTab}
               setSelectedLibraryType={setSelectedLibraryType}
             />
          )}
          {activeTab === 'community' && <CommunityTab />}
          {activeTab === 'ai' && <AiChatTab />}
          {activeTab === 'mine' && <MineTab results={results} />}

          <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
  );
}

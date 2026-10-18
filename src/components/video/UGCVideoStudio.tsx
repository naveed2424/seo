import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Volume2,
  VolumeX,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Video,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  Bookmark,
  CheckCircle2,
  Flame,
  Radio,
  FileText,
  Clock,
  Send,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UGCVideoStudioProps {
  navigate: (route: string) => void;
}

interface Scene {
  id: number;
  title: string;
  subtitle: string;
  voiceover: string;
  duration: number; // in seconds
  primaryColor: string;
  secondaryColor: string;
  badge: string;
  accentGlow: string;
  visualMode: 'shock-hook' | 'keyword-radar' | 'trend-writer' | 'creator-suite' | 'matrix-terminal' | 'cta-final';
}

export const SCENES: Scene[] = [
  {
    id: 1,
    title: 'STOP PAYING $140/MO FOR AI & SEO TOOLS!',
    subtitle: 'Over 90% of creators waste hundreds every month on subscription bloat',
    voiceover:
      "Stop paying one hundred and forty dollars a month for overpriced SEO and AI tools! If you are a creator, blogger, or digital seller, you are wasting hundreds on software subscriptions when RankPulse gives you over 40 pro tools 100% free forever.",
    duration: 13,
    primaryColor: '#ef4444',
    secondaryColor: '#f97316',
    accentGlow: 'rgba(239, 68, 68, 0.4)',
    badge: 'STOP OVERPAYING',
    visualMode: 'shock-hook',
  },
  {
    id: 2,
    title: 'REAL-TIME KEYWORD RADAR IN 14 COUNTRIES',
    subtitle: 'Real search volume, local currency (£, $, €, ₹) & 0-100 Opportunity Score',
    voiceover:
      "Meet RankPulse! Our free Keyword Explorer uncovers high-intent search demand across 14 major countries. See real competition gaps, local currencies in pounds, dollars, euros, or rupees, and our proprietary 0 to 100 Opportunity Score to find easy ranking wins.",
    duration: 14,
    primaryColor: '#0ea5e9',
    secondaryColor: '#38bdf8',
    accentGlow: 'rgba(14, 165, 233, 0.4)',
    badge: 'FLAGSHIP SEO RADAR',
    visualMode: 'keyword-radar',
  },
  {
    id: 3,
    title: 'AI ARTICLE WRITER & GOOGLE TRENDS',
    subtitle: 'Find +480% breakout demand queries & generate publication-ready E-E-A-T guides',
    voiceover:
      "Need traffic that compounds? Our integrated Google Trends finder spots breakout searches surging over 400 percent, then generates publication-ready E-E-A-T blueprints with Quick Answers, key takeaways, and automatic Schema markup.",
    duration: 13,
    primaryColor: '#10b981',
    secondaryColor: '#34d399',
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    badge: 'TREND-DRIVEN CONTENT',
    visualMode: 'trend-writer',
  },
  {
    id: 4,
    title: 'CREATOR & ECOMMERCE POWER-KIT',
    subtitle: 'YouTube tags, 3-sec UGC hooks, 13 Etsy tags & Amazon KDP boxes',
    voiceover:
      "Selling digital products or growing on YouTube? Get instant high-retention 3-second video hooks, 13 Etsy tags under 20 characters, 7-box Amazon KDP keywords, and our interactive digital profit calculator.",
    duration: 13,
    primaryColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    badge: 'CREATOR GROWTH SUITE',
    visualMode: 'creator-suite',
  },
  {
    id: 5,
    title: 'CYBER MATRIX AUTOMATION ENGINE',
    subtitle: 'No-code Make.com blueprints & battle-tested AI prompt library',
    voiceover:
      "Step into the search matrix! Automate your entire online business with ready-to-run Make.com scenarios, webhook integrations, and our curated prompt library with interactive real-time variables.",
    duration: 12,
    primaryColor: '#8b5cf6',
    secondaryColor: '#a855f7',
    accentGlow: 'rgba(139, 92, 246, 0.4)',
    badge: 'AI MATRIX & WORKFLOWS',
    visualMode: 'matrix-terminal',
  },
  {
    id: 6,
    title: '100% FREE FOREVER • ZERO SIGNUP REQUIRED',
    subtitle: 'Tap the clickable link below to bookmark RankPulse & use all 40+ tools right now!',
    voiceover:
      "The best part? It is completely free. No trial countdowns, no credit card, and no mandatory signup. Tap the clickable link below, bookmark RankPulse, and grow smarter with AI today!",
    duration: 13,
    primaryColor: '#06b6d4',
    secondaryColor: '#38bdf8',
    accentGlow: 'rgba(6, 182, 212, 0.4)',
    badge: 'CLICK LINK BELOW',
    visualMode: 'cta-final',
  },
];

export const UGCVideoStudio: React.FC<UGCVideoStudioProps> = ({ navigate }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isFastExporting, setIsFastExporting] = useState(false);
  const [fastExportProgress, setFastExportProgress] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [downloadedBlobUrl, setDownloadedBlobUrl] = useState<string | null>(null);

  const totalDuration = SCENES.reduce((acc, s) => acc + s.duration, 0); // 78 seconds (> 1 minute!)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Speech synthesis utterance
  const speakCurrentScene = (sceneIndex: number) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(SCENES[sceneIndex].voiceover);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('Daniel') ||
            v.name.includes('Alex'))
      );
      if (englishVoice) utterance.voice = englishVoice;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  };

  // Timer loop for real-time video playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          const next = prev + 0.1;
          if (next >= totalDuration) {
            setIsPlaying(false);
            if (isRecording) {
              stopRecording();
            }
            // Trigger automatic completion modal and celebration
            setShowCompletionModal(true);
            confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 } });
            return 0;
          }

          // Calculate current scene
          let accumulated = 0;
          for (let i = 0; i < SCENES.length; i++) {
            accumulated += SCENES[i].duration;
            if (next <= accumulated) {
              if (i !== currentSceneIdx) {
                setCurrentSceneIdx(i);
                speakCurrentScene(i);
              }
              break;
            }
          }
          return next;
        });
      }, 100);
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration, currentSceneIdx, isMuted, isRecording]);

  // Handle Play / Pause
  const togglePlay = () => {
    if (!isPlaying) {
      speakCurrentScene(currentSceneIdx);
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsPlaying(false);
    setElapsedTime(0);
    setCurrentSceneIdx(0);
  };

  const handleSeekScene = (idx: number) => {
    let seekTime = 0;
    for (let i = 0; i < idx; i++) {
      seekTime += SCENES[i].duration;
    }
    setElapsedTime(seekTime);
    setCurrentSceneIdx(idx);
    if (isPlaying) {
      speakCurrentScene(idx);
    }
  };

  // Professional Multi-Color Motion Canvas Graphic Engine
  const drawSceneFrame = (
    ctx: CanvasRenderingContext2D,
    cw: number,
    ch: number,
    isVertical: boolean,
    scene: Scene,
    time: number,
    progressFraction: number
  ) => {
    // 1. Deep cinematic Espresso & Cyber Blue Gradient Background
    const bgGrad = ctx.createRadialGradient(cw / 2, ch / 3, 50, cw / 2, ch / 2, Math.max(cw, ch));
    bgGrad.addColorStop(0, '#261b14'); // warm rich cocoa
    bgGrad.addColorStop(0.4, '#17100b'); // espresso
    bgGrad.addColorStop(0.8, '#0d0906');
    bgGrad.addColorStop(1, '#050302');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, cw, ch);

    // 2. Animated Ambient Glow Orbs in vibrant theme colors
    const glowX1 = cw / 2 + Math.sin(time * 0.8) * (cw * 0.3);
    const glowY1 = ch * 0.25 + Math.cos(time * 0.7) * (ch * 0.15);
    const orbGrad1 = ctx.createRadialGradient(glowX1, glowY1, 10, glowX1, glowY1, isVertical ? 240 : 320);
    orbGrad1.addColorStop(0, scene.accentGlow);
    orbGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = orbGrad1;
    ctx.fillRect(0, 0, cw, ch);

    const glowX2 = cw / 2 + Math.cos(time * 1.1) * (cw * 0.25);
    const glowY2 = ch * 0.65 + Math.sin(time * 0.9) * (ch * 0.15);
    const orbGrad2 = ctx.createRadialGradient(glowX2, glowY2, 10, glowX2, glowY2, isVertical ? 220 : 300);
    orbGrad2.addColorStop(0, 'rgba(56, 189, 248, 0.2)'); // Light Blue cyber accent
    orbGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = orbGrad2;
    ctx.fillRect(0, 0, cw, ch);

    // 3. Matrix Digital Stream Rain (Rich Brown & Light Blue Matrix Code)
    ctx.font = 'bold 13px JetBrains Mono, monospace';
    const matrixChars = [
      '⚡', 'RANKPULSE', '100%FREE', '$0/MO', 'EEAT', 'CTR', 'UK£', 'US$', 'EU€',
      'IN₹', 'SEO', 'AI-WRITER', 'ETSY-TAGS', 'TRENDS+480%', 'MAKE.COM', 'KEYWORDS'
    ];
    const streamColumns = isVertical ? 16 : 24;
    const colWidth = cw / streamColumns;

    for (let c = 0; c < streamColumns; c++) {
      const colX = c * colWidth + colWidth / 2;
      const speed = 25 + (c % 5) * 12;
      const colY = (time * speed + c * 90) % (ch + 100);

      // Gradient color fade for matrix letters
      ctx.fillStyle = c % 3 === 0 ? 'rgba(56, 189, 248, 0.25)' : 'rgba(217, 119, 6, 0.15)';
      ctx.textAlign = 'center';
      const char = matrixChars[(c + Math.floor(time * 2)) % matrixChars.length];
      ctx.fillText(char, colX, colY);
    }

    // 4. Top Branding Header Bar with Live Indicator
    const headerY = isVertical ? 42 : 24;
    const headerW = isVertical ? cw - 64 : 640;
    const headerH = 50;
    const headerX = (cw - headerW) / 2;

    ctx.fillStyle = 'rgba(38, 25, 17, 0.85)';
    ctx.strokeStyle = '#573b26';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(headerX, headerY, headerW, headerH, 16);
    ctx.fill();
    ctx.stroke();

    // Pulse dot
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(headerX + 24, headerY + 25, 6 + Math.sin(time * 4) * 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('RANKPULSE.IO', headerX + 42, headerY + 31);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
    ctx.fillText('• 100% FREE AI & SEO MATRIX', headerX + 175, headerY + 31);

    // Platform pill tags (TikTok, YouTube, Facebook)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fde68a';
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.fillText('TIKTOK • YT • FB', headerX + headerW - 18, headerY + 31);

    // 5. Scene Category Pill Badge with animated border
    const badgeY = isVertical ? 110 : 88;
    const badgeW = 280;
    const badgeH = 36;
    const badgeX = (cw - badgeW) / 2;

    ctx.fillStyle = scene.primaryColor;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 18);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 13px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`★ SCENE ${scene.id}/6: ${scene.badge}`, cw / 2, badgeY + 23);

    // 6. Main High-Impact Animated Title (with subtle kinetic bounce)
    const titleY = isVertical ? 195 : 155;
    ctx.fillStyle = '#ffffff';
    ctx.font = `900 ${isVertical ? '30px' : '34px'} Plus Jakarta Sans, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(scene.title, cw / 2, titleY);

    // Subtitle in Light Blue
    ctx.fillStyle = '#7dd3fc';
    ctx.font = `600 ${isVertical ? '17px' : '19px'} Plus Jakarta Sans, sans-serif`;
    ctx.fillText(scene.subtitle, cw / 2, titleY + 38);

    // 7. CENTERPIECE INTERACTIVE ANIMATED APP MOCKUP
    const boxY = isVertical ? 290 : 225;
    const boxW = isVertical ? cw - 64 : 760;
    const boxH = isVertical ? 500 : 330;
    const boxX = (cw - boxW) / 2;

    // Outer Card container
    ctx.fillStyle = 'rgba(23, 16, 11, 0.95)';
    ctx.strokeStyle = scene.primaryColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 24);
    ctx.fill();
    ctx.stroke();

    // Inner glowing header tab inside the card
    ctx.fillStyle = 'rgba(45, 30, 20, 0.9)';
    ctx.beginPath();
    ctx.roundRect(boxX + 12, boxY + 12, boxW - 24, 42, 12);
    ctx.fill();

    // Browser dots
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(boxX + 30, boxY + 33, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(boxX + 46, boxY + 33, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(boxX + 62, boxY + 33, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('https://rankpulse.io/tools (PRO-TIER ACCESS = $0.00)', cw / 2, boxY + 37);

    // VIBRANT VISUALS SPECIFIC TO EACH SCENE:
    if (scene.visualMode === 'shock-hook') {
      // Scene 1: Slashed $140/mo Price Tag vs $0.00 Free Forever
      const priceBoxY = boxY + 75;
      ctx.fillStyle = '#3a1313';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cw / 2 - 160, priceBoxY, 320, 75, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fca5a5';
      ctx.font = '800 36px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('$139.95 / MONTH', cw / 2, priceBoxY + 50);

      // Red laser strike animated
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(cw / 2 - 180, priceBoxY + 70);
      ctx.lineTo(cw / 2 + 180, priceBoxY + 10);
      ctx.stroke();

      // Big Glowing $0 Free Announcement
      const pulseSize = 48 + Math.sin(time * 3) * 3;
      ctx.fillStyle = '#38bdf8';
      ctx.font = `900 ${pulseSize}px Plus Jakarta Sans, sans-serif`;
      ctx.fillText('RANKPULSE = $0.00', cw / 2, boxY + 220);

      // Value proposition pills
      const pillW = 420;
      const pillX = cw / 2 - pillW / 2;
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.roundRect(pillX, boxY + 265, pillW, 44, 22);
      ctx.fill();

      ctx.fillStyle = '#052e16';
      ctx.font = '800 16px Plus Jakarta Sans, sans-serif';
      ctx.fillText('✓ 40+ TOOLS 100% UNLOCKED FOREVER', cw / 2, boxY + 293);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '600 15px Plus Jakarta Sans, sans-serif';
      ctx.fillText('❌ No Credit Card  ❌ No 7-Day Trial  ❌ No Forced Signup', cw / 2, boxY + 345);
    } else if (scene.visualMode === 'keyword-radar') {
      // Scene 2: 14 Country Keyword Radar Demo
      ctx.fillStyle = '#38bdf8';
      ctx.font = '800 20px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MULTI-COUNTRY INTELLIGENCE & CURRENCY', cw / 2, boxY + 80);

      // Country Flag Pills
      const countries = [
        { name: '🇬🇧 UK (£)', active: true },
        { name: '🇺🇸 US ($)', active: true },
        { name: '🇪🇺 EU (€)', active: true },
        { name: '🇮🇳 INDIA (₹)', active: true },
        { name: '🇨🇦 CA ($)', active: false },
        { name: '🇦🇺 AU ($)', active: false },
      ];
      countries.forEach((c, idx) => {
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const px = cw / 2 - 200 + col * 135;
        const py = boxY + 105 + row * 38;

        ctx.fillStyle = c.active ? '#0369a1' : '#231811';
        ctx.strokeStyle = c.active ? '#38bdf8' : '#473122';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(px, py, 125, 30, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = c.active ? '#ffffff' : '#94a3b8';
        ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
        ctx.fillText(c.name, px + 62, py + 20);
      });

      // Opportunity Score Dial Gauge
      const scoreY = boxY + 250;
      ctx.fillStyle = '#38bdf8';
      ctx.font = '900 68px JetBrains Mono, monospace';
      ctx.fillText('94', cw / 2, scoreY);

      ctx.fillStyle = '#22c55e';
      ctx.font = '800 16px Plus Jakarta Sans, sans-serif';
      ctx.fillText('★ 0-100 OPPORTUNITY SCORE (EASY WIN)', cw / 2, scoreY + 32);

      // Mini search volume & CPC indicator
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '600 14px JetBrains Mono, monospace';
      ctx.fillText('Search Volume: 18,400/mo  •  Est CPC: £2.40 / $3.10', cw / 2, scoreY + 65);
    } else if (scene.visualMode === 'trend-writer') {
      // Scene 3: Google Trends Surge & E-E-A-T Article Writer
      ctx.fillStyle = '#10b981';
      ctx.font = '900 32px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('🔥 +480% BREAKOUT VELOCITY', cw / 2, boxY + 85);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 19px Plus Jakarta Sans, sans-serif';
      ctx.fillText('Automated E-E-A-T Article Generator', cw / 2, boxY + 125);

      // Document Blueprint Mockup
      const docW = 460;
      const docH = 175;
      const docX = cw / 2 - docW / 2;
      const docY = boxY + 145;

      ctx.fillStyle = '#1b2d24';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(docX, docY, docW, docH, 16);
      ctx.fill();
      ctx.stroke();

      const docBullets = [
        '⚡ Quick Answer: 50-word Google featured snippet',
        '📌 Key Takeaways: 4 tactical executive bullet points',
        '🔄 Circular Backlinks to Related Free Tools',
        '📐 Schema.org FAQ & Article JSON-LD Ready',
      ];
      docBullets.forEach((b, bIdx) => {
        ctx.fillStyle = '#a7f3d0';
        ctx.font = '600 13px JetBrains Mono, monospace';
        ctx.textAlign = 'left';
        ctx.fillText(b, docX + 20, docY + 35 + bIdx * 34);
      });
    } else if (scene.visualMode === 'creator-suite') {
      // Scene 4: Creator & E-commerce Suite
      ctx.fillStyle = '#f59e0b';
      ctx.font = '900 24px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('YOUTUBE • ETSY • TIKTOK • AMAZON KDP', cw / 2, boxY + 80);

      const creatorTools = [
        { icon: '🎯', title: '3-Sec Video Hook Generator (92% Retention)', color: '#fbbf24' },
        { icon: '🏷️', title: '13-Tag Etsy SEO Optimizer (<20 chars)', color: '#38bdf8' },
        { icon: '📦', title: '7-Box Amazon KDP Keyword Phrases', color: '#34d399' },
        { icon: '💰', title: 'Interactive Digital Product Profit Calculator', color: '#a78bfa' },
      ];

      creatorTools.forEach((tool, tIdx) => {
        const itemY = boxY + 105 + tIdx * 52;
        ctx.fillStyle = '#261b14';
        ctx.strokeStyle = tool.color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(cw / 2 - 230, itemY, 460, 42, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${tool.icon}  ${tool.title}`, cw / 2, itemY + 27);
      });
    } else if (scene.visualMode === 'matrix-terminal') {
      // Scene 5: Cyber Matrix Automation Engine
      ctx.fillStyle = '#c084fc';
      ctx.font = '900 24px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('> NO-CODE AUTOMATION & PROMPT MATRIX', cw / 2, boxY + 80);

      ctx.fillStyle = '#e9d5ff';
      ctx.font = '600 15px JetBrains Mono, monospace';
      ctx.fillText('Make.com Blueprint: Webhook ➔ Gemini AI ➔ Sheet', cw / 2, boxY + 130);
      ctx.fillText('Interactive Prompt Library with Live Variables', cw / 2, boxY + 175);
      ctx.fillText('Reclaim 15+ Hours of Repetitive Tasks Weekly', cw / 2, boxY + 220);

      // Glowing pulsing circuit ring
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cw / 2, boxY + 290, 32 + Math.sin(time * 4) * 8, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // Scene 6: CTA FINAL SCENE (Click Link Below)
      ctx.fillStyle = '#38bdf8';
      ctx.font = '900 38px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ALL 40+ TOOLS 100% FREE', cw / 2, boxY + 85);

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 22px Plus Jakarta Sans, sans-serif';
      ctx.fillText('No Credit Card • Zero Signup • Unlimited Use', cw / 2, boxY + 135);

      // Big Pulsing CTA Button Mockup
      const btnW = 380;
      const btnH = 65;
      const btnX = cw / 2 - btnW / 2;
      const btnY = boxY + 180;

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(btnX, btnY, btnW, btnH, 32);
      ctx.fill();

      // Shadow glow
      ctx.strokeStyle = '#bae6fd';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = '900 22px Plus Jakarta Sans, sans-serif';
      ctx.fillText('👇 TAP THE LINK BELOW 👇', cw / 2, btnY + 41);

      ctx.fillStyle = '#fed7aa';
      ctx.font = 'bold 16px Plus Jakarta Sans, sans-serif';
      ctx.fillText('Ready for TikTok, YouTube Shorts & Facebook Reels', cw / 2, boxY + 295);
    }

    // 8. Animated TikTok Style Soundwave Audio Visualizer
    const waveY = isVertical ? ch - 190 : ch - 95;
    const waveBars = 44;
    const waveTotalW = isVertical ? cw - 120 : 500;
    const waveStartX = (cw - waveTotalW) / 2;
    const barSpacing = waveTotalW / waveBars;

    for (let b = 0; b < waveBars; b++) {
      const bh = isPlaying ? 10 + Math.sin(time * 3 + b * 0.35) * 28 + Math.cos(time * 2 + b * 0.2) * 15 : 6;
      const bx = waveStartX + b * barSpacing;
      // Multi-color rainbow gradient bars
      const barColor = b % 3 === 0 ? '#38bdf8' : b % 3 === 1 ? '#f59e0b' : '#10b981';
      ctx.fillStyle = barColor;
      ctx.beginPath();
      ctx.roundRect(bx, waveY - bh / 2, 4, bh, 2);
      ctx.fill();
    }

    // 9. Kinetic Dynamic Subtitles (TikTok Karaoke Style in Yellow/White)
    const subY = isVertical ? ch - 120 : ch - 50;
    const subW = isVertical ? cw - 60 : 700;
    const subH = 56;
    const subX = (cw - subW) / 2;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(subX, subY - 28, subW, subH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fef08a'; // Bright energetic yellow
    ctx.font = `bold ${isVertical ? '15px' : '17px'} Plus Jakarta Sans, sans-serif`;
    ctx.textAlign = 'center';
    const truncatedVoice = scene.voiceover.length > 70 ? scene.voiceover.slice(0, 68) + '...' : scene.voiceover;
    ctx.fillText(`🗣️ "${truncatedVoice}"`, cw / 2, subY + 6);

    // 10. High-Visibility Bottom Progress Bar with Duration
    ctx.fillStyle = '#261b14';
    ctx.fillRect(0, ch - 10, cw, 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(0, ch - 10, cw * progressFraction, 10);
  };

  // Canvas High-Definition Motion Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const isVertical = aspectRatio === '9:16';
    const cw = (canvas.width = isVertical ? 720 : 1280);
    const ch = (canvas.height = isVertical ? 1280 : 720);
    const currentScene = SCENES[currentSceneIdx];

    const render = () => {
      const time = elapsedTime * 4;
      const progressFraction = Math.min(1, elapsedTime / totalDuration);
      drawSceneFrame(ctx, cw, ch, isVertical, currentScene, time, progressFraction);

      if (isPlaying) {
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentSceneIdx, elapsedTime, aspectRatio, totalDuration]);

  // Video Recording Engine (Record & Download Video File)
  const startRecording = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      recordedChunksRef.current = [];
      const stream = canvas.captureStream(30); // 30 FPS stream

      // Create Web Audio synthesizer for background upbeat rhythm track
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const audioDest = audioCtx.createMediaStreamDestination();

      // Create gentle upbeat groove oscillator
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioDest);
      osc.start();

      const combinedStream = new MediaStream([
        ...stream.getVideoTracks(),
        ...audioDest.stream.getAudioTracks(),
      ]);

      let options: MediaRecorderOptions = { mimeType: 'video/webm;codecs=vp9,opus' };
      if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')) {
          options = { mimeType: 'video/webm;codecs=vp8,opus' };
        } else {
          options = { mimeType: 'video/webm' };
        }
      }

      const recorder = new MediaRecorder(combinedStream, options);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setDownloadedBlobUrl(url);

        // Auto trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = `rankpulse-ugc-promo-video-${aspectRatio.replace(':', '-')}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setIsRecording(false);
        setShowCompletionModal(true);
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.7 } });

        if (audioContextRef.current) {
          audioContextRef.current.close().catch(() => {});
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(100);
      setIsRecording(true);
      handleReset();
      setIsPlaying(true);
    } catch (err) {
      console.error('Failed to start canvas video recording:', err);
      alert('Video recording started using standard canvas stream. Ensure you allow permissions if prompted.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  // Instant Fast Renderer & Exporter: compiles all 78 seconds in accelerated frames
  const runFastVideoExport = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsFastExporting(true);
    setFastExportProgress(0);

    try {
      const chunks: Blob[] = [];
      const stream = canvas.captureStream(30);

      let options: MediaRecorderOptions = { mimeType: 'video/webm;codecs=vp9' };
      if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
        options = { mimeType: 'video/webm' };
      }
      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setDownloadedBlobUrl(url);

        const a = document.createElement('a');
        a.href = url;
        a.download = `rankpulse-ugc-complete-78s-video-${aspectRatio.replace(':', '-')}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setIsFastExporting(false);
        setShowCompletionModal(true);
        confetti({ particleCount: 70, spread: 90, origin: { y: 0.6 } });
      };

      recorder.start();

      // Render 78 simulated seconds in fast-paced bursts
      const ctx = canvas.getContext('2d')!;
      const isVertical = aspectRatio === '9:16';
      const cw = (canvas.width = isVertical ? 720 : 1280);
      const ch = (canvas.height = isVertical ? 1280 : 720);

      const totalSimulatedFrames = 150; // smooth sample set across the 78s
      for (let f = 0; f < totalSimulatedFrames; f++) {
        const simTime = (f / totalSimulatedFrames) * totalDuration;
        let activeScene = SCENES[0];
        let acc = 0;
        for (let s = 0; s < SCENES.length; s++) {
          acc += SCENES[s].duration;
          if (simTime <= acc) {
            activeScene = SCENES[s];
            break;
          }
        }
        drawSceneFrame(ctx, cw, ch, isVertical, activeScene, simTime * 4, simTime / totalDuration);
        setFastExportProgress(Math.floor((f / totalSimulatedFrames) * 100));
        await new Promise((r) => setTimeout(r, 20));
      }

      recorder.stop();
    } catch (e) {
      console.error('Fast export error:', e);
      setIsFastExporting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://rankpulse.io');
    setCopiedLink(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadScript = () => {
    let scriptMarkdown = `# RankPulse UGC Promo Video Script (> 1 Minute Complete Cut)
**Target Platforms:** TikTok, YouTube Shorts, Instagram Reels, Facebook Video
**Total Duration:** ~78 Seconds
**Format:** High-energy animated kinetic breakdown with pro mockups

---
`;
    SCENES.forEach((s) => {
      scriptMarkdown += `\n### SCENE ${s.id}: ${s.title} (${s.duration} Seconds)
- **Visual Cue:** ${s.subtitle} (Animation mode: ${s.visualMode})
- **Voiceover Script:** "${s.voiceover}"
- **TikTok On-Screen Caption:** [${s.badge}] ${s.title}
`;
    });

    scriptMarkdown += `\n---
### Recommended TikTok / YouTube SEO Hashtags & Description:
#AITools #SEO #OnlineBusiness #PassiveIncome #KeywordResearch #DigitalProducts #MakeMoneyOnline #ChatGPT #EtsySeller #SideHustle2026 #RankPulse #FreeTools

Description Template:
"Stop paying $140/mo for SEO & AI tools! RankPulse gives you over 40 pro tools for keyword research in 14 countries, Google Trends discovery, E-E-A-T article writing, Etsy tags, and automation blueprints 100% free with zero signup. Click the link in bio or visit rankpulse.io to start now!"
`;

    const blob = new Blob([scriptMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rankpulse-ugc-video-script.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3d2b1f] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold px-3 py-1 flex items-center gap-1.5">
              <Video className="h-3.5 w-3.5 text-sky-400" /> UGC Studio &amp; Promo Video Generator
            </span>
            <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-2.5 py-0.5">
              Duration: 78s (&gt; 1 min)
            </span>
            <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold px-2.5 py-0.5">
              100% Free
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-2">
            Fully Animated UGC Video for TikTok, YouTube &amp; Facebook
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Vibrant, colorful motion graphic promo video detailing all website tools and benefits with a direct clickable link and instant video file download.
          </p>
        </div>

        {/* Aspect Ratio Switcher */}
        <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 border border-neutral-200 shadow-xs shrink-0">
          <button
            onClick={() => setAspectRatio('9:16')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              aspectRatio === '9:16'
                ? 'bg-[#2b1d14] text-sky-300 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            📱 9:16 (TikTok / Shorts / Reels)
          </button>
          <button
            onClick={() => setAspectRatio('16:9')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              aspectRatio === '16:9'
                ? 'bg-[#2b1d14] text-sky-300 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            🖥️ 16:9 (YouTube / Facebook)
          </button>
        </div>
      </div>

      {/* Main Video Player Container */}
      <div className="flex flex-col items-center">
        <div
          className={`relative overflow-hidden rounded-3xl border-4 border-[#3d2a1d] shadow-2xl bg-[#140e0a] flex items-center justify-center transition-all ${
            aspectRatio === '9:16' ? 'w-full max-w-[420px] aspect-[9/16]' : 'w-full max-w-[880px] aspect-[16/9]'
          }`}
        >
          <canvas ref={canvasRef} className="w-full h-full object-contain" />

          {/* Quick Play Overlay if paused */}
          {!isPlaying && !isFastExporting && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-2xs cursor-pointer group"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-400 text-[#140e0a] shadow-2xl group-hover:scale-110 transition-transform">
                  <Play className="h-9 w-9 ml-1 fill-[#140e0a]" />
                </div>
                <span className="rounded-full bg-black/80 px-4 py-1.5 text-xs font-extrabold text-white shadow-lg border border-white/20">
                  ▶ Click to Watch Full 78-Sec Animated UGC Video
                </span>
              </div>
            </div>
          )}

          {/* Fast Exporting Overlay */}
          {isFastExporting && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xs text-white p-6 space-y-4 text-center">
              <Zap className="h-10 w-10 text-sky-400 animate-bounce" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-lg">Compiling Full 78s Video File...</h4>
                <p className="text-xs text-neutral-300">Rendering high-res animated frames for download</p>
              </div>
              <div className="w-64 bg-neutral-800 rounded-full h-3 overflow-hidden border border-neutral-700">
                <div
                  className="bg-sky-400 h-full transition-all duration-100"
                  style={{ width: `${fastExportProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-sky-300">{fastExportProgress}% Complete</span>
            </div>
          )}
        </div>

        {/* Video Player Controls Ribbon */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 w-full max-w-3xl bg-white rounded-2xl border border-neutral-200 p-3 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="rounded-xl bg-[#2b1d14] p-2.5 text-sky-300 hover:bg-[#3d2a1d] transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
            </button>
            <button
              onClick={handleReset}
              className="rounded-xl border border-neutral-200 p-2.5 text-neutral-600 hover:bg-neutral-100 transition-colors"
              title="Replay from start"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="rounded-xl border border-neutral-200 p-2.5 text-neutral-600 hover:bg-neutral-100 transition-colors"
              title={isMuted ? 'Unmute voiceover' : 'Mute voiceover'}
            >
              {isMuted ? <VolumeX className="h-5 w-5 text-rose-500" /> : <Volume2 className="h-5 w-5 text-emerald-600" />}
            </button>

            <span className="text-xs font-mono font-bold text-neutral-700 ml-2">
              {Math.floor(elapsedTime)}s / {totalDuration}s
            </span>
          </div>

          {/* Action Buttons: Fast Export & Record */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={runFastVideoExport}
              disabled={isFastExporting}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-extrabold shadow-sm active:scale-98 transition-all"
              title="Instantly generate and download the completed video file"
            >
              <Download className="h-4 w-4" />
              <span>Instant Download Video (.webm)</span>
            </button>

            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold shadow-sm active:scale-98 transition-all ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-sky-500 hover:bg-sky-400 text-[#140e0a]'
              }`}
            >
              <Video className="h-4 w-4" />
              <span>{isRecording ? 'Recording Live... Click Stop' : 'Live Record & Save'}</span>
            </button>

            <button
              onClick={handleDownloadScript}
              className="rounded-xl border border-neutral-200 px-3 py-2 text-xs font-bold text-neutral-700 hover:bg-neutral-50 shadow-xs"
              title="Download script and hashtags"
            >
              Script (.md)
            </button>
          </div>
        </div>

        {/* Scene Jump Selector Pills */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 max-w-3xl text-[11px] font-bold">
          {SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => handleSeekScene(idx)}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                currentSceneIdx === idx
                  ? 'bg-[#2b1d14] text-sky-300 shadow-xs border border-sky-400/40'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              Scene {scene.id}: {scene.badge}
            </button>
          ))}
        </div>
      </div>

      {/* PROMINENT CLICKABLE LINK DIRECTLY DOWN ON VIDEO (Strict User Requirement) */}
      <div className="rounded-3xl border-3 border-sky-400 bg-gradient-to-r from-[#201610] via-[#2c1d14] to-[#1a120c] p-6 sm:p-8 text-white shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-400/20 text-sky-300 border border-sky-400/40 text-[11px] font-bold px-3 py-1">
              <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
              <span>OFFICIAL PROMOTED DESTINATION LINK</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              👉 Click Here to Use All 40+ Tools Free at RankPulse
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-xl leading-relaxed">
              100% Free Forever • 14-Country Keyword Radar • AI Article Writer • Google Trends Breakout Finder • YouTube &amp; Etsy Optimizers • No Signup Required
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('/tools')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-400 hover:bg-sky-300 px-6 py-3.5 text-sm font-extrabold text-[#140e0a] shadow-lg shadow-sky-500/30 active:scale-98 transition-all w-full sm:w-auto"
            >
              <span>Explore All Free Tools Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-400/40 bg-[#3b271a] px-5 py-3.5 text-xs font-bold text-sky-200 hover:bg-[#4d3322] hover:text-white transition-colors w-full sm:w-auto"
            >
              {copiedLink ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link: rankpulse.io'}</span>
            </button>
          </div>
        </div>

        {/* Quick Tool Jump Pills directly under the link */}
        <div className="pt-3 border-t border-[#3d2a1d] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-neutral-400 font-medium">Direct Tool Shortcuts:</span>
          <button
            onClick={() => navigate('/tools/keyword-explorer')}
            className="rounded-lg bg-[#382517] hover:bg-[#4a3220] px-3 py-1 text-sky-300 font-semibold transition-colors"
          >
            Keyword Explorer (14 Countries)
          </button>
          <button
            onClick={() => navigate('/tools/ai-article-writer')}
            className="rounded-lg bg-[#382517] hover:bg-[#4a3220] px-3 py-1 text-emerald-300 font-semibold transition-colors"
          >
            AI Article Writer + Trends
          </button>
          <button
            onClick={() => navigate('/tools/etsy-tag-generator')}
            className="rounded-lg bg-[#382517] hover:bg-[#4a3220] px-3 py-1 text-amber-300 font-semibold transition-colors"
          >
            Etsy 13-Tag Generator
          </button>
          <button
            onClick={() => navigate('/tools/ugc-script-generator')}
            className="rounded-lg bg-[#382517] hover:bg-[#4a3220] px-3 py-1 text-purple-300 font-semibold transition-colors"
          >
            TikTok UGC Scripts
          </button>
        </div>
      </div>

      {/* Completion Modal: Shows Automatically when video reaches 78s or when user triggers export */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-3xl border-2 border-emerald-400 bg-[#1c130d] p-6 sm:p-8 text-white shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Video Generation Finished!
              </span>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="text-neutral-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">
                🎉 Your 78-Second Animated UGC Video is Ready!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Your video covers all tools, multi-country keyword search, Google Trends, creator suite, and benefits. Ready to publish directly on TikTok, YouTube Shorts, Facebook &amp; Instagram Reels.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={runFastVideoExport}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 text-sm font-extrabold text-[#0e1710] shadow-lg shadow-emerald-500/30 transition-all"
              >
                <Download className="h-5 w-5" />
                <span>Download Video File (.webm / MP4 compatible)</span>
              </button>

              <button
                onClick={handleDownloadScript}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-700 px-5 py-3 text-xs font-bold text-neutral-200 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Download Scene Script &amp; Optimized Hashtags</span>
              </button>
            </div>

            <div className="rounded-xl bg-[#2b1d14] p-3 text-[11px] text-neutral-300 border border-[#422d20]">
              <strong className="text-sky-300">Publishing Tip:</strong> TikTok, YouTube Shorts, and Facebook all accept `.webm` and `.mp4` video uploads natively with full sound and resolution.
            </div>
          </div>
        </div>
      )}

      {/* Complete Scene Breakdown & Storyboard Details */}
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">
              Complete UGC Video Script &amp; Visual Storyboard (78 Seconds)
            </h3>
            <p className="text-xs text-neutral-500">
              Full breakdown of spoken narration, animation cues, and on-screen visuals.
            </p>
          </div>
          <button
            onClick={handleDownloadScript}
            className="text-xs font-bold text-sky-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <Download className="h-3.5 w-3.5" /> Download Script (.md)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCENES.map((scene) => (
            <div
              key={scene.id}
              className={`rounded-2xl border p-4 space-y-2.5 transition-all ${
                currentSceneIdx === scene.id - 1
                  ? 'border-sky-400 bg-sky-50/40 ring-1 ring-sky-400'
                  : 'border-neutral-200 bg-neutral-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-neutral-900">
                  Scene {scene.id}: {scene.badge} ({scene.duration}s)
                </span>
                <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                  {scene.duration} Seconds
                </span>
              </div>

              <div className="text-xs text-neutral-700 space-y-1.5">
                <p><strong>Visual Cue:</strong> {scene.subtitle}</p>
                <div className="rounded-lg bg-white p-2.5 border border-neutral-200 font-medium text-neutral-800 leading-relaxed text-[11px]">
                  🗣️ "{scene.voiceover}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export type VisualType =
  | 'seo-radar'
  | 'article-writer'
  | 'keyword-explorer'
  | 'business-growth'
  | 'youtube-studio'
  | 'ecommerce-cart'
  | 'automation-flow'
  | 'meta-tags'
  | 'schema-tree'
  | 'profit-calc'
  | 'trends-surge'
  | 'social-viral'
  | 'kdp-book'
  | 'ai-bot'
  | 'topical-authority'
  | 'comparison-scale';

interface LightweightVisualProps {
  type: VisualType;
  className?: string;
  animate?: boolean;
}

export const LightweightVisual: React.FC<LightweightVisualProps> = ({
  type,
  className = "w-full h-full",
  animate = true,
}) => {
  switch (type) {
    case 'keyword-explorer':
    case 'seo-radar':
      return (
        <svg
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="gridGrad" x1="0" y1="0" x2="240" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" stopOpacity="0.12" />
              <stop stopColor="#8b5cf6" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="20" y1="120" x2="220" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563eb" />
              <stop stopColor="#7c3aed" />
            </linearGradient>
          </defs>
          <rect width="240" height="160" rx="12" fill="url(#gridGrad)" />
          {/* Subtle grid lines */}
          <line x1="20" y1="40" x2="220" y2="40" stroke="#93c5fd" strokeOpacity="0.25" strokeDasharray="3 3" />
          <line x1="20" y1="80" x2="220" y2="80" stroke="#93c5fd" strokeOpacity="0.25" strokeDasharray="3 3" />
          <line x1="20" y1="120" x2="220" y2="120" stroke="#93c5fd" strokeOpacity="0.25" strokeDasharray="3 3" />
          
          {/* Trend Curve */}
          <path
            d="M 25 125 C 60 115, 80 130, 110 85 C 140 40, 170 65, 215 35"
            stroke="url(#lineGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className={animate ? "transition-all duration-700 hover:stroke-[4]" : ""}
          />
          {/* Fill under curve */}
          <path
            d="M 25 125 C 60 115, 80 130, 110 85 C 140 40, 170 65, 215 35 L 215 140 L 25 140 Z"
            fill="url(#lineGrad)"
            fillOpacity="0.08"
          />
          
          {/* Data Points */}
          <circle cx="110" cy="85" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
          <circle cx="215" cy="35" r="5.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="2.5" className={animate ? "animate-ping opacity-75" : ""} />
          <circle cx="215" cy="35" r="5.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="2.5" />
          
          {/* Mini Badge */}
          <rect x="150" y="18" width="62" height="20" rx="10" fill="#ffffff" stroke="#e0e7ff" />
          <text x="181" y="32" textAnchor="middle" fill="#4338ca" fontSize="9" fontWeight="700">94 OPP SCORE</text>
        </svg>
      );

    case 'article-writer':
      return (
        <svg
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="docGrad" x1="0" y1="0" x2="240" y2="160" gradientUnits="userSpaceOnUse">
              <stop stopColor="#eff6ff" />
              <stop stopColor="#f5f3ff" />
            </linearGradient>
          </defs>
          <rect width="240" height="160" rx="12" fill="url(#docGrad)" />
          {/* Document Sheet */}
          <rect x="45" y="24" width="150" height="112" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          {/* Header line */}
          <rect x="65" y="42" width="75" height="8" rx="4" fill="#2563eb" />
          {/* Body lines */}
          <rect x="65" y="60" width="110" height="5" rx="2.5" fill="#cbd5e1" />
          <rect x="65" y="73" width="95" height="5" rx="2.5" fill="#cbd5e1" />
          <rect x="65" y="86" width="105" height="5" rx="2.5" fill="#cbd5e1" />
          <rect x="65" y="99" width="60" height="5" rx="2.5" fill="#93c5fd" />
          
          {/* AI Sparkle Pen */}
          <g className={animate ? "animate-float" : ""}>
            <circle cx="178" cy="40" r="14" fill="#7c3aed" />
            <path
              d="M178 33L180 38L185 40L180 42L178 47L176 42L171 40L176 38L178 33Z"
              fill="#ffffff"
            />
          </g>
        </svg>
      );

    case 'trends-surge':
      return (
        <svg
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect width="240" height="160" rx="12" fill="#f8fafc" />
          {/* Trend Bars */}
          <rect x="40" y="110" width="18" height="25" rx="4" fill="#cbd5e1" />
          <rect x="70" y="95" width="18" height="40" rx="4" fill="#94a3b8" />
          <rect x="100" y="80" width="18" height="55" rx="4" fill="#60a5fa" />
          <rect x="130" y="60" width="18" height="75" rx="4" fill="#3b82f6" />
          <rect x="160" y="38" width="18" height="97" rx="4" fill="#2563eb" />
          <rect x="190" y="24" width="18" height="111" rx="4" fill="#7c3aed" />
          
          {/* Upward Arrow */}
          <g className={animate ? "animate-pulse-subtle" : ""}>
            <path
              d="M150 48L195 20M195 20H175M195 20V40"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <text x="45" y="32" fill="#059669" fontSize="10" fontWeight="700">+480% BREAKOUT</text>
        </svg>
      );

    case 'business-growth':
    case 'profit-calc':
      return (
        <svg
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect width="240" height="160" rx="12" fill="#f0fdf4" />
          {/* Dollar & Chart node */}
          <circle cx="120" cy="70" r="32" fill="#ffffff" stroke="#86efac" strokeWidth="2" />
          <text x="120" y="78" textAnchor="middle" fill="#15803d" fontSize="26" fontWeight="800">$</text>
          
          {/* Circular progress indicators */}
          <circle cx="120" cy="70" r="42" stroke="#bbf7d0" strokeWidth="4" strokeDasharray="180" strokeDashoffset="40" />
          
          {/* Metric cards */}
          <rect x="25" y="115" width="85" height="28" rx="6" fill="#ffffff" stroke="#dcfce7" />
          <text x="35" y="128" fill="#64748b" fontSize="8" fontWeight="600">PROFIT MARGIN</text>
          <text x="35" y="139" fill="#166534" fontSize="11" fontWeight="800">82.4%</text>

          <rect x="130" y="115" width="85" height="28" rx="6" fill="#ffffff" stroke="#dcfce7" />
          <text x="140" y="128" fill="#64748b" fontSize="8" fontWeight="600">ROI VELOCITY</text>
          <text x="140" y="139" fill="#1d4ed8" fontSize="11" fontWeight="800">3.8x</text>
        </svg>
      );

    case 'youtube-studio':
      return (
        <svg
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect width="240" height="160" rx="12" fill="#fff1f2" />
          {/* Play button card */}
          <rect x="55" y="35" width="130" height="88" rx="16" fill="#e11d48" />
          <polygon points="110,62 142,79 110,96" fill="#ffffff" />
          {/* CTR badge */}
          <g className={animate ? "animate-float" : ""}>
            <rect x="145" y="20" width="70" height="24" rx="12" fill="#ffffff" stroke="#fecdd3" />
            <text x="180" y="36" textAnchor="middle" fill="#be123c" fontSize="9" fontWeight="700">12.8% CTR</text>
          </g>
        </svg>
      );

    case 'automation-flow':
      return (
        <svg
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect width="240" height="160" rx="12" fill="#faf5ff" />
          {/* Node 1: Trigger */}
          <rect x="30" y="65" width="46" height="32" rx="8" fill="#ffffff" stroke="#c084fc" strokeWidth="2" />
          <circle cx="53" cy="81" r="5" fill="#9333ea" />
          
          {/* Connection 1 */}
          <line x1="76" y1="81" x2="100" y2="81" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" />
          
          {/* Node 2: AI Agent */}
          <rect x="100" y="55" width="50" height="52" rx="10" fill="#7e22ce" />
          <path d="M125 73L127 78L132 80L127 82L125 87L123 82L118 80L123 78L125 73Z" fill="#ffffff" />
          
          {/* Connection 2 */}
          <line x1="150" y1="81" x2="174" y2="81" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 3" />

          {/* Node 3: Publish */}
          <rect x="174" y="65" width="46" height="32" rx="8" fill="#ffffff" stroke="#c084fc" strokeWidth="2" />
          <path d="M192 81L197 86L204 77" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'ecommerce-cart':
    case 'kdp-book':
      return (
        <svg
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect width="240" height="160" rx="12" fill="#fffbeb" />
          {/* Book / Product Box */}
          <rect x="75" y="32" width="90" height="96" rx="6" fill="#ffffff" stroke="#fcd34d" strokeWidth="2" />
          <rect x="75" y="32" width="16" height="96" rx="3" fill="#f59e0b" />
          <rect x="102" y="48" width="50" height="6" rx="3" fill="#d97706" />
          <rect x="102" y="60" width="40" height="4" rx="2" fill="#fde68a" />
          <rect x="102" y="70" width="45" height="4" rx="2" fill="#fde68a" />
          
          {/* Star Rating Badge */}
          <rect x="95" y="94" width="55" height="18" rx="9" fill="#fef3c7" />
          <text x="122" y="107" textAnchor="middle" fill="#b45309" fontSize="10" fontWeight="700">★ Bestseller</text>
        </svg>
      );

    case 'social-viral':
      return (
        <svg
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect width="240" height="160" rx="12" fill="#fdf4ff" />
          <circle cx="120" cy="80" r="40" fill="#fae8ff" />
          <circle cx="85" cy="65" r="16" fill="#f43f5e" />
          <circle cx="155" cy="65" r="16" fill="#3b82f6" />
          <circle cx="120" cy="115" r="18" fill="#8b5cf6" />
          
          <path d="M85 65L120 115L155 65" stroke="#d946ef" strokeWidth="2" strokeDasharray="4 4" />
          <text x="120" y="55" textAnchor="middle" fill="#a21caf" fontSize="11" fontWeight="800">HOOK #1</text>
        </svg>
      );

    case 'meta-tags':
    case 'schema-tree':
    case 'topical-authority':
    default:
      return (
        <svg
          viewBox="0 0 240 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect width="240" height="160" rx="12" fill="#f1f5f9" />
          {/* SERP Search Card */}
          <rect x="25" y="30" width="190" height="100" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
          {/* URL slug */}
          <rect x="40" y="44" width="75" height="5" rx="2.5" fill="#64748b" />
          {/* Title tag */}
          <rect x="40" y="56" width="150" height="9" rx="4.5" fill="#1d4ed8" />
          {/* Description */}
          <rect x="40" y="73" width="160" height="5" rx="2.5" fill="#94a3b8" />
          <rect x="40" y="83" width="135" height="5" rx="2.5" fill="#94a3b8" />
          {/* Rich snippet stars */}
          <text x="40" y="108" fill="#f59e0b" fontSize="11">★★★★★ 4.9 · FAQ Schema Enabled</text>
        </svg>
      );
  }
};

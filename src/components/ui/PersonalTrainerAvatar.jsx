import { useId } from 'react';

/**
 * PersonalTrainerAvatar — branded coach mark used in chat headers and bubbles.
 * Renders a stylized fitness silhouette (head + V-taper torso + barbell overhead)
 * inside a gradient accent tile. The barbell gently lifts when `animated`.
 *
 * Props:
 * - size: 'sm' (32px) | 'md' (44px) | 'lg' (64px)
 * - animated: whether the barbell should pulse
 * - className: extra classes for the wrapper
 */
const sizeMap = { sm: 32, md: 44, lg: 64 };

const PersonalTrainerAvatar = ({ size = 'md', animated = false, className = '' }) => {
  const px = sizeMap[size] ?? 44;
  const reactId = useId();
  const gradId = `ptBody-${reactId.replace(/:/g, '')}`;
  const keyframes = `
    @keyframes ptBar-${reactId.replace(/:/g, '')} {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
    }
  `;

  return (
    <div
      className={`relative inline-flex rounded-2xl overflow-hidden bg-gradient-to-br from-gym-accent to-gym-accent-hover shadow-glow-sm ${className}`}
      style={{ width: px, height: px }}
      aria-hidden="true"
    >
      <style>{keyframes}</style>
      <svg viewBox="0 0 64 64" width={px} height={px}>
        <defs>
          <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.78" />
          </linearGradient>
        </defs>

        {/* Head */}
        <circle cx="32" cy="22" r="7.5" fill={`url(#${gradId})`} />

        {/* Neck */}
        <rect x="29" y="29" width="6" height="3" fill={`url(#${gradId})`} />

        {/* Torso V-taper (chest + shoulders) */}
        <path
          d="M14 58 C14 44 21 36 32 36 C43 36 50 44 50 58 Z"
          fill={`url(#${gradId})`}
        />

        {/* Chest line accent */}
        <path
          d="M22 48 L32 52 L42 48"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Barbell group — animated lift */}
        <g
          style={{
            transformOrigin: '32px 18px',
            animation: animated ? `ptBar-${reactId.replace(/:/g, '')} 1.6s ease-in-out infinite` : 'none',
          }}
        >
          {/* bar */}
          <rect x="10" y="16" width="44" height="3.5" rx="1.5" fill="#fff" opacity="0.92" />
          {/* inner plates */}
          <rect x="14" y="13" width="4" height="9.5" rx="1.2" fill="#fff" opacity="0.95" />
          <rect x="46" y="13" width="4" height="9.5" rx="1.2" fill="#fff" opacity="0.95" />
          {/* outer plates */}
          <rect x="6" y="11" width="5" height="13.5" rx="1.5" fill="#fff" opacity="0.98" />
          <rect x="53" y="11" width="5" height="13.5" rx="1.5" fill="#fff" opacity="0.98" />
        </g>
      </svg>
    </div>
  );
};

export default PersonalTrainerAvatar;

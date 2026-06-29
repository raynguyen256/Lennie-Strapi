/* ============================================================
   Lennie SkinLab — icon library (inline lucide-style SVGs)
   ============================================================ */

export function Svg({ children, size = 24, stroke = 1.7, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  Search: (p) => (
    <Svg {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </Svg>
  ),
  Bag: (p) => (
    <Svg {...p}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </Svg>
  ),
  Menu: (p) => (
    <Svg {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </Svg>
  ),
  X: (p) => (
    <Svg {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Svg>
  ),
  Heart: (p) => (
    <Svg {...p}>
      <path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z" />
    </Svg>
  ),
  HeartPulse: (p) => (
    <Svg {...p}>
      <path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z" />
      <path d="M3.2 12H8l1.5-3 3 6 1.5-3h4.8" />
    </Svg>
  ),
  Award: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
    </Svg>
  ),
  Shield: (p) => (
    <Svg {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  ),
  Check: (p) => (
    <Svg {...p}>
      <path d="M20 6 9 17l-5-5" />
    </Svg>
  ),
  CheckCircle: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  ),
  HeartHandshake: (p) => (
    <Svg {...p}>
      <path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z" />
      <path d="m12 5 1.9 1.9a2.1 2.1 0 0 1 0 3L12 11.8" />
    </Svg>
  ),
  ChevronR: (p) => (
    <Svg {...p}>
      <path d="m9 18 6-6-6-6" />
    </Svg>
  ),
  ChevronL: (p) => (
    <Svg {...p}>
      <path d="m15 18-6-6 6-6" />
    </Svg>
  ),
  Activity: (p) => (
    <Svg {...p}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </Svg>
  ),
  Globe: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" />
    </Svg>
  ),
  Sparkles: (p) => (
    <Svg {...p}>
      <path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4z" />
      <path d="M19 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </Svg>
  ),
  Star: (p) => (
    <Svg {...p}>
      <path d="m12 2 3 6.5 7 .8-5 4.7 1.3 7L12 17.8 5.4 21l1.3-7-5-4.7 7-.8z" />
    </Svg>
  ),
  Mail: (p) => (
    <Svg {...p}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </Svg>
  ),
  MailCheck: (p) => (
    <Svg {...p}>
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9" />
      <path d="m2 7 10 6 10-6" />
      <path d="m16 19 2 2 4-4" />
    </Svg>
  ),
  Phone: (p) => (
    <Svg {...p}>
      <path d="M5 3h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-3" />
    </Svg>
  ),
  Pin: (p) => (
    <Svg {...p}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </Svg>
  ),
  Clock: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  ),
  ArrowR: (p) => (
    <Svg {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  ),
  Message: (p) => (
    <Svg {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Svg>
  ),
  Calendar: (p) => (
    <Svg {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Svg>
  ),
  User: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </Svg>
  ),
  Sun: (p) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Svg>
  ),
  Droplet: (p) => (
    <Svg {...p}>
      <path d="M12 2.7 6.3 9a8 8 0 1 0 11.4 0z" />
    </Svg>
  ),
  Clipboard: (p) => (
    <Svg {...p}>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </Svg>
  ),
  Plus: (p) => (
    <Svg {...p}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  ),
  Flask: (p) => (
    <Svg {...p}>
      <path d="M9 3h6M10 3v6L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3" />
      <path d="M7.5 14h9" />
    </Svg>
  ),
  Microscope: (p) => (
    <Svg {...p}>
      <path d="M6 18h8M3 22h18M14 22a7 7 0 0 0 0-14" />
      <path d="M9 14h2a4 4 0 0 0 0-8H9z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </Svg>
  ),
  Leaf: (p) => (
    <Svg {...p}>
      <path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-9 0 9-3 16-9 16z" />
      <path d="M4 21c5-7 9-9 13-10" />
    </Svg>
  ),
  Facebook: (p) => (
    <Svg {...p}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Svg>
  ),
  Instagram: (p) => (
    <Svg {...p}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </Svg>
  ),
  TikTok: ({ size = 24, stroke, ...rest }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.49 1.51V7.39s-1.99.1-3.45-1.57z" />
    </svg>
  ),
};

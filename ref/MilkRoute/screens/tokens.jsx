// MilkRoute — tokens & shared primitives
// Design system: warm cream + deep pasture green + amber wheat accent
// Type: Manrope (UI) + JetBrains Mono (numbers/data)
// Constraints: ≥56px tap targets, icons always paired with text, high contrast outdoors

const MR = {
  // ── neutrals (warm cream) ──
  bg:        'oklch(0.97 0.012 85)',     // page bg
  surface:   '#FFFFFF',                  // cards
  surface2:  'oklch(0.95 0.012 85)',     // subtle inset
  border:    'oklch(0.90 0.012 85)',
  divider:   'oklch(0.93 0.010 85)',

  // ── text ──
  ink:       'oklch(0.22 0.018 240)',
  ink2:      'oklch(0.45 0.015 240)',
  ink3:      'oklch(0.62 0.012 240)',
  inverse:   '#FFFFFF',

  // ── brand: pasture green ──
  primary:        'oklch(0.42 0.085 150)',
  primaryDark:    'oklch(0.32 0.085 150)',
  primarySoft:    'oklch(0.94 0.035 150)',
  primarySofter:  'oklch(0.97 0.020 150)',

  // ── accent: amber/wheat ──
  accent:        'oklch(0.74 0.140 75)',
  accentDark:    'oklch(0.58 0.140 75)',
  accentSoft:    'oklch(0.95 0.045 75)',

  // ── semantics ──
  syncOk:    'oklch(0.55 0.130 150)',   // synced
  syncBg:    'oklch(0.94 0.040 150)',
  pending:   'oklch(0.65 0.150 60)',    // pending sync
  pendingBg: 'oklch(0.94 0.060 75)',
  danger:    'oklch(0.55 0.180 28)',
  dangerBg:  'oklch(0.95 0.040 28)',

  // ── radii ──
  r: { xs: 8, sm: 12, md: 16, lg: 20, xl: 28, pill: 999 },

  // ── typography ──
  font: { ui: '"Manrope", system-ui, sans-serif', mono: '"JetBrains Mono", ui-monospace, monospace' },
};

// ──────────────────────────────────────────────────────────────────────────
// Phone canvas — wraps content with status bar + home indicator (no nav bar)
// We bypass the IOSDevice title/nav since we want full design control.
// ──────────────────────────────────────────────────────────────────────────
function Phone({ children, bg = MR.bg, dark = false, statusBarDark, keyboard = false }) {
  const sbDark = statusBarDark !== undefined ? statusBarDark : dark;
  return (
    <div style={{
      width: 402, height: 874, borderRadius: 0, overflow: 'hidden',
      position: 'relative', background: bg,
      fontFamily: MR.font.ui, color: MR.ink,
      WebkitFontSmoothing: 'antialiased',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* status bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, color: sbDark ? '#fff' : '#000' }}>
        <IOSStatusBar dark={sbDark} />
      </div>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
        width: 126, height: 37, borderRadius: 24, background: '#000', zIndex: 50,
      }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {children}
      </div>
      {keyboard && <IOSKeyboard dark={false} />}
      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
        height: 34, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 8, pointerEvents: 'none',
      }}>
        <div style={{ width: 139, height: 5, borderRadius: 100, background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.28)' }} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Headers
// ──────────────────────────────────────────────────────────────────────────
function ScreenHeader({ title, subtitle, back = true, action, bg = 'transparent', tint = MR.ink, syncDot }) {
  return (
    <div style={{ paddingTop: 56, paddingLeft: 20, paddingRight: 20, paddingBottom: 12, background: bg, position: 'relative', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 44 }}>
        {back ? (
          <button style={{
            width: 44, height: 44, borderRadius: 14, border: 'none', background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0, color: tint,
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : <div style={{ width: 44 }} />}
        {syncDot}
        {action || <div style={{ width: 44 }} />}
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: tint, letterSpacing: -0.8, lineHeight: 1.05, marginTop: 6 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 15, color: tint === MR.ink ? MR.ink2 : 'rgba(255,255,255,0.75)', marginTop: 6, fontWeight: 500 }}>{subtitle}</div>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Buttons — generous, icon+label
// ──────────────────────────────────────────────────────────────────────────
function BigButton({ children, kind = 'primary', icon, full = true, onClick, style }) {
  const palettes = {
    primary:   { bg: MR.primary, fg: '#fff', shadow: '0 1px 0 rgba(0,0,0,0.05), 0 2px 8px oklch(0.42 0.085 150 / 0.3)' },
    secondary: { bg: MR.surface, fg: MR.ink, shadow: '0 1px 2px rgba(0,0,0,0.04)', border: `1.5px solid ${MR.border}` },
    accent:    { bg: MR.accent, fg: '#1c1408', shadow: '0 1px 0 rgba(0,0,0,0.05), 0 2px 8px oklch(0.74 0.140 75 / 0.35)' },
    danger:    { bg: MR.surface, fg: MR.danger, border: `1.5px solid ${MR.danger}` },
    ghost:     { bg: 'transparent', fg: MR.primary },
  };
  const p = palettes[kind];
  return (
    <button onClick={onClick} style={{
      width: full ? '100%' : 'auto', height: 60, borderRadius: MR.r.md,
      background: p.bg, color: p.fg, border: p.border || 'none', boxShadow: p.shadow,
      fontFamily: MR.font.ui, fontSize: 17, fontWeight: 700, letterSpacing: -0.2,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      cursor: 'pointer', padding: '0 20px',
      ...style,
    }}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Sync badges & banner
// ──────────────────────────────────────────────────────────────────────────
function SyncBadge({ state }) {
  if (state === 'pending') {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 10px 5px 8px', borderRadius: MR.r.pill,
        background: MR.pendingBg, color: 'oklch(0.40 0.130 60)',
        fontSize: 12.5, fontWeight: 700, letterSpacing: -0.1,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: MR.pending }} />
        Pendente
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 10px 5px 8px', borderRadius: MR.r.pill,
      background: MR.syncBg, color: 'oklch(0.32 0.100 150)',
      fontSize: 12.5, fontWeight: 700, letterSpacing: -0.1,
    }}>
      <svg width="11" height="11" viewBox="0 0 12 12">
        <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="oklch(0.45 0.130 150)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Sincronizada
    </span>
  );
}

function OfflineBanner() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'oklch(0.30 0.040 40)', color: '#fff',
      padding: '10px 16px', fontSize: 13.5, fontWeight: 600, letterSpacing: -0.1,
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 8a6 6 0 0112 0" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="8" cy="11.5" r="1.2" fill="#fff"/>
        <path d="M1 1l14 14" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
      <span style={{ flex: 1 }}>Sem conexão · 2 coletas para sincronizar</span>
      <span style={{ fontFamily: MR.font.mono, fontSize: 12 }}>OFFLINE</span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Volume / value displays
// ──────────────────────────────────────────────────────────────────────────
function Volume({ value, unit = 'L', size = 56, color = MR.ink }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, color }}>
      <span style={{ fontFamily: MR.font.mono, fontSize: size, fontWeight: 700, letterSpacing: -2, lineHeight: 1, fontFeatureSettings: '"tnum"' }}>
        {value}
      </span>
      <span style={{ fontSize: Math.round(size * 0.34), fontWeight: 600, color: MR.ink2 }}>{unit}</span>
    </div>
  );
}

function MoneyBRL({ value, size = 44, color = MR.ink }) {
  // value as number
  const [int, frac] = value.toFixed(2).replace('.', ',').split(',');
  const intFmt = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4, color }}>
      <span style={{ fontSize: Math.round(size * 0.42), fontWeight: 600, color: MR.ink2, marginRight: 2 }}>R$</span>
      <span style={{ fontFamily: MR.font.mono, fontSize: size, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1, fontFeatureSettings: '"tnum"' }}>
        {intFmt}
      </span>
      <span style={{ fontFamily: MR.font.mono, fontSize: Math.round(size * 0.55), fontWeight: 700, color: MR.ink2, letterSpacing: -0.5 }}>,{frac}</span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Form field — large, labelled, clear focus
// ──────────────────────────────────────────────────────────────────────────
function Field({ label, value, placeholder, focused = false, hint, suffix, icon, type = 'text', big = false }) {
  return (
    <label style={{ display: 'block', marginBottom: 16 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: MR.ink2, marginBottom: 6, letterSpacing: -0.1 }}>{label}</div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: MR.surface, borderRadius: MR.r.md,
        border: `1.5px solid ${focused ? MR.primary : MR.border}`,
        padding: big ? '0 18px' : '0 16px', height: big ? 72 : 56,
        boxShadow: focused ? `0 0 0 4px oklch(0.42 0.085 150 / 0.12)` : 'none',
      }}>
        {icon}
        <div style={{
          flex: 1,
          fontSize: big ? 28 : 17, fontWeight: big ? 700 : 600,
          fontFamily: type === 'number' ? MR.font.mono : MR.font.ui,
          color: value ? MR.ink : MR.ink3, letterSpacing: big ? -0.6 : -0.2,
        }}>{value || placeholder}</div>
        {suffix && <span style={{ fontSize: big ? 22 : 14, fontWeight: 700, color: MR.ink2 }}>{suffix}</span>}
      </div>
      {hint && <div style={{ fontSize: 13, color: MR.ink3, marginTop: 6 }}>{hint}</div>}
    </label>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Photo placeholder — striped, with mono caption
// ──────────────────────────────────────────────────────────────────────────
function PhotoStripe({ caption = 'foto da régua', height = 200, width = '100%', rounded = MR.r.md, dark = false }) {
  const stripes = dark
    ? 'repeating-linear-gradient(45deg, oklch(0.22 0.012 240) 0 10px, oklch(0.26 0.012 240) 10px 20px)'
    : 'repeating-linear-gradient(45deg, oklch(0.91 0.012 85) 0 10px, oklch(0.94 0.012 85) 10px 20px)';
  return (
    <div style={{
      width, height, background: stripes, borderRadius: rounded,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `1px solid ${MR.border}`,
    }}>
      <span style={{ fontFamily: MR.font.mono, fontSize: 11, color: dark ? 'rgba(255,255,255,0.6)' : MR.ink3, letterSpacing: 0.5, textTransform: 'uppercase' }}>{caption}</span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Avatar — initials on tinted disc
// ──────────────────────────────────────────────────────────────────────────
function Avatar({ name, size = 44, hue = 150 }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(s => s[0]).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: size,
      background: `oklch(0.92 0.040 ${hue})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: `oklch(0.32 0.080 ${hue})`,
      fontWeight: 800, fontSize: Math.round(size * 0.40), letterSpacing: -0.2, flexShrink: 0,
    }}>{initials}</div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Card
// ──────────────────────────────────────────────────────────────────────────
function Card({ children, padding = 16, style }) {
  return (
    <div style={{
      background: MR.surface, borderRadius: MR.r.lg,
      border: `1px solid ${MR.border}`,
      padding, ...style,
    }}>{children}</div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Bottom tab bar — labelled icons, oversized
// ──────────────────────────────────────────────────────────────────────────
function TabBar({ items, active }) {
  return (
    <div style={{
      flexShrink: 0,
      display: 'flex', borderTop: `1px solid ${MR.border}`,
      background: MR.surface, paddingTop: 8, paddingBottom: 28, paddingLeft: 8, paddingRight: 8,
      gap: 4,
    }}>
      {items.map((it, i) => {
        const isActive = i === active;
        return (
          <div key={i} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '6px 0',
            color: isActive ? MR.primary : MR.ink3,
          }}>
            <div style={{ height: 26, display: 'flex', alignItems: 'center' }}>{it.icon}</div>
            <div style={{ fontSize: 11.5, fontWeight: isActive ? 800 : 600, letterSpacing: -0.1 }}>{it.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Icons (paired with text everywhere — never alone)
// Simple stroke-style. Always 24px to match the touch target system.
// ──────────────────────────────────────────────────────────────────────────
const Icon = {
  Home: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8M5 10v10h14V10"/></svg>,
  Users: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="3.5"/><path d="M2 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5"/><circle cx="17" cy="8" r="2.5"/><path d="M16 14c2.5.4 4.5 1.7 5 5"/></svg>,
  Route: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="5" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M6 7.5v3a3 3 0 003 3h6a3 3 0 013 3v.5"/></svg>,
  Plus: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  Search: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><circle cx="10" cy="10" r="6.5"/><path d="M15 15l4 4"/></svg>,
  Camera: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h3.5L8 5.5h8L17.5 8H21v12H3z"/><circle cx="12" cy="13.5" r="4"/></svg>,
  Calendar: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  Truck: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h11v10H2zM13 10h5l3 3v4h-8z"/><circle cx="6.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/></svg>,
  History: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 109-9c-2.5 0-4.7 1-6.4 2.6L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></svg>,
  Drop: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3s6 7 6 11.5A6 6 0 016 14.5C6 10 12 3 12 3z"/></svg>,
  Wallet: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="2.5"/><path d="M3 9h18M16 13.5h2"/></svg>,
  Settings: (c = 'currentColor') => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>,
  Check: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11.5l4.5 4.5L18 6"/></svg>,
  Edit: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l4 4-10 10H4v-4z"/></svg>,
  Chevron: (c = 'currentColor') => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3l5 4-5 4"/></svg>,
  Logout: (c = 'currentColor') => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4h4v14h-4M14 11H4M7 8l-3 3 3 3"/></svg>,
};

// ──────────────────────────────────────────────────────────────────────────
// MilkRoute wordmark — small inline logo
// ──────────────────────────────────────────────────────────────────────────
function Wordmark({ size = 22, color = MR.ink, accent = MR.primary }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: size, background: accent }} />
        <div style={{
          position: 'absolute', top: size * 0.22, left: '50%', transform: 'translateX(-50%)',
          width: size * 0.30, height: size * 0.60, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          background: '#fff',
        }} />
      </div>
      <div style={{ fontWeight: 800, fontSize: size * 0.82, letterSpacing: -0.4 }}>
        Milk<span style={{ color: accent }}>Route</span>
      </div>
    </div>
  );
}

Object.assign(window, {
  MR, Phone, ScreenHeader, BigButton, SyncBadge, OfflineBanner,
  Volume, MoneyBRL, Field, PhotoStripe, Avatar, Card, TabBar, Icon, Wordmark,
});

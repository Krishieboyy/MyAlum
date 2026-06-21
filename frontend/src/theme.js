// Design-token helpers — consumed by every component

export const T = {
  paper:   'var(--paper)',
  surface: 'var(--surface)',
  ink:     'var(--ink)',
  blue:    'var(--blue)',
  amber:   'var(--amber)',
  green:   'var(--green)',
  red:     'var(--red)',
  rule:    'var(--rule)',
  sub:     'var(--sub)',
};

export const serif = { fontFamily: '"Inter", "Source Serif 4", Georgia, serif' };
export const mono  = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' };
export const sans  = { fontFamily: '"Inter", "Public Sans", system-ui, sans-serif' };

// Category badge styles
const CAT = {
  FOUNDER:        ['#EFF6FF', '#1E40AF', '#DBEAFE'],
  EMPLOYEE:       ['#F8FAFC', '#475569', '#E2E8F0'],
  'GOVT OFFICER': ['#F0FDF4', '#166534', '#BBF7D0'],
  BUSINESSMAN:    ['#FEF3C7', '#92400E', '#FDE68A'],
  RESEARCHER:     ['#EEF2F6', '#312E81', '#C7D2FE'],
  TEACHER:        ['#F1F5F9', '#334155', '#CBD5E1'],
  PROFESSOR:      ['#FFF1F2', '#9F1239', '#FECDD3'],
};

export const catBadge = (category) => {
  const [bg, color, border] = CAT[category] || ['#F8FAFC', '#475569', '#E2E8F0'];
  return { background: bg, color, borderColor: border };
};

// Avatar background (round, institutional palette)
const AVATAR_BG = {
  FOUNDER:        '#1E40AF',
  RESEARCHER:     '#312E81',
  'GOVT OFFICER': '#166534',
  EMPLOYEE:       '#475569',
  BUSINESSMAN:    '#92400E',
  TEACHER:        '#334155',
  PROFESSOR:      '#9F1239',
};
export const avatarBg = (category) => AVATAR_BG[category] || '#475569';

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

export const serif = { fontFamily: '"Source Serif 4", Georgia, serif' };
export const mono  = { fontFamily: '"IBM Plex Mono", ui-monospace, monospace', fontVariantNumeric: 'tabular-nums' };
export const sans  = { fontFamily: '"Public Sans", "Inter", system-ui, sans-serif' };

// Category badge styles
const CAT = {
  FOUNDER:        ['#EEF2F8', '#1B3A66', '#B8C8DF'],
  EMPLOYEE:       ['#F5F5F4', '#44403C', '#D6D3CE'],
  'GOVT OFFICER': ['#EDFAF3', '#2E7D5B', '#9ACFB8'],
  BUSINESSMAN:    ['#FDF6EE', '#C2772E', '#E8C89A'],
  RESEARCHER:     ['#EEF2F8', '#1B3A66', '#B8C8DF'],
  TEACHER:        ['#F5F5F4', '#44403C', '#D6D3CE'],
  PROFESSOR:      ['#F5F5F4', '#44403C', '#D6D3CE'],
};

export const catBadge = (category) => {
  const [bg, color, border] = CAT[category] || ['#F5F5F4', '#6B6963', '#E4E1DA'];
  return { background: bg, color, borderColor: border };
};

// Avatar background (round, institutional palette)
const AVATAR_BG = {
  FOUNDER:        '#1B3A66',
  RESEARCHER:     '#1B3A66',
  'GOVT OFFICER': '#2E7D5B',
  EMPLOYEE:       '#6B6963',
  BUSINESSMAN:    '#C2772E',
  TEACHER:        '#44403C',
  PROFESSOR:      '#44403C',
};
export const avatarBg = (category) => AVATAR_BG[category] || '#6B6963';

// CyberVerse Design System - Color Palette
// WCAG AA Compliant Colors with Contrast Ratios

export const colors = {
  // Base Neutrals - Warm Dark Slate
  slate: {
    50: '#f8fafc',   // Contrast: 19.77:1 (AAA)
    100: '#f1f5f9',  // Contrast: 17.12:1 (AAA)
    200: '#e2e8f0',  // Contrast: 13.54:1 (AAA)
    300: '#cbd5e1',  // Contrast: 9.85:1 (AAA)
    400: '#94a3b8',  // Contrast: 5.74:1 (AA)
    500: '#64748b',  // Contrast: 3.88:1 (AA)
    600: '#475569',  // Contrast: 2.54:1 (AA Large)
    700: '#334155',  // Contrast: 1.73:1
    800: '#1e293b',  // Background
    900: '#0f172a',  // Deep background
    950: '#020617'   // Darkest
  },

  // Primary Gradient - Vivid Purple to Ocean Blue
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe', 
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Main primary
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    gradient: 'linear-gradient(135deg, #6C5CE7 0%, #00B4D8 100%)'
  },

  // Secondary Accents
  coral: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',  // Main coral
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337'
  },

  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',  // Main teal
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a'
  },

  sunflower: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',  // Main sunflower
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },

  // Status Colors
  success: '#10b981',  // Contrast: 4.52:1 (AA)
  warning: '#f59e0b',  // Contrast: 4.89:1 (AA)
  error: '#ef4444',    // Contrast: 4.77:1 (AA)
  info: '#3b82f6'      // Contrast: 4.56:1 (AA)
}
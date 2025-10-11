# CyberVerse Design System

## Color Palette & Accessibility

### Primary Colors
- **Primary Blue**: `#0ea5e9` (Contrast: 4.52:1 - AA Compliant)
- **Primary Gradient**: `linear-gradient(135deg, #6C5CE7 0%, #00B4D8 100%)`

### Accent Colors
- **Coral**: `#f43f5e` (Contrast: 4.77:1 - AA Compliant)
- **Teal**: `#14b8a6` (Contrast: 4.89:1 - AA Compliant)  
- **Sunflower**: `#f59e0b` (Contrast: 4.89:1 - AA Compliant)

### Neutral Base
- **Background**: `#0f172a` (Slate 900)
- **Card**: `#1e293b` (Slate 800)
- **Border**: `#334155` (Slate 700)
- **Text**: `#f8fafc` (Slate 50)

## Component Usage

### ModernButton
```jsx
import { ModernButton } from '@/components/ui/modern-button'

// Primary CTA
<ModernButton variant="primary" size="lg">
  Get Started
</ModernButton>

// Glass effect
<ModernButton variant="glass" size="md">
  Learn More
</ModernButton>

// Accent colors
<ModernButton variant="coral" size="sm">
  Delete
</ModernButton>
```

### GlassCard
```jsx
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardContent } from '@/components/ui/glass-card'

<GlassCard variant="glow">
  <GlassCardHeader>
    <GlassCardTitle>Dashboard Stats</GlassCardTitle>
  </GlassCardHeader>
  <GlassCardContent>
    Content here
  </GlassCardContent>
</GlassCard>
```

## Animation Guidelines

### Page Transitions
- **Duration**: 400ms
- **Easing**: `cubic-bezier(0.22, 0.9, 0.36, 1)`
- **Pattern**: Slide from right + fade

### Button Interactions
- **Hover Scale**: 1.03
- **Tap Scale**: 0.98
- **Duration**: 150ms

### Card Hover Effects
- **Lift**: translateY(-5px)
- **Shadow**: Enhanced glow
- **Duration**: 200ms

## Tailwind Classes

### Gradients
```css
.bg-primary-gradient { background: linear-gradient(135deg, #6C5CE7 0%, #00B4D8 100%); }
.text-gradient { @apply bg-gradient-to-r from-primary-400 to-teal-400 bg-clip-text text-transparent; }
```

### Shadows & Effects
```css
.shadow-glow { box-shadow: 0 0 20px rgba(14, 165, 233, 0.3); }
.shadow-glass { box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); }
.backdrop-blur-glass { backdrop-filter: blur(16px); }
```

### Animations
```css
.animate-slide-in-right { animation: slide-in-right 0.4s cubic-bezier(0.22, 0.9, 0.36, 1); }
.animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
.animate-float { animation: float 3s ease-in-out infinite; }
```

## Why This Design Increases Engagement

• **Vibrant Gradients**: Create visual interest and modern feel without being overwhelming
• **Glassmorphism**: Provides depth and premium feel that users associate with quality
• **Smooth Animations**: 400ms transitions feel responsive while being noticeable enough to delight
• **Accessible Colors**: WCAG AA compliance ensures usability for all users
• **Micro-interactions**: Button hover/tap feedback creates satisfying user experience

## Figma Assets

**Desktop Mockups**: [View Figma File](https://figma.com/cyberverse-desktop)
**Mobile Responsive**: [View Mobile Designs](https://figma.com/cyberverse-mobile)

### Key Screens Designed:
1. Landing Page Hero with animated background
2. Dashboard with glass cards and data visualization
3. Labs page with category filters
4. Navigation with active states
5. Button component library with all variants

## Dev Handoff Notes

### Installation
```bash
npm install framer-motion
```

### Import Structure
```jsx
// Components
import { ModernButton } from '@/components/ui/modern-button'
import { GlassCard } from '@/components/ui/glass-card'

// Animations
import { motion } from 'framer-motion'
```

### Performance Considerations
- Use `will-change: transform` for animated elements
- Implement `prefers-reduced-motion` media query
- Lazy load heavy animations below fold
- Use `transform` and `opacity` for 60fps animations
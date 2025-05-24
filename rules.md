# CA Professional Website - Development Rules & Standards

## 🎨 Theme & Styling Rules (CA-Specific)

### Professional Theme Management (MANDATORY)
- **ALL styling must be centralized** in the app-config.ts and theme service
- Create a professional color palette suitable for financial services
- **NO hardcoded colors, fonts, or spacing values** in components
- All theme changes must be possible from the central configuration
- Support for easy brand customization for different CA firms
- Maintain professional appearance across all pages

### Dark/Light Mode Support (MANDATORY)
- **EVERY page must support both dark and light modes**
- Implement automatic system preference detection
- Provide manual toggle option with persistent user preference
- All colors, backgrounds, and contrasts must work in both modes
- Professional icons and CA-specific imagery should have dark/light variants
- Maintain accessibility standards (WCAG AA) in both modes
- Ensure financial data remains clearly readable in both themes

### Professional Color System (CA-Specific)
```scss
// CA Professional theme structure
:root {
  // Professional Blue Palette (Trust & Reliability)
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #2563eb; // Main brand color
  --primary-600: #1d4ed8;
  --primary-900: #1e3a8a;

  // Professional Gray Palette (Sophistication)
  --secondary-50: #f8fafc;
  --secondary-100: #f1f5f9;
  --secondary-500: #64748b;
  --secondary-600: #475569;
  --secondary-900: #0f172a;

  // Accent Orange (Call-to-action)
  --accent-50: #fff7ed;
  --accent-500: #f37316;
  --accent-600: #ea580c;

  // Financial Status Colors
  --success-500: #10b981; // Profit/Positive
  --warning-500: #f59e0b; // Pending/Caution
  --error-500: #ef4444;   // Loss/Error

  // Semantic colors for CA website
  --background: var(--secondary-50);
  --surface: #ffffff;
  --text-primary: var(--secondary-900);
  --text-secondary: var(--secondary-600);
  --border: var(--secondary-200);
}

[data-theme="dark"] {
  --background: var(--secondary-900);
  --surface: #1e293b;
  --text-primary: var(--secondary-50);
  --text-secondary: var(--secondary-300);
  --border: var(--secondary-700);

  // Adjust financial colors for dark mode
  --success-500: #34d399;
  --warning-500: #fbbf24;
  --error-500: #f87171;
}
```

## 🎬 Professional Animation Standards (CA-Specific)

### Animation Quality Requirements for Financial Services
- **ALL interactions must be professionally animated** (buttons, hovers, transitions)
- Use smooth, trustworthy animations (no flashy or unprofessional effects)
- Implement consistent timing functions (ease-out, ease-in-out)
- Conservative animation durations: 150ms (quick), 300ms (normal), 500ms (slow)
- **Respect user's motion preferences** (`prefers-reduced-motion`)
- Animations should enhance trust and professionalism

### Required Animation Types for CA Website
1. **Page Transitions**: Smooth, professional navigation between pages
2. **Scroll Animations**: Subtle elements animate in as they enter viewport
3. **Hover Effects**: All interactive elements must have professional hover states
4. **Loading States**: Professional loading animations for financial data
5. **Form Interactions**: Smooth validation feedback and form transitions
6. **Status Feedback**: Clear success/error animations for financial operations
7. **Data Visualization**: Smooth chart and graph animations
8. **Service Cards**: Professional hover and selection animations

### Animation Implementation Rules
```css
/* Standard animation classes to implement */
.animate-fade-in {
  animation: fadeIn 300ms ease-out;
}

.animate-slide-up {
  animation: slideUp 400ms ease-out;
}

.animate-bounce-in {
  animation: bounceIn 500ms ease-out;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🏗️ Architecture Rules (MANDATORY)

### Modular Structure
- **ALL code must be modular and reusable**
- Create component libraries with consistent APIs
- Implement design system with reusable UI components
- Use dependency injection and service-oriented architecture
- No duplicate code - create shared utilities and helpers

### Configuration Management
```typescript
// Example centralized configuration
export const AppConfig = {
  theme: {
    name: 'default',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#f59e0b'
    },
    fonts: {
      primary: 'Inter, sans-serif',
      heading: 'Poppins, sans-serif'
    },
    animations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    }
  },
  features: {
    darkMode: true,
    animations: true,
    rtl: false
  },
  branding: {
    logo: '/assets/logo.svg',
    companyName: 'Company Name',
    tagline: 'Your tagline here'
  }
};
```

## 📱 Responsive Design Rules (MANDATORY)

### Breakpoint Standards
- Mobile-first approach ALWAYS
- Standard breakpoints: 640px, 768px, 1024px, 1280px, 1536px
- All components must work on all screen sizes
- Touch-friendly interfaces on mobile (minimum 44px touch targets)

### Performance Requirements
- **Page load time < 3 seconds**
- **First Contentful Paint < 1.5 seconds**
- Lighthouse score > 90 for Performance, Accessibility, SEO
- Lazy loading for images and components
- Code splitting and tree shaking

## 🎯 User Experience Rules (MANDATORY)

### Accessibility (WCAG AA Compliance)
- Proper heading hierarchy (h1-h6)
- Alt text for all images
- Keyboard navigation support
- Focus indicators visible
- Color contrast ratios met in both light/dark modes
- Screen reader compatibility

### Interaction Standards
- **Visual feedback for ALL user actions**
- Loading states for async operations
- Error handling with user-friendly messages
- Success confirmations for important actions
- Progressive disclosure for complex forms

## 🔧 Technical Implementation Rules

### CSS/Styling Rules
```scss
// Required structure for every project
styles/
├── abstracts/
│   ├── _variables.scss    // All variables here
│   ├── _mixins.scss      // Reusable mixins
│   └── _functions.scss   // Utility functions
├── base/
│   ├── _reset.scss       // CSS reset
│   ├── _typography.scss  // Font definitions
│   └── _animations.scss  // Animation keyframes
├── components/
│   └── _buttons.scss     // Component-specific styles
├── layout/
│   └── _grid.scss        // Layout systems
├── themes/
│   ├── _light.scss       // Light theme
│   ├── _dark.scss        // Dark theme
│   └── _theme-manager.scss // Theme switching logic
└── utilities/
    └── _helpers.scss     // Utility classes
```

### Component Standards
- Each component must support theme props
- Dark/light mode compatibility built-in
- Animation states included by default
- Proper TypeScript interfaces
- Comprehensive prop validation

### State Management
- Centralized theme state management
- User preference persistence
- Consistent state structure across projects

## 🚀 Animation Library Requirements

### Must-Have Animation Classes
```scss
// Entrance animations
.animate-fade-in-up { /* slide up while fading in */ }
.animate-fade-in-down { /* slide down while fading in */ }
.animate-fade-in-left { /* slide from left while fading in */ }
.animate-fade-in-right { /* slide from right while fading in */ }

// Hover animations
.hover-lift { /* subtle lift on hover */ }
.hover-glow { /* glow effect on hover */ }
.hover-scale { /* scale up slightly on hover */ }

// Loading animations
.animate-pulse { /* pulsing effect */ }
.animate-spin { /* spinning loader */ }
.animate-bounce { /* bouncing effect */ }

// Attention animations
.animate-shake { /* shake for errors */ }
.animate-heartbeat { /* heartbeat for likes */ }
.animate-wobble { /* wobble for notifications */ }
```

### Scroll-Triggered Animations
- Implement intersection observer for scroll animations
- Staggered animations for lists and grids
- Parallax effects where appropriate
- Smooth scrolling navigation

## 📋 Quality Checklist (MANDATORY)

### Before Any Release
- [ ] Theme can be changed from single configuration file
- [ ] Dark and light modes both fully functional
- [ ] All interactive elements have smooth animations
- [ ] Mobile responsive on all devices
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Performance audit passed (Lighthouse > 90)
- [ ] Cross-browser testing completed
- [ ] Animation performance tested (60fps)
- [ ] Theme switching works without page reload
- [ ] User preferences persist across sessions

### Code Quality Standards
- [ ] No hardcoded styling values
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Consistent naming conventions followed
- [ ] Components are reusable and well-documented
- [ ] TypeScript interfaces defined for all props
- [ ] Error boundaries implemented
- [ ] Loading states implemented for all async operations

## 🎨 Design System Requirements

### Color Palette Structure
```typescript
interface ColorPalette {
  primary: {
    50: string;    // Lightest
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;   // Base color
    600: string;
    700: string;
    800: string;
    900: string;   // Darkest
  };
  // Repeat for secondary, accent, neutral, etc.
}
```

### Typography Scale
```scss
// Required typography scale
$font-sizes: (
  'xs': 0.75rem,    // 12px
  'sm': 0.875rem,   // 14px
  'base': 1rem,     // 16px
  'lg': 1.125rem,   // 18px
  'xl': 1.25rem,    // 20px
  '2xl': 1.5rem,    // 24px
  '3xl': 1.875rem,  // 30px
  '4xl': 2.25rem,   // 36px
  '5xl': 3rem,      // 48px
  '6xl': 3.75rem,   // 60px
);
```

### Spacing System
```scss
// Required spacing scale (rem units)
$spacing: (
  '0': 0,
  '1': 0.25rem,   // 4px
  '2': 0.5rem,    // 8px
  '3': 0.75rem,   // 12px
  '4': 1rem,      // 16px
  '5': 1.25rem,   // 20px
  '6': 1.5rem,    // 24px
  '8': 2rem,      // 32px
  '10': 2.5rem,   // 40px
  '12': 3rem,     // 48px
  '16': 4rem,     // 64px
  '20': 5rem,     // 80px
  '24': 6rem,     // 96px
);
```

## ⚡ Performance & Optimization Rules

### Image Optimization
- All images must have WebP format support
- Lazy loading implemented for all images
- Proper sizing and responsive images
- SVG optimization for icons and illustrations

### Code Optimization
- Tree shaking enabled for production builds
- Bundle splitting for optimal loading
- Critical CSS inlined
- Unused CSS purging implemented

### Caching Strategy
- Service worker implementation for offline capability
- Browser caching headers properly configured
- CDN integration for static assets
- API response caching where appropriate

---

## 🔗 Integration Requirements

### Third-Party Integration Standards
- All integrations must support theme switching
- Dark/light mode compatibility verified
- Performance impact assessed and optimized
- Fallback mechanisms implemented

### Analytics & Monitoring
- Performance monitoring integrated
- User interaction tracking implemented
- Error tracking and reporting setup
- Accessibility monitoring enabled

---

**REMEMBER: These rules apply to EVERY project by default. You should never need to specify these requirements again - they are ALWAYS assumed to be included in any development task.**

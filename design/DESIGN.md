---
name: Match-Live Design System
colors:
  surface: '#fff8f7'
  surface-dim: '#e6d7d6'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ef'
  surface-container: '#faeae9'
  surface-container-high: '#f4e5e4'
  surface-container-highest: '#eedfde'
  on-surface: '#211a19'
  on-surface-variant: '#544342'
  inverse-surface: '#372e2e'
  inverse-on-surface: '#fdedec'
  outline: '#877272'
  outline-variant: '#d9c1c0'
  surface-tint: '#944748'
  primary: '#944748'
  on-primary: '#ffffff'
  primary-container: '#e88b8b'
  on-primary-container: '#672427'
  inverse-primary: '#ffb3b2'
  secondary: '#406652'
  on-secondary: '#ffffff'
  secondary-container: '#bfe9d0'
  on-secondary-container: '#446b56'
  tertiary: '#096c4b'
  on-tertiary: '#ffffff'
  tertiary-container: '#62b58f'
  on-tertiary-container: '#00442e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#ffb3b2'
  on-primary-fixed: '#3d050b'
  on-primary-fixed-variant: '#763032'
  secondary-fixed: '#c2ecd2'
  secondary-fixed-dim: '#a6d0b7'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#284e3b'
  tertiary-fixed: '#9ff4ca'
  tertiary-fixed-dim: '#84d7af'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f4efe8'
  on-background: '#211a19'
  surface-variant: '#eedfde'
  text-primary: '#1f1a17'
  text-muted: '#6f645c'
  surface-translucent: rgba(255, 255, 255, 0.86)
  surface-solid: '#ffffff'
  border-subtle: rgba(61, 40, 29, 0.12)
  accent-pink-dark: '#d4706f'
  secondary-green-dark: '#6a9a7e'
  success-base: '#158f68'
  success-soft: '#d5f5e8'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px
  container-max: 1280px
---

<design_system>
## Design System & Application Theme

When building or modifying components for this application, you must strictly adhere to the following design system.

### Typography
- **Primary Font**: `Plus Jakarta Sans`, sans-serif
- **Font Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

### Color Palette

#### Base Colors
- **Background**: `#f4efe8`
- **Text (Primary)**: `#1f1a17`
- **Text (Muted)**: `#6f645c`

#### Surface & Borders
- **Surface (Translucent)**: `rgba(255, 255, 255, 0.86)`
- **Surface (Strong/Solid)**: `#ffffff`
- **Border**: `rgba(61, 40, 29, 0.12)`

#### Accents & Highlights
- **Accent (Primary Pink)**: `#E88B8B`
- **Accent (Dark Pink)**: `#d4706f`
- **Secondary (Green)**: `#8FB8A0`
- **Secondary (Dark Green)**: `#6a9a7e`

#### Status Colors
- **Success (Base)**: `#158f68`
- **Success (Soft/Background)**: `#d5f5e8`

### Shadows
- **Soft Shadow**: `0 24px 60px rgba(49, 30, 19, 0.12)`
- **Card Shadow**: `0 18px 40px rgba(38, 24, 18, 0.14)`

### Border Radius
- **Extra Large (xl)**: `32px`
- **Large (lg)**: `34px`
- **Medium (md)**: `18px`
- **Pill (Fully rounded)**: `999px`

### Global Styling Notes
- The `body` element uses a subtle radial gradient background mixing the primary accent (`#E88B8B`) and secondary green (`#8FB8A0`) over the base background (`#f4efe8`).
- Buttons should have transparent backgrounds and no borders by default.
- Use smooth scrolling (`scroll-behavior: smooth`) across the HTML document.
- Antialiasing is enabled for crisp text rendering.
</design_system>

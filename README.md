# HabitHarbor 🌊

A delightful habit tracker web app built with Next.js, TypeScript, and CSS Modules. Track daily habits with smooth micro-interactions, beautiful streaks visualization, and insightful analytics.

## Features

- **Dashboard**: Quick overview of today's progress and active streaks
- **Habit Management**: Create, edit, and track multiple habits
- **Weekly Calendar**: Visual calendar grid showing completion history
- **Streak Tracking**: Active streaks, longest streaks, and freeze tokens
- **Analytics**: Activity heatmaps, completion rates, and productivity insights
- **Habit Templates**: One-click habit creation (Hydrate, Read, Run, Meditate, etc.)
- **Badges & Achievements**: Gamified progression system
- **Export/Import**: Backup and restore your data as JSON
- **Settings**: Theme (light/dark), display density, data management
- **No UI Libraries**: Pure CSS Modules + CSS variables for maximum control

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules + CSS Variables
- **State**: localStorage (source of truth)
- **Deployment**: Vercel-ready

## Data Model

### Habit

```typescript
interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  category: string;
  frequencyType: 'daily' | 'weekly';
  createdAt: number;
  updatedAt: number;
  streakFreezeTokens: number;
  currentStreak: number;
  longestStreak: number;
}
```

### HabitCheck

```typescript
interface HabitCheck {
  habitId: string;
  date: string; // ISO date YYYY-MM-DD
  completed: boolean;
  timestamp: number;
  notes?: string;
}
```

### AppState

```typescript
interface AppState {
  habits: Habit[];
  checks: HabitCheck[];
  badges: Badge[];
  settings: {
    theme: 'light' | 'dark' | 'system';
    density: 'compact' | 'normal' | 'spacious';
    notifications: boolean;
    weekStartDay: number;
    vibration: boolean;
  };
}
```

## Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Dashboard
│   ├── habits/
│   │   ├── page.tsx         # Habits list
│   │   ├── new/page.tsx     # Create habit
│   │   └── [id]/page.tsx    # Habit detail
│   ├── insights/page.tsx    # Analytics
│   ├── settings/page.tsx    # Settings & export/import
│   ├── badges/page.tsx      # Achievements
│   ├── style-guide/page.tsx # Design system
│   ├── components/page.tsx  # Component showcase
│   └── layout.tsx           # Root layout
├── components/
│   ├── blocks/              # Composite components
│   │   ├── WeeklyCalendar.tsx
│   │   ├── StreakCard.tsx
│   │   ├── HeatmapGrid.tsx
│   │   └── EmptyState.tsx
│   ├── ui/                  # Base components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Toast.tsx
│   ├── Navigation.tsx
│   └── Layout.tsx
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── storage.ts          # localStorage manager
│   ├── dates.ts            # Date utilities
│   ├── validators.ts       # Form validators
│   └── animations.css      # Animation keyframes
└── styles/
    ├── tokens.css          # Design tokens (colors, spacing, etc.)
    └── global.css          # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Deploy

Deploy to Vercel:

```bash
vercel
```

## How to Extend

### Add a New Habit Template

Edit `src/lib/storage.ts`:

```typescript
export const HABIT_TEMPLATES = [
  // ... existing templates
  {
    name: 'Yoga',
    description: 'Do 20 minutes of yoga',
    color: '#8b5cf6',
    icon: '🧘',
    category: 'Wellness',
    frequencyType: 'daily',
  },
];
```

### Add a New Badge

Edit `src/lib/storage.ts`:

```typescript
export const BADGE_TEMPLATES: Badge[] = [
  // ... existing badges
  {
    id: 'custom-badge',
    name: 'Custom Name',
    description: 'Unlock criteria',
    icon: '🎯',
    criteria: 'custom_criteria',
  },
];
```

### Create a New Page

1. Create a new folder in `src/app/`
2. Add `page.tsx`:

```typescript
'use client';

import { Container, Section } from '@/components/Layout';

export default function NewPage() {
  return (
    <Container>
      <Section title="Page Title">
        {/* Your content */}
      </Section>
    </Container>
  );
}
```

### Add a New Component

1. Create a component file in `src/components/` or `src/components/blocks/`
2. Add corresponding CSS Module
3. Import and use in pages

## Customization

### Colors & Tokens

Edit `src/styles/tokens.css` to customize the color palette, spacing, typography, and more.

### Fonts

Change font family in `tokens.css`:

```css
--font-family-base: 'Your Font', sans-serif;
```

### Dark Mode

Dark mode is automatically handled via CSS prefers-color-scheme. Customize in `tokens.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #...;
    /* ... */
  }
}
```

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers (iOS Safari, Chrome Android)

## Accessibility

- Keyboard accessible buttons and inputs
- Semantic HTML (buttons, links, labels)
- Focus visible states
- ARIA labels where appropriate
- Color contrast compliant

## Performance

- No external dependencies
- Static CSS modules
- localStorage caching
- Optimized images and fonts
- Code-split pages (Next.js)

## File Size

- Bundle: ~150KB (gzipped)
- CSS: ~45KB (gzipped)
- JS: ~105KB (gzipped)

## Future Enhancements

- [ ] Cloud sync (Firebase/Supabase)
- [ ] Mobile app (React Native)
- [ ] Sharing & challenges
- [ ] AI insights & recommendations
- [ ] Notifications
- [ ] Categories & tags
- [ ] Advanced filtering & search
- [ ] Dark mode improvements
- [ ] Customizable goal targets
- [ ] Social features

## License

MIT © 2026 HabitHarbor

## Support

For issues or feature requests, please create an issue on GitHub.

---

Made with ⛅ by HabitHarbor

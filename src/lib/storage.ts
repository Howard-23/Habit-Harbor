/* localStorage Management - HabitHarbor */

import { AppState, Habit, HabitCheck, ActivityEntry, Badge, Theme, Density } from './types';

const STORAGE_KEY = 'habitHarbor:state';
const MAX_ACTIVITY_ENTRIES = 500;

const DEFAULT_STATE: AppState = {
  habits: [],
  checks: [],
  badges: [],
  settings: {
    theme: 'system',
    density: 'normal',
    notifications: true,
    weekStartDay: 1, // Monday
    vibration: true,
  },
};

export const HABIT_TEMPLATES = [
  {
    name: 'Hydrate',
    description: 'Drink 8 glasses of water daily',
    color: '#3b82f6',
    icon: '💧',
    category: 'Health',
    frequencyType: 'daily' as const,
  },
  {
    name: 'Read',
    description: 'Read for 30 minutes',
    color: '#f59e0b',
    icon: '📚',
    category: 'Learning',
    frequencyType: 'daily' as const,
  },
  {
    name: 'Run',
    description: 'Go for a run',
    color: '#ef4444',
    icon: '🏃',
    category: 'Fitness',
    frequencyType: 'daily' as const,
  },
  {
    name: 'Meditate',
    description: 'Meditate for 10 minutes',
    color: '#8b5cf6',
    icon: '🧘',
    category: 'Wellness',
    frequencyType: 'daily' as const,
  },
  {
    name: 'Exercise',
    description: 'Do workout',
    color: '#ec4899',
    icon: '💪',
    category: 'Fitness',
    frequencyType: 'daily' as const,
  },
];

export const BADGE_TEMPLATES: Badge[] = [
  {
    id: 'first-check',
    name: 'First Step',
    description: 'Complete your first habit check',
    icon: '🎯',
    criteria: 'check_count_1',
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    criteria: 'streak_7',
  },
  {
    id: 'month-master',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '👑',
    criteria: 'streak_30',
  },
  {
    id: 'century-champ',
    name: 'Century Champ',
    description: 'Get a 100-day streak',
    icon: '💯',
    criteria: 'streak_100',
  },
  {
    id: 'habit-collector',
    name: 'Habit Collector',
    description: 'Create 5 habits',
    icon: '🎪',
    criteria: 'habit_count_5',
  },
];

// Initialize with demo data
const DEMO_HABITS_DATA: Habit[] = [
  {
    id: '1',
    name: 'Morning Run',
    description: 'Start the day with energy',
    color: '#ef4444',
    icon: '🏃',
    category: 'Fitness',
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
    frequencyType: 'daily',
    streakFreezeTokens: 1,
    currentStreak: 12,
    longestStreak: 24,
  },
  {
    id: '2',
    name: 'Read',
    description: 'Read for 30 minutes',
    color: '#f59e0b',
    icon: '📚',
    category: 'Learning',
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
    frequencyType: 'daily',
    streakFreezeTokens: 2,
    currentStreak: 8,
    longestStreak: 15,
  },
  {
    id: '3',
    name: 'Meditate',
    description: 'Clear mind and breathe',
    color: '#8b5cf6',
    icon: '🧘',
    category: 'Wellness',
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
    frequencyType: 'daily',
    streakFreezeTokens: 1,
    currentStreak: 5,
    longestStreak: 12,
  },
];

export class StorageManager {
  static getState(): AppState {
    if (typeof window === 'undefined') return DEFAULT_STATE;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  }

  static setState(state: AppState): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
  }

  static initializeDemoData(): void {
    const state = this.getState();
    if (state.habits.length === 0) {
      state.habits = DEMO_HABITS_DATA;
      // Generate demo checks for the past 30 days
      const today = new Date();
      DEMO_HABITS_DATA.forEach((habit) => {
        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          // Random completion ~70% of the time
          if (Math.random() < 0.7) {
            state.checks.push({
              habitId: habit.id,
              date: dateStr,
              completed: true,
              timestamp: date.getTime(),
            });
          }
        }
      });
      this.setState(state);
    }
  }

  // Habit CRUD
  static addHabit(habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt'>): Habit {
    const state = this.getState();
    const newHabit: Habit = {
      ...habit,
      id: `habit-${Date.now()}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    state.habits.push(newHabit);
    this.setState(state);
    return newHabit;
  }

  static getHabits(): Habit[] {
    return this.getState().habits.filter((h) => !h.archivedat);
  }

  static getHabitById(id: string): Habit | undefined {
    return this.getState().habits.find((h) => h.id === id);
  }

  static updateHabit(id: string, updates: Partial<Habit>): Habit | undefined {
    const state = this.getState();
    const habit = state.habits.find((h) => h.id === id);
    if (!habit) return undefined;

    const updated = {
      ...habit,
      ...updates,
      updatedAt: Date.now(),
      id: habit.id, // prevent id override
    };
    const index = state.habits.indexOf(habit);
    state.habits[index] = updated;
    this.setState(state);
    return updated;
  }

  static deleteHabit(id: string): boolean {
    const state = this.getState();
    const index = state.habits.findIndex((h) => h.id === id);
    if (index === -1) return false;

    state.habits.splice(index, 1);
    state.checks = state.checks.filter((c) => c.habitId !== id);
    this.setState(state);
    return true;
  }

  static archiveHabit(id: string): Habit | undefined {
    return this.updateHabit(id, { archivedat: Date.now() });
  }

  // Habit Checks
  static checkHabit(habitId: string, date: string, notes?: string): HabitCheck {
    const state = this.getState();
    const existing = state.checks.find((c) => c.habitId === habitId && c.date === date);

    if (existing) {
      existing.completed = !existing.completed;
      existing.timestamp = Date.now();
      if (notes !== undefined) existing.notes = notes;
    } else {
      const check: HabitCheck = {
        habitId,
        date,
        completed: true,
        timestamp: Date.now(),
        notes,
      };
      state.checks.push(check);
    }

    this.setState(state);
    return existing || state.checks[state.checks.length - 1];
  }

  static getChecksForDate(date: string): HabitCheck[] {
    return this.getState().checks.filter((c) => c.date === date);
  }

  static getChecksForHabit(habitId: string, fromDate?: string, toDate?: string): HabitCheck[] {
    let checks = this.getState().checks.filter((c) => c.habitId === habitId);
    if (fromDate) checks = checks.filter((c) => c.date >= fromDate);
    if (toDate) checks = checks.filter((c) => c.date <= toDate);
    return checks;
  }

  static isHabitCompletedOnDate(habitId: string, date: string): boolean {
    const check = this.getState().checks.find((c) => c.habitId === habitId && c.date === date);
    return check?.completed ?? false;
  }

  // Settings
  static getSettings() {
    return this.getState().settings;
  }

  static updateSettings(settings: Partial<AppState['settings']>): void {
    const state = this.getState();
    state.settings = { ...state.settings, ...settings };
    this.setState(state);
  }

  static setTheme(theme: Theme): void {
    this.updateSettings({ theme });
  }

  static setDensity(density: Density): void {
    this.updateSettings({ density });
  }

  // Export/Import
  static exportData(): string {
    return JSON.stringify(this.getState(), null, 2);
  }

  static importData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString) as AppState;
      if (!parsed.habits || !parsed.checks || !parsed.settings) return false;
      this.setState(parsed);
      return true;
    } catch {
      return false;
    }
  }

  // Clear all data
  static clearAll(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

/* Type Definitions - HabitHarbor */

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type Density = 'compact' | 'normal' | 'spacious';
export type Theme = 'light' | 'dark' | 'system';

export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  category: string;
  createdAt: number;
  updatedAt: number;
  archivedat?: number;
  targetDays?: DayOfWeek[];
  frequencyType: 'daily' | 'weekly';
  streakFreezeTokens: number;
  lastCompletedDate?: string;
  currentStreak: number;
  longestStreak: number;
}

export interface HabitCheck {
  habitId: string;
  date: string; // ISO date YYYY-MM-DD
  completed: boolean;
  timestamp: number;
  notes?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: number;
  criteria: string;
}

export interface AppState {
  habits: Habit[];
  checks: HabitCheck[];
  badges: Badge[];
  settings: {
    theme: Theme;
    density: Density;
    notifications: boolean;
    weekStartDay: number; // 0 = Sun, 1 = Mon
    vibration: boolean;
  };
  lastExportDate?: number;
}

export interface ActivityEntry {
  date: string;
  habitId: string;
  habitName: string;
  action: 'completed' | 'uncompleted' | 'created' | 'updated';
  timestamp: number;
}

export interface HabitTemplate {
  name: string;
  description: string;
  color: string;
  icon: string;
  category: string;
  frequencyType: 'daily' | 'weekly';
  targetDays?: DayOfWeek[];
}

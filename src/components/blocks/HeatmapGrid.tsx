'use client';

import { useState } from 'react';
import { HabitCheck } from '@/lib/types';
import { getLastNDays, formatDate } from '@/lib/dates';
import styles from './HeatmapGrid.module.css';

interface HeatmapGridProps {
  checks: HabitCheck[];
  title?: string;
  daysCount?: number;
}

export function HeatmapGrid({ checks, title, daysCount = 365 }: HeatmapGridProps) {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const days = getLastNDays(daysCount);

  const getLevel = (date: string): number => {
    const dayChecks = checks.filter((c) => c.date === date && c.completed).length;
    if (dayChecks === 0) return 0;
    if (dayChecks === 1) return 1;
    if (dayChecks === 2) return 2;
    if (dayChecks === 3) return 3;
    return 4;
  };

  const stats = {
    totalCompleted: checks.filter((c) => c.completed).length,
    currentStreak: calculateStreak(checks),
    bestDay: getMostProductiveDay(checks),
    completionRate: Math.round((checks.filter((c) => c.completed).length / checks.length) * 100),
  };

  return (
    <div className={styles.heatmap}>
      {title && <h3>{title}</h3>}

      <div className={styles.heatmapGrid}>
        {days.map((date) => {
          const level = getLevel(date);
          const completedCount = checks.filter((c) => c.date === date && c.completed).length;

          return (
            <div
              key={date}
              className={`${styles.heatmapCell} ${styles[`level${level}`]}`}
              onMouseEnter={() => setHoveredDate(date)}
              onMouseLeave={() => setHoveredDate(null)}
              title={`${formatDate(date)}: ${completedCount} completions`}
              role="button"
              aria-label={`${formatDate(date)}: ${completedCount} completions`}
            >
              {hoveredDate === date && (
                <div className={styles.tooltip}>
                  {formatDate(date)}: {completedCount} completed
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statValue}>{stats.totalCompleted}</div>
          <div className={styles.statLabel}>Total Completed</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{stats.currentStreak}</div>
          <div className={styles.statLabel}>Current Streak</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{stats.completionRate}%</div>
          <div className={styles.statLabel}>Completion Rate</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statValue}>{stats.bestDay}</div>
          <div className={styles.statLabel}>Best Day</div>
        </div>
      </div>
    </div>
  );
}

function calculateStreak(checks: HabitCheck[]): number {
  const completedDates = checks
    .filter((c) => c.completed)
    .map((c) => c.date)
    .sort()
    .reverse();

  if (completedDates.length === 0) return 0;

  let streak = 1;
  for (let i = 1; i < completedDates.length; i++) {
    const date1 = new Date(completedDates[i - 1]);
    const date2 = new Date(completedDates[i]);
    const diffDays = Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function getMostProductiveDay(checks: HabitCheck[]): string {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayCounts = Array(7).fill(0);

  checks.forEach((check) => {
    if (check.completed) {
      const date = new Date(check.date);
      dayCounts[date.getDay()]++;
    }
  });

  const maxCount = Math.max(...dayCounts);
  const bestDayIndex = dayCounts.indexOf(maxCount);
  return dayNames[bestDayIndex];
}

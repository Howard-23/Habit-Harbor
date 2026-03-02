'use client';

import { HabitCheck } from '@/lib/types';
import { getToday, getDayName, formatDate, getDateString } from '@/lib/dates';
import styles from './WeeklyCalendar.module.css';

interface WeeklyCalendarProps {
  checks: HabitCheck[];
  onToggleDate: (date: string) => void;
  title?: string;
  daysToShow?: number;
}

export function WeeklyCalendar({
  checks,
  onToggleDate,
  title,
  daysToShow = 35,
}: WeeklyCalendarProps) {
  const today = getToday();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (daysToShow - 1));

  const days: string[] = [];
  for (let i = 0; i < daysToShow; i++) {
    days.push(getDateString(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isCheckCompleted = (date: string) => {
    return checks.some((c) => c.date === date && c.completed);
  };

  const daysInWeeks = [];
  for (let i = 0; i < days.length; i += 7) {
    daysInWeeks.push(days.slice(i, i + 7));
  }

  return (
    <div>
      {title && <h3 style={{ marginBottom: 'var(--spacing-4)' }}>{title}</h3>}
      <div className={styles.table}>
        {/* Day headers */}
        {dayLabels.map((label) => (
          <div key={label} className={styles.dayHeader}>
            {label}
          </div>
        ))}

        {/* Day cells */}
        {days.map((date) => {
          const completed = isCheckCompleted(date);
          const isToday = date === today;

          return (
            <button
              key={date}
              className={`${styles.dayCell} ${
                completed ? styles.completed : ''
              } ${isToday ? styles.today : ''}`}
              onClick={() => onToggleDate(date)}
              title={formatDate(date, 'long')}
              aria-label={`${formatDate(date)}: ${completed ? 'completed' : 'not completed'}`}
            >
              <span className={styles.dateNum}>{date.split('-')[2]}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendSuccess}`}></div>
          <span>Completed</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendBox} ${styles.legendToday}`}></div>
          <span>Today</span>
        </div>
        <div className={styles.legendItem}>
          <div className={styles.legendBox}></div>
          <span>Not completed</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import styles from './StreakCard.module.css';

interface StreakCardProps {
  habitName: string;
  habitIcon: string;
  currentStreak: number;
  longestStreak: number;
  streakFreezeTokens: number;
}

export function StreakCard({
  habitName,
  habitIcon,
  currentStreak,
  longestStreak,
  streakFreezeTokens,
}: StreakCardProps) {
  return (
    <div className={styles.streakCard}>
      <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-2)' }}>{habitIcon}</div>
      <div className={styles.streakLabel}>{habitName}</div>
      <div className={styles.streakNumber}>
        <span className={styles.fire}>🔥</span>
        {currentStreak}
      </div>
      <div className={styles.streakMeta}>
        <div>Best: {longestStreak} days</div>
        <div style={{ marginTop: 'var(--spacing-2)' }}>
          {Array.from({ length: streakFreezeTokens }).map((_, i) => (
            <span key={i} className={styles.tokenBadge} title="Streak Freeze Token">
              ❄️
            </span>
          ))}
          {streakFreezeTokens === 0 && <span className={styles.tokenBadge}>No freezes</span>}
        </div>
      </div>
    </div>
  );
}

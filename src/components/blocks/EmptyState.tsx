'use client';

import { ReactNode } from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  emoji?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: Array<{ label: string; onClick: () => void }>;
}

export function EmptyState({
  emoji = '📭',
  title,
  description,
  children,
  actions,
}: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {children}
      {actions && (
        <div className={styles.actions}>
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              style={{
                padding: 'var(--spacing-2) var(--spacing-4)',
                borderRadius: 'var(--radius-md)',
                border: '2px solid var(--color-primary)',
                color: 'var(--color-primary)',
                background: 'transparent',
                cursor: 'pointer',
                fontWeight: 'var(--font-weight-medium)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

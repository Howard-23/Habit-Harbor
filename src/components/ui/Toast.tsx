'use client';

import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: { label: string; callback: () => void };
  onClose?: () => void;
}

const typeIcons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export function Toast({
  message,
  description,
  type = 'info',
  duration = 5000,
  action,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.icon}>{typeIcons[type]}</span>
      <div className={styles.content}>
        <div className={styles.message}>{message}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
      {action && (
        <button
          className={styles.action}
          onClick={() => {
            action.callback();
            setIsVisible(false);
            onClose?.();
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

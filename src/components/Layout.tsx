'use client';

import { ReactNode } from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: LayoutProps) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}

export function Section({ children, title, className = '' }: LayoutProps & { title?: string }) {
  return (
    <section className={`${styles.section} ${className}`}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      {children}
    </section>
  );
}

interface GridProps extends LayoutProps {
  columns?: 2 | 3 | 4;
}

export function Grid({ children, columns = 2, className = '' }: GridProps) {
  const gridClass = columns === 2 ? styles.grid2 : columns === 3 ? styles.grid3 : styles.grid4;
  return (
    <div className={`${styles.grid} ${gridClass} ${className}`}>{children}</div>
  );
}

export function Stack({ children, className = '' }: LayoutProps) {
  return <div className={`${styles.stack} ${className}`}>{children}</div>;
}

export function SpaceBetween({ children, className = '' }: LayoutProps) {
  return <div className={`${styles.spaceBetween} ${className}`}>{children}</div>;
}

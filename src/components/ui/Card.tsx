'use client';

import styles from './Card.module.css';

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  hasPadding?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  interactive = false,
  hasPadding = true,
  onClick,
}: CardProps) {
  const classNames = [
    styles.card,
    interactive && styles.interactive,
    hasPadding && styles.padding,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onClick={onClick} role={interactive ? 'button' : undefined}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: CardProps) {
  return <div className={`${styles.header} ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: CardProps) {
  return <h2 className={`${styles.title} ${className}`}>{children}</h2>;
}

interface CardBodyProps extends CardProps {
  style?: React.CSSProperties;
}

export function CardBody({ children, className = '', style }: CardBodyProps) {
  return <div className={`${styles.body} ${className}`} style={style}>{children}</div>;
}

export function CardFooter({ children, className = '' }: CardProps) {
  return <div className={`${styles.footer} ${className}`}>{children}</div>;
}

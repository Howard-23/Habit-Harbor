'use client';

import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  isIconButton?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isIconButton = false,
  className,
  ...props
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    isFullWidth && styles.block,
    isIconButton && styles.icon,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <button className={classNames} {...props} />;
}

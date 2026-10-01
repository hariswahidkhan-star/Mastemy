import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, CommonProps {}

function classes(variant: ButtonVariant, size: ButtonSize, extra?: string) {
  return ['btn', `btn--${variant}`, `btn--${size}`, extra].filter(Boolean).join(' ');
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    className,
    children,
    disabled,
    type,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={classes(variant, size, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className="spinner spinner--inline" aria-hidden="true" /> : icon}
      <span>{children}</span>
    </button>
  );
});

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external,
  ...rest
}: CommonProps & {
  to: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
  'aria-label'?: string;
}) {
  if (external) {
    return (
      <a
        href={to}
        className={classes(variant, size, className)}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

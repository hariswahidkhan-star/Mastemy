import type { ReactNode } from 'react';
import { Button, ButtonLink } from './Button';

export function EmptyState({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: ReactNode;
  action?: { label: string; to?: string; onClick?: () => void };
  children?: ReactNode;
}) {
  return (
    <div className="empty">
      <div className="empty__mark" aria-hidden="true" />
      <h2 className="empty__title">{title}</h2>
      {description ? <p className="empty__desc">{description}</p> : null}
      {children}
      {action ? (
        action.to ? (
          <ButtonLink to={action.to} variant="secondary">
            {action.label}
          </ButtonLink>
        ) : (
          <Button variant="secondary" onClick={action.onClick}>
            {action.label}
          </Button>
        )
      ) : null}
    </div>
  );
}

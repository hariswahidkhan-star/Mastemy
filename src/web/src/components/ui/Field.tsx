import { cloneElement, forwardRef, isValidElement, useId } from 'react';
import type {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

interface FieldProps {
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  children: ReactElement<{ id?: string; 'aria-describedby'?: string; 'aria-invalid'?: boolean }>;
  className?: string;
}

/** Wraps a single control with an associated label, hint and error message. */
export function Field({ label, hint, error, required, children, className }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const control = isValidElement(children)
    ? cloneElement(children, {
        id: children.props.id ?? id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
      })
    : children;
  return (
    <div className={['field', error ? 'field--error' : '', className].filter(Boolean).join(' ')}>
      <label className="field__label" htmlFor={children.props.id ?? id}>
        {label}
        {required ? (
          <span className="field__req" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>
      {control}
      {hint ? (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...rest }, ref) {
    return <input ref={ref} className={['input', className].filter(Boolean).join(' ')} {...rest} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, rows = 4, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={['input', 'textarea', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
});

export interface SelectOption {
  value: string;
  label: string;
}

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { options: SelectOption[]; placeholder?: string }
>(function Select({ options, placeholder, className, ...rest }, ref) {
  return (
    <select
      ref={ref}
      className={['input', 'select', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
});

export const Checkbox = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label: ReactNode;
    hint?: ReactNode;
    error?: string;
  }
>(function Checkbox({ label, hint, error, className, id, ...rest }, ref) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={['check', className].filter(Boolean).join(' ')}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined}
        {...rest}
      />
      <label htmlFor={inputId}>
        {label}
        {hint ? (
          <span className="field__hint" id={`${inputId}-hint`}>
            {hint}
          </span>
        ) : null}
      </label>
      {error ? (
        <p className="field__error" id={`${inputId}-err`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});

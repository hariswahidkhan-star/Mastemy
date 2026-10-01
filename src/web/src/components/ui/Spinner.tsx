export function Spinner({ label, block }: { label: string; block?: boolean }) {
  return (
    <div className={block ? 'spinner-block' : 'spinner-wrap'} role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span className={block ? 'spinner__label' : 'visually-hidden'}>{label}</span>
    </div>
  );
}

import { useId, useRef } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

export interface TabDef {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

/** WAI-ARIA tabs with roving tabindex; arrow keys follow reading direction (RTL aware). */
export function Tabs({
  tabs,
  value,
  onChange,
  label,
}: {
  tabs: TabDef[];
  value: string;
  onChange: (id: string) => void;
  label: string;
}) {
  const baseId = useId();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const idx = tabs.findIndex((tab) => tab.id === value);
    if (idx < 0) return;
    const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
    let next: number;
    if (e.key === 'ArrowRight') next = rtl ? idx - 1 : idx + 1;
    else if (e.key === 'ArrowLeft') next = rtl ? idx + 1 : idx - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    else return;
    e.preventDefault();
    next = (next + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    refs.current[tabs[next].id]?.focus();
  };

  const active = tabs.find((tab) => tab.id === value) ?? tabs[0];
  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {tabs.map((tab) => {
          const selected = tab.id === active?.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className={selected ? 'tabs__tab tabs__tab--active' : 'tabs__tab'}
              onClick={() => onChange(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {active ? (
        <div
          className="tabs__panel"
          role="tabpanel"
          id={`${baseId}-panel-${active.id}`}
          aria-labelledby={`${baseId}-tab-${active.id}`}
          tabIndex={0}
        >
          {active.content}
        </div>
      ) : null}
    </div>
  );
}

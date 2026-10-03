import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { basicSetup } from 'codemirror';
import { sql, SQLite } from '@codemirror/lang-sql';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

/** Minimal CodeMirror 6 editor bound to a value. Recreated via a `key` on lab switch / reset by the parent. */
export function CodeEditor({
  value,
  onChange,
  ariaLabel,
  language = 'sql',
}: {
  value: string;
  onChange: (v: string) => void;
  ariaLabel: string;
  language?: 'sql' | 'javascript';
}) {
  const host = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!host.current) return;
    const view = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          language === 'javascript' ? javascript() : sql({ dialect: SQLite }),
          oneDark,
          EditorView.updateListener.of((u) => {
            if (u.docChanged) onChangeRef.current(u.state.doc.toString());
          }),
          EditorView.contentAttributes.of({ 'aria-label': ariaLabel }),
        ],
      }),
    });
    return () => view.destroy();
    // Mount once; the parent remounts this component (via key) to load new starter code.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="lab__editor" ref={host} />;
}

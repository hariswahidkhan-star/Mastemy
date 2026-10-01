import { screen } from '@testing-library/react';
import { ImportPreviewView } from '../pages/studio/ImportPanel';
import { renderWithProviders } from './utils';

describe('ImportPreviewView', () => {
  it('disables commit when any row has errors and offers the error report', () => {
    renderWithProviders(
      <ImportPreviewView
        preview={{
          batchId: 'b1',
          validCount: 1,
          errorCount: 1,
          rows: [
            { row: 2, externalId: 'Q-1', ok: true, errors: [] },
            {
              row: 3,
              externalId: 'Q-2',
              ok: false,
              errors: ['SingleChoice requires exactly one correct option'],
            },
          ],
        }}
        onCommit={vi.fn()}
        onDownloadErrors={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: /Import 1 questions/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Download error report' })).toBeEnabled();
    expect(
      screen.getByText('SingleChoice requires exactly one correct option'),
    ).toBeInTheDocument();
  });

  it('enables commit when every row is valid', () => {
    renderWithProviders(
      <ImportPreviewView
        preview={{
          batchId: 'b2',
          validCount: 2,
          errorCount: 0,
          rows: [
            { row: 2, externalId: 'Q-1', ok: true, errors: [] },
            { row: 3, externalId: 'Q-2', ok: true, errors: [] },
          ],
        }}
        onCommit={vi.fn()}
        onDownloadErrors={vi.fn()}
      />,
    );
    expect(screen.getByRole('button', { name: /Import 2 questions/ })).toBeEnabled();
    expect(screen.queryByRole('button', { name: 'Download error report' })).toBeNull();
  });
});

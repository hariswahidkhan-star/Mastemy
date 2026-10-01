import { screen } from '@testing-library/react';
import type { CourseDetailDto } from '../api/types';
import { CourseDetailView } from '../pages/public/CourseDetailPage';
import { renderWithProviders } from './utils';

const course: CourseDetailDto = {
  id: 'c1',
  slug: 'intro-ml',
  title: 'Introduction to Machine Learning',
  subtitle: 'Foundations',
  level: 'Beginner',
  language: 'en',
  description: 'A practical introduction.',
  audience: 'Analysts moving into ML.',
  prerequisites: 'Basic algebra',
  outcomes: ['Explain supervised learning'],
  modules: [
    {
      id: 'm1',
      title: 'Basics',
      lessons: [
        { id: 'l1', title: 'What is ML?', durationSeconds: 600, isPreview: true, hasVideo: true },
      ],
    },
  ],
  videoCount: 1,
  questionCount: 12,
  totalDurationSeconds: 600,
  instructors: [{ id: 'u1', displayName: 'Dr. Lina Haddad' }],
  packages: [
    {
      id: 'p1',
      title: 'Study pack',
      contents: 'Premium notes\n120 advanced MCQs',
      price: 19,
      currency: 'USD',
      accessDays: 365,
    },
  ],
  reviewedAt: '2026-09-01T00:00:00Z',
  ratingCount: 0,
};

describe('CourseDetailView', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValue(
          new Response('[]', { status: 200, headers: { 'Content-Type': 'application/json' } }),
        ),
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows the free-video notice and real counts', async () => {
    renderWithProviders(<CourseDetailView course={course} />);
    expect(
      screen.getByText(
        'All video lessons are free to watch on YouTube; paid packages cover Mastemy study services only.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Premium notes')).toBeInTheDocument();
    expect(screen.getByText('Access for 365 days')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start watching' })).toHaveAttribute(
      'href',
      '/learn/intro-ml/l1',
    );
    expect(await screen.findByText('No reviews yet.')).toBeInTheDocument();
  });
});

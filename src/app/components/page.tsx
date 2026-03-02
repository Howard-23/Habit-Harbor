'use client';

import Link from 'next/link';
import { Container, Section, Grid, Stack } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader, CardTitle  } from '@/components/ui/Card';
import { EmptyState } from '@/components/blocks/EmptyState';
import { WeeklyCalendar } from '@/components/blocks/WeeklyCalendar';
import { StreakCard } from '@/components/blocks/StreakCard';
import { HeatmapGrid } from '@/components/blocks/HeatmapGrid';

export default function ComponentsPage() {
  return (
    <Container>
      <Section title="Component Showcase">
        <p style={{ marginBottom: 'var(--spacing-6)', color: 'var(--text-secondary)' }}>
          Here's a preview of HabitHarbor's reusable components.
        </p>
      </Section>

      <Section title="Empty State">
        <Card><CardBody><EmptyState emoji="🎯" title="No habits" description="Get started by creating your first habit" /></CardBody></Card>
      </Section>

      <Section title="Streak Card">
        <Grid columns={2}>
          <StreakCard
            habitName="Morning Run"
            habitIcon="🏃"
            currentStreak={12}
            longestStreak={24}
            streakFreezeTokens={2}
          />
          <StreakCard
            habitName="Read"
            habitIcon="📚"
            currentStreak={8}
            longestStreak={15}
            streakFreezeTokens={1}
          />
        </Grid>
      </Section>

      <Section title="Weekly Calendar">
        <Card><CardBody>
          <WeeklyCalendar
            checks={[
              { habitId: '1', date: '2026-02-25', completed: true, timestamp: Date.now() },
              { habitId: '1', date: '2026-02-26', completed: true, timestamp: Date.now() },
              { habitId: '1', date: '2026-02-27', completed: false, timestamp: Date.now() },
              { habitId: '1', date: '2026-02-28', completed: true, timestamp: Date.now() },
              { habitId: '1', date: '2026-03-01', completed: true, timestamp: Date.now() },
              { habitId: '1', date: '2026-03-02', completed: true, timestamp: Date.now() },
            ]}
            onToggleDate={() => {}}
            title="Example Calendar"
          />
        </CardBody></Card>
      </Section>

      <Section title="Heatmap Grid">
        <Card><CardBody>
          <HeatmapGrid
            checks={[
              { habitId: '1', date: '2026-02-25', completed: true, timestamp: Date.now() },
              { habitId: '1', date: '2026-02-26', completed: true, timestamp: Date.now() },
              { habitId: '1', date: '2026-02-27', completed: true, timestamp: Date.now() },
              { habitId: '1', date: '2026-02-28', completed: true, timestamp: Date.now() },
            ]}
            daysCount={30}
          />
        </CardBody></Card>
      </Section>

      <Section>
        <Link href="/"><Button variant="secondary">Back to Dashboard</Button></Link>
      </Section>
    </Container>
  );
}

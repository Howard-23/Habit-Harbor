'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StorageManager } from '@/lib/storage';
import { Habit, HabitCheck } from '@/lib/types';
import { Container, Section, Grid, Stack } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { HeatmapGrid } from '@/components/blocks/HeatmapGrid';
import { EmptyState } from '@/components/blocks/EmptyState';

export default function InsightsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    StorageManager.initializeDemoData();
    const allHabits = StorageManager.getHabits();
    setHabits(allHabits);
    if (allHabits.length > 0) {
      setSelectedHabit(allHabits[0]);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <Container><div style={{ padding: 'var(--spacing-12)', textAlign: 'center' }}>Loading...</div></Container>;

  if (habits.length === 0) {
    return (
      <Container>
        <Section title="Insights">
          <EmptyState emoji="📊" title="No data yet" description="Create and complete habits to see your analytics" />
        </Section>
      </Container>
    );
  }

  const selectedChecks = selectedHabit
    ? StorageManager.getChecksForHabit(selectedHabit.id)
    : [];

  const stats = {
    totalCompleted: selectedChecks.filter((c) => c.completed).length,
    weeklyAverage: selectedChecks.filter((c) => c.completed).length / 4,
    completionRate: selectedChecks.length > 0
      ? Math.round((selectedChecks.filter((c) => c.completed).length / selectedChecks.length) * 100)
      : 0,
  };

  return (
    <Container>
      <Section title="Analytics & Insights">
        <div>
          <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--spacing-2)', display: 'block' }}>
            Select Habit
          </label>
          <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap', marginBottom: 'var(--spacing-4)' }}>
            {habits.map((h) => (
              <Button
                key={h.id}
                variant={selectedHabit?.id === h.id ? 'primary' : 'secondary'}
                onClick={() => setSelectedHabit(h)}
                size="sm"
              >
                {h.icon} {h.name}
              </Button>
            ))}
          </div>
        </div>
      </Section>

      {selectedHabit && (
        <>
          <Grid columns={3}>
            <Card><CardBody><div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 'var(--spacing-1)' }}>{stats.totalCompleted}</div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Total Completed</div></div></CardBody></Card>
            <Card><CardBody><div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 'var(--spacing-1)' }}>{stats.completionRate}%</div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Completion Rate</div></div></CardBody></Card>
            <Card><CardBody><div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 'var(--spacing-1)' }}>{stats.weeklyAverage.toFixed(1)}</div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Weekly Average</div></div></CardBody></Card>
          </Grid>

          <Section title="Activity Heatmap">
            <Card>
              <CardBody>
                <HeatmapGrid checks={selectedChecks} />
              </CardBody>
            </Card>
          </Section>
        </>
      )}

      <Section>
        <Link href="/">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </Section>
    </Container>
  );
}

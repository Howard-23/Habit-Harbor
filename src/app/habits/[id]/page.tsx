'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { StorageManager } from '@/lib/storage';
import { Habit, HabitCheck } from '@/lib/types';
import { Container, Section, Grid, SpaceBetween, Stack } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { EmptyState } from '@/components/blocks/EmptyState';
import { WeeklyCalendar } from '@/components/blocks/WeeklyCalendar';
import { StreakCard } from '@/components/blocks/StreakCard';
import { getToday } from '@/lib/dates';

export default function HabitDetailPage() {
  const router = useRouter();
  const params = useParams();
  const habitId = params.id as string;

  const [habit, setHabit] = useState<Habit | null>(null);
  const [checks, setChecks] = useState<HabitCheck[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const h = StorageManager.getHabitById(habitId);
    if (!h) {
      router.push('/habits');
      return;
    }

    const habitChecks = StorageManager.getChecksForHabit(habitId);
    setHabit(h);
    setChecks(habitChecks);
    setIsLoading(false);
  }, [habitId, router]);

  const handleToggleDate = (date: string) => {
    StorageManager.checkHabit(habitId, date);
    setChecks(StorageManager.getChecksForHabit(habitId));
    const updated = StorageManager.getHabitById(habitId);
    if (updated) setHabit(updated);
  };

  const handleDeleteHabit = () => {
    if (confirm('Delete this habit? This action cannot be undone.')) {
      StorageManager.deleteHabit(habitId);
      router.push('/habits');
    }
  };

  if (isLoading || !habit) return <Container><div style={{ padding: 'var(--spacing-12)', textAlign: 'center' }}>Loading...</div></Container>;

  const isCompletedToday = checks.some((c) => c.date === getToday() && c.completed);

  return (
    <Container>
      <Section>
        <SpaceBetween>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
            <div style={{ fontSize: '3rem' }}>{habit.icon}</div>
            <div>
              <h1>{habit.name}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>{habit.description}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            <Button variant="danger" onClick={handleDeleteHabit}>
              Delete
            </Button>
            <Button onClick={() => router.back()}>Back</Button>
          </div>
        </SpaceBetween>
      </Section>

      <Grid columns={2}>
        <StreakCard
          habitName={habit.name}
          habitIcon={habit.icon}
          currentStreak={habit.currentStreak}
          longestStreak={habit.longestStreak}
          streakFreezeTokens={habit.streakFreezeTokens}
        />

        <Card>
          <CardBody>
            <h3 style={{ marginBottom: 'var(--spacing-4)' }}>Today's Status</h3>
            <Button
              isFullWidth
              size="lg"
              variant={isCompletedToday ? 'success' : 'primary'}
              onClick={() => handleToggleDate(getToday())}
            >
              {isCompletedToday ? '✓ Completed Today' : '? Mark Complete'}
            </Button>
          </CardBody>
        </Card>
      </Grid>

      <Section title="Calendar (Last 35 Days)">
        <Card>
          <CardBody>
            <WeeklyCalendar checks={checks} onToggleDate={handleToggleDate} daysToShow={35} />
          </CardBody>
        </Card>
      </Section>

      <Section >
        <Button variant="secondary" onClick={() => router.back()}>
          Back to Habits
        </Button>
      </Section>
    </Container>
  );
}

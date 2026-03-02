'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StorageManager } from '@/lib/storage';
import { Habit, HabitCheck } from '@/lib/types';
import { Container, Section, Grid, SpaceBetween } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { StreakCard } from '@/components/blocks/StreakCard';
import { EmptyState } from '@/components/blocks/EmptyState';
import { getToday } from '@/lib/dates';

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [checks, setChecks] = useState<HabitCheck[]>([]);
  const [todayCompletions, setTodayCompletions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    StorageManager.initializeDemoData();
    const allHabits = StorageManager.getHabits();
    const allChecks = StorageManager.getState().checks;
    const today = getToday();
    const todayChecks = allChecks.filter((c) => c.date === today && c.completed).length;

    setHabits(allHabits);
    setChecks(allChecks);
    setTodayCompletions(todayChecks);
    setIsLoading(false);
  }, []);

  const handleCheckHabit = (habitId: string) => {
    const today = getToday();
    StorageManager.checkHabit(habitId, today);
    const updated = StorageManager.getState().checks;
    setChecks(updated);
    const todayChecks = updated.filter((c) => c.date === today && c.completed).length;
    setTodayCompletions(todayChecks);
  };

  if (isLoading) return <Container><div style={{ padding: 'var(--spacing-12)', textAlign: 'center' }}>Loading...</div></Container>;

  const stats = {
    totalHabits: habits.length,
    todayCompleted: todayCompletions,
    completionRate: habits.length > 0 ? Math.round((todayCompletions / habits.length) * 100) : 0,
    activeStreaks: habits.filter((h) => h.currentStreak > 0).length,
  };

  return (
    <Container>
      <Section title="Dashboard">
        <Grid columns={4}>
          <Card hasPadding={false}><CardBody><div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-2)' }}>{todayCompletions}/{stats.totalHabits}</div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Today's Progress</div></div></CardBody></Card>
          <Card hasPadding={false}><CardBody><div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-2)' }}>{stats.completionRate}%</div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Completion Rate</div></div></CardBody></Card>
          <Card hasPadding={false}><CardBody><div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-2)' }}>{stats.activeStreaks}</div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Active Streaks</div></div></CardBody></Card>
          <Card hasPadding={false}><CardBody><div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-2)' }}>{stats.totalHabits}</div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Total Habits</div></div></CardBody></Card>
        </Grid>
      </Section>

      <Section title="Today's Check-in">
        {habits.length === 0 ? (
          <EmptyState emoji="📋" title="No habits yet" description="Create your first habit to get started" />
        ) : (
          <Grid columns={2}>
            {habits.map((habit) => {
              const isCompleted = checks.some((c) => c.habitId === habit.id && c.date === getToday() && c.completed);
              return (
                <Card key={habit.id} interactive onClick={() => handleCheckHabit(habit.id)}>
                  <CardBody>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
                      <div style={{ fontSize: '2rem' }}>{habit.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>{habit.name}</div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{habit.description}</div>
                      </div>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: `3px solid ${isCompleted ? habit.color : 'var(--color-neutral-300)'}`, backgroundColor: isCompleted ? habit.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 'var(--font-size-xl)' }}>
                        {isCompleted && '✓'}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </Grid>
        )}
      </Section>

      {habits.length > 0 && (
        <Section title="Your Streaks">
          <Grid columns={2}>
            {habits.sort((a, b) => b.currentStreak - a.currentStreak).slice(0, 4).map((habit) => (
              <StreakCard
                key={habit.id}
                habitName={habit.name}
                habitIcon={habit.icon}
                currentStreak={habit.currentStreak}
                longestStreak={habit.longestStreak}
                streakFreezeTokens={habit.streakFreezeTokens}
              />
            ))}
          </Grid>
        </Section>
      )}

      <Section title="Quick Actions">
        <SpaceBetween>
          <Link href="/habits/new"><Button>+ New Habit</Button></Link>
          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            <Link href="/habits"><Button variant="secondary">View All</Button></Link>
            <Link href="/insights"><Button variant="secondary">Analytics</Button></Link>
          </div>
        </SpaceBetween>
      </Section>
    </Container>
  );
}

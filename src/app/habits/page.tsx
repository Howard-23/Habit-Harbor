'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StorageManager, HABIT_TEMPLATES } from '@/lib/storage';
import { Habit } from '@/lib/types';
import { Container, Section, Grid, SpaceBetween } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { EmptyState } from '@/components/blocks/EmptyState';

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);

  useEffect(() => {
    StorageManager.initializeDemoData();
    setHabits(StorageManager.getHabits());
    setIsLoading(false);
  }, []);

  const handleAddTemplate = (template: typeof HABIT_TEMPLATES[0]) => {
    const newHabit = StorageManager.addHabit({
      name: template.name,
      description: template.description,
      color: template.color,
      icon: template.icon,
      category: template.category,
      frequencyType: template.frequencyType,
      streakFreezeTokens: 0,
      currentStreak: 0,
      longestStreak: 0,
    });
    setHabits(StorageManager.getHabits());
    setShowTemplates(false);
  };

  if (isLoading) return <Container><div style={{ padding: 'var(--spacing-12)', textAlign: 'center' }}>Loading...</div></Container>;

  return (
    <Container>
      <Section title="My Habits">
        <SpaceBetween>
          <div></div>
          <Button onClick={() => setShowTemplates(!showTemplates)} variant={showTemplates ? 'secondary' : 'primary'}>
            {showTemplates ? 'Cancel' : '+ Quick Add'}
          </Button>
        </SpaceBetween>
      </Section>

      {showTemplates && (
        <Section title="Habit Templates">
          <Grid columns={3}>
            {HABIT_TEMPLATES.map((template) => (
              <Card key={template.name}>
                <CardBody>
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-2)' }}>{template.icon}</div>
                  <h4 style={{ marginBottom: 'var(--spacing-1)' }}>{template.name}</h4>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)' }}>{template.description}</p>
                  <Button size="sm" isFullWidth onClick={() => handleAddTemplate(template)}>Add</Button>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Section>
      )}

      <Section title="Active Habits" >
        {habits.length === 0 ? (
          <EmptyState emoji="🎯" title="No habits yet" description="Create a new habit to get started on your journey" />
        ) : (
          <Grid columns={2}>
            {habits.map((habit) => (
              <Link key={habit.id} href={`/habits/${habit.id}`}>
                <Card interactive>
                  <CardHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                      <span style={{ fontSize: '2rem' }}>{habit.icon}</span>
                      <CardTitle>{habit.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <p style={{ marginBottom: 'var(--spacing-3)' }}>{habit.description}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-2)' }}>
                      <div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Streak</div><div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold' }}>{habit.currentStreak}🔥</div></div>
                      <div><div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>Best</div><div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold' }}>{habit.longestStreak}</div></div>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </Grid>
        )}
      </Section>

      <Section>
        <SpaceBetween>
          <Link href="/"><Button variant="secondary">Back to Dashboard</Button></Link>
          <Link href="/habits/new"><Button>Create New Habit</Button></Link>
        </SpaceBetween>
      </Section>
    </Container>
  );
}

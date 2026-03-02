'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StorageManager, BADGE_TEMPLATES } from '@/lib/storage';
import { Habit } from '@/lib/types';
import { Container, Section, Grid } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { EmptyState } from '@/components/blocks/EmptyState';

export default function BadgesPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    StorageManager.initializeDemoData();
    const allHabits = StorageManager.getHabits();
    setHabits(allHabits);

    // Check which badges are earned
    const earned: string[] = [];
    const checks = StorageManager.getState().checks;

    // First check badge
    if (checks.length > 0) earned.push('first-check');

    // Streak badges
    allHabits.forEach((h) => {
      if (h.currentStreak >= 7) earned.push('week-warrior');
      if (h.currentStreak >= 30) earned.push('month-master');
      if (h.longestStreak >= 100) earned.push('century-champ');
    });

    // Habit collector
    if (allHabits.length >= 5) earned.push('habit-collector');

    setUnlockedBadges([...new Set(earned)]);
    setIsLoading(false);
  }, []);

  if (isLoading) return <Container><div style={{ padding: 'var(--spacing-12)', textAlign: 'center' }}>Loading...</div></Container>;

  return (
    <Container>
      <Section title="Achievements">
        {unlockedBadges.length === 0 ? (
          <EmptyState emoji="🏆" title="No badges yet" description="Complete your habits consistently to unlock badges" />
        ) : (
          <>
            <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: 'var(--font-size-lg)' }}>Unlocked ({unlockedBadges.length})</h3>
            <Grid columns={3}>
              {BADGE_TEMPLATES.filter((b) => unlockedBadges.includes(b.id)).map((badge) => (
                <Card key={badge.id}>
                  <CardBody style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-2)' }}>{badge.icon}</div>
                    <h4 style={{ marginBottom: 'var(--spacing-1)' }}>{badge.name}</h4>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{badge.description}</p>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </>
        )}

        <h3 style={{ marginBottom: 'var(--spacing-4)', marginTop: 'var(--spacing-8)', fontSize: 'var(--font-size-lg)' }}>
          Locked ({BADGE_TEMPLATES.length - unlockedBadges.length})
        </h3>
        <Grid columns={3}>
          {BADGE_TEMPLATES.filter((b) => !unlockedBadges.includes(b.id)).map((badge) => (
            <Card key={badge.id}>
              <CardBody style={{ textAlign: 'center', opacity: 0.5 }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-2)' }}>🔒</div>
                <h4 style={{ marginBottom: 'var(--spacing-1)' }}>{badge.name}</h4>
                <p style={{ fontSize: 'var(--font-size-sm)' }}>{badge.description}</p>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <Link href="/">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </Section>
    </Container>
  );
}

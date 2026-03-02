'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StorageManager } from '@/lib/storage';
import { validateHabitName } from '@/lib/validators';
import { Container, Section, Stack } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, ColorInput, Select } from '@/components/ui/Input';
import { Card, CardBody } from '@/components/ui/Card';

const ICONS = ['🏃', '📚', '🧘', '💪', '🏋️', '🚴', '🎯', '⚽', '🏊', '🤸', '💧', '🍎', '😴', '🧠'];
const CATEGORIES = [
  { value: 'health', label: 'Health' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'learning', label: 'Learning' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'social', label: 'Social' },
  { value: 'other', label: 'Other' },
];

export default function NewHabitPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(ICONS[0]);
  const [color, setColor] = useState('#6366f1');
  const [category, setCategory] = useState('health');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateHabitName(name);
    if (!validation.valid) {
      setError(validation.error || 'Invalid name');
      return;
    }

    setIsSubmitting(true);

    try {
      StorageManager.addHabit({
        name,
        description,
        icon,
        color,
        category,
        frequencyType: 'daily',
        streakFreezeTokens: 0,
        currentStreak: 0,
        longestStreak: 0,
      });

      router.push('/habits');
    } catch (err) {
      setError('Failed to create habit');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Section title="Create New Habit">
        <Card>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Stack>
                <Input
                  label="Habit Name"
                  placeholder="e.g., Morning Run"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={error}
                  required
                />

                <Textarea
                  label="Description"
                  placeholder="What's your reason for this habit?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div>
                  <label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--spacing-2)' }}>
                    Icon
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 'var(--spacing-2)' }}>
                    {ICONS.map((ico) => (
                      <button
                        key={ico}
                        type="button"
                        onClick={() => setIcon(ico)}
                        style={{
                          fontSize: '2rem',
                          padding: 'var(--spacing-2)',
                          border: `2px solid ${icon === ico ? 'var(--color-primary)' : 'var(--color-neutral-300)'}`,
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: icon === ico ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        {ico}
                      </button>
                    ))}
                  </div>
                </div>

                <ColorInput label="Color" value={color} onChange={(e) => setColor(e.target.value)} />

                <Select
                  label="Category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />

                <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                  <Button variant="secondary" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Habit'}
                  </Button>
                </div>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Section>
    </Container>
  );
}

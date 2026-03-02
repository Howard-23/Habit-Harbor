'use client';

import Link from 'next/link';
import { Container, Section, Grid, Stack } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input, Textarea, Select, ColorInput } from '@/components/ui/Input';

export default function StyleGuidePage() {
  return (
    <Container>
      <Section title="Design System & Component Library">
        <p style={{ marginBottom: 'var(--spacing-4)', color: 'var(--text-secondary)' }}>
          HabitHarbor uses a custom CSS-based design system with CSS variables for tokens.
        </p>
      </Section>

      <Section title="Colors">
        <Grid columns={4}>
          {[
            { name: 'Primary', value: 'var(--color-primary)' },
            { name: 'Success', value: 'var(--color-success)' },
            { name: 'Warning', value: 'var(--color-warning)' },
            { name: 'Error', value: 'var(--color-error)' },
          ].map((color) => (
            <Card key={color.name}>
              <CardBody>
                <div
                  style={{
                    width: '100%',
                    height: '100px',
                    backgroundColor: color.value,
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--spacing-2)',
                  }}
                />
                <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>{color.name}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>{color.value}</div>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section title="Buttons">
        <Grid columns={3}>
          <div>
            <h4 style={{ marginBottom: 'var(--spacing-3)' }}>Primary</h4>
            <Stack>
              <Button>Primary</Button>
              <Button disabled>Disabled</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </Stack>
          </div>

          <div>
            <h4 style={{ marginBottom: 'var(--spacing-3)' }}>Secondary</h4>
            <Stack>
              <Button variant="secondary">Secondary</Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
              <Button variant="secondary" size="sm">
                Small
              </Button>
              <Button variant="secondary" size="lg">
                Large
              </Button>
            </Stack>
          </div>

          <div>
            <h4 style={{ marginBottom: 'var(--spacing-3)' }}>Danger</h4>
            <Stack>
              <Button variant="danger">Delete</Button>
              <Button variant="success">Success</Button>
              <Button variant="ghost">Ghost</Button>
              <Button isIconButton>⚙️</Button>
            </Stack>
          </div>
        </Grid>
      </Section>

      <Section title="Form Inputs">
        <Card>
          <CardBody>
            <Stack>
              <Input label="Text Input" placeholder="Enter text..." />
              <Textarea label="Textarea" placeholder="Multi-line text..." />
              <Select
                label="Select"
                options={[
                  { value: '1', label: 'Option 1' },
                  { value: '2', label: 'Option 2' },
                  { value: '3', label: 'Option 3' },
                ]}
              />
              <ColorInput label="Color Picker" />
              <Input label="With Error" error="This field has an error" />
            </Stack>
          </CardBody>
        </Card>
      </Section>

      <Section title="Cards">
        <Grid columns={2}>
          <Card interactive>
            <CardHeader>
              <CardTitle>Card with Header</CardTitle>
            </CardHeader>
            <CardBody>Card content goes here</CardBody>
          </Card>

          <Card>
            <CardBody>
              <h4 style={{ marginBottom: 'var(--spacing-2)' }}>Simple Card</h4>
              <p style={{ color: 'var(--text-secondary)' }}>Just a basic card with padding</p>
            </CardBody>
          </Card>
        </Grid>
      </Section>

      <Section title="Typography">
        <Stack>
          <div>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
          </div>
          <div>
            <p style={{ fontSize: 'var(--font-size-sm)' }}>Small text</p>
            <p>Regular text</p>
            <p style={{ fontSize: 'var(--font-size-lg)' }}>Large text</p>
            <p style={{ fontWeight: 'var(--font-weight-bold)' }}>Bold text</p>
          </div>
        </Stack>
      </Section>

      <Section title="Spacing Scale">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-4)' }}>
          {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((size) => (
            <div key={size}>
              <div
                style={{
                  width: '100%',
                  height: `var(--spacing-${size})`,
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: 'var(--spacing-2)',
                }}
              />
              <div style={{ fontSize: 'var(--font-size-sm)' }}>spacing-{size}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Link href="/">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </Section>
    </Container>
  );
}

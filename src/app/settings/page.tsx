'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { StorageManager } from '@/lib/storage';
import { Theme, Density } from '@/lib/types';
import { Container, Section, Stack } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Toast } from '@/components/ui/Toast';

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>('system');
  const [density, setDensity] = useState<Density>('normal');
  const [exportData, setExportData] = useState('');
  const [importInput, setImportInput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const settings = StorageManager.getSettings();
    setTheme(settings.theme);
    setDensity(settings.density);
    setIsLoading(false);
  }, []);

  const handleExport = () => {
    const data = StorageManager.exportData();
    setExportData(data);
  };

  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportData);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleImport = () => {
    if (StorageManager.importData(importInput)) {
      setImportSuccess(true);
      setImportInput('');
      setTimeout(() => setImportSuccess(false), 2000);
    }
  };

  const handleClearAll = () => {
    if (confirm('Clear all data? This action cannot be undone.')) {
      StorageManager.clearAll();
      window.location.reload();
    }
  };

  const handleApplyDensity = (d: Density) => {
    setDensity(d);
    StorageManager.setDensity(d);
    document.documentElement.setAttribute('data-density', d);
  };

  if (isLoading) return <Container><div style={{ padding: 'var(--spacing-12)', textAlign: 'center' }}>Loading...</div></Container>;

  return (
    <Container>
      {copySuccess && <Toast type="success" message="Copied to clipboard!" duration={2000} />}
      {importSuccess && <Toast type="success" message="Data imported successfully!" duration={2000} />}

      <Section title="Settings">
        <Stack>
          <Card>
            <CardBody>
              <h3 style={{ marginBottom: 'var(--spacing-4)' }}>Theme</h3>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                {(['light', 'dark', 'system'] as const).map((t) => (
                  <Button
                    key={t}
                    variant={theme === t ? 'primary' : 'secondary'}
                    onClick={() => {
                      setTheme(t);
                      StorageManager.setTheme(t);
                    }}
                    size="sm"
                  >
                    {t === 'light' && '☀️ Light'}
                    {t === 'dark' && '🌙 Dark'}
                    {t === 'system' && '🔄 System'}
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 style={{ marginBottom: 'var(--spacing-4)' }}>Display Density</h3>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                {(['compact', 'normal', 'spacious'] as const).map((d) => (
                  <Button
                    key={d}
                    variant={density === d ? 'primary' : 'secondary'}
                    onClick={() => handleApplyDensity(d)}
                    size="sm"
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 style={{ marginBottom: 'var(--spacing-4)' }}>Export Data</h3>
              <p style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                Download your habit data as JSON
              </p>
              <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
                <Button onClick={handleExport}>Generate Export</Button>
                {exportData && <Button variant="secondary" onClick={handleCopyExport}>Copy</Button>}
              </div>
              {exportData && (
                <textarea
                  readOnly
                  value={exportData}
                  style={{
                    width: '100%',
                    marginTop: 'var(--spacing-3)',
                    padding: 'var(--spacing-3)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-neutral-300)',
                    fontFamily: 'var(--font-family-mono)',
                    fontSize: 'var(--font-size-xs)',
                    minHeight: '200px',
                  }}
                />
              )}
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 style={{ marginBottom: 'var(--spacing-4)' }}>Import Data</h3>
              <p style={{ marginBottom: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                Restore data from a previous export
              </p>
              <textarea
                value={importInput}
                onChange={(e) => setImportInput(e.target.value)}
                placeholder="Paste your exported JSON here..."
                style={{
                  width: '100%',
                  marginBottom: 'var(--spacing-3)',
                  padding: 'var(--spacing-3)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-neutral-300)',
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: 'var(--font-size-xs)',
                  minHeight: '150px',
                }}
              />
              <Button onClick={handleImport} disabled={!importInput}>
                Import
              </Button>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 style={{ marginBottom: 'var(--spacing-4)' }}>Danger Zone</h3>
              <Button variant="danger" onClick={handleClearAll}>
                Clear All Data
              </Button>
            </CardBody>
          </Card>
        </Stack>
      </Section>

      <Section>
        <Link href="/"><Button variant="secondary">Back to Dashboard</Button></Link>
      </Section>
    </Container>
  );
}

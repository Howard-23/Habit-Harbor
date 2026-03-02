/* Date Utilities - HabitHarbor */

export function getToday(): string {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

export function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr + 'T00:00:00');
  date.setDate(date.getDate() + days);
  return getDateString(date);
}

export function subtractDays(dateStr: string, days: number): string {
  return addDays(dateStr, -days);
}

export function getDayOfWeek(dateStr: string): number {
  const date = new Date(dateStr + 'T00:00:00');
  return date.getDay();
}

export function getWeekRange(dateStr: string, weekStartDay: number = 1): [string, string] {
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : weekStartDay - day);

  const monday = new Date(date.setDate(diff));
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  return [getDateString(monday), getDateString(sunday)];
}

export function getMonthDates(year: number, month: number): string[] {
  const dates: string[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    dates.push(getDateString(date));
  }

  return dates;
}

export function formatDate(dateStr: string, format: 'short' | 'long' | 'relative' = 'short'): string {
  const date = new Date(dateStr + 'T00:00:00');

  if (format === 'long') {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  if (format === 'relative') {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayStr = getDateString(today);
    const yesterdayStr = getDateString(yesterday);
    const tomorrowStr = getDateString(tomorrow);

    if (dateStr === todayStr) return 'Today';
    if (dateStr === yesterdayStr) return 'Yesterday';
    if (dateStr === tomorrowStr) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  // short format
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export function getDayName(dayIndex: number): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayIndex];
}

export function isToday(dateStr: string): boolean {
  return dateStr === getToday();
}

export function isPastDate(dateStr: string): boolean {
  return dateStr < getToday();
}

export function isFutureDate(dateStr: string): boolean {
  return dateStr > getToday();
}

export function getDaysDifference(dateStr1: string, dateStr2: string): number {
  const date1 = new Date(dateStr1 + 'T00:00:00');
  const date2 = new Date(dateStr2 + 'T00:00:00');
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const sorted = [...dates].sort().reverse();
  let streak = 1;
  const today = getToday();

  if (sorted[0] !== today && sorted[0] !== subtractDays(today, 1)) {
    return 0; // streak broken if not consecutive to today or yesterday
  }

  for (let i = 1; i < sorted.length; i++) {
    const expectedDate = subtractDays(sorted[i - 1], 1);
    if (sorted[i] === expectedDate) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getConsecutiveDates(fromDate: string, toDate: string): string[] {
  const dates: string[] = [];
  let current = fromDate;

  while (current <= toDate) {
    dates.push(current);
    current = addDays(current, 1);
  }

  return dates;
}

export function getLastNDays(n: number): string[] {
  const dates: string[] = [];
  const today = getToday();

  for (let i = n - 1; i >= 0; i--) {
    dates.push(subtractDays(today, i));
  }

  return dates;
}

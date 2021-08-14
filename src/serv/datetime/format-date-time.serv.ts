import { format } from 'date-fns';

export function formatDateTime(d: Date) {
  return format(d, 'yyyy-MM-dd HH:mm');
}

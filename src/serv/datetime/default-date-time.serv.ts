import { format } from 'date-fns';

export function defaultDateTime() {
  const now = new Date();
  return format(now, 'yyyy-MM-dd HH:mm');
}

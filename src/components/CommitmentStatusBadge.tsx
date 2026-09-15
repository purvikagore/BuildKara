import { Badge } from './Badge';
import type { CommitmentStatus } from '../types';

const statusVariant: Record<CommitmentStatus, 'muted' | 'accent' | 'danger' | 'success' | 'warning'> = {
  'Not started': 'muted',
  'In progress': 'accent',
  Blocked: 'danger',
  Complete: 'success',
  Overdue: 'warning',
};

export function CommitmentStatusBadge({ status }: { status: CommitmentStatus }) {
  return <Badge variant={statusVariant[status]}>{status}</Badge>;
}

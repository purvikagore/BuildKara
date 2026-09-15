import type { Commitment, Milestone } from '../types';

export interface ProjectHealth {
  label: 'Healthy' | 'At risk' | 'Needs attention';
  completed: number;
  inProgress: number;
  blocked: number;
  overdue: number;
  total: number;
  nextMilestone?: Milestone;
}

export function computeProjectHealth(commitments: Commitment[], milestones: Milestone[]): ProjectHealth {
  const completed = commitments.filter((c) => c.status === 'Complete').length;
  const inProgress = commitments.filter((c) => c.status === 'In progress').length;
  const blocked = commitments.filter((c) => c.status === 'Blocked').length;
  const overdue = commitments.filter((c) => c.status === 'Overdue').length;
  const total = commitments.length;

  let label: ProjectHealth['label'] = 'Healthy';
  if (overdue > 0 || blocked > 1) label = 'Needs attention';
  else if (blocked > 0) label = 'At risk';

  const nextMilestone = milestones.find((m) => m.status !== 'complete');

  return { label, completed, inProgress, blocked, overdue, total, nextMilestone };
}

export function computeProjectProgress(milestones: Milestone[]): number {
  if (milestones.length === 0) return 0;
  const score = milestones.reduce((sum, m) => {
    if (m.status === 'complete') return sum + 1;
    if (m.status === 'in-progress') return sum + 0.5;
    return sum;
  }, 0);
  return Math.round((score / milestones.length) * 100);
}

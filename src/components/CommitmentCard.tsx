import { ExternalLink } from 'lucide-react';
import { Avatar } from './Avatar';
import { CommitmentStatusBadge } from './CommitmentStatusBadge';
import { getUser } from '../data/mockData';
import { useApp } from '../context/AppContext';
import type { Commitment, CommitmentStatus } from '../types';

const STATUS_OPTIONS: CommitmentStatus[] = ['Not started', 'In progress', 'Blocked'];

interface CommitmentCardProps {
  commitment: Commitment;
  onMarkComplete: (commitment: Commitment) => void;
}

export function CommitmentCard({ commitment, onMarkComplete }: CommitmentCardProps) {
  const { currentUserId, updateCommitmentStatus } = useApp();
  const owner = getUser(commitment.ownerId);
  const isOwner = commitment.ownerId === currentUserId;
  const isComplete = commitment.status === 'Complete';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{commitment.title}</h3>
          <p className="mt-1 text-sm text-slate-500">{commitment.description}</p>
        </div>
        <CommitmentStatusBadge status={commitment.status} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
        <div className="flex items-center gap-1.5">
          <Avatar user={owner} size="sm" />
          <span className="font-medium text-slate-700">{owner.name}</span>
        </div>
        <span>Due {new Date(commitment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
        <span>{commitment.expectedEffort}</span>
      </div>

      {commitment.evidence && (
        <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <p className="font-medium">✓ Proof attached · {commitment.evidence.type}</p>
          {commitment.evidence.url && (
            <a
              href={`https://${commitment.evidence.url.replace(/^https?:\/\//, '')}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-center gap-1 text-emerald-700 underline"
            >
              {commitment.evidence.url} <ExternalLink size={12} />
            </a>
          )}
          {commitment.evidence.description && (
            <p className="mt-1 text-emerald-700">{commitment.evidence.description}</p>
          )}
          {commitment.evidence.completedAt && (
            <p className="mt-1 text-xs text-emerald-600">
              Completed{' '}
              {new Date(commitment.evidence.completedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      )}

      {isOwner && !isComplete && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <select
            value={commitment.status === 'Overdue' ? 'In progress' : commitment.status}
            onChange={(e) => updateCommitmentStatus(commitment.id, e.target.value as CommitmentStatus)}
            className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 focus:border-indigo-400 focus:outline-none"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <button
            onClick={() => onMarkComplete(commitment)}
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
          >
            Mark complete
          </button>
        </div>
      )}
    </div>
  );
}

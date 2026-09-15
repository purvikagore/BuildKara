import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CommitmentCard } from '../components/CommitmentCard';
import { SubmitProofModal } from '../components/SubmitProofModal';
import { EmptyState } from '../components/EmptyState';
import type { Commitment } from '../types';

export function MyCommitmentsPage() {
  const { commitments, projects, currentUserId } = useApp();
  const [completingCommitment, setCompletingCommitment] = useState<Commitment | null>(null);

  const myCommitments = commitments.filter((c) => c.ownerId === currentUserId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">My Commitments</h1>
      <p className="mt-1 text-sm text-slate-500">Work you've committed to across your teams.</p>

      {myCommitments.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No commitments yet"
            description="Once you're accepted onto a team, your commitments will show up here."
          />
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {myCommitments.map((commitment) => {
            const project = projects.find((p) => p.id === commitment.projectId);
            return (
              <div key={commitment.id}>
                {project && (
                  <Link
                    to={`/projects/${project.id}`}
                    className="mb-1.5 inline-block text-xs font-medium text-indigo-600 hover:underline"
                  >
                    {project.name}
                  </Link>
                )}
                <CommitmentCard commitment={commitment} onMarkComplete={setCompletingCommitment} />
              </div>
            );
          })}
        </div>
      )}

      <SubmitProofModal commitment={completingCommitment} onClose={() => setCompletingCommitment(null)} />
    </div>
  );
}

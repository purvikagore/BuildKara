import { useState, type ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, Send } from 'lucide-react';
import { clsx } from 'clsx';
import { useApp } from '../context/AppContext';
import { getUser } from '../data/mockData';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { CommitmentCard } from '../components/CommitmentCard';
import { SubmitProofModal } from '../components/SubmitProofModal';
import { AddCommitmentModal } from '../components/AddCommitmentModal';
import { EmptyState } from '../components/EmptyState';
import { NotFoundPage } from './NotFoundPage';
import { computeProjectHealth, computeProjectProgress } from '../utils/projectHealth';
import type { Commitment, MilestoneStatus } from '../types';

const TABS = ['Overview', 'Commitments', 'Team', 'Chat'] as const;
type Tab = (typeof TABS)[number];

const milestoneIcon: Record<MilestoneStatus, ReactElement> = {
  complete: <CheckCircle2 className="text-emerald-500" size={18} />,
  'in-progress': <Circle className="text-indigo-500" size={18} fill="currentColor" fillOpacity={0.15} />,
  'not-started': <Circle className="text-slate-300" size={18} />,
};

export function TeamWorkspacePage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProject, getProblem, getCommitmentsForProject, sendTeamMessage } = useApp();
  const [tab, setTab] = useState<Tab>('Overview');
  const [completingCommitment, setCompletingCommitment] = useState<Commitment | null>(null);
  const [addCommitmentOpen, setAddCommitmentOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const project = projectId ? getProject(projectId) : undefined;
  if (!project) return <NotFoundPage />;

  const problem = getProblem(project.problemId);
  const projectCommitments = getCommitmentsForProject(project.id);
  const progress = computeProjectProgress(project.milestones);
  const health = computeProjectHealth(projectCommitments, project.milestones);

  const healthVariant = health.label === 'Healthy' ? 'success' : health.label === 'At risk' ? 'warning' : 'danger';

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{project.name}</h1>
          {problem && <p className="mt-1 text-sm text-slate-500">{problem.title}</p>}
        </div>
        <Badge variant="accent">{project.status}</Badge>
      </div>

      <p className="mt-3 max-w-2xl text-sm text-slate-600">{project.goal}</p>

      <div className="mt-4 flex items-center gap-3">
        <ProgressBar value={progress} className="max-w-xs" />
        <span className="text-sm font-medium text-slate-700">{progress}% complete</span>
      </div>

      <div className="mt-6 flex gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              'border-b-2 px-3 py-2.5 text-sm font-medium transition-colors',
              tab === t ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-sm font-semibold text-slate-900">Milestones</h2>
            <ol className="mt-3 space-y-3">
              {project.milestones.map((milestone, index) => (
                <li key={milestone.id} className="flex items-center gap-3">
                  {milestoneIcon[milestone.status]}
                  <span
                    className={clsx(
                      'flex-1 text-sm',
                      milestone.status === 'complete'
                        ? 'text-slate-400 line-through'
                        : 'font-medium text-slate-800',
                    )}
                  >
                    {index + 1}. {milestone.title}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-slate-400">
                    {milestone.status.replace('-', ' ')}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Project health</h2>
              <Badge variant={healthVariant}>{health.label}</Badge>
            </div>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
              <li>
                {health.completed} / {health.total} commitments completed
              </li>
              <li>{health.inProgress} in progress</li>
              <li>{health.blocked} blocked</li>
              <li>{health.overdue} overdue</li>
              {health.nextMilestone && (
                <li className="pt-1 font-medium text-slate-800">
                  Next milestone: {health.nextMilestone.title}
                  {health.nextMilestone.dueDate &&
                    ` — ${new Date(health.nextMilestone.dueDate).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}`}
                </li>
              )}
            </ul>
          </section>
        </div>
      )}

      {tab === 'Commitments' && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Team Commitments</h2>
              <p className="text-sm text-slate-500">Turn the project goal into clear, owned pieces of work.</p>
            </div>
            <Button size="sm" onClick={() => setAddCommitmentOpen(true)}>
              + Add commitment
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {projectCommitments.length === 0 ? (
              <EmptyState title="No commitments yet" description="Add the first piece of work for this goal." />
            ) : (
              projectCommitments.map((commitment) => (
                <CommitmentCard
                  key={commitment.id}
                  commitment={commitment}
                  onMarkComplete={setCompletingCommitment}
                />
              ))
            )}
          </div>
        </div>
      )}

      {tab === 'Team' && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.team.map((member) => {
            const user = getUser(member.userId);
            return (
              <div key={member.userId} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <Avatar user={user} size="lg" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{member.roleLabel}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'Chat' && (
        <div className="mt-6 flex h-[60vh] flex-col rounded-2xl border border-slate-200 bg-white">
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {project.teamChat.map((message) => {
              const sender = getUser(message.senderId);
              return (
                <div key={message.id} className="flex items-start gap-2">
                  <Avatar user={sender} size="sm" />
                  <div>
                    <p className="text-xs font-medium text-slate-500">{sender.name}</p>
                    <p className="mt-0.5 rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-800">
                      {message.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 border-t border-slate-100 p-4">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && draft.trim()) {
                  sendTeamMessage(project.id, draft.trim());
                  setDraft('');
                }
              }}
              placeholder="Write a message..."
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <Button
              size="sm"
              icon={<Send size={15} />}
              disabled={!draft.trim()}
              onClick={() => {
                if (!draft.trim()) return;
                sendTeamMessage(project.id, draft.trim());
                setDraft('');
              }}
            >
              Send
            </Button>
          </div>
        </div>
      )}

      <SubmitProofModal commitment={completingCommitment} onClose={() => setCompletingCommitment(null)} />
      <AddCommitmentModal project={project} open={addCommitmentOpen} onClose={() => setAddCommitmentOpen(false)} />
    </div>
  );
}

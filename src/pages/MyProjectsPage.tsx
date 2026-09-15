import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getUser } from '../data/mockData';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { EmptyState } from '../components/EmptyState';
import { computeProjectProgress } from '../utils/projectHealth';

export function MyProjectsPage() {
  const { projects, problems, applications, currentUserId } = useApp();

  const myProjects = projects.filter(
    (project) =>
      project.team.some((member) => member.userId === currentUserId) ||
      problems.find((p) => p.id === project.problemId)?.ownerId === currentUserId,
  );

  const pendingApplications = applications.filter(
    (a) => a.applicantId === currentUserId && a.status === 'pending',
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">My Projects</h1>
      <p className="mt-1 text-sm text-slate-500">Teams you're building with.</p>

      {myProjects.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No active projects yet"
            description="Apply to a problem you care about and get accepted onto a team to see it here."
          />
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {myProjects.map((project) => {
            const problem = problems.find((p) => p.id === project.problemId);
            const progress = computeProjectProgress(project.milestones);
            return (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-900">{project.name}</h3>
                  <Badge variant="accent">{project.status}</Badge>
                </div>
                {problem && <p className="mt-1 line-clamp-2 text-sm text-slate-500">{problem.summary}</p>}
                <div className="mt-4 flex items-center gap-3">
                  <ProgressBar value={progress} />
                  <span className="text-xs font-medium text-slate-500">{progress}%</span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                  <Users size={13} /> {project.team.length} members
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {pendingApplications.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-slate-900">Pending applications</h2>
          <div className="mt-3 space-y-3">
            {pendingApplications.map((application) => {
              const problem = problems.find((p) => p.id === application.problemId);
              const owner = problem ? getUser(problem.ownerId) : undefined;
              return (
                <Link
                  key={application.id}
                  to={`/problems/${application.problemId}`}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-indigo-300"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{problem?.title}</p>
                    <p className="text-xs text-slate-500">Owner: {owner?.name}</p>
                  </div>
                  <Badge variant="muted">Awaiting response</Badge>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

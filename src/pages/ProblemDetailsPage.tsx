import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bookmark, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getUser } from '../data/mockData';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { ApplicationModal } from '../components/ApplicationModal';
import { NotFoundPage } from './NotFoundPage';

export function ProblemDetailsPage() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { getProblem, toggleSaveProblem, getApplicationsForProblem, currentUserId } = useApp();
  const [applyOpen, setApplyOpen] = useState(false);

  const problem = problemId ? getProblem(problemId) : undefined;
  if (!problem) return <NotFoundPage />;

  const isOwner = problem.ownerId === currentUserId;
  const owner = getUser(problem.ownerId);
  const applications = getApplicationsForProblem(problem.id);
  const pendingApplications = applications.filter((a) => a.status === 'pending');
  const myApplication = applications.find((a) => a.applicantId === currentUserId);
  const alreadyOnTeam = problem.teamMemberIds.includes(currentUserId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="flex flex-wrap items-center gap-2">
        <Badge>{problem.category}</Badge>
        <Badge variant="accent">{problem.stage}</Badge>
      </div>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{problem.title}</h1>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <Avatar user={owner} />
        <span>
          Posted by <span className="font-medium text-slate-900">{owner.name}</span> · {owner.headline}
        </span>
      </div>

      {problem.projectId && (
        <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800">
          This project has an active team workspace.{' '}
          <Link to={`/projects/${problem.projectId}`} className="font-medium underline">
            View workspace →
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="space-y-8 md:col-span-2">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">The problem</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{problem.description}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Who experiences this?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{problem.whoExperiences}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">How is this solved today?</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
              {problem.currentSolutions.map((solution) => (
                <li key={solution}>{solution}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Evidence</h2>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="success">{problem.evidenceCount}</Badge>
            </div>
            <blockquote className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm italic text-slate-600">
              "{problem.evidenceQuote}"
            </blockquote>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Current stage</h2>
            <p className="mt-2 text-sm font-medium text-slate-700">{problem.stage}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">What we're looking for</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {problem.skillsNeeded.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Current team</h2>
            <p className="mt-1 text-sm text-slate-500">
              {problem.teamMemberIds.length} / {problem.teamSize} members
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {problem.teamMemberIds.map((id) => {
                const member = getUser(id);
                return (
                  <div key={id} className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pl-1 pr-3">
                    <Avatar user={member} size="sm" />
                    <span className="text-sm font-medium text-slate-700">{member.name}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {isOwner && pendingApplications.length > 0 && (
            <section className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {pendingApplications.length} people have applied to help
                  </p>
                  <p className="text-sm text-slate-500">Review their profiles and chat before accepting.</p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => navigate(`/problems/${problem.id}/applicants`)}>
                  Review applicants
                </Button>
              </div>
            </section>
          )}
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-5 md:sticky md:top-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Project commitment</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{problem.commitment}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Expected duration</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{problem.duration}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Team</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
              <Users size={14} /> {problem.teamMemberIds.length} / {problem.teamSize} members
            </p>
          </div>

          <div className="border-t border-slate-100 pt-4">
            {alreadyOnTeam ? (
              <Badge variant="success">You're on this team</Badge>
            ) : myApplication ? (
              <Badge variant="accent">
                {myApplication.status === 'pending'
                  ? 'Request sent · awaiting response'
                  : myApplication.status === 'accepted'
                    ? 'Accepted onto team'
                    : 'Application declined'}
              </Badge>
            ) : (
              <Button fullWidth onClick={() => setApplyOpen(true)}>
                I want to help
              </Button>
            )}
            <Button
              variant="ghost"
              fullWidth
              className="mt-2"
              icon={<Bookmark size={15} fill={problem.saved ? 'currentColor' : 'none'} />}
              onClick={() => toggleSaveProblem(problem.id)}
            >
              {problem.saved ? 'Saved' : 'Save problem'}
            </Button>
          </div>
        </aside>
      </div>

      <ApplicationModal problem={problem} open={applyOpen} onClose={() => setApplyOpen(false)} />
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Bookmark, Clock, Users } from 'lucide-react';
import { Badge } from './Badge';
import { Avatar } from './Avatar';
import type { Problem } from '../types';
import { getUser } from '../data/mockData';
import { useApp } from '../context/AppContext';

const stageVariant: Record<Problem['stage'], 'muted' | 'accent' | 'warning' | 'success'> = {
  Idea: 'muted',
  'Problem validated': 'accent',
  Building: 'warning',
  Launched: 'success',
};

export function ProblemCard({ problem }: { problem: Problem }) {
  const owner = getUser(problem.ownerId);
  const { toggleSaveProblem } = useApp();

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">{problem.category}</Badge>
          <Badge variant={stageVariant[problem.stage]}>{problem.stage}</Badge>
        </div>
        <button
          aria-label={problem.saved ? 'Unsave problem' : 'Save problem'}
          onClick={() => toggleSaveProblem(problem.id)}
          className="rounded-md p-1 text-slate-300 hover:text-indigo-600"
        >
          <Bookmark size={18} fill={problem.saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <Link to={`/problems/${problem.id}`} className="flex flex-1 flex-col">
        <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-700">
          {problem.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{problem.summary}</p>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <Avatar user={owner} size="sm" />
          <span>
            <span className="font-medium text-slate-700">{owner.name}</span> · {owner.headline}
          </span>
        </div>

        <div className="mt-3">
          <Badge variant="success">{problem.evidenceCount}</Badge>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {problem.skillsNeeded.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-1 items-end justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock size={13} /> {problem.commitment}
            </span>
            <span className="flex items-center gap-1">
              <Users size={13} /> {problem.teamMemberIds.length}/{problem.teamSize}
            </span>
          </div>
          <span className="font-medium text-slate-600">{problem.duration}</span>
        </div>
      </Link>

      <Link
        to={`/problems/${problem.id}`}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
      >
        View Problem
      </Link>
    </div>
  );
}

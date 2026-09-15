import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import type { Category } from '../types';

const CATEGORIES: Category[] = [
  'Education',
  'Healthcare',
  'AI',
  'Productivity',
  'Sustainability',
  'Developer Tools',
  'Research',
  'Other',
];

export function PostProblemPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState<Category>('Education');
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = title.trim().length > 0 && summary.trim().length > 0;

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <CheckCircle2 className="mb-3 text-emerald-500" size={40} />
        <h1 className="text-xl font-semibold text-slate-900">Problem posted</h1>
        <p className="mt-2 text-sm text-slate-500">
          This is a prototype, so your problem isn't saved permanently — but this is exactly how
          posting would feel.
        </p>
        <Button className="mt-6" onClick={() => navigate('/')}>
          Back to Discover
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Post a problem</h1>
      <p className="mt-1 text-sm text-slate-500">
        Describe a real problem worth solving so builders can find it.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Help commuters split rideshare costs fairly"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            placeholder="What is the problem, and who experiences it?"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={() => setSubmitted(true)} disabled={!canSubmit} fullWidth>
          Post problem
        </Button>
      </div>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProblemCard } from '../components/ProblemCard';
import { EmptyState } from '../components/EmptyState';
import { Badge } from '../components/Badge';
import type { Category, Stage } from '../types';

const categories: Category[] = [
  'Education',
  'Healthcare',
  'AI',
  'Productivity',
  'Sustainability',
  'Developer Tools',
  'Research',
  'Other',
];

const stages: Stage[] = ['Idea', 'Problem validated', 'Building', 'Launched'];

export function DiscoverPage() {
  const { problems } = useApp();
  const [query, setQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<Category[]>([]);
  const [activeStages, setActiveStages] = useState<Stage[]>([]);
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [openSpotsOnly, setOpenSpotsOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allSkills = useMemo(() => {
    const set = new Set<string>();
    problems.forEach((p) => p.skillsNeeded.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [problems]);

  const toggle = <T,>(list: T[], value: T, setter: (v: T[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return problems.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.skillsNeeded.some((s) => s.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q);
      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(p.category);
      const matchesStage = activeStages.length === 0 || activeStages.includes(p.stage);
      const matchesSkills =
        activeSkills.length === 0 || activeSkills.some((s) => p.skillsNeeded.includes(s));
      const matchesOpenSpots = !openSpotsOnly || p.teamMemberIds.length < p.teamSize;
      return matchesQuery && matchesCategory && matchesStage && matchesSkills && matchesOpenSpots;
    });
  }, [problems, query, activeCategories, activeStages, activeSkills, openSpotsOnly]);

  const activeFilterCount =
    activeCategories.length + activeStages.length + activeSkills.length + (openSpotsOnly ? 1 : 0);

  const clearFilters = () => {
    setActiveCategories([]);
    setActiveStages([]);
    setActiveSkills([]);
    setOpenSpotsOnly(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Find a problem worth building for.
        </h1>
        <p className="mt-3 text-base text-slate-500">
          Discover real problems posted by people who need help solving them. Find collaborators,
          form a team, and build something meaningful.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search problems, skills, or topics..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <button
          onClick={() => setFiltersOpen((v) => !v)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-indigo-600 px-1.5 py-0.5 text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {filtersOpen && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Filters</p>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-700"
              >
                <X size={13} /> Clear all
              </button>
            )}
          </div>

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggle(activeCategories, c, setActiveCategories)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeCategories.includes(c)
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                Validation status
              </p>
              <div className="flex flex-wrap gap-2">
                {stages.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggle(activeStages, s, setActiveStages)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeStages.includes(s)
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">Skills</p>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggle(activeSkills, s, setActiveSkills)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeSkills.includes(s)
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600 sm:col-span-2">
              <input
                type="checkbox"
                checked={openSpotsOnly}
                onChange={(e) => setOpenSpotsOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Only show problems with open team spots
            </label>
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {filtered.length} problem{filtered.length === 1 ? '' : 's'}
        </p>
        {activeFilterCount > 0 && <Badge variant="accent">{activeFilterCount} filters applied</Badge>}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No problems match your filters"
            description="Try adjusting your search or clearing some filters."
            action={
              <button
                onClick={clearFilters}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Clear filters
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  );
}

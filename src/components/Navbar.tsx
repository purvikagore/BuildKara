import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bell, Plus, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { Avatar } from './Avatar';
import { useApp } from '../context/AppContext';
import { getUser } from '../data/mockData';

const navItems = [
  { to: '/', label: 'Discover', end: true },
  { to: '/my-projects', label: 'My Projects', end: false },
  { to: '/my-commitments', label: 'My Commitments', end: false },
];

export function Navbar() {
  const { currentUserId } = useApp();
  const navigate = useNavigate();
  const currentUser = getUser(currentUserId);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 text-lg font-semibold tracking-tight text-slate-900">
          Build<span className="text-indigo-600">Together</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                clsx(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="w-40 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none lg:w-56"
            />
          </div>
          <button
            aria-label="Notifications"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            <Bell size={18} />
          </button>
          <button
            onClick={() => navigate('/post-problem')}
            className="hidden items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-indigo-700 sm:flex"
          >
            <Plus size={16} />
            Post a Problem
          </button>
          <button aria-label="My account" onClick={() => navigate('/my-projects')}>
            <Avatar user={currentUser} size="sm" />
          </button>
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              clsx(
                'shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100',
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

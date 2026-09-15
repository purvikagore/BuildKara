import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-slate-900">We couldn't find that page</h1>
      <p className="mt-2 text-sm text-slate-500">
        It may have moved, or the link might be out of date.
      </p>
      <Link to="/">
        <Button className="mt-6">Back to Discover</Button>
      </Link>
    </div>
  );
}

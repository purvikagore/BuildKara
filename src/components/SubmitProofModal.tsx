import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useApp } from '../context/AppContext';
import type { Commitment, EvidenceType } from '../types';

const EVIDENCE_TYPES: EvidenceType[] = [
  'GitHub PR',
  'GitHub commit',
  'Figma link',
  'Demo URL',
  'Document',
  'Screenshot',
  'File',
];

interface SubmitProofModalProps {
  commitment: Commitment | null;
  onClose: () => void;
}

export function SubmitProofModal({ commitment, onClose }: SubmitProofModalProps) {
  const { completeCommitment } = useApp();
  const [type, setType] = useState<EvidenceType>('GitHub PR');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [done, setDone] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setDone(false);
      setType('GitHub PR');
      setUrl('');
      setDescription('');
    }, 200);
  };

  const handleSubmit = () => {
    if (!commitment || !url.trim()) return;
    completeCommitment(commitment.id, { type, url: url.trim(), description: description.trim() || undefined });
    setDone(true);
  };

  return (
    <Modal open={!!commitment} onClose={handleClose} title={done ? undefined : 'Mark commitment complete'}>
      {done ? (
        <div className="flex flex-col items-center py-4 text-center">
          <CheckCircle2 className="mb-3 text-emerald-500" size={40} />
          <p className="text-lg font-semibold text-slate-900">Completed</p>
          <p className="mt-2 text-sm text-slate-500">Proof attached</p>
          <Button className="mt-6" onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Commitment</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{commitment?.title}</p>
          </div>

          <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
            Add evidence of your work.
          </p>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Evidence type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as EvidenceType)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {EVIDENCE_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Evidence URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="github.com/.../pull/42"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Description <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Added authentication endpoints and JWT-based session handling."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <Button onClick={handleSubmit} disabled={!url.trim()} fullWidth>
            Submit & Complete
          </Button>
        </div>
      )}
    </Modal>
  );
}

import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useApp } from '../context/AppContext';
import { getUser } from '../data/mockData';
import type { Project } from '../types';

interface AddCommitmentModalProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

export function AddCommitmentModal({ project, open, onClose }: AddCommitmentModalProps) {
  const { addCommitment } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ownerId, setOwnerId] = useState(project.team[0]?.userId ?? '');
  const [dueDate, setDueDate] = useState('');
  const [expectedEffort, setExpectedEffort] = useState('');

  const canSubmit = title.trim() && ownerId && dueDate;

  const handleClose = () => {
    onClose();
    setTitle('');
    setDescription('');
    setDueDate('');
    setExpectedEffort('');
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    addCommitment({
      projectId: project.id,
      title: title.trim(),
      description: description.trim(),
      ownerId,
      dueDate,
      status: 'Not started',
      expectedEffort: expectedEffort.trim() || '2 hours',
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Add commitment">
      <div className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Build authentication API"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            placeholder="What does this piece of work involve?"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Owner</label>
            <select
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {project.team.map((member) => (
                <option key={member.userId} value={member.userId}>
                  {getUser(member.userId).name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Due date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Expected effort</label>
          <input
            value={expectedEffort}
            onChange={(e) => setExpectedEffort(e.target.value)}
            placeholder="e.g. 5 hours"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <Button onClick={handleSubmit} disabled={!canSubmit} fullWidth>
          Add commitment
        </Button>
      </div>
    </Modal>
  );
}

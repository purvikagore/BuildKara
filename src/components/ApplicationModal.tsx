import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { useApp } from '../context/AppContext';
import type { Problem } from '../types';

const SKILL_OPTIONS = ['React', 'Node.js', 'Python', 'UX', 'ML', 'Research', 'Product'];
const AVAILABILITY_OPTIONS = ['2–4 hrs/week', '5–7 hrs/week', '8–10 hrs/week', '10+ hrs/week'];

interface ApplicationModalProps {
  problem: Problem;
  open: boolean;
  onClose: () => void;
}

export function ApplicationModal({ problem, open, onClose }: ApplicationModalProps) {
  const { submitApplication } = useApp();
  const [motivation, setMotivation] = useState('');
  const [contribution, setContribution] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [availability, setAvailability] = useState(AVAILABILITY_OPTIONS[1]);
  const [relevantWorkUrl, setRelevantWorkUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleSkill = (skill: string) => {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setMotivation('');
      setContribution('');
      setSkills([]);
      setAvailability(AVAILABILITY_OPTIONS[1]);
      setRelevantWorkUrl('');
    }, 200);
  };

  const canSubmit = motivation.trim().length > 0 && contribution.trim().length > 0 && skills.length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    submitApplication({
      problemId: problem.id,
      motivation,
      contribution,
      skills,
      availability,
      relevantWorkUrl: relevantWorkUrl.trim() || undefined,
    });
    setSubmitted(true);
  };

  return (
    <Modal open={open} onClose={handleClose} title={submitted ? undefined : 'Apply to help build this project'}>
      {submitted ? (
        <div className="flex flex-col items-center py-4 text-center">
          <CheckCircle2 className="mb-3 text-emerald-500" size={40} />
          <p className="text-lg font-semibold text-slate-900">Request sent</p>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            The project owner can review your profile and message you before deciding.
          </p>
          <Button className="mt-6" onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Why do you want to work on this problem?
            </label>
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              rows={3}
              placeholder="Share what draws you to this problem..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              What can you contribute?
            </label>
            <textarea
              value={contribution}
              onChange={(e) => setContribution(e.target.value)}
              rows={3}
              placeholder="Describe the skills or work you'd bring..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Relevant skills</label>
            <div className="flex flex-wrap gap-2">
              {SKILL_OPTIONS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    skills.includes(skill)
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Availability</label>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {AVAILABILITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Relevant work <span className="font-normal text-slate-400">(optional)</span>
            </label>
            <input
              value={relevantWorkUrl}
              onChange={(e) => setRelevantWorkUrl(e.target.value)}
              type="text"
              placeholder="github.com/you/project"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <Button onClick={handleSubmit} disabled={!canSubmit} fullWidth>
            Send Request
          </Button>
        </div>
      )}
    </Modal>
  );
}

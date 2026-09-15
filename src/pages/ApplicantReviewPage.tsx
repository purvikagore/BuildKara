import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getUser } from '../data/mockData';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { EmptyState } from '../components/EmptyState';
import { NotFoundPage } from './NotFoundPage';
import type { Application } from '../types';

export function ApplicantReviewPage() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const { getProblem, getApplicationsForProblem, acceptApplicant, declineApplicant } = useApp();
  const [confirming, setConfirming] = useState<Application | null>(null);

  const problem = problemId ? getProblem(problemId) : undefined;
  if (!problem) return <NotFoundPage />;

  const applications = getApplicationsForProblem(problem.id);

  const handleConfirmAccept = () => {
    if (!confirming) return;
    const project = acceptApplicant(confirming.id);
    setConfirming(null);
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Applicants</h1>
      <p className="mt-1 text-sm text-slate-500">
        Review people who want to help with <span className="font-medium text-slate-700">{problem.title}</span>.
      </p>

      {applications.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No applicants yet" description="Once builders apply, they'll show up here." />
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {applications.map((application) => {
            const applicant = getUser(application.applicantId);
            return (
              <div key={application.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Avatar user={applicant} size="lg" />
                    <div>
                      <p className="text-base font-semibold text-slate-900">{applicant.name}</p>
                      <p className="text-sm text-slate-500">{applicant.headline}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {application.skills.map((skill) => (
                          <Badge key={skill}>{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {application.status !== 'pending' && (
                      <Badge variant={application.status === 'accepted' ? 'success' : 'danger'}>
                        {application.status === 'accepted' ? 'Accepted' : 'Declined'}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500">
                  <span>{application.availability}</span>
                  {applicant.projectsCompleted !== undefined && (
                    <span className="font-medium text-slate-700">
                      {applicant.projectsCompleted} projects completed
                    </span>
                  )}
                </div>

                <blockquote className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm italic text-slate-600">
                  "{application.motivation}"
                </blockquote>

                {application.status === 'pending' && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={<MessageCircle size={15} />}
                      onClick={() => navigate(`/chat/${application.id}`)}
                    >
                      Chat
                    </Button>
                    <Button size="sm" onClick={() => setConfirming(application)}>
                      Accept
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => declineApplicant(application.id)}>
                      Decline
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Modal open={!!confirming} onClose={() => setConfirming(null)} title="Add to project team?">
        <p className="text-sm text-slate-600">
          Add {confirming ? getUser(confirming.applicantId).name : ''} to the project team?
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirming(null)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmAccept}>Accept</Button>
        </div>
      </Modal>
    </div>
  );
}

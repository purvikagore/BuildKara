import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getUser } from '../data/mockData';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { NotFoundPage } from './NotFoundPage';

export function ChatPage() {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const {
    getApplication,
    getProblem,
    getThreadForApplication,
    sendApplicationMessage,
    acceptApplicant,
    currentUserId,
  } = useApp();
  const [draft, setDraft] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const application = applicationId ? getApplication(applicationId) : undefined;
  if (!application) return <NotFoundPage />;

  const problem = getProblem(application.problemId);
  const thread = getThreadForApplication(application.id);
  const applicant = getUser(application.applicantId);
  const owner = problem ? getUser(problem.ownerId) : undefined;
  // In this prototype the signed-in demo user is the applicant; messages from
  // the owner's perspective are shown as the counterpart in the thread.
  const viewerIsApplicant = currentUserId === application.applicantId;

  const handleSend = () => {
    if (!draft.trim()) return;
    sendApplicationMessage(application.id, draft.trim());
    setDraft('');
  };

  const handleConfirmAccept = () => {
    const project = acceptApplicant(application.id);
    setConfirmOpen(false);
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        <div className="flex h-[70vh] flex-col rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">{problem?.title}</p>
              <p className="text-xs text-slate-500">
                {viewerIsApplicant ? owner?.name : applicant.name}
              </p>
            </div>
            {application.status === 'pending' && (
              <Button size="sm" onClick={() => setConfirmOpen(true)}>
                Accept {applicant.name.split(' ')[0]}
              </Button>
            )}
            {application.status === 'accepted' && <Badge variant="success">Accepted</Badge>}
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {thread?.messages.length ? (
              thread.messages.map((message) => {
                const isApplicantMessage = message.senderId === application.applicantId;
                const alignRight = viewerIsApplicant ? isApplicantMessage : !isApplicantMessage;
                return (
                  <div key={message.id} className={`flex ${alignRight ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                        alignRight ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="mt-8 text-center text-sm text-slate-400">
                No messages yet. Say hello to get the conversation started.
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-slate-100 p-4">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Write a message..."
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <Button size="sm" icon={<Send size={15} />} onClick={handleSend} disabled={!draft.trim()}>
              Send
            </Button>
          </div>
        </div>

        <aside className="h-fit space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <Avatar user={applicant} size="lg" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{applicant.name}</p>
              <p className="text-xs text-slate-500">{applicant.headline}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {application.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
          <p className="text-sm text-slate-600">{application.availability}</p>
          {applicant.projectsCompleted !== undefined && (
            <p className="text-sm font-medium text-slate-700">
              {applicant.projectsCompleted} projects completed
            </p>
          )}
        </aside>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Add to project team?">
        <p className="text-sm text-slate-600">Add {applicant.name} to the project team?</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirmAccept}>Accept</Button>
        </div>
      </Modal>
    </div>
  );
}

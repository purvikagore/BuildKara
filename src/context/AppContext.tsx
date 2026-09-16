import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  applications as seedApplications,
  chatThreads as seedChatThreads,
  commitments as seedCommitments,
  problems as seedProblems,
  projects as seedProjects,
  CURRENT_USER_ID,
} from '../data/mockData';
import type {
  Application,
  ChatMessage,
  ChatThread,
  Commitment,
  Evidence,
  Problem,
  Project,
} from '../types';

interface NewApplicationInput {
  problemId: string;
  motivation: string;
  contribution: string;
  skills: string[];
  availability: string;
  relevantWorkUrl?: string;
}

interface AppState {
  problems: Problem[];
  applications: Application[];
  chatThreads: ChatThread[];
  projects: Project[];
  commitments: Commitment[];
  currentUserId: string;
}

interface AppContextValue extends AppState {
  submitApplication: (input: NewApplicationInput) => Application;
  sendApplicationMessage: (applicationId: string, text: string) => void;
  sendTeamMessage: (projectId: string, text: string) => void;
  acceptApplicant: (applicationId: string) => Project;
  declineApplicant: (applicationId: string) => void;
  toggleSaveProblem: (problemId: string) => void;
  addCommitment: (commitment: Omit<Commitment, 'id'>) => void;
  completeCommitment: (commitmentId: string, evidence: Evidence) => void;
  updateCommitmentStatus: (commitmentId: string, status: Commitment['status']) => void;
  getProblem: (id: string) => Problem | undefined;
  getProject: (id: string) => Project | undefined;
  getApplication: (id: string) => Application | undefined;
  getApplicationsForProblem: (problemId: string) => Application[];
  getThreadForApplication: (applicationId: string) => ChatThread | undefined;
  getCommitmentsForProject: (projectId: string) => Commitment[];
  getProjectForProblem: (problemId: string) => Project | undefined;
}

const AppContext = createContext<AppContextValue | null>(null);

let idCounter = 1;
const nextId = (prefix: string) => `${prefix}-${Date.now()}-${idCounter++}`;

export function AppProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>(seedProblems);
  const [applications, setApplications] = useState<Application[]>(seedApplications);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(seedChatThreads);
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [commitments, setCommitments] = useState<Commitment[]>(seedCommitments);

  const submitApplication = (input: NewApplicationInput): Application => {
    const application: Application = {
      id: nextId('app'),
      problemId: input.problemId,
      applicantId: CURRENT_USER_ID,
      motivation: input.motivation,
      contribution: input.contribution,
      skills: input.skills,
      availability: input.availability,
      relevantWorkUrl: input.relevantWorkUrl,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    setApplications((prev) => [...prev, application]);
    setChatThreads((prev) => [
      ...prev,
      {
        id: nextId('chat'),
        applicationId: application.id,
        problemId: input.problemId,
        messages: [],
      },
    ]);
    return application;
  };

  const sendApplicationMessage = (applicationId: string, text: string) => {
    setChatThreads((prev) =>
      prev.map((thread) =>
        thread.applicationId === applicationId
          ? {
              ...thread,
              messages: [
                ...thread.messages,
                {
                  id: nextId('m'),
                  senderId: CURRENT_USER_ID,
                  text,
                  timestamp: new Date().toISOString(),
                } as ChatMessage,
              ],
            }
          : thread,
      ),
    );
  };

  const sendTeamMessage = (projectId: string, text: string) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              teamChat: [
                ...project.teamChat,
                {
                  id: nextId('tm'),
                  senderId: CURRENT_USER_ID,
                  text,
                  timestamp: new Date().toISOString(),
                } as ChatMessage,
              ],
            }
          : project,
      ),
    );
  };

  const acceptApplicant = (applicationId: string): Project => {
    const application = applications.find((a) => a.id === applicationId);
    if (!application) throw new Error('Application not found');

    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: 'accepted' } : a)),
    );

    const problem = problems.find((p) => p.id === application.problemId);
    let project = projects.find((p) => p.problemId === application.problemId);

    if (!project) {
      project = {
        id: nextId('proj'),
        problemId: application.problemId,
        name: problem?.title ?? 'New project',
        status: 'In progress',
        goal: problem?.summary ?? '',
        targetDate: '',
        milestones: [
          { id: nextId('ms'), title: 'Kickoff', status: 'complete' },
          { id: nextId('ms'), title: 'Build', status: 'not-started' },
          { id: nextId('ms'), title: 'Launch', status: 'not-started' },
        ],
        team: [{ userId: problem?.ownerId ?? '', roleLabel: 'Owner' }],
        teamChat: [],
      };
      setProjects((prev) => [...prev, project as Project]);
    }

    const finalProject = project;
    const alreadyOnTeam = finalProject.team.some((t) => t.userId === application.applicantId);
    if (!alreadyOnTeam) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === finalProject.id
            ? { ...p, team: [...p.team, { userId: application.applicantId, roleLabel: application.skills[0] ?? 'Contributor' }] }
            : p,
        ),
      );
    }

    setProblems((prev) =>
      prev.map((p) =>
        p.id === application.problemId
          ? {
              ...p,
              projectId: finalProject.id,
              teamMemberIds: p.teamMemberIds.includes(application.applicantId)
                ? p.teamMemberIds
                : [...p.teamMemberIds, application.applicantId],
            }
          : p,
      ),
    );

    const isFeaturedPurvikaFlow =
      application.applicantId === 'u-purvika' && application.problemId === 'p-llm-buddy';

    setCommitments((prev) => [
      ...prev,
      {
        id: nextId('c'),
        projectId: finalProject.id,
        title: isFeaturedPurvikaFlow ? 'Build authentication API' : `Get started on ${problem?.title ?? 'the project'}`,
        description: isFeaturedPurvikaFlow
          ? 'Implement authentication endpoints and session handling for the platform.'
          : application.contribution,
        ownerId: application.applicantId,
        dueDate: isFeaturedPurvikaFlow ? '2026-09-18' : '2026-09-25',
        status: isFeaturedPurvikaFlow ? 'In progress' : 'Not started',
        expectedEffort: isFeaturedPurvikaFlow ? '5 hours' : '4 hours',
      },
    ]);

    if (isFeaturedPurvikaFlow) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === finalProject.id
            ? {
                ...p,
                milestones: p.milestones.map((m) =>
                  m.title === 'Backend MVP' ? { ...m, status: 'in-progress' } : m,
                ),
              }
            : p,
        ),
      );
    }

    return finalProject;
  };

  const declineApplicant = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === applicationId ? { ...a, status: 'declined' } : a)),
    );
  };

  const toggleSaveProblem = (problemId: string) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === problemId ? { ...p, saved: !p.saved } : p)),
    );
  };

  const addCommitment = (commitment: Omit<Commitment, 'id'>) => {
    setCommitments((prev) => [...prev, { ...commitment, id: nextId('c') }]);
  };

  const completeCommitment = (commitmentId: string, evidence: Evidence) => {
    setCommitments((prev) =>
      prev.map((c) =>
        c.id === commitmentId
          ? {
              ...c,
              status: 'Complete',
              evidence: { ...evidence, completedAt: new Date().toISOString().slice(0, 10) },
            }
          : c,
      ),
    );

    const commitment = commitments.find((c) => c.id === commitmentId);
    if (commitment?.title === 'Build authentication API') {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === commitment.projectId
            ? {
                ...p,
                milestones: p.milestones.map((m) =>
                  m.title === 'Backend MVP' ? { ...m, status: 'complete' } : m,
                ),
              }
            : p,
        ),
      );
    }
  };

  const updateCommitmentStatus = (commitmentId: string, status: Commitment['status']) => {
    setCommitments((prev) => prev.map((c) => (c.id === commitmentId ? { ...c, status } : c)));
  };

  const value = useMemo<AppContextValue>(
    () => ({
      problems,
      applications,
      chatThreads,
      projects,
      commitments,
      currentUserId: CURRENT_USER_ID,
      submitApplication,
      sendApplicationMessage,
      sendTeamMessage,
      acceptApplicant,
      declineApplicant,
      toggleSaveProblem,
      addCommitment,
      completeCommitment,
      updateCommitmentStatus,
      getProblem: (id) => problems.find((p) => p.id === id),
      getProject: (id) => projects.find((p) => p.id === id),
      getApplication: (id) => applications.find((a) => a.id === id),
      getApplicationsForProblem: (problemId) =>
        applications.filter((a) => a.problemId === problemId),
      getThreadForApplication: (applicationId) =>
        chatThreads.find((t) => t.applicationId === applicationId),
      getCommitmentsForProject: (projectId) =>
        commitments.filter((c) => c.projectId === projectId),
      getProjectForProblem: (problemId) => projects.find((p) => p.problemId === problemId),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [problems, applications, chatThreads, projects, commitments],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

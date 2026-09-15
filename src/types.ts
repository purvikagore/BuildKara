export type Category =
  | 'Education'
  | 'Healthcare'
  | 'AI'
  | 'Productivity'
  | 'Sustainability'
  | 'Developer Tools'
  | 'Research'
  | 'Other';

export type Stage = 'Idea' | 'Problem validated' | 'Building' | 'Launched';

export type CommitmentStatus = 'Not started' | 'In progress' | 'Blocked' | 'Complete' | 'Overdue';

export type MilestoneStatus = 'complete' | 'in-progress' | 'not-started';

export type ApplicationStatus = 'pending' | 'accepted' | 'declined';

export type AvailabilityOption = '2–4 hrs/week' | '5–7 hrs/week' | '8–10 hrs/week' | '10+ hrs/week';

export type EvidenceType =
  | 'GitHub PR'
  | 'GitHub commit'
  | 'Figma link'
  | 'Demo URL'
  | 'Document'
  | 'Screenshot'
  | 'File';

export interface User {
  id: string;
  name: string;
  headline: string;
  skills: string[];
  availability?: string;
  projectsCompleted?: number;
  initials: string;
  colorClass: string;
}

export interface Problem {
  id: string;
  title: string;
  summary: string;
  description: string;
  whoExperiences: string;
  currentSolutions: string[];
  evidenceCount: string;
  evidenceQuote: string;
  category: Category;
  stage: Stage;
  ownerId: string;
  skillsNeeded: string[];
  commitment: string;
  duration: string;
  teamSize: number;
  teamMemberIds: string[];
  projectId?: string;
  createdAt: string;
  saved?: boolean;
}

export interface Application {
  id: string;
  problemId: string;
  applicantId: string;
  motivation: string;
  contribution: string;
  skills: string[];
  availability: string;
  relevantWorkUrl?: string;
  status: ApplicationStatus;
  submittedAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  applicationId: string;
  problemId: string;
  messages: ChatMessage[];
}

export interface Milestone {
  id: string;
  title: string;
  status: MilestoneStatus;
  dueDate?: string;
}

export interface Evidence {
  type: EvidenceType;
  url?: string;
  description?: string;
  completedAt?: string;
}

export interface Commitment {
  id: string;
  projectId: string;
  title: string;
  description: string;
  ownerId: string;
  dueDate: string;
  status: CommitmentStatus;
  expectedEffort: string;
  evidence?: Evidence;
}

export interface TeamMember {
  userId: string;
  roleLabel: string;
}

export interface Project {
  id: string;
  problemId: string;
  name: string;
  status: 'In progress' | 'Completed';
  goal: string;
  targetDate: string;
  milestones: Milestone[];
  team: TeamMember[];
  teamChat: ChatMessage[];
}

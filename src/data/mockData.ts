import type {
  Application,
  ChatThread,
  Commitment,
  Problem,
  Project,
  User,
} from '../types';

export const CURRENT_USER_ID = 'u-purvika';

export const users: User[] = [
  {
    id: 'u-ananya',
    name: 'Ananya Sharma',
    headline: 'Research student',
    skills: ['Research', 'Product'],
    initials: 'AS',
    colorClass: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'u-purvika',
    name: 'Purvika Gore',
    headline: 'Full-stack developer',
    skills: ['React', 'Node.js', 'Python'],
    availability: '5 hrs/week',
    projectsCompleted: 3,
    initials: 'PG',
    colorClass: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'u-priya',
    name: 'Priya Nair',
    headline: 'Product designer',
    skills: ['UX', 'Figma', 'Product'],
    initials: 'PN',
    colorClass: 'bg-pink-100 text-pink-700',
  },
  {
    id: 'u-meera',
    name: 'Meera Iyer',
    headline: 'UX designer & researcher',
    skills: ['UX', 'Research', 'Figma'],
    availability: '5–7 hrs/week',
    projectsCompleted: 2,
    initials: 'MI',
    colorClass: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'u-daniel',
    name: 'Daniel Cho',
    headline: 'Backend developer',
    skills: ['Node.js', 'Python', 'Databases'],
    availability: '8–10 hrs/week',
    projectsCompleted: 4,
    initials: 'DC',
    colorClass: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'u-kavita',
    name: 'Dr. Kavita Rao',
    headline: 'Geriatric care physician',
    skills: ['Healthcare', 'Research'],
    initials: 'KR',
    colorClass: 'bg-rose-100 text-rose-700',
  },
  {
    id: 'u-wei',
    name: 'Wei Zhang',
    headline: 'ML engineer',
    skills: ['ML', 'Python', 'Product'],
    initials: 'WZ',
    colorClass: 'bg-indigo-100 text-indigo-700',
  },
  {
    id: 'u-lucas',
    name: 'Lucas Meyer',
    headline: 'Sustainability consultant',
    skills: ['Research', 'Product'],
    initials: 'LM',
    colorClass: 'bg-teal-100 text-teal-700',
  },
  {
    id: 'u-sara',
    name: 'Sara Ahmed',
    headline: 'Product manager',
    skills: ['Product', 'Research'],
    initials: 'SA',
    colorClass: 'bg-orange-100 text-orange-700',
  },
  {
    id: 'u-tom',
    name: 'Tom Becker',
    headline: 'PhD researcher, Education',
    skills: ['Research'],
    initials: 'TB',
    colorClass: 'bg-cyan-100 text-cyan-700',
  },
  {
    id: 'u-grace',
    name: 'Grace Odhiambo',
    headline: 'Community organizer',
    skills: ['Product', 'Research'],
    initials: 'GO',
    colorClass: 'bg-lime-100 text-lime-700',
  },
];

export const getUser = (id: string): User =>
  users.find((u) => u.id === id) ?? users[0];

export const problems: Problem[] = [
  {
    id: 'p-llm-buddy',
    title: 'AI study assistant for homework and assignments',
    summary:
      'Students struggle to get step-by-step guidance on complex homework problems without just getting direct answers.',
    description:
      'Students often get stuck on complex assignments and homework problems. Generic AI tools either provide direct answers without explaining concepts or produce hallucinatory solutions. LLMBuddy helps students understand principles step-by-step.',
    whoExperiences: 'Students working on complex homework and assignments.',
    currentSolutions: [
      'ChatGPT',
      'Chegg',
      'Tutoring centers',
      'Office hours',
    ],
    evidenceCount: '15 students interviewed',
    evidenceQuote:
      "I don't want the answer copied for me, I want to understand how to solve it step-by-step.",
    category: 'AI',
    stage: 'Building',
    ownerId: 'u-ananya',
    skillsNeeded: ['Frontend', 'UX', 'Backend', 'LLMs'],
    commitment: '5 hrs/week',
    duration: '6 weeks',
    teamSize: 4,
    teamMemberIds: ['u-ananya', 'u-priya', 'u-purvika'],
    projectId: 'proj-llm-buddy',
    createdAt: '2026-08-05',
  },
  {
    id: 'p-medication-tracker',
    title: 'Medication reminders for elderly patients living alone',
    summary:
      'Elderly patients managing multiple prescriptions often miss doses or double up, with no simple way to track adherence.',
    description:
      'Many elderly patients living independently manage 4-8 medications with different schedules. Missed or duplicated doses are common and often go unnoticed until a health scare happens. Families want visibility without feeling like they are monitoring every move.',
    whoExperiences: 'Elderly patients living alone and their family caregivers.',
    currentSolutions: ['Pill organizers', 'Paper charts', 'Phone alarms'],
    evidenceCount: '10 caregivers interviewed',
    evidenceQuote:
      "My dad says he took his pills, but I can never be sure until something goes wrong.",
    category: 'Healthcare',
    stage: 'Problem validated',
    ownerId: 'u-kavita',
    skillsNeeded: ['Frontend', 'Mobile', 'Product'],
    commitment: '4 hrs/week',
    duration: '8 weeks',
    teamSize: 3,
    teamMemberIds: ['u-kavita'],
    createdAt: '2026-08-20',
  },
  {
    id: 'p-ai-study-buddy',
    title: 'AI study buddy for competitive exam prep',
    summary:
      'Students preparing for competitive exams lack an affordable way to get personalized practice and feedback.',
    description:
      'Coaching institutes are expensive and impersonal at scale. Students preparing for competitive exams need targeted practice on their weak areas, but most tools give generic question sets instead of adaptive feedback.',
    whoExperiences: 'Students preparing for competitive entrance exams.',
    currentSolutions: ['Coaching centers', 'YouTube', 'Static question banks'],
    evidenceCount: '20 students surveyed',
    evidenceQuote:
      "I spend hours redoing topics I've already mastered because I don't know what to skip.",
    category: 'AI',
    stage: 'Idea',
    ownerId: 'u-wei',
    skillsNeeded: ['ML', 'Backend', 'Product'],
    commitment: '6 hrs/week',
    duration: '10 weeks',
    teamSize: 5,
    teamMemberIds: ['u-wei'],
    createdAt: '2026-09-01',
  },
  {
    id: 'p-carbon-tracker',
    title: 'Carbon footprint tracker for small businesses',
    summary:
      'Small businesses want to reduce emissions but have no simple way to measure their footprint without hiring consultants.',
    description:
      'Sustainability reporting tools are built for large enterprises with dedicated teams. Small businesses that want to understand and reduce their carbon footprint are left with spreadsheets or expensive consultants.',
    whoExperiences: 'Owners and operators of small and medium businesses.',
    currentSolutions: ['Manual spreadsheets', 'Sustainability consultants', 'Nothing'],
    evidenceCount: '12 business owners interviewed',
    evidenceQuote:
      "We want to do better, but every tool assumes we have a sustainability team. We don't.",
    category: 'Sustainability',
    stage: 'Problem validated',
    ownerId: 'u-lucas',
    skillsNeeded: ['Frontend', 'Backend', 'Research'],
    commitment: '5 hrs/week',
    duration: '8 weeks',
    teamSize: 4,
    teamMemberIds: ['u-lucas'],
    createdAt: '2026-08-15',
  },
  {
    id: 'p-focus-mode',
    title: 'Focus mode for remote teams',
    summary:
      'Remote teams struggle to protect deep work time amid constant meetings and notifications.',
    description:
      'Remote and hybrid teams default to over-scheduling meetings, leaving little room for focused work. Existing calendar tools optimize for booking time, not protecting it.',
    whoExperiences: 'Remote and hybrid knowledge workers and their managers.',
    currentSolutions: ['Calendar blocking', 'Do-not-disturb modes', 'Nothing'],
    evidenceCount: '18 remote workers interviewed',
    evidenceQuote:
      "By the time I get to actual work, half my energy is gone from context switching.",
    category: 'Productivity',
    stage: 'Building',
    ownerId: 'u-sara',
    skillsNeeded: ['Frontend', 'Backend'],
    commitment: '5 hrs/week',
    duration: '6 weeks',
    teamSize: 3,
    teamMemberIds: ['u-sara', 'u-daniel'],
    createdAt: '2026-07-28',
  },
  {
    id: 'p-regional-components',
    title: 'Open-source component library for regional languages',
    summary:
      'Developers building products for regional-language users lack accessible, well-tested UI components for complex scripts.',
    description:
      'Rendering and input handling for many regional scripts is inconsistent across common UI libraries, forcing every team to solve the same problems from scratch.',
    whoExperiences: 'Developers building products for regional-language users.',
    currentSolutions: ['Custom in-house components', 'Third-party paid SDKs'],
    evidenceCount: '9 developers interviewed',
    evidenceQuote:
      "Every project I've worked on rebuilds the same broken text input from scratch.",
    category: 'Developer Tools',
    stage: 'Idea',
    ownerId: 'u-daniel',
    skillsNeeded: ['Frontend', 'Research'],
    commitment: '4 hrs/week',
    duration: '8 weeks',
    teamSize: 4,
    teamMemberIds: ['u-daniel'],
    createdAt: '2026-09-05',
  },
  {
    id: 'p-volunteer-kitchens',
    title: 'Coordinating volunteer shifts for community kitchens',
    summary:
      'Community kitchens rely on volunteers but have no simple way to coordinate shifts and avoid gaps in coverage.',
    description:
      'Community kitchens depend on a rotating pool of volunteers coordinated over group chats and spreadsheets, leading to missed shifts and burnt-out regulars.',
    whoExperiences: 'Community kitchen organizers and volunteers.',
    currentSolutions: ['WhatsApp groups', 'Paper sign-up sheets'],
    evidenceCount: '7 organizers interviewed',
    evidenceQuote:
      "Every week is a scramble to figure out who's actually showing up.",
    category: 'Other',
    stage: 'Idea',
    ownerId: 'u-grace',
    skillsNeeded: ['Frontend', 'Product'],
    commitment: '3 hrs/week',
    duration: '6 weeks',
    teamSize: 3,
    teamMemberIds: ['u-grace'],
    createdAt: '2026-09-08',
  },
  {
    id: 'p-first-gen-dropout',
    title: 'Understanding why first-gen students drop out of college',
    summary:
      'First-generation college students drop out at higher rates, but the specific causes at each institution are poorly understood.',
    description:
      'National statistics describe the first-gen dropout problem broadly, but individual institutions lack the granular, timely data needed to intervene before a student withdraws.',
    whoExperiences: 'First-generation college students and academic advisors.',
    currentSolutions: ['Exit surveys', 'Advisor anecdotes'],
    evidenceCount: '25 students and advisors interviewed',
    evidenceQuote:
      "Nobody asked me why I was struggling until after I'd already decided to leave.",
    category: 'Research',
    stage: 'Problem validated',
    ownerId: 'u-tom',
    skillsNeeded: ['Research', 'Backend'],
    commitment: '5 hrs/week',
    duration: '10 weeks',
    teamSize: 4,
    teamMemberIds: ['u-tom', 'u-grace'],
    createdAt: '2026-08-10',
  },
  {
    id: 'p-dev-portfolio-builder',
    title: 'Minimalist dev portfolio builder for student projects',
    summary:
      'Computer science students spend too much time building portfolio sites from scratch instead of showcasing their actual projects.',
    description:
      'CS students often spend days setting up portfolio site frameworks and CSS rather than highlighting their code, architecture, and live demos. Existing builders like Wix or Webflow feel bloated and non-technical, while GitHub Pages requires manual HTML template tweaking.',
    whoExperiences: 'Computer science students and bootcamp graduates looking for tech roles.',
    currentSolutions: ['GitHub Pages', 'Wix / Webflow', 'Custom React sites from scratch'],
    evidenceCount: '14 CS students interviewed',
    evidenceQuote:
      "I spent a week wrestling with CSS layout when all recruiters wanted to see was my API project.",
    category: 'Developer Tools',
    stage: 'Problem validated',
    ownerId: 'u-purvika',
    skillsNeeded: ['React', 'Tailwind', 'Node.js'],
    commitment: '5 hrs/week',
    duration: '6 weeks',
    teamSize: 3,
    teamMemberIds: ['u-purvika'],
    createdAt: '2026-09-11',
  },
];

export const applications: Application[] = [
  {
    id: 'app-purvika-llm-buddy',
    problemId: 'p-llm-buddy',
    applicantId: 'u-purvika',
    motivation:
      "I've worked on AI & education products before and would like to contribute to the LLM backend and API design.",
    contribution:
      'I can build and own the backend API, authentication, and data model for the platform.',
    skills: ['React', 'Node.js', 'Python'],
    availability: '5–7 hrs/week',
    relevantWorkUrl: 'github.com/purvikagore/student-scheduler',
    status: 'pending',
    submittedAt: '2026-09-08',
  },
  {
    id: 'app-meera-llm-buddy',
    problemId: 'p-llm-buddy',
    applicantId: 'u-meera',
    motivation:
      'I care a lot about accessibility in education tools and want to help make this easy to navigate for first-time users.',
    contribution:
      'I can run usability interviews and design the core flows in Figma before we build.',
    skills: ['UX', 'Research', 'Figma'],
    availability: '5–7 hrs/week',
    relevantWorkUrl: 'figma.com/@meeraiyer/portfolio',
    status: 'pending',
    submittedAt: '2026-09-09',
  },
  {
    id: 'app-daniel-llm-buddy',
    problemId: 'p-llm-buddy',
    applicantId: 'u-daniel',
    motivation:
      "I've built backend systems for two student-facing products and enjoy working close to real user problems.",
    contribution:
      'I can help design the database schema and build out the matching logic between students and tutors.',
    skills: ['Node.js', 'Python', 'Databases'],
    availability: '8–10 hrs/week',
    status: 'pending',
    submittedAt: '2026-09-10',
  },
  {
    id: 'app-ananya-portfolio-builder',
    problemId: 'p-dev-portfolio-builder',
    applicantId: 'u-ananya',
    motivation:
      "I love UI tools for developers and would like to help design and test the template system.",
    contribution:
      'I can design the modular layout components in Figma and conduct user feedback sessions with CS students.',
    skills: ['UX', 'Research', 'Figma'],
    availability: '5 hrs/week',
    relevantWorkUrl: 'figma.com/@ananyasharma/dev-templates',
    status: 'pending',
    submittedAt: '2026-09-14',
  },
];

export const chatThreads: ChatThread[] = [
  {
    id: 'chat-ananya-portfolio-builder',
    applicationId: 'app-ananya-portfolio-builder',
    problemId: 'p-dev-portfolio-builder',
    messages: [
      {
        id: 'm101',
        senderId: 'u-ananya',
        text: 'Hi Purvika! I saw your problem post for the developer portfolio builder. I would love to help with the UX and component layouts!',
        timestamp: '2026-09-14T14:15:00',
      },
      {
        id: 'm102',
        senderId: 'u-purvika',
        text: 'Hey Ananya! That sounds great. Have you designed UI templates before?',
        timestamp: '2026-09-14T14:20:00',
      },
      {
        id: 'm103',
        senderId: 'u-ananya',
        text: 'Yes! I created a set of open-source Figma components for student projects.',
        timestamp: '2026-09-14T14:22:00',
      },
    ],
  },
  {
    id: 'chat-purvika-llm-buddy',
    applicationId: 'app-purvika-llm-buddy',
    problemId: 'p-llm-buddy',
    messages: [
      {
        id: 'm1',
        senderId: 'u-ananya',
        text: 'Hey Purvika, thanks for applying. Have you worked with REST APIs before?',
        timestamp: '2026-09-09T10:02:00',
      },
      {
        id: 'm2',
        senderId: 'u-purvika',
        text: 'Yes. I built the backend for a student scheduling platform last semester.',
        timestamp: '2026-09-09T10:05:00',
      },
      {
        id: 'm3',
        senderId: 'u-ananya',
        text: 'Great. How much time can you realistically commit each week?',
        timestamp: '2026-09-09T10:07:00',
      },
      {
        id: 'm4',
        senderId: 'u-purvika',
        text: 'Around 5 hours, mostly evenings.',
        timestamp: '2026-09-09T10:08:00',
      },
    ],
  },
  {
    id: 'chat-meera-llm-buddy',
    applicationId: 'app-meera-llm-buddy',
    problemId: 'p-llm-buddy',
    messages: [
      {
        id: 'm1',
        senderId: 'u-ananya',
        text: 'Hi Meera! Loved your portfolio. What drew you to this problem?',
        timestamp: '2026-09-09T14:00:00',
      },
      {
        id: 'm2',
        senderId: 'u-meera',
        text: "I struggle with complex assignment problems myself, so an AI homework assistant really resonates.",
        timestamp: '2026-09-09T14:12:00',
      },
    ],
  },
  {
    id: 'chat-daniel-llm-buddy',
    applicationId: 'app-daniel-llm-buddy',
    problemId: 'p-llm-buddy',
    messages: [
      {
        id: 'm1',
        senderId: 'u-ananya',
        text: 'Hi Daniel, thanks for reaching out. Could you share more about the backend you mentioned?',
        timestamp: '2026-09-10T09:15:00',
      },
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'proj-llm-buddy',
    problemId: 'p-llm-buddy',
    name: 'LLMBuddy',
    status: 'In progress',
    goal: 'Launch an MVP that helps students with homework and assignments by October 30.',
    targetDate: '2026-10-30',
    milestones: [
      { id: 'ms-1', title: 'User research', status: 'complete', dueDate: '2026-09-05' },
      { id: 'ms-2', title: 'Product prototype', status: 'complete', dueDate: '2026-09-12' },
      { id: 'ms-3', title: 'Backend MVP', status: 'in-progress', dueDate: '2026-09-22' },
      { id: 'ms-4', title: 'Frontend integration', status: 'not-started', dueDate: '2026-10-10' },
      { id: 'ms-5', title: 'Launch', status: 'not-started', dueDate: '2026-10-30' },
    ],
    team: [
      { userId: 'u-ananya', roleLabel: 'Research / Product' },
      { userId: 'u-priya', roleLabel: 'Design' },
      { userId: 'u-purvika', roleLabel: 'Full-stack Developer' },
    ],
    teamChat: [
      {
        id: 'tm1',
        senderId: 'u-ananya',
        text: "Kicking off the week — let's get the onboarding flow and prompt templates wrapped up.",
        timestamp: '2026-09-11T09:00:00',
      },
      {
        id: 'tm2',
        senderId: 'u-priya',
        text: "On it. I'll share the UI wireframes by Friday.",
        timestamp: '2026-09-11T09:04:00',
      },
      {
        id: 'tm3',
        senderId: 'u-purvika',
        text: 'Working on the backend API authentication endpoints today.',
        timestamp: '2026-09-11T09:10:00',
      },
    ],
  },
];

export const commitments: Commitment[] = [
  {
    id: 'c-purvika-auth-api',
    projectId: 'proj-llm-buddy',
    title: 'Build authentication API & JWT session flow',
    description: 'Implement secure login, token validation, and session endpoints for student profiles.',
    ownerId: 'u-purvika',
    dueDate: '2026-09-18',
    status: 'In progress',
    expectedEffort: '5 hours',
  },
  {
    id: 'c-purvika-db-schema',
    projectId: 'proj-llm-buddy',
    title: 'Design database schema & migrations',
    description: 'Model relational schemas for student profiles, course topics, and assignment history.',
    ownerId: 'u-purvika',
    dueDate: '2026-09-14',
    status: 'Complete',
    expectedEffort: '4 hours',
    evidence: {
      type: 'GitHub PR',
      url: 'github.com/purvikagore/student-scheduler/pull/3',
      description: 'Submitted pull request with Knex migration scripts and database ER diagram.',
      completedAt: '2026-09-14',
    },
  },
  {
    id: 'c-purvika-swagger-docs',
    projectId: 'proj-llm-buddy',
    title: 'API documentation & OpenAPI specs',
    description: 'Write Swagger specs for all backend endpoints to share with frontend team.',
    ownerId: 'u-purvika',
    dueDate: '2026-09-25',
    status: 'Not started',
    expectedEffort: '3 hours',
  },
  {
    id: 'c-onboarding-flow',
    projectId: 'proj-llm-buddy',
    title: 'Create user onboarding flow',
    description: 'Design the first-time experience for students signing up and choosing subject areas.',
    ownerId: 'u-priya',
    dueDate: '2026-09-20',
    status: 'Not started',
    expectedEffort: '4 hours',
  },
  {
    id: 'c-student-interviews',
    projectId: 'proj-llm-buddy',
    title: 'Conduct 10 student interviews',
    description: 'Validate the homework step-by-step guidance concept with undergraduate students.',
    ownerId: 'u-ananya',
    dueDate: '2026-09-17',
    status: 'Complete',
    expectedEffort: '6 hours',
    evidence: {
      type: 'Document',
      url: 'docs.google.com/document/interview-notes',
      description: 'Synthesized notes from 10 interviews with recurring themes on discovery and trust.',
      completedAt: '2026-09-10',
    },
  },
];

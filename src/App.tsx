import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AppProvider } from './context/AppContext'
import { DiscoverPage } from './pages/DiscoverPage'
import { ProblemDetailsPage } from './pages/ProblemDetailsPage'
import { ApplicantReviewPage } from './pages/ApplicantReviewPage'
import { ChatPage } from './pages/ChatPage'
import { TeamWorkspacePage } from './pages/TeamWorkspacePage'
import { MyProjectsPage } from './pages/MyProjectsPage'
import { MyCommitmentsPage } from './pages/MyCommitmentsPage'
import { PostProblemPage } from './pages/PostProblemPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<DiscoverPage />} />
            <Route path="/problems/:problemId" element={<ProblemDetailsPage />} />
            <Route path="/problems/:problemId/applicants" element={<ApplicantReviewPage />} />
            <Route path="/chat/:applicationId" element={<ChatPage />} />
            <Route path="/projects/:projectId" element={<TeamWorkspacePage />} />
            <Route path="/my-projects" element={<MyProjectsPage />} />
            <Route path="/my-commitments" element={<MyCommitmentsPage />} />
            <Route path="/post-problem" element={<PostProblemPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  )
}

export default App

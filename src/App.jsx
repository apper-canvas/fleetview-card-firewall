import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import LiveTrackingPage from '@/components/pages/LiveTrackingPage';
import AnalyticsPage from '@/components/pages/AnalyticsPage';
import TasksPage from '@/components/pages/TasksPage';
import VehiclesPage from '@/components/pages/VehiclesPage';
import SettingsPage from '@/components/pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary-900/5"></div>
        
        <Layout>
          <Routes>
            <Route path="/" element={<LiveTrackingPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
<ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="toast-container"
          toastClassName="toast-custom"
          bodyClassName="toast-body"
          progressClassName="toast-progress"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;
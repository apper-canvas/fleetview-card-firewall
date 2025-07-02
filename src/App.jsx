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
      <div className="min-h-screen bg-background text-white">
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
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;
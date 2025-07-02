import Sidebar from '@/components/organisms/Sidebar';
import Header from '@/components/organisms/Header';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen relative">
      {/* Sidebar with enhanced styling */}
      <div className="relative z-10">
        <Sidebar />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header with improved spacing */}
        <div className="relative z-10 border-b border-secondary-700/50 bg-background-secondary/50 backdrop-blur-sm">
          <Header 
            title="Fleet Command Center" 
            subtitle="Real-time vehicle tracking and management"
          />
        </div>
        
        {/* Main content with enhanced container */}
        <main className="flex-1 overflow-hidden relative">
          <div className="h-full w-full">
            {children}
          </div>
          
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/10 via-transparent to-transparent"></div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
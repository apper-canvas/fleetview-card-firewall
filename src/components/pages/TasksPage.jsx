import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskCard from '@/components/molecules/TaskCard';
import Button from '@/components/atoms/Button';
import StatusBadge from '@/components/atoms/StatusBadge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { taskService } from '@/services/api/taskService';
import { vehicleService } from '@/services/api/vehicleService';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [taskData, vehicleData] = await Promise.all([
        taskService.getAll(),
        vehicleService.getAll()
      ]);
      setTasks(taskData);
      setVehicles(vehicleData);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAssignTask = async (task) => {
    // Find available vehicles
    const availableVehicles = vehicles.filter(v => v.status === 'online' || v.status === 'idle');
    
    if (availableVehicles.length === 0) {
      toast.error('No available vehicles for assignment');
      return;
    }

    // Assign to first available vehicle (in real app, this would be more sophisticated)
    const vehicle = availableVehicles[0];
    
    try {
      const updatedTask = {
        ...task,
        assignedVehicle: vehicle.Id,
        status: 'assigned'
      };
      
      await taskService.update(task.Id, updatedTask);
      await loadData();
      
      toast.success(`Task assigned to ${vehicle.plateNumber}`);
    } catch (error) {
      toast.error('Failed to assign task');
    }
  };

  const filteredTasks = tasks.filter(task => 
    statusFilter === 'all' || task.status === statusFilter
  );

  const statusCounts = tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Task Management</h1>
            <p className="text-slate-400">Assign and monitor delivery tasks</p>
          </div>
          
          <Button variant="accent" icon="Plus">
            Create Task
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={statusFilter === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            All Tasks ({tasks.length})
          </Button>
          {Object.entries(statusCounts).map(([status, count]) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              <StatusBadge status={status} showIcon={false} />
              <span className="ml-1">({count})</span>
            </Button>
          ))}
        </div>

        {/* Task Grid */}
        {filteredTasks.length === 0 ? (
          <Empty
            title="No tasks found"
            description="Try adjusting your filter or create a new task."
            icon="ClipboardList"
            action={{
              label: "Create Task",
              icon: "Plus",
              onClick: () => toast.info("Task creation coming soon!")
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TaskCard
                  task={task}
                  onAssign={handleAssignTask}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Task Statistics */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-surface border border-slate-600 rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ApperIcon name="BarChart3" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-white">Task Overview</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div key={status} className="text-center p-4 bg-slate-800 rounded-lg">
                  <StatusBadge status={status} />
                  <div className="text-2xl font-bold text-white mt-2">{count}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TasksPage;
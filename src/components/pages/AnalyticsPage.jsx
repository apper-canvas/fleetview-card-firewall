import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'react-apexcharts';
import StatCard from '@/components/molecules/StatCard';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { vehicleService } from '@/services/api/vehicleService';
import { taskService } from '@/services/api/taskService';

const AnalyticsPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [vehicleData, taskData] = await Promise.all([
        vehicleService.getAll(),
        taskService.getAll()
      ]);
      setVehicles(vehicleData);
      setTasks(taskData);
    } catch (err) {
      setError(err.message || 'Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading type="analytics" />;
  if (error) return <Error message={error} onRetry={loadData} />;

  // Calculate metrics
  const totalDeliveries = vehicles.reduce((sum, v) => sum + v.todayDeliveries, 0);
  const totalDistance = vehicles.reduce((sum, v) => sum + v.todayDistance, 0);
  const avgSpeed = vehicles.filter(v => v.speed > 0).reduce((sum, v, _, arr) => sum + v.speed / arr.length, 0);
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  // Chart configurations
  const fleetStatusChart = {
    series: [
      vehicles.filter(v => v.status === 'online').length,
      vehicles.filter(v => v.status === 'idle').length,
      vehicles.filter(v => v.status === 'offline').length
    ],
    options: {
      chart: { type: 'donut', background: 'transparent' },
      theme: { mode: 'dark' },
      labels: ['Online', 'Idle', 'Offline'],
      colors: ['#10B981', '#F59E0B', '#6B7280'],
      legend: { position: 'bottom' },
      dataLabels: { enabled: true },
      plotOptions: {
        pie: {
          donut: { size: '70%' }
        }
      }
    }
  };

  const performanceChart = {
    series: [{
      name: 'Deliveries',
      data: vehicles.map(v => v.todayDeliveries)
    }, {
      name: 'Distance (km)',
      data: vehicles.map(v => Math.round(v.todayDistance))
    }],
    options: {
      chart: { type: 'bar', background: 'transparent' },
      theme: { mode: 'dark' },
      xaxis: {
        categories: vehicles.map(v => v.plateNumber)
      },
      colors: ['#0EA5E9', '#10B981'],
      dataLabels: { enabled: false },
      legend: { position: 'top' }
    }
  };

  return (
    <div className="p-6 h-full overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Deliveries"
            value={totalDeliveries}
            icon="Package"
            trend="up"
            trendValue="+12%"
            color="accent"
          />
          <StatCard
            title="Total Distance"
            value={`${totalDistance.toFixed(0)} km`}
            icon="Route"
            trend="up"
            trendValue="+8%"
            color="primary"
          />
          <StatCard
            title="Average Speed"
            value={`${avgSpeed.toFixed(1)} km/h`}
            icon="Gauge"
            color="warning"
          />
          <StatCard
            title="Completed Tasks"
            value={completedTasks}
            icon="CheckCircle2"
            trend="up"
            trendValue="+15%"
            color="accent"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fleet Status Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface border border-slate-600 rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ApperIcon name="PieChart" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-white">Fleet Status Distribution</h3>
            </div>
            <Chart
              options={fleetStatusChart.options}
              series={fleetStatusChart.series}
              type="donut"
              height={300}
            />
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface border border-slate-600 rounded-lg p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <ApperIcon name="BarChart3" size={20} className="text-accent" />
              <h3 className="text-lg font-semibold text-white">Vehicle Performance</h3>
            </div>
            <Chart
              options={performanceChart.options}
              series={performanceChart.series}
              type="bar"
              height={300}
            />
          </motion.div>
        </div>

        {/* Performance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-surface border border-slate-600 rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <ApperIcon name="Table" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-white">Vehicle Performance Details</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Vehicle</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Driver</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">Deliveries</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">Distance</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-medium">Speed</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle, index) => (
                  <motion.tr
                    key={vehicle.Id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="border-b border-slate-700 hover:bg-slate-700/50"
                  >
                    <td className="py-3 px-4 text-white font-medium">{vehicle.plateNumber}</td>
                    <td className="py-3 px-4 text-slate-300">{vehicle.driverName}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        vehicle.status === 'online' ? 'bg-accent/20 text-accent' :
                        vehicle.status === 'idle' ? 'bg-warning/20 text-warning' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-white">{vehicle.todayDeliveries}</td>
                    <td className="py-3 px-4 text-right text-white">{vehicle.todayDistance.toFixed(1)} km</td>
                    <td className="py-3 px-4 text-right text-white">{vehicle.speed} km/h</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
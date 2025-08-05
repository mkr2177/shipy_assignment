import React from 'react';
import { Link } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Plus, 
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react';

const Dashboard = () => {
  const { getTaskStats, getFilteredTasks } = useTask();
  const { user } = useAuth();
  const stats = getTaskStats();
  
  // Get recent tasks (last 5)
  const recentTasks = getFilteredTasks().slice(-5).reverse();
  
  // Get urgent tasks
  const urgentTasks = getFilteredTasks({ isUrgent: true });

  const StatCard = ({ title, value, icon: Icon, color, description }) => (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-primary-100 mt-2">
              You have {stats.pending + stats.inProgress} active tasks to work on.
            </p>
          </div>
          <Link
            to="/tasks/new"
            className="bg-white text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={Target}
          color="text-blue-600"
          description="All time"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          color="text-green-600"
          description={`${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% completion rate`}
        />
        <StatCard
          title="Active Tasks"
          value={stats.pending + stats.inProgress}
          icon={Clock}
          color="text-yellow-600"
          description="Pending + In Progress"
        />
        <StatCard
          title="Urgent"
          value={stats.urgent}
          icon={AlertTriangle}
          color="text-red-600"
          description="Need attention"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
            <Link
              to="/tasks"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          
          {recentTasks.length > 0 ? (
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.status}
                      </span>
                      <span className="text-xs text-gray-500">{task.category}</span>
                    </div>
                  </div>
                  {task.isUrgent && (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No tasks yet. Create your first task!</p>
              <Link
                to="/tasks/new"
                className="btn-primary mt-4 inline-flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Link>
            </div>
          )}
        </div>

        {/* Urgent Tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Urgent Tasks</h2>
            <span className="text-red-600 text-sm font-medium">
              {urgentTasks.length} urgent
            </span>
          </div>
          
          {urgentTasks.length > 0 ? (
            <div className="space-y-4">
              {urgentTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                        task.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No urgent tasks. Great job!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

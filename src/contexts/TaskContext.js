import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Task priorities and categories (enums)
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Education', 'Other'];
  const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Initialize with sample data
      const sampleTasks = [
        {
          id: 1,
          title: 'Complete React Project',
          description: 'Build a task management app with CRUD operations',
          category: 'Work',
          priority: 'High',
          status: 'In Progress',
          isUrgent: true,
          dueDate: '2025-08-10',
          completionNote: '',
          completedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Buy Groceries',
          description: 'Get milk, bread, eggs, and vegetables',
          category: 'Shopping',
          priority: 'Medium',
          status: 'Pending',
          isUrgent: false,
          dueDate: '2025-08-06',
          completionNote: '',
          completedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setTasks(sampleTasks);
      localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    }
  }, []);

  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const createTask = (taskData) => {
    setLoading(true);
    const newTask = {
      id: Date.now(), // Simple ID generation
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    setLoading(false);
    return newTask;
  };

  const updateTask = (id, taskData) => {
    setLoading(true);
    const updatedTasks = tasks.map(task =>
      task.id === parseInt(id)
        ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
        : task
    );
    saveTasks(updatedTasks);
    setLoading(false);
    return updatedTasks.find(task => task.id === parseInt(id));
  };

  const deleteTask = (id) => {
    setLoading(true);
    const updatedTasks = tasks.filter(task => task.id !== parseInt(id));
    saveTasks(updatedTasks);
    setLoading(false);
  };

  const markTaskComplete = (id, completionNote = '') => {
    setLoading(true);
    const updatedTasks = tasks.map(task =>
      task.id === parseInt(id)
        ? { 
            ...task, 
            status: 'Completed',
            completionNote: completionNote.trim(),
            completedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        : task
    );
    saveTasks(updatedTasks);
    setLoading(false);
    return updatedTasks.find(task => task.id === parseInt(id));
  };

  const getTask = (id) => {
    return tasks.find(task => task.id === parseInt(id));
  };

  const getFilteredTasks = (filters = {}) => {
    let filteredTasks = [...tasks];

    if (filters.category && filters.category !== 'All') {
      filteredTasks = filteredTasks.filter(task => task.category === filters.category);
    }

    if (filters.status && filters.status !== 'All') {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }

    if (filters.priority && filters.priority !== 'All') {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
    }

    if (filters.search) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.isUrgent !== undefined) {
      filteredTasks = filteredTasks.filter(task => task.isUrgent === filters.isUrgent);
    }

    return filteredTasks;
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'Completed').length;
    const pending = tasks.filter(task => task.status === 'Pending').length;
    const inProgress = tasks.filter(task => task.status === 'In Progress').length;
    const urgent = tasks.filter(task => task.isUrgent).length;

    return { total, completed, pending, inProgress, urgent };
  };

  const value = {
    tasks,
    loading,
    priorities,
    categories,
    statuses,
    createTask,
    updateTask,
    deleteTask,
    markTaskComplete,
    getTask,
    getFilteredTasks,
    getTaskStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

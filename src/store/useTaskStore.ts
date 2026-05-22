import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import type { TaskItem } from '../utils/handle-api';

const baseURL = process.env.EXPO_PUBLIC_API_URL;

type TaskState = {
  tasks: TaskItem[];
  editingTask: TaskItem | null;
  selectedTaskId: string | null;
  addTask: (text: string, completed: boolean, dueDate: string | null) => Promise<void>;
  updateTask: (task: TaskItem) => Promise<void>;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  setEditingTask: (task: TaskItem | null) => void;
  setSelectedTaskId: (id: string | null) => void;
  loadTasks: () => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      editingTask: null,
      selectedTaskId: null,

      loadTasks: () => {
        axios.get<TaskItem[]>(`${baseURL}`).then(({ data }) => {
          set({ tasks: data });
        }).catch(console.error);
      },

      addTask: async (text, completed, dueDate) => {
        await axios.post(`${baseURL}/save`, { text, completed, dueDate });
        get().loadTasks();
      },

      updateTask: async (task) => {
        await axios.post(`${baseURL}/update`, task);
        get().loadTasks();
        set({ editingTask: null });
      },

      toggleTaskCompleted: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id === id ? { ...task, completed: !task.completed } : task
          ),
        })),

      deleteTask: (id) => {
        axios.post(`${baseURL}/delete`, { _id: id }).then(() => {
          set((state) => ({
            tasks: state.tasks.filter((task) => task._id !== id),
          }));
        }).catch(console.error);
      },

      setEditingTask: (task) => set({ editingTask: task }),
      setSelectedTaskId: (id) => set({ selectedTaskId: id }),
    }),
    {
      name: 'task-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

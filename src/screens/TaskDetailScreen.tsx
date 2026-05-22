import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTaskStore } from '../store/useTaskStore';

export default function TaskDetailScreen() {
  const selectedTaskId = useTaskStore((state) => state.selectedTaskId);
  const setSelectedTaskId = useTaskStore((state) => state.setSelectedTaskId);
  const task = useTaskStore((state) => state.tasks.find((t) => t._id === selectedTaskId));

  if (!task) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSelectedTaskId(null)}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{task.text}</Text>
      <Text style={styles.status}>{task.completed ? '✅ Completed' : '📋 Pending'}</Text>
      {task.dueDate && (
        <Text style={styles.date}>Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  back: {
    fontSize: 16,
    color: '#000',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  status: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

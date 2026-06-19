import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';

interface TaskProps {
  text: string;
  updateMode: () => void;
  deleteTask: () => void;
}

const Task: React.FC<TaskProps> = ({ text, updateMode, deleteTask }) => {
  return (
    <View className="bg-white rounded-xl shadow-md p-5 mt-4 flex-row items-center justify-between">
      <Text className="text-gray-800 text-base flex-1">{text}</Text>
      <View className="flex-row gap-4 ml-4">
        <TouchableOpacity onPress={updateMode}>
          <Feather name="edit" size={20} color="#374151" />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteTask}>
          <AntDesign name="delete" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Task;

import React from 'react';
import { View } from 'react-native';
import { Heading, Text } from '@gluestack-ui/themed';

export default function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center mt-16 px-8">
      <Heading size="lg" className="text-gray-400 mb-2">Nenhuma tarefa</Heading>
      <Text className="text-gray-400 text-center">Adicione uma nova tarefa para começar.</Text>
    </View>
  );
}

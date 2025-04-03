import { router, Stack, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';

import { appWriteConfig, db } from '@/lib/appwrite';
import { TTodo } from '@/lib/types';

export default function Modal() {
  const [isLoading, setLoading] = React.useState(false);
  const [todo, setTodo] = React.useState<TTodo | null>(null);

  const { todoId } = useLocalSearchParams<{ todoId?: string }>();

  React.useEffect(() => {
    if (todoId) {
      getTodo(todoId);
    }
  }, [todoId]);

  const getTodo = async (todoId: string) => {
    try {
      setLoading(true);
      const doc = await db.getDocument(appWriteConfig.db, appWriteConfig.col.todos, todoId); // Use getDocument here
      setTodo(doc as TTodo);
    } catch (e) {
      console.error('Error fetching todo:', e);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async () => {
    if (!todo) return;

    try {
      setLoading(true);
      await db.updateDocument(appWriteConfig.db, appWriteConfig.col.todos, todo.$id, {
        title: todo.title,
        completed: todo.completed,
      });
      router.back();
    } catch (e) {
      console.error('Error updating todo:', e);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View className="m-4 gap-2">
        <TextInput
          className="w-full rounded-md bg-neutral-200 p-4"
          value={todo?.title || ''}
          placeholder="Title"
          onChangeText={(text) => setTodo((prev) => (prev ? { ...prev, title: text } : null))} // onChangeText instead of onChange
        />
        <Pressable onPress={updateTodo} disabled={isLoading}>
          <View className="w-full items-center rounded-md bg-blue-500 p-4">
            <Text className="font-bold text-white">{isLoading ? 'Loading...' : 'Update Todo'}</Text>
          </View>
        </Pressable>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Stack.Screen options={{ headerTitle: 'Update Todo' }} />
    </>
  );
}

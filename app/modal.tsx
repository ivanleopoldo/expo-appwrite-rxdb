import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import { ID } from 'react-native-appwrite';

import { appWriteConfig, db } from '@/lib/appwrite';

export default function Modal() {
  const [value, setValue] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const createTodo = async () => {
    try {
      setLoading(true);

      await db.createDocument(appWriteConfig.db, appWriteConfig.col.todos, ID.unique(), {
        title: value,
      });
      router.back();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View className="m-4 gap-2">
        <TextInput
          className="w-full rounded-md bg-neutral-200 p-4"
          value={value}
          placeholder="Title"
          onChange={(e) => setValue(e.nativeEvent.text)}
        />
        <Pressable onPress={createTodo} disabled={isLoading}>
          <View className="w-full items-center rounded-md bg-blue-500 p-4">
            <Text className="font-bold text-white">{isLoading ? 'Loading...' : 'Create Todo'}</Text>
          </View>
        </Pressable>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Stack.Screen
        options={{
          headerTitle: 'New Todo',
        }}
      />
    </>
  );
}

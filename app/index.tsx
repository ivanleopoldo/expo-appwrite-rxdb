import { useActionSheet } from '@expo/react-native-action-sheet';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Pressable, RefreshControl, Text, View } from 'react-native';
import { Query } from 'react-native-appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '@/components/Icon';
import Todo from '@/components/Todo';
import { appWriteConfig, client, db } from '@/lib/appwrite';
import { TTodo } from '@/lib/types';

export default function Home() {
  const { showActionSheetWithOptions } = useActionSheet();
  const [refreshing, setRefreshing] = React.useState(false);
  const [todos, setTodos] = React.useState<TTodo[]>([]);

  React.useEffect(() => {
    fetchTodos();
  }, []);

  React.useEffect((): any => {
    const channel = `databases.${appWriteConfig.db}.collections.${appWriteConfig.col.todos}.documents`;

    const unsubscribe = client.subscribe(channel, (payload) => {
      fetchTodos();
    });

    return () => unsubscribe;
  }, []);

  const fetchTodos = async () => {
    try {
      const { documents } = await db.listDocuments(appWriteConfig.db, appWriteConfig.col.todos, [
        Query.limit(25),
        Query.orderDesc('$createdAt'),
      ]);
      setTodos(documents as TTodo[]);
    } catch (e) {
      console.error(e);
    }
  };

  const updateTodo = async (props: TTodo) => {
    try {
      const todo = await db.updateDocument(appWriteConfig.db, appWriteConfig.col.todos, props.$id, {
        ...props,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchTodos();
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  const onLongPress = () => {
    const options = ['Edit', 'Delete', 'Cancel'];

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 1,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            // Edit
            break;
          case 1:
            // Delete
            break;
          default:
            // Cancel
            break;
        }
      }
    );
  };

  return (
    <SafeAreaView className="relative mt-10 gap-5">
      <View className="mx-5 flex-row items-center justify-between ">
        <Text className="text-5xl font-bold">Todos</Text>
        <Pressable
          onPress={() => {
            router.push('/modal');
          }}>
          <Icon name="Plus" className="text-black" />
        </Pressable>
      </View>
      <FlatList
        data={todos}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }: { item: TTodo; index: number }) => {
          return (
            <Pressable key={item.$id} onLongPress={onLongPress}>
              <Todo
                $id={item.$id}
                title={item.title}
                completed={item.completed}
                isLast={index + 1 === todos.length}
                update={updateTodo}
              />
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

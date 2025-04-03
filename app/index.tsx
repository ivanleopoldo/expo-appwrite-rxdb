import { useActionSheet } from '@expo/react-native-action-sheet';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '@/components/Icon';
import Todo from '@/components/Todo';
import { TTodo } from '@/lib/types';

export default function Home() {
  const { showActionSheetWithOptions } = useActionSheet();

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

  const data: TTodo[] = [
    {
      $id: '1',
      title: 'Todo 1',
      completed: false,
    },
    {
      $id: '2',
      title: 'Todo 2',
      completed: false,
    },
  ];

  return (
    <SafeAreaView className="mt-10 gap-5">
      <View className="mx-5 flex-row items-center justify-between ">
        <Text className="text-5xl font-bold">Todos</Text>
        <Pressable onPress={() => {}}>
          <Icon name="Plus" className="text-black" />
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({ item, index }: { item: TTodo; index: number }) => {
          return (
            <Pressable key={item.$id} onLongPress={onLongPress}>
              <Todo
                $id={item.$id}
                title={item.title}
                completed={item.completed}
                isLast={index + 1 === data.length}
              />
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

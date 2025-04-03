import { useActionSheet } from '@expo/react-native-action-sheet';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Icon from '@/components/Icon';
import Todo from '@/components/Todo';

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

  return (
    <SafeAreaView className="mx-4 mt-10 gap-5">
      <View className="flex-row items-center justify-between ">
        <Text className="text-5xl font-bold">Todos</Text>
        <Pressable onPress={() => {}}>
          <Icon name="Plus" className="text-black" />
        </Pressable>
      </View>
      <Pressable onLongPress={onLongPress}>
        <Todo />
      </Pressable>
    </SafeAreaView>
  );
}

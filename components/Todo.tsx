import Checkbox from 'expo-checkbox';
import React from 'react';
import { Text, View } from 'react-native';

export default function Todo() {
  const [isChecked, setChecked] = React.useState(false);
  return (
    <View className="flex-row items-center gap-5 rounded-lg border border-neutral-300 bg-neutral-200 p-4">
      <Checkbox
        className="h-5 w-5 bg-neutral-200 text-neutral-200"
        value={isChecked}
        onValueChange={() => {
          setChecked((prev) => !prev);
        }}
      />
      <Text>Todo</Text>
    </View>
  );
}

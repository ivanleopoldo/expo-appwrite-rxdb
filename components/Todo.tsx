import Checkbox from 'expo-checkbox';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { TTodo } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function Todo({
  data,
  isLast,
  update,
  onLongPress,
}: {
  data: TTodo;
  isLast: boolean;
  update: (props: TTodo) => void;
  onLongPress: (todoId: string) => void;
}) {
  const [todo, setTodo] = React.useState<TTodo>(data);
  return (
    <Pressable
      onPress={() =>
        setTodo((prev) => {
          return {
            ...prev,
            completed: !todo.completed,
          };
        })
      }
      onLongPress={() => onLongPress(data.$id)}>
      <View
        className={cn(
          'flex-row items-center gap-5 border-t border-neutral-300/50 px-8 py-4',
          isLast && 'border-b'
        )}>
        <Checkbox
          className="h-5 w-5"
          value={todo.completed}
          onValueChange={() => {
            setTodo((prev) => {
              return {
                ...prev,
                completed: !todo.completed,
              };
            });
            update({ $id: todo.$id, title: todo.title, completed: !todo.completed });
          }}
        />
        <Text>{data.title}</Text>
      </View>
    </Pressable>
  );
}

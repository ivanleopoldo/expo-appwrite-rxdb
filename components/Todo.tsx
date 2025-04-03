import Checkbox from 'expo-checkbox';
import React from 'react';
import { Text, View } from 'react-native';

import { TTodo } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function Todo(props: TTodo & { isLast: boolean; update: (props: TTodo) => void }) {
  const [todo, setTodo] = React.useState<TTodo>(props);
  return (
    <View
      className={cn(
        'flex-row items-center gap-5 border-t border-neutral-300/50 px-8 py-4',
        props.isLast && 'border-b'
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
          props.update({ $id: todo.$id, title: todo.title, completed: !todo.completed });
        }}
      />
      <Text>{props.title}</Text>
    </View>
  );
}

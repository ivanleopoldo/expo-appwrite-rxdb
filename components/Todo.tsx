import Checkbox from 'expo-checkbox';
import React from 'react';
import { Text, View } from 'react-native';

import { TTodo } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function Todo(props: TTodo & { isLast: boolean }) {
  const [isChecked, setChecked] = React.useState(false);
  return (
    <View
      className={cn(
        'flex-row items-center gap-5 border-t border-neutral-300/50 px-8 py-4',
        props.isLast && 'border-b'
      )}>
      <Checkbox
        className="h-5 w-5"
        value={props.completed && isChecked}
        onValueChange={() => {
          setChecked((prev) => !prev);
        }}
      />
      <Text>{props.title}</Text>
    </View>
  );
}

/* eslint-disable import/order */
import Icon from '@/components/Icon';
import '@/global.css';

import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { router, Stack } from 'expo-router';
import { Pressable } from 'react-native';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <ActionSheetProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            headerLeft: () => {
              return (
                <Pressable
                  onPress={() => {
                    router.back();
                  }}>
                  <Icon name="ChevronLeft" />
                </Pressable>
              );
            },
          }}
        />
        <Stack.Screen
          name="[todoId]"
          options={{
            presentation: 'modal',
            headerLeft: () => {
              return (
                <Pressable
                  onPress={() => {
                    router.back();
                  }}>
                  <Icon name="ChevronLeft" />
                </Pressable>
              );
            },
          }}
        />
      </Stack>
    </ActionSheetProvider>
  );
}

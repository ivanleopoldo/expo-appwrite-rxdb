import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform } from 'react-native';

export default function Modal() {
  return (
    <>
      <View>
        <Text>Hello</Text>
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}

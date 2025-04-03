import { Client, Databases } from 'react-native-appwrite';

if (!process.env.EXPO_PUBLIC_APPWRITE_APP_ID || !process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID) {
  throw new Error('Appwrite App ID is not defined');
}

const appWriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1', // Your API Endpoint
  projectId: process.env.EXPO_PUBLIC_APPWRITE_APP_ID, // Your project ID
  platform: 'com.ivanleopoldoc.expoappwriterxdb',
  db: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  col: {
    todos: '67eec8d9000d6513205b',
  },
};

const client = new Client()
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

const db = new Databases(client);

export { appWriteConfig, client, db };

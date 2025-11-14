import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

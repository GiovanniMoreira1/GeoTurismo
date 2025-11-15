import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="cadastro" />
        <Stack.Screen name="loc_auth" />
        <Stack.Screen name="(tabs)" />
      </Stack>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}

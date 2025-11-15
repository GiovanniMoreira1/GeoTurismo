import CustomTabBar from '@/components/ui/CustomTabBar';
import { AuthService } from '@/services/auth';
import { Tabs, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await AuthService.isAuthenticated();
        if (!token) {
          router.replace('/login');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#0077B6',
        }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { overflow: 'visible' },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="map" options={{ title: 'Mapa' }} />
      <Tabs.Screen name="search" options={{ title: 'Buscar' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}

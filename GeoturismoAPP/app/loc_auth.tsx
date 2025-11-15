import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { BackHandler, Platform, StyleSheet, Text, View } from 'react-native';

export default function LocationExample() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getCurrentLocation() {
      // Solicita permissão
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada.');
        // Encerra o app (só Android permite)
        if (Platform.OS === 'android') {
          BackHandler.exitApp();
        } else {
          alert('Feche o app manualmente para continuar.');
        }
        return;
      }

      // Usuário aceitou → pega localização
      await Location.getCurrentPositionAsync({});
      // Redireciona para /mapa
      router.replace('/map');
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        {errorMsg ?? 'Verificando permissão de localização...'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077B6',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

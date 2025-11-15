import CustomModalLoc from '@/components/ui/CustomModalLoc';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { BackHandler, Platform, StyleSheet, Text, View } from 'react-native';

export default function LocationAuth() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkPermission() {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status === 'granted') {
        // Já tem permissão → vai direto para o mapa
        router.replace('/map');
      } else {
        // Mostra modal para o usuário escolher
        setShowModal(true);
      }
    }

    checkPermission();
  }, []);

  // Função chamada quando o usuário clicar em "Sim"
  async function handleConfirm() {
    setShowModal(false);

    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      setErrorMsg('Permissão de localização negada.');

      if (Platform.OS === 'android') {
        BackHandler.exitApp();
      } else {
        router.replace('/login');
      }

      return;
    }

    // Usuário aceitou → obtém localização e vai para o mapa
    try {
      await Location.getCurrentPositionAsync({});
      router.replace('/map');
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      setErrorMsg('Não foi possível obter a localização.');
    }
  }

  // Função chamada quando o usuário clicar em "Não"
  function handleDeny() {
    setShowModal(false);

    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      router.replace('/login');
    }
  }

  return (
    <View style={styles.container}>
      {showModal ? (
        <CustomModalLoc onConfirm={handleConfirm} onDeny={handleDeny} />
      ) : (
        <Text style={styles.paragraph}>
          {errorMsg ? errorMsg : 'Verificando permissões...'}
        </Text>
      )}
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
    color: 'white',
    textAlign: 'center',
  },
});

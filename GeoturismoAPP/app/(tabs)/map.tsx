import CustomIconButton from '@/components/ui/CustomIconButton';
import LocalModal from '@/components/ui/modals/LocalModal';
import NewLocalModal from '@/components/ui/modals/NewLocalModal';
import { Local } from '@/types/local';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MapScreen() {
  const [newLocalModalVisible, setNewLocalModalVisible] = useState(false);
  const [localModalVisible, setLocalModalVisible] = useState(false);
  const [local, setLocal] = useState<Local | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      // Solicita permissão novamente (boa prática)
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão negada',
          'Não é possível mostrar o mapa sem acesso à localização.'
        );
        return;
      }

      // Obtém posição atual
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      // Define região inicial com ~700m de raio
      const newRegion: Region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.007, // quanto menor, mais zoom (~700m aprox)
        longitudeDelta: 0.007,
      };

      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {region ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {/* Opcional: marcador da posição */}
          <Marker coordinate={region} title="Você está aqui" />
        </MapView>
      ) : (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      )}

      <View style={styles.button}>
        <CustomIconButton icon="plus" color="black" />
      </View>
      <View style={styles.button}>
        <CustomIconButton icon="plus" color="black" onPress={() => setNewLocalModalVisible(true)} />
      </View>
      <NewLocalModal
        visible={newLocalModalVisible}
        onClose={() => setNewLocalModalVisible(false)}
      />
      <LocalModal
        visible={localModalVisible}
        onClose={() => setLocalModalVisible(false)}
        local={local!}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 25,
    right: 25,
  },
});

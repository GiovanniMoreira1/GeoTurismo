import CustomIconButton from '@/components/ui/CustomIconButton';
import LocalModal from '@/components/ui/modals/LocalModal';
import NewLocalModal from '@/components/ui/modals/NewLocalModal';
import { Local, LocalService, LocalUnique } from '@/services/api/local';
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

export default function MapScreen() {
  const [newLocalModalVisible, setNewLocalModalVisible] = useState(false);
  const [localModalVisible, setLocalModalVisible] = useState(false);
  const [selectedLocal, setSelectedLocal] = useState<LocalUnique | null>(null);

  const [region, setRegion] = useState<Region | null>(null);
  const [locals, setLocals] = useState<Local[]>([]);

  const [loadingInicial, setLoadingInicial] = useState(true);
  const [loadingLocais, setLoadingLocais] = useState(false);

  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<MapView>(null);

  const loadLocals = useCallback(async () => {
    try {
      setLoadingLocais(true);
      const data = await LocalService.getAll();
      setLocals(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os locais.');
    } finally {
      setLoadingLocais(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permissão negada',
            'Não é possível mostrar o mapa sem acesso à localização.'
          );
          setLoadingInicial(false);
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const newRegion: Region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setRegion(newRegion);
        await loadLocals();
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o mapa.');
      } finally {
        setLoadingInicial(false);
      }
    })();
  }, [loadLocals]);

  const handleRefresh = async () => {
    await loadLocals();
  };

  const handleMarkerPress = async (local: Local) => {
    try {
      const detailedLocal = await LocalService.getById(local.id_locais);
      setSelectedLocal(detailedLocal);
      setLocalModalVisible(true);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os detalhes.');
    }
  };

  const onMapReady = () => {
    setMapReady(true);
    if (region) {
      mapRef.current?.animateToRegion(region, 700);
    }
  };

  useEffect(() => {
    if (mapReady && region) {
      mapRef.current?.animateToRegion(region, 700);
    }
  }, [mapReady, region]);

  if (loadingInicial) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0077B6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {region ? (
        <MapView
          key={locals.length}
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          onMapReady={onMapReady}
          showsCompass={false}
          toolbarEnabled={false}
          showsTraffic={false}
          showsPointsOfInterest={false}
          customMapStyle={mapStyle}
          showsBuildings
          showsUserLocation
          showsMyLocationButton
        >
          <Marker coordinate={region} title="Você está aqui" pinColor="blue" />

          {locals.map((local) => (
            <Marker
              key={local.id_locais}
              coordinate={{
                latitude: local.latitude,
                longitude: local.longitude,
              }}
              title={local.nome}
              description={local.descricao}
              onPress={() => handleMarkerPress(local)}
              pinColor="red"
            />
          ))}
        </MapView>
      ) : (
        <ActivityIndicator size="large" style={{ flex: 1 }} />
      )}

      <View style={styles.button}>
        <CustomIconButton
          icon="plus"
          color="black"
          onPress={() => setNewLocalModalVisible(true)}
        />
      </View>

      <NewLocalModal
        visible={newLocalModalVisible}
        onClose={async () => {
          setNewLocalModalVisible(false);
          await handleRefresh();
        }}
        onLocalAdded={handleRefresh}
      />

      {selectedLocal && (
        <LocalModal
          visible={localModalVisible}
          loading={false}
          onClose={async () => {
            setLocalModalVisible(false);
            await handleRefresh();
          }}
          onLocalDeleted={handleRefresh}
          local={{
            id_locais: selectedLocal.id_locais,
            nome: selectedLocal.nome,
            descricao: selectedLocal.descricao,
            categorias: selectedLocal.categorias,
            media_avaliacao: selectedLocal.media_avaliacao,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { flex: 1, width: '100%', height: '100%' },
  button: { position: 'absolute', bottom: 25, right: 25 },
});

const mapStyle = [
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];

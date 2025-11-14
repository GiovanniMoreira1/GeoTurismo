import CustomIconButton from '@/components/CustomIconButton';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <View style={styles.button}>
        <CustomIconButton icon="plus" color="black" />
      </View>
    </View>
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

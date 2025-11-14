import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="filter" size={32} color="#000" />
        <TextInput
          style={styles.searchInput}
          mode="outlined"
          placeholder="Buscar"
          right={<TextInput.Icon icon="magnify" />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 15,
    paddingTop: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    // Sombra apenas na parte inferior
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    width: '90%',
    backgroundColor: 'transparent',
  },
});

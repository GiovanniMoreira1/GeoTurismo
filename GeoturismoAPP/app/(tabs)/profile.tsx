import FlatListPerfil, { ItemProps } from '@/components/ui/FlatListPerfil';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// @ts-ignore
import ProfileIcon from '@/assets/icons/profile-icon.svg';
import PrefeituraModal from '@/components/ui/modals/PrefeituraModal';
import { useState } from 'react';

const data: ItemProps[] = [
  {
    id: '1',
    title: 'Venda do seu Zé',
  },
  {
    id: '2',
    title: 'Cabaré da Lucéia',
  },
  {
    id: '3',
    title: 'Bar do José',
  },
];

export default function ProfileScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <ProfileIcon width={200} height={200} style={styles.profileIcon} />
        <Text style={styles.name}>Nome Turista</Text>
        <TouchableOpacity style={styles.button}>
          <MaterialCommunityIcons name="exit-to-app" size={24} color="red" />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
        <FlatListPerfil data={data} onPress={() => {}} />
      </View>
      <TouchableOpacity style={styles.oficialButton} onPress={() => setVisible(true)}>
        <Text style={styles.oficialButtonText}>Oficializar</Text>
      </TouchableOpacity>
      <PrefeituraModal visible={visible} onClose={() => setVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileContainer: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileIcon: {
    marginBottom: 16,
  },
  name: {
    fontSize: 17,
    color: '#2B2D42',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 15,
    color: 'red',
  },
  oficialButton: {
    alignItems: 'center',
    backgroundColor: '#D3AF37',
    padding: 10,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    width: '90%',
  },
  oficialButtonText: {
    fontSize: 17,
    color: 'white',
  },
});

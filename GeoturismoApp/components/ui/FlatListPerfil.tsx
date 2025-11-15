import { Local } from '@/services/api/local';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Card, Text } from 'react-native-paper';

interface FlatListPerfilProps {
  data: Local[];
  onPress: (item: Local) => void;
}

export default function FlatListPerfil({ data, onPress }: FlatListPerfilProps) {
  const isEmpty = !data || data.length === 0;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.list}>

        {isEmpty ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum local cadastrado ainda...
            </Text>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Item title={item.nome} onPress={() => onPress(item)} />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}

      </Card.Content>
    </Card>
  );
}

const Item = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <View style={styles.item}>
    <Text
      style={styles.text}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {title}
    </Text>

    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      <MaterialCommunityIcons
        name="trash-can-outline"
        size={22}
        color="#2B2D42"
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  list: {
    paddingVertical: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#2B2D42',
    flexShrink: 1,
    maxWidth: '90%',
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#D9D9D9',
  },

  emptyContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: '#2B2D42',
    fontSize: 15,
    opacity: 0.7,
  },
});

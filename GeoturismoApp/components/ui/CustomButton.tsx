import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function CustomButton({
  title,
  onPress,
  loading,
}: {
  title: string;
  onPress: () => void;
  loading: boolean;
}) {
  return (
    <Button
      mode="contained"
      style={styles.button}
      onPress={onPress}
      disabled={loading} // desabilita o botão enquanto carrega
      contentStyle={styles.content} // centraliza conteúdo
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.text}>Carregando...</Text>
        </View>
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#2B2D42',
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
  },
  content: {
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function CustomButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <Button mode="contained" style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

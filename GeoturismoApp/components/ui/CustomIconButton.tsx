import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function CustomIconButton({
  icon,
  color,
  onPress,
}: {
  icon: string;
  color: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialCommunityIcons name={icon as any} size={36} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

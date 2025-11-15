import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

type Props = {
  onConfirm: () => void;
  onDeny: () => void;
};

export default function CustomModalLoc({ onConfirm, onDeny }: Props) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.container}>
        <MaterialCommunityIcons name="map-marker" size={40} color="#9CA3AF" />
        <Text style={styles.question}>
          Você autoriza a utilização da sua localização?
        </Text>

        <View style={styles.options}>
          <TouchableOpacity style={styles.option} onPress={onConfirm}>
            <Text style={styles.optionText}>Sim</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.option} onPress={onDeny}>
            <Text style={styles.optionText}>Não</Text>
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    borderRadius: 12,
    backgroundColor: 'rgba(43,45,66,0.9)', // translúcido
    overflow: 'hidden',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  question: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 25,
    color: '#FFFFFF',
  },
  options: {
    width: '80%',
  },
  option: {
    paddingVertical: 8,
  },
  optionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
    marginVertical: 5,
  },
});

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Card, Modal, Portal } from 'react-native-paper';
import CustomButton from '../CustomButton';
import CustomTextInput from '../CustomTextInput';

interface PrefeituraModalProps {
  visible: boolean;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.6;

export default function PrefeituraModal({ visible, onClose }: PrefeituraModalProps) {
  const [localName, setLocalName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [cep, setCep] = useState('');
  const [complement, setComplement] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Portal>
      {visible && (
        <Button mode="text" style={styles.buttonExit} onPress={() => onClose()}>
          <MaterialCommunityIcons name="close" size={24} color="white" />
        </Button>
      )}
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <Card style={styles.card} elevation={5}>
            <Card.Title title="Novo Local" titleStyle={styles.cardTitle} />

            <Card.Content style={styles.cardContent}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
              >
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionLabel}>Nome:</Text>
                  <CustomTextInput
                    label="Nome"
                    value={localName}
                    onChangeText={setLocalName}
                    type="text"
                  />
                </View>

                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionLabel}>Email:</Text>
                  <CustomTextInput
                    label="Email"
                    value={street}
                    onChangeText={setStreet}
                    type="email"
                  />
                </View>

                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionLabel}>Responsável:</Text>
                  <CustomTextInput
                    label="Responsável"
                    value={number}
                    onChangeText={setNumber}
                    type="text"
                  />
                </View>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionLabel}>Orgão:</Text>
                  <CustomTextInput label="Orgão" value={cep} onChangeText={setCep} type="text" />
                </View>
              </ScrollView>
              <CustomButton title="Salvar" onPress={() => {}} />
            </Card.Content>
          </Card>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    minWidth: 350,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    height: MODAL_HEIGHT,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B2D42',
    textAlign: 'center',
  },
  cardContent: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
    gap: 16,
  },
  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  descriptionContainer: {
    gap: 5,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B2D42',
  },
  buttonExit: {
    position: 'absolute',
    top: 20,
    right: 5,
    padding: 8,
    zIndex: 1,
  },
  textExit: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

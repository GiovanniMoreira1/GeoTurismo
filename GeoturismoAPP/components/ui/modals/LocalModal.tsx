import { Local } from '@/types/local';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Button, Card, Modal, Portal } from 'react-native-paper';

interface LocalModalProps {
  visible: boolean;
  local: Local;
  onClose: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.75;

export default function LocalModal({ visible, onClose }: LocalModalProps) {
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
          style={styles.keyboardView}
        >
          <Card style={styles.card} elevation={5}>
            <Card.Content style={styles.cardContent}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
              >
                <TouchableOpacity style={styles.infoButton}>
                  <Text>Informações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reviewsButton}>
                  <Text>Avaliações</Text>
                </TouchableOpacity>
              </ScrollView>
            </Card.Content>
          </Card>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  keyboardView: {
    width: '100%',
  },
  card: {
    width: '100%',
    height: MODAL_HEIGHT,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: 'white',
    margin: 0,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 20,
  },
  infoButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewsButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
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

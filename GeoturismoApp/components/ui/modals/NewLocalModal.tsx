import { Categoria, CategoriaService } from '@/services/api/categoria';
import { LocalService } from '@/services/api/local';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Card,
  Chip,
  Menu,
  Modal,
  Portal,
} from 'react-native-paper';
import CustomButton from '../CustomButton';
import CustomTextInput from '../CustomTextInput';

interface NewLocalModalProps {
  visible: boolean;
  onClose: () => void;
  onLocalAdded: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.7;

export default function NewLocalModal({
  visible,
  onClose,
  onLocalAdded,
}: NewLocalModalProps) {
  
  const [localName, setLocalName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [cep, setCep] = useState('');
  const [complement, setComplement] = useState('');
  const [description, setDescription] = useState('');

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<(Categoria & { localIndex: number })[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [categoryInputWidth, setCategoryInputWidth] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  function resetForm() {
  setLocalName('');
  setStreet('');
  setNumber('');
  setCep('');
  setComplement('');
  setDescription('');
  setSelectedCategories([]);
}


  function handleSelectCategory(cat: Categoria & { localIndex: number }) {
    setSelectedCategories((prev) => {
      const exists = prev.some((c) => c.localIndex === cat.localIndex);
      return exists
        ? prev.filter((c) => c.localIndex !== cat.localIndex)
        : [...prev, cat];
    });
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const cats = await CategoriaService.getAll();
        const categoriasComIndex = cats.map((cat, index) => ({
          ...cat,
          localIndex: index,
        }));
        setCategorias(categoriasComIndex);
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        Alert.alert('Erro', 'Não foi possível carregar as categorias.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!visible) setMenuVisible(false);
  }, [visible]);

  async function handleCreateLocal() {
    const missing: string[] = [];

    if (!localName.trim()) missing.push('Nome do Local');
    if (!street.trim()) missing.push('Rua');
    if (!number.trim()) missing.push('Número');
    if (!cep.trim()) missing.push('CEP');
    if (selectedCategories.length === 0) missing.push('Categorias');

    if (missing.length > 0) {
      Alert.alert(
        'Campos obrigatórios',
        `Preencha os seguintes campos: ${missing.join(', ')}.`
      );
      return;
    }

    setLoading(true);

    try {
      const fullAddress = `${street}, ${number}, ${cep}, ${complement}`;
      const geoResult = await Location.geocodeAsync(fullAddress);

      if (!geoResult || geoResult.length === 0) {
        throw new Error('Não foi possível obter a geolocalização desse endereço.');
      }

      const { latitude, longitude } = geoResult[0];

      const newLocal = {
        nome: localName,
        descricao: description,
        endereco: fullAddress,
        latitude,
        longitude,
        filtros: selectedCategories.map(cat => ({
          categorias_id: cat.id_categorias,
        })),
      };

      console.log("📤 ENVIANDO PARA API:", newLocal);

      const res = await LocalService.create(newLocal);

      console.log("📥 RESPOSTA API:", res);

      Alert.alert('Sucesso', 'Local cadastrado com sucesso!');
      resetForm();
      onClose();
      onLocalAdded();

    } catch (error: any) {
      console.log("❌ ERRO AO CADASTRAR LOCAL:");
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      } else {
        console.log(error);
      }

      Alert.alert('Erro ao cadastrar', 'Falha ao cadastrar o local.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Portal>
      {visible && (
        <Button mode="text" style={styles.buttonExit} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={24} color="white" />
        </Button>
      )}

      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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

                {/* NOME DO LOCAL */}
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionLabel}>Nome do Local:</Text>
                  <CustomTextInput
                    label="Nome do Local"
                    value={localName}
                    onChangeText={setLocalName}
                    type="default"
                  />
                </View>

                {/* RUA */}
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionLabel}>Rua:</Text>
                  <CustomTextInput
                    label="Rua"
                    value={street}
                    onChangeText={setStreet}
                    type="default"
                  />
                </View>

                {/* NÚMERO + CEP */}
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.descriptionLabel}>Número:</Text>
                    <CustomTextInput
                      label="Número"
                      value={number}
                      onChangeText={setNumber}
                      type="numeric"
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.descriptionLabel}>CEP:</Text>
                    <CustomTextInput
                      label="CEP"
                      value={cep}
                      onChangeText={setCep}
                      type="numeric"
                    />
                  </View>
                </View>

                {/* COMPLEMENTO */}
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionLabel}>Complemento:</Text>
                  <CustomTextInput
                    label="Complemento"
                    value={complement}
                    onChangeText={setComplement}
                    type="default"
                  />
                </View>

                {/* CATEGORIAS */}
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionLabel}>Categorias:</Text>

                  <View
                    onLayout={(e) =>
                      setCategoryInputWidth(e.nativeEvent.layout.width)
                    }
                  >
                    <Menu
                      visible={menuVisible}
                      onDismiss={closeMenu}
                      contentStyle={[
                        styles.menuContent,
                        categoryInputWidth ? { width: categoryInputWidth } : null,
                      ]}
                      anchor={
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={openMenu}
                        >
                          <View style={styles.chipInputContainer}>
                            {selectedCategories.length === 0 ? (
                              <Text style={styles.chipPlaceholder}>
                                Selecione as categorias
                              </Text>
                            ) : (
                              <View style={styles.chipWrapper}>
                                {selectedCategories.map((cat) => (
                                  <Chip
                                    key={cat.localIndex}
                                    style={styles.chip}
                                    onClose={() =>
                                      setSelectedCategories((prev) =>
                                        prev.filter((c) => c.localIndex !== cat.localIndex)
                                      )
                                    }
                                    textStyle={styles.chipText}
                                  >
                                    {cat.nome}
                                  </Chip>
                                ))}
                              </View>
                            )}
                          </View>
                        </TouchableOpacity>
                      }
                    >

                      {categorias.map((cat) => {
                        const isSelected = selectedCategories.some(
                          (c) => c.localIndex === cat.localIndex
                        );
                        return (
                          <Menu.Item
                            key={cat.localIndex}
                            onPress={() => handleSelectCategory(cat)}
                            title={cat.nome}
                            leadingIcon={
                              isSelected
                                ? 'checkbox-marked'
                                : 'checkbox-blank-outline'
                            }
                          />
                        );
                      })}

                    </Menu>
                  </View>
                </View>

                {/* DESCRIÇÃO */}
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionLabel}>Descrição:</Text>
                  <CustomTextInput
                    label="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    type="default"
                    multiline
                  />
                </View>
              </ScrollView>

              {/* BOTÃO FINAL */}
              <CustomButton
                title={loading ? 'Cadastrando...' : 'Cadastrar'}
                onPress={handleCreateLocal}
                loading={loading}
              />
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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    minWidth: 350,
    width: '90%',
    height: MODAL_HEIGHT,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B2D42',
    textAlign: 'center',
  },
  cardContent: {
    height: '92%',
  },
  scrollContent: {
    paddingBottom: 20,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
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
  chipInputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderWidth: 1,
    borderColor: '#7A7A7A',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 12,
    minHeight: 50,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  chipWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    backgroundColor: '#E0E0E0',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    color: '#2B2D42',
    fontSize: 14,
  },
  chipPlaceholder: {
    color: '#666',
    fontSize: 16,
    paddingLeft: 4,
  },
  menuContent: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 4,
  },
});

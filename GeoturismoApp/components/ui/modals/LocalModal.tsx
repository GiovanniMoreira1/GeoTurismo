import { LocalUnique } from '@/services/api/local';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator, Card, Modal, Portal } from 'react-native-paper';

interface LocalModalProps {
  visible: boolean;
  loading: boolean;
  local: LocalUnique | null;
  onClose: () => void;
  onLocalDeleted?: () => void; // mantém isso!
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.75;

export default function LocalModal({ visible, loading, local, onClose }: LocalModalProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [visible, local]);

  if (!visible || !local) return null;

  const categories: string[] = local.categorias || [];
  const itemsPerPage = 3;

  /** 🔹 Mapeamento de cores */
  const categoryColors: Record<string, string> = {
    Parques: '#4CAF50',
    Museus: '#9C27B0',
    Restaurantes: '#FF7043',
    Praias: '#2196F3',
    Eventos: '#E91E63',
    Lazer: '#FFC107',
    Mercado: '#8D6E63',
    Hospedagem: '#3F51B5',
    Exótico: '#009688',
    Cultural: '#BA68C8',
    Aventura: '#FF5722',
  };
  const getCategoryColor = (name: string) => categoryColors[name] || '#607D8B';

  /** 🔹 Retorna o grupo de categorias atual */
  const getDisplayedCategories = (start: number) => {
    if (categories.length === 0) return [];

    if (categories.length <= itemsPerPage) return categories;

    const end = start + itemsPerPage;
    if (end <= categories.length) return categories.slice(start, end);

    return [...categories.slice(start), ...categories.slice(0, end - categories.length)];
  };

  const displayedCategories = getDisplayedCategories(index);

  const handleNext = () => {
    if (categories.length > itemsPerPage) {
      setIndex((prev) => (prev + itemsPerPage) % categories.length);
    }
  };

  const handlePrev = () => {
    if (categories.length > itemsPerPage) {
      setIndex((prev) => (prev - itemsPerPage + categories.length) % categories.length);
    }
  };

  const showArrows = categories.length > itemsPerPage;
  const singleCategory = categories.length === 1;

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onClose} contentContainerStyle={styles.modalContainer}>
        <TouchableOpacity style={styles.buttonExit} onPress={onClose}>
          <MaterialCommunityIcons name="close" size={26} color="white" />
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <Card style={styles.card} elevation={3}>
            <Card.Content style={styles.cardContent}>
              {loading ? (
                <ActivityIndicator size="large" color="#0077B6" />
              ) : (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={styles.scrollContent}
                >
                  {/* Header buttons */}
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.infoButton}>
                      <Text style={styles.buttonTextInfo}>Informações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reviewsButton}>
                      <Text style={styles.buttonText}>Avaliações</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.localTitle}>{local.nome}</Text>

                  {/* 🔹 Categorias */}
                  {categories.length > 0 && (
                    <View style={styles.carouselOuter}>
                      {/* setas apenas se >3 */}
                      {showArrows && (
                        <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
                          <MaterialCommunityIcons
                            name="chevron-left"
                            size={26}
                            color="#2B2D42"
                          />
                        </TouchableOpacity>
                      )}

                      {/* conteúdo de categorias */}
                      <View style={styles.categoriesWrapper}>
                        {singleCategory ? (
                          // ✅ 1 categoria centralizada
                          <View style={styles.singleCategoryContainer}>
                            <View
                              style={[
                                styles.categoryBadge,
                                styles.singleCategoryBadge,
                                { backgroundColor: getCategoryColor(categories[0]) },
                              ]}
                            >
                              <Text style={styles.categoryText}>{categories[0]}</Text>
                            </View>
                          </View>
                        ) : (
                          // ✅ 2 ou 3 categorias equilibradas
                          <View
                            style={[
                              styles.multiCategoryContainer,
                              categories.length <= 3 && { justifyContent: 'center' },
                            ]}
                          >
                            {displayedCategories.map((item, idx) => (
                              <View
                                key={`${item}-${idx}`}
                                style={[
                                  styles.categoryBadge,
                                  { backgroundColor: getCategoryColor(item) },
                                ]}
                              >
                                <Text style={styles.categoryText}>{item}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </View>

                      {showArrows && (
                        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
                          <MaterialCommunityIcons
                            name="chevron-right"
                            size={26}
                            color="#2B2D42"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  )}

                  <Text style={styles.localDescription}>{local.descricao}</Text>
                </ScrollView>
              )}
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
    backgroundColor: 'white',
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },
  localTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#2B2D42',
  },
  localDescription: {
    fontSize: 16,
    color: '#2B2D42',
    marginBottom: 12,
    textAlign: 'justify',
  },

  /* ---------- CATEGORIAS ---------- */
  carouselOuter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  arrowButton: {
    paddingHorizontal: 6,
  },
  categoriesWrapper: {
    flex: 1,
    alignItems: 'center',
  },

  // ✅ 1 categoria
  singleCategoryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleCategoryBadge: {
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 10,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ✅ 2 ou 3 categorias
  multiCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    gap: 12,
  },

  categoryBadge: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },
  categoryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

  /* ---------- BOTÕES TOPO ---------- */
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
  },
  infoButton: {
    backgroundColor: '#90E0EF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 37,
  },
  reviewsButton: {
    backgroundColor: '#999999',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 37,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonTextInfo: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonExit: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
});

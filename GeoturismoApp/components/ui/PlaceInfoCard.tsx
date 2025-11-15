import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

type Category = {
  id: string;
  label: string;
  color: string;
};

type Props = {
  title: string;
  description: string;
  categories: Category[];
  onClose?: () => void;
};

export default function PlaceInfoCard({
  title,
  description,
  categories,
}: Props) {
  const [selectedTab, setSelectedTab] = useState<'info' | 'reviews'>('info');
  const flatListRef = useRef<FlatList<Category>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const screenWidth = Dimensions.get('window').width;

  // largura da área total do carrossel (sem as setas)
  const arrowWidth = 40;
  const horizontalPadding = 20;
  const availableWidth = screenWidth - arrowWidth * 2 - horizontalPadding * 2;

  // 2 itens por tela, com espaçamento pequeno entre eles
  const spacing = 12;
  const itemWidth = (availableWidth - spacing) / 2;

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < categories.length) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0,
      });
      setCurrentIndex(index);
    }
  };

  return (
    <Card style={styles.card}>
      {/* Header Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'info' && styles.activeTabButton]}
          onPress={() => setSelectedTab('info')}
        >
          <Text style={[styles.tabText, selectedTab === 'info' && styles.activeTabText]}>
            Informações
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'reviews' && styles.activeTabButton]}
          onPress={() => setSelectedTab('reviews')}
        >
          <Text style={[styles.tabText, selectedTab === 'reviews' && styles.activeTabText]}>
            Avaliações
          </Text>
        </TouchableOpacity>
      </View>

      <Card.Content style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {/* Categories Carousel */}
        <View style={[styles.carouselContainer]}>
          {/* Left Arrow */}
          <TouchableOpacity
            onPress={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            style={styles.arrowButton}
          >
            <Text style={[styles.arrow, currentIndex === 0 && styles.disabledArrow]}>{'‹'}</Text>
          </TouchableOpacity>

          {/* Category List */}
          <FlatList
            ref={flatListRef}
            horizontal
            data={categories}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            getItemLayout={(_, index) => ({
              length: itemWidth + spacing,
              offset: (itemWidth + spacing) * index,
              index,
            })}
            contentContainerStyle={[
              styles.carousel,
              categories.length <= 2 && styles.centeredCarousel,
            ]}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.category,
                  {
                    backgroundColor: item.color,
                    width: itemWidth,
                    marginHorizontal: spacing / 2,
                  },
                  item.label.length <= 6 ? styles.smallTextPadding : styles.largeTextPadding,
                ]}
              >
                <Text style={styles.categoryText}>{item.label}</Text>
              </View>
            )}
            snapToInterval={itemWidth + spacing}
            decelerationRate="fast"
          />

          {/* Right Arrow */}
          <TouchableOpacity
            onPress={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex >= categories.length - 2}
            style={styles.arrowButton}
          >
            <Text
              style={[
                styles.arrow,
                currentIndex >= categories.length - 2 && styles.disabledArrow,
              ]}
            >
              {'›'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description / Reviews */}
        {selectedTab === 'info' ? (
          <Text style={styles.description}>{description}</Text>
        ) : (
          <Text style={styles.description}>Ainda não há avaliações para este local.</Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
  },
  activeTabButton: {
    backgroundColor: '#00B4D8',
  },
  tabText: {
    fontSize: 16,
    color: '#374151',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredCarousel: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  arrowButton: {
    paddingHorizontal: 10,
  },
  arrow: {
    fontSize: 30,
    color: '#000',
  },
  disabledArrow: {
    color: '#9CA3AF',
  },
  category: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallTextPadding: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  largeTextPadding: {
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  categoryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  description: {
    fontSize: 13,
    textAlign: 'justify',
    color: '#111827',
    marginBottom: 15,
  },
});

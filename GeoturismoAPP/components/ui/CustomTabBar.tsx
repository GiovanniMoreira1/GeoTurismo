// components/CustomTabBar.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CustomTabBar({ state, navigation }: { state: any; navigation: any }) {
  const tabsMeta: Record<string, { icon: string; label: string }> = {
    map: { icon: 'map-outline', label: 'Mapa' },
    search: { icon: 'magnify', label: 'Buscar' },
    profile: { icon: 'account-circle-outline', label: 'Perfil' },
  };
  const tabs = state.routes.filter((r: any) => ['map', 'search', 'profile'].includes(r.name));

  function renderTab(route: any, index: number) {
    const idx = state.routes.indexOf(route);
    const isFocused = state.index === idx;
    const { icon, label } = tabsMeta[route.name];

    return (
      <React.Fragment key={route.key}>
        {index > 0 && <View style={styles.divider} />}
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate(route.name)}>
          <MaterialCommunityIcons
            name={icon as any}
            size={24}
            color={isFocused ? '#000' : '#ccc'}
          />
          <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>{label}</Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  }

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab: any, index: number) => renderTab(tab, index))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'visible',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  tabLabel: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#000',
  },
});

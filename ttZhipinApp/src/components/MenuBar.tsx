import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MenuBar = ({ menus, activeMenu, onMenuPress }:any) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.menuContainer}
    >
      {menus.map((menu:any, index: number) => (
        <TouchableOpacity
          key={index}
          style={[styles.menuItem, activeMenu === index && styles.activeMenuItem]}
          onPress={() => onMenuPress(index)}
        >
          {menu}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    marginRight: 10,
    borderColor: '#ccc',
  },
  activeMenuItem: {
    backgroundColor: 'blue',
  },
  menuText: {
    color: 'black',
  },
});

export default MenuBar;

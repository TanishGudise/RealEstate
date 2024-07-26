import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';

const imageMapping = {
  1: require('../assets/house1.png'),
  2: require('../assets/house2.png'),
  3: require('../assets/house3.png'),
  4: require('../assets/house4.png'),
  5: require('../assets/house5.png'),
};

const ProfileScreen = ({ navigation, route }) => {
  const [favorites, setFavorites] = useState(route.params.favorites);

  useEffect(() => {
    if (route.params?.favorites) {
      setFavorites(route.params.favorites);
    }
  }, [route.params?.favorites]);

  const removeFromFavorites = (property) => {
    const updatedFavorites = favorites.filter((fav) => fav['Property ID'] !== property['Property ID']);
    setFavorites(updatedFavorites);
    route.params.removeFromFavorites(property);
  };

  const renderFavoriteProperty = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.textContainer}>
        <Text style={styles.propertyText}>Property ID: {item['Property ID']}</Text>
        <Text style={styles.propertyText}>Location: {item.Location}</Text>
        <Text style={styles.propertyText}>Price: {item.Price}</Text>
        <Text style={styles.propertyText}>Attractiveness Score: {item['Attractiveness Score']}</Text>
        <Text style={styles.propertyText}>Type: {item.Type}</Text>
        <Text style={styles.propertyText}>Size: {item['Size (sq feet)']} sqft</Text>
        <Text style={styles.propertyText}>Year Built: {item['Year Built']}</Text>
        <TouchableOpacity onPress={() => removeFromFavorites(item)}>
          <Text style={styles.removeFromFavorites}>Remove from Favorites</Text>
        </TouchableOpacity>
      </View>
      <Image source={imageMapping[item['Property ID']]} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Profile</Text>
      <Text style={styles.subHeader}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item['Property ID'].toString()}
        renderItem={renderFavoriteProperty}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('HomeScreen', { favorites })} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
  },
  propertyText: {
    color: '#555',
    marginBottom: 5,
  },
  removeFromFavorites: {
    color: 'red',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default ProfileScreen;








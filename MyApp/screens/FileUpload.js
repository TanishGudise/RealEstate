import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Slider from '@react-native-community/slider';

const FileUpload = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  const loadData = async () => {
    const fileUri = '/Users/tanishgudise/Desktop/PracticeProject/MyApp/assets/properties2.json';
    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    const parsedData = JSON.parse(fileContent);
    setData(parsedData);
    setOriginalData(parsedData);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (route.params?.data) {
      setData(route.params.data);
    }
  }, [route.params?.data]);

  const toggleFavorite = (property) => {
    if (favorites.some((fav) => fav['Property ID'] === property['Property ID'])) {
      setFavorites(favorites.filter((fav) => fav['Property ID'] !== property['Property ID']));
    } else {
      setFavorites([...favorites, property]);
    }
  };

  const renderProperty = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text>Property ID: {item['Property ID']}</Text>
          <Text>Location: {item.Location}</Text>
          <Text>Price: {item.Price}</Text>
          <Text>Attractiveness Score: {item['Attractiveness Score']}</Text>
          <Text>Type: {item.Type}</Text>
          <Text>Size: {item['Size (sq feet)']} sqft</Text>
          <Text>Year Built: {item['Year Built']}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={item['Attractiveness Score']}
            onValueChange={(value) => {
              const newData = data.map((prop) => {
                if (prop['Property ID'] === item['Property ID']) {
                  return { ...prop, 'Attractiveness Score': value };
                }
                return prop;
              });
              setData(newData);
            }}
          />
          <Text>Attractiveness Score: {item['Attractiveness Score']}</Text>
          <Button
            title={favorites.some((fav) => fav['Property ID'] === item['Property ID']) ? 'Remove from Favorites' : 'Add to Favorites'}
            onPress={() => toggleFavorite(item)}
            color="#4CAF50"
          />
        </View>
        <Image
          style={styles.image}
          source={
            item['Property ID'] === 1
              ? require('../assets/house1.png')
              : item['Property ID'] === 2
              ? require('../assets/house2.png')
              : item['Property ID'] === 3
              ? require('../assets/house3.png')
              : item['Property ID'] === 4
              ? require('../assets/house4.png')
              : require('../assets/house5.png')
          }
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item['Property ID'].toString()}
        renderItem={renderProperty}
      />
      <View style={styles.navigationContainer}>
        <Button
          title="Sort and Filter"
          onPress={() => navigation.navigate('FilterScreen', { data: originalData })}
          color="#4CAF50"
        />
        <Button
          title="Home"
          onPress={() => navigation.navigate('HomeScreen')}
          color="#4CAF50"
        />
        <Button
          title="Profile"
          onPress={() => navigation.navigate('ProfileScreen', { favorites })}
          color="#4CAF50"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 3,
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default FileUpload;



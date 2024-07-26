import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { SelectList } from 'react-native-dropdown-select-list';

const SORT_TYPES = [
  { key: 'default', value: 'Default' },
  { key: 'newest', value: 'Newest' },
  { key: 'oldest', value: 'Oldest' },
  { key: 'price', value: 'Price' },
  { key: 'attractiveness', value: 'Attractiveness' },
];

const FilterScreen = ({ route, navigation }) => {
  const { data } = route.params;
  const [sortType, setSortType] = useState('default');
  const [filterType, setFilterType] = useState('All');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedPrice, setSelectedPrice] = useState(1000000);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let sorted = [...data];

    if (sortType === 'newest') {
      sorted.sort((a, b) => b['Year Built'] - a['Year Built']);
    } else if (sortType === 'oldest') {
      sorted.sort((a, b) => a['Year Built'] - b['Year Built']);
    } else if (sortType === 'price') {
      sorted.sort((a, b) => a.Price - b.Price);
    } else if (sortType === 'attractiveness') {
      sorted.sort((a, b) => b['Attractiveness Score'] - a['Attractiveness Score']);
    }

    if (filterType !== 'All') {
      sorted = sorted.filter(item => item.Type === filterType);
    }

    sorted = sorted.filter(item => item['Year Built'] <= selectedYear && item.Price <= selectedPrice);

    setFilteredData(sorted);
  }, [sortType, filterType, selectedYear, selectedPrice, data]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort</Text>
      <SelectList
        setSelected={setSortType}
        data={SORT_TYPES}
        placeholder="Select Sort Type"
        search={false}
        boxStyles={styles.dropdown}
        defaultOption={{ key: 'default', value: 'Default' }}
      />
      <Text style={styles.label}>Filter by Type:</Text>
      <SelectList
        setSelected={setFilterType}
        data={[
          { key: 'All', value: 'All' },
          { key: 'House', value: 'House' },
          { key: 'Condo', value: 'Condo' },
          { key: 'Apartment', value: 'Apartment' },
        ]}
        placeholder="Select Type"
        search={false}
        boxStyles={styles.dropdown}
        defaultOption={{ key: 'All', value: 'All' }}
      />
      <Text style={styles.label}>Filter by Year Built:</Text>
      <Slider
        minimumValue={1900}
        maximumValue={2024}
        step={1}
        value={selectedYear}
        onValueChange={(value) => setSelectedYear(Math.floor(value))}
        style={styles.slider}
      />
      <Text>Selected Year: {selectedYear}</Text>
      <Text style={styles.label}>Filter by Price (up to):</Text>
      <Slider
        minimumValue={0}
        maximumValue={1000000}
        step={10000}
        value={selectedPrice}
        onValueChange={(value) => setSelectedPrice(Math.floor(value))}
        style={styles.slider}
      />
      <Text>Selected Price: {selectedPrice}</Text>
      <Button title="Apply Changes" onPress={() => navigation.navigate('FileUpload', { data: filteredData })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  dropdown: {
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default FilterScreen;



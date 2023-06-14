import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const SearchByRectangleScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (text) => {
    setSearchText(text);

    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(text)}.json`, {
        params: {
          access_token: 'pk.eyJ1IjoiZnJhbmt5YmFieSIsImEiOiJjbGluanJ2dTMwaW0zM2VwbmhmOGY3MnZmIn0.T46gf4BvWkV7zaCp479kNw',
          limit: 10
        }
      });

      if (response.data.features) {
        setSearchResults(response.data.features);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectAddress = (place) => {
    const position = {
      latitude: place.center[1],
      longitude: place.center[0],
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    navigation.navigate('MyComponent', { selectedPosition: position });

  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectAddress(item)} style={styles.item}>
      <Text style={styles.text}>{item.place_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          onChangeText={handleSearch}
          value={searchText}
          placeholder="Entrez une adresse"
        />
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5F5F5'
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  text: {
    fontSize: 16
  }
});

export default SearchByRectangleScreen;

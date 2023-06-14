import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const sportsList = [
  { sport: 'Football', emoji: '⚽' },
  { sport: 'Basketball', emoji: '🏀' },
  { sport: 'Baseball', emoji: '⚾' },
  { sport: 'American Football', emoji: '🏈' },
  { sport: 'Rugby', emoji: '🏉' },
  { sport: 'Tennis', emoji: '🎾' },
  { sport: 'Golf', emoji: '⛳' },
  { sport: 'Bowling', emoji: '🎳' },
  { sport: 'Skiing', emoji: '⛷️' },
  { sport: 'Snowboarding', emoji: '🏂' },
  { sport: 'Ice Hockey', emoji: '🏒' },
  { sport: 'Boxing', emoji: '🥊' },
  { sport: 'Martial Arts', emoji: '🥋' },
  { sport: 'Cycling', emoji: '🚴‍♀️' },
  { sport: 'Swimming', emoji: '🏊‍♀️' },
  { sport: 'Gymnastics', emoji: '🤸‍♀️' },
  { sport: 'Weightlifting', emoji: '🏋️‍♀️' },
  { sport: 'Surfing', emoji: '🏄‍♀️' },
  { sport: 'Horse Riding', emoji: '🏇' },
  { sport: 'Skateboarding', emoji: '🛹' },
  { sport: 'Rock Climbing', emoji: '🧗‍♀️' },
  { sport: 'Fencing', emoji: '🤺' },
  { sport: 'Wrestling', emoji: '🤼‍♀️' },
  { sport: 'Table Tennis', emoji: '🏓' },
  { sport: 'Badminton', emoji: '🏸' },
  { sport: 'Cricket', emoji: '🏏' },
  // ajoutez plus de sports ici
];


const SearchScreen = ({ navigation }) => {
  const searchRef = useRef();
  const [search, setSearch] = useState('');
  const [filteredSports, setFilteredSports] = useState(sportsList);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }

    setFilteredSports(
      sportsList.filter((item) =>
        item.sport.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredSports}
        keyExtractor={(item) => item.sport}
        ListHeaderComponent={
          <TextInput
            ref={searchRef}
            style={styles.input}
            placeholder="Recherchez un sport..."
            value={search}
            onChangeText={setSearch}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PageSports', { selectedSport: item.sport, selectedEmoji: item.emoji })}>
            <Text style={styles.item}>
              {item.emoji} {item.sport}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default SearchScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

const PageAmis = () => {
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState({
    sport: '',
    price: null,
    location: null,
    terrainState: null
  });

  const handleOptionSelect = (type, option) => {
    setSelectedOption(prevState => ({
      ...prevState,
      [type]: option
    }));
  };

  const handleValidation = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtre</Text>

      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Gratuit / Payant</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption.price === 'gratuit' && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect('price', 'gratuit')}
          >
            <Text style={styles.optionButtonText}>Gratuit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption.price === 'payant' && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect('price', 'payant')}
          >
            <Text style={styles.optionButtonText}>Payant</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>Intérieur / Extérieur</Text>
        <View style={styles.optionRow}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption.location === 'intérieur' && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect('location', 'intérieur')}
          >
            <Text style={styles.optionButtonText}>Intérieur</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedOption.location === 'extérieur' && styles.selectedOption
            ]}
            onPress={() => handleOptionSelect('location', 'extérieur')}
          >
            <Text style={styles.optionButtonText}>Extérieur</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.optionContainer}>
        <Text style={styles.optionTitle}>État du terrain</Text>
        <View style={styles.optionRow}>
          {[1, 2, 3, 4, 5].map(terrainState => (
            <TouchableOpacity
              key={terrainState}
              style={[
                styles.optionButton,
                selectedOption.terrainState === terrainState && styles.selectedOption
              ]}
              onPress={() => handleOptionSelect('terrainState', terrainState)}
            >
              <Text style={styles.optionButtonText}>{terrainState}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.validationContainer}>
        <TouchableOpacity
          style={styles.validationButton}
          onPress={handleValidation}
        >
          <Text style={styles.validationButtonText}>Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: '#F3F4F6'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#374151'
  },
  optionContainer: {
    marginBottom: 24,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937'
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  optionButton: {
    margin: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    flexBasis: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#1F2937'
  },
  selectedOption: {
    backgroundColor: '#60A5FA',
    borderColor: '#60A5FA',
    color: '#F3F4F6'
  },
  validationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  validationButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  validationButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default PageAmis;

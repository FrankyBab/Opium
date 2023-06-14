import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

const SelectorOption = ({ title, currentValue, setValue }) => (
  <TouchableOpacity
    style={[styles.selectorOption, currentValue === title && styles.selectedOption]}
    onPress={() => setValue(title)}
  >
    <Text style={styles.optionText}>{title}</Text>
  </TouchableOpacity>
);

const NewSpots = () => {
  const [sport, setSport] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('Gratuit');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Intérieur');
  const [rating, setRating] = useState(1);
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const handleAdd = useCallback(() => {
    // Code to save new spot data
    navigation.navigate('Home');
  }, [navigation]);

  const navigateToMap = useCallback(() => {
    navigation.navigate('MapPage', {
      onLocationSelect: (selectedAddress) => setAddress(selectedAddress)
    });
  }, [navigation, setAddress]);

  const selectImage = useCallback(() => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImage(source);
      }
    });
  }, [setImage]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>New Spots</Text>

      <Text style={styles.sectionTitle}>Nom du sport</Text>
      <TextInput style={styles.input} placeholder="Nom du sport" value={sport} onChangeText={setSport} />

      <Text style={styles.sectionTitle}>Adresse</Text>
      <TextInput style={styles.input} placeholder="Adresse" value={address} onChangeText={setAddress} />
      <Button title="Choisir sur la carte" onPress={navigateToMap} />

      <Text style={styles.sectionTitle}>Prix</Text>
      <View style={styles.selectorContainer}>
        <SelectorOption title="Gratuit" currentValue={price} setValue={setPrice} />
        <SelectorOption title="Payant" currentValue={price} setValue={setPrice} />
      </View>
      {price === 'Payant' && (
        <TextInput
          style={styles.input}
          placeholder="Numéro de téléphone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="numeric"
        />
      )}

      <Text style={styles.sectionTitle}>Emplacement</Text>
      <View style={styles.selectorContainer}>
        <SelectorOption title="Intérieur" currentValue={location} setValue={setLocation} />
        <SelectorOption title="Extérieur" currentValue={location} setValue={setLocation} />
      </View>

      <Text style={styles.sectionTitle}>État du terrain</Text>
      <View style={styles.selectorContainer}>
        {[1, 2, 3, 4, 5].map(value => (
          <SelectorOption key={value} title={value} currentValue={rating} setValue={setRating} />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Image</Text>
      <Button title="Sélectionner une image" onPress={selectImage} />
      {image && <Image source={image} style={styles.image} />}

      <TouchableOpacity
        style={styles.boutonAjouterConteneur}
        onPress={handleAdd}
      >
        <Text style={styles.texteBoutonAjouter}>Ajouter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  boutonAjouterConteneur: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  texteBoutonAjouter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  selectorContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectorOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    backgroundColor: '#DDDDDD',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 100, // Or the size you want
    height: 100, // Or the size you want
    marginBottom: 16,
  },
});

export default NewSpots;

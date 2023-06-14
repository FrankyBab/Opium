import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';


const MyComponent = () => {
  const navigation = useNavigation();
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [location, setLocation] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [region, setRegion] = useState(null);
  const emojis = ['🎾', '⚽️', '🏀', '🏈','+'];

  const handleEmojiSelect = (emoji) => {
    if(emoji === '+') {
      // Passer la fonction setAddress à la page de recherche
      navigation.navigate('SearchScreen');
    } else {
      setSelectedEmoji(emoji);
    }
  };

  const handleCogPress = () => {
    navigation.navigate('BlankPage');
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);


  const handleRegionChange = (region) => {
    setRegion(region);
    setShowButton(true);
  };

  const handleBackToUserLocation = () => {
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setShowButton(false);
  };

  return (
  <View style={{ flex: 1 }}>
      {location ? (
  <MapView
    style={{ flex: 1 }}
    region={region}
    onRegionChangeComplete={handleRegionChange}
  >
    <Marker
      coordinate={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }}
    >
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          backgroundColor: 'blue',
          borderColor: 'white',
          borderWidth: 3,
        }}
      />
    </Marker>
  </MapView>
) : null}

{showButton && (
  <TouchableOpacity
    style={{
      position: 'absolute',
      bottom: 120, // Position adjusted to be above the "Ajouter un sport" box
      right: 1,
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 40,
      zIndex: 2, // Higher zIndex to overlay on other components
    }}
    onPress={handleBackToUserLocation}
  >
    <Text>Back</Text>
  </TouchableOpacity>
)}


<TouchableOpacity
  style={{
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  }}
  onPress={() => navigation.navigate('BlankPage')}
>
  <Icon name="person" size={20} color="white" />
</TouchableOpacity>


<TouchableOpacity
  style={{
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white'
  }}
  onPress={() => navigation.navigate('SearchByRectangleScreen')}
>
  <Text style={{
    color: 'white',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center'
  }}>
    Nantes
  </Text>
</TouchableOpacity>


<TouchableOpacity
  style={{
  position: 'absolute',
  top: 60,
  left: 80,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  width: 40,
  height: 40,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
          }}
        onPress={() => navigation.navigate('Search')}
      >
        <Icon name="search" size={25} color="white" />
</TouchableOpacity>

<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
  <View style={{ position: 'absolute', top: -875, backgroundColor: 'rgba(0, 0, 0, 0.2)', width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 100, right: 20 }}>
    <FAIcon name="cog" size={25} color="white" />
  </View>
</TouchableOpacity>



<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', position: 'absolute', bottom: 20, width: '100%', paddingBottom: 30,}}>

<TouchableOpacity onPress={() => navigation.navigate('PageSports')}>
    <View style={{ alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', width: 45, height: 80, borderRadius: 30, left: 373, justifyContent: 'center', alignItems: 'center', top: -380, opacity: 1 }}>
            <Text style={{ fontSize: 26, fontWeight: '900', top: -7 }}>{selectedEmoji}</Text>
            <Icon name="filter" size={20} color="#000" />
        </View>
    </View>
</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.navigate('PageAdd')}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    </View>
    <View style={{ borderWidth: 0, backgroundColor: 'white', width: 410, height: 80, borderRadius: 30, borderBottomRightRadius: 30, borderBottomLeftRadius: 30, borderTopLeftRadius: 30, right: 16, justifyContent: 'center', alignItems: 'center', top: 100, opacity: 0.95 }}>
      <Text style={{ fontSize: 22, fontWeight: '900', color: 'white', alignItems: 'center', justifyContent: 'center', color: 'black'}}>Ajouter un spot</Text>
    </View>
  <View style={{ width: 200, height: 70, alignItems: 'center', justifyContent: 'center', top: 30, paddingLeft: 20 }}>
  </View>
</TouchableOpacity>


</View>




<View style={{
  position: 'absolute',right: 20,top: '13%',width: 44,height: 224,borderRadius: 30,backgroundColor: 'rgba(10, 10, 0, 0.2)',justifyContent: 'center',alignItems: 'center'}}>
    {emojis.map((emoji, index) => (
      <TouchableOpacity
        key={index}
        style={{
          height: 45,
          width: 45,
          marginBottom: 0,
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: selectedEmoji === emoji ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
          borderRadius: 1000,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => handleEmojiSelect(emoji)}
      >
        <Text style={{ fontSize: 24 }}>{emoji}</Text>
      </TouchableOpacity>
    ))}
</View>

    </View>
  );
};

export default MyComponent;

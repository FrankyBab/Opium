import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Settings = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <View style={styles.closeIcon}>
          <Icon name="close" size={24} color="white" />
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Paramètres</Text>
        {[
          ['Générale', 'GeneralSettings', 'settings-sharp'],
          ['Affichage de la carte', 'MapDisplaySettings', 'map-outline'],
          ['Application de guidage de défaut', 'DefaultGuidanceAppSettings', 'navigate-outline'],
          ['Notifications', 'NotificationSettings', 'notifications-outline'],
          ['Signaler un problème', 'ReportProblem', 'alert-circle-outline'],
          ['Centre d\'aide', 'HelpCenter', 'help-circle-outline'],
          ['À propos', 'About', 'information-circle-outline'],
          ['Inviter un ami', 'InviteFriend', 'person-add-outline'],
          ['Sports Favoris', 'FavoriteSports', 'football-outline'],
        ].map(([label, screen, iconName]) => (
          <TouchableOpacity onPress={() => navigation.navigate(screen)} key={screen}>
            <View style={styles.itemContainer}>
              <Icon name={iconName} size={24} color="#000" />
              <Text style={styles.itemText}>{label}</Text>
              <View style={styles.iconContainer}>
                <Icon name="chevron-forward" size={24} color="white" />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 1,
  },
  closeIcon: {
    backgroundColor: '#4B9',
    borderRadius: 50,
    padding: 10,
    top: -10
  },
  scrollContainer: {
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    paddingLeft: 20,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10, // Added this to give some space between the icon and text
  },
  iconContainer: {
    backgroundColor: '#110076',
    borderRadius: 50,
    padding: 10,
    marginLeft: 40
  },
});

export default Settings;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyComponent from './MyComponent'; // Assurez-vous que ce chemin d'importation est correct
import SearchScreen from './SearchScreen'; // Assurez-vous que ce chemin d'importation est correct
import SearchByRectangleScreen from './SearchByRectangleScreen'; // Assurez-vous que ce chemin d'importation est correct
import BlankPage from './BlankPage';
import PageSports from './PageSports';
import PageAmis from './PageAmis';
import PageAdd from './PageAdd';
import Settings from './Settings';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MyComponent} options={{ headerShown: false }} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchByRectangle" component={SearchByRectangleScreen} />
        <Stack.Screen name="BlankPage" component={BlankPage} />
        <Stack.Screen name="PageSports" component={PageSports} />
        <Stack.Screen name="PageAmis" component={PageAmis} />
        <Stack.Screen name="PageAdd" component={PageAdd} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

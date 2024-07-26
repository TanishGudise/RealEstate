import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FileUpload from './screens/FileUpload'; // Ensure this path is correct
import FilterScreen from './screens/FilterScreen'; // Ensure this path is correct
import HomeScreen from './screens/HomeScreen'; // Ensure this path is correct
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (property) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav['Property ID'] === property['Property ID'])) {
        return [...prevFavorites, property];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (property) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav['Property ID'] !== property['Property ID'])
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen">
          {(props) => <HomeScreen {...props} favorites={favorites} />}
        </Stack.Screen>
        <Stack.Screen name="FileUpload">
          {(props) => (
            <FileUpload {...props} favorites={favorites} addToFavorites={addToFavorites} />
          )}
        </Stack.Screen>
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="ProfileScreen">
          {(props) => (
            <ProfileScreen {...props} favorites={favorites} removeFromFavorites={removeFromFavorites} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


/*import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FileUpload from './screens/FileUpload'; // Ensure this path is correct
import FilterScreen from './screens/FilterScreen'; // Ensure this path is correct
import HomeScreen from './screens/HomeScreen'; // Ensure this path is correct
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FileUpload" component={FileUpload} />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;*/


/*import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';
import FilterScreen from './screens/FilterScreen';
import SortScreen from './screens/SortScreen';
import FileUpload from './screens/FileUpload';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Sort" component={SortScreen} />
        <Stack.Screen name="FileUpload" component={FileUpload} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}*/



/*import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';
import FilterScreen from './screens/FilterScreen';
import SortScreen from './screens/SortScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Sort" component={SortScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;*/

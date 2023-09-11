//App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NameSetting from './components/NameSetting';
import GameList from './components/GameList';
import GameBoard from './components/GameBoard';
import ResultsPage from './components/ResultsPage';
import FrontPage from './components/FrontPage';

const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FrontPage">
          <Stack.Screen name="WelcomePage" component={FrontPage} options={{ title: 'Welcome' }} />
          <Stack.Screen name="NamePage" component={NameSetting} options={{ title: 'Enter Name' }} />
          <Stack.Screen name="PickGamePage" component={GameList} options={{ title: 'Pick a Game' }} />
          <Stack.Screen name="PlayPage" component={GameBoard} options={{ title: 'Play' }} />
          <Stack.Screen name="ResultsPage" component={ResultsPage} options={{ title: 'Results' }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;

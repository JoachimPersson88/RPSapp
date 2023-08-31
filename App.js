//App.js
import React from 'react';
import { View } from 'react-native';
import { TokenProvider } from './TokenContext'; // Uppdatera sökvägen här

import GameBoard from './GameBoard';

const App = () => {
  return (
    <TokenProvider>
      <View style={{ flex: 1 }}>
        <GameBoard />
      </View>
    </TokenProvider>
  );
}

export default App;





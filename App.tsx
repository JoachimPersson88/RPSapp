//App.tsx
import React from 'react';
import { View } from 'react-native';
import Token from './components/TokenComponent';

function App() {
    return (
        <View style={{
           // backgroundImage: "url('../src/components/img/background.png')",
           // backgroundSize: 'cover',
           // backgroundRepeat: 'no-repeat',
           // backgroundPosition: 'center center'
        }}>
            <Token />
        </View>
    );
}

export default App;

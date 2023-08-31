//MoveButtonsComponent.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

class MoveButtonsComponent extends React.Component {
    render() {
      const { makeMoveStone, makeMovePaper, makeMoveScissor } = this.props;
      return (
        <View>
          <TouchableOpacity onPress={makeMoveScissor}>
            <Text>SCISSOR</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={makeMovePaper}>
            <Text>PAPER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={makeMoveStone}>
            <Text>ROCK</Text>
          </TouchableOpacity>
        </View>
      );
    }
}

export default MoveButtonsComponent;
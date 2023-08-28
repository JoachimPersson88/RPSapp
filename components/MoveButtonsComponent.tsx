//MoveButtonsComponent.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

//Definiera typer för spelarens drag
interface MoveButtons {
    makeMoveStone: () => void;
    makeMovePaper: () => void;
    makeMoveScissor: () => void;
}
//Klasskomponent för spelarens drag
class MoveButtonsComponent extends React.Component<MoveButtons> {
    render() {
      let {makeMoveStone, makeMovePaper, makeMoveScissor} = this.props;
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

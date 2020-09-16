import React from 'react';
import { Text, View } from 'react-native';

const App: React.FC = () => {
  const adlfasl = 'cdac';

  return (
    <View>
      <Text>Olá mundo</Text>
      <View>
        <Text>{adlfasl}</Text>
      </View>
    </View>
  );
};

export default App;

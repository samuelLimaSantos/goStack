import React from 'react';
import { View, StatusBar, Text } from 'react-native';

const App: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#312e38"
        translucent
      />
      <View style={{ backgroundColor: '#312e38', flex: 1 }} />
    </>
  );
};

export default App;

import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './src/navigation/AuthStack';
import AppStack from './src/navigation/AppStack';
import {AuthContext, AuthProvider} from './src/context/AuthContext';

const RootNavigator = () => {
  const {state} = useContext(AuthContext);

  if (state.isLoading) {
    return null;
  }
  return state.isAuthenticated ? <AppStack /> : <AuthStack />;
};

const App = () => (
  <AuthProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  </AuthProvider>
);

export default App;
